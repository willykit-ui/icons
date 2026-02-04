#!/usr/bin/env node

/**
 * Экспортирует ТОЛЬКО иконки из Figma.
 * Использует строгую фильтрацию по размерам и типам.
 * Запуск: npm run export
 */

import fs from "fs/promises";
import path from "path";
import { argv } from "process";
import { URL } from "url";
import crypto from "crypto";

// Импорт функций для работы с манифестом
import {
  loadManifest,
  saveManifest,
  // findNewIcons,
  findDeletedIcons,
  // findUpdatedIcons,
  createManifestEntry,
  type IconManifestEntry,
} from "./manifest";

// Загружаем .env
import dotenv from "dotenv";
dotenv.config();

// --- SVGO Handling ---
let svgoAvailable = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let optimizeFn: any;

try {
  const svgoModule = await import("svgo");
  svgoAvailable = !!svgoModule.optimize;
  optimizeFn = svgoModule.optimize;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (e) {
  svgoAvailable = false;
  console.warn(
    "SVGO не найден. Установите `npm install svgo`, если хотите оптимизировать SVG.",
  );
}

// --- Argument Parsing ---
type Args = {
  fileKey?: string;
  nodeId?: string;
  figmaNodeUrl?: string;
  outDir: string;
  concurrency: number;
  useAbsoluteBounds: boolean;
  keepOriginalNameSpaces: boolean;
  svgo: boolean;
  svgoConfigPath?: string;
  childrenOnly: boolean;
  minSize: number;
  maxSize: number;
};

function parseArgs(): Args {
  const args = Object.fromEntries(
    argv.slice(2).map((a) => {
      const [k, v] = a.replace(/^--/, "").split("=");
      return [k, v ?? "true"];
    }),
  ) as Record<string, string>;

  return {
    fileKey: args.fileKey ?? process.env.FILE_KEY,
    nodeId: args.nodeId ?? process.env.NODE_ID,
    figmaNodeUrl: args.figmaNodeUrl ?? process.env.FIGMA_NODE_URL,
    outDir: args.out ?? process.env.OUT_DIR ?? "./icons",
    concurrency: Math.max(1, Number(args.concurrency ?? args.c ?? 6)) || 6,
    useAbsoluteBounds: args.useAbsoluteBounds
      ? args.useAbsoluteBounds === "true"
      : true,
    keepOriginalNameSpaces: args.keepOriginalNameSpaces
      ? args.keepOriginalNameSpaces === "true"
      : false,
    svgo: args.svgo ? args.svgo === "true" : process.env.SVGO === "true",
    svgoConfigPath: args.svgoConfig ?? process.env.SVGO_CONFIG,
    childrenOnly: args.childrenOnly === "true",
    minSize: Number(args.minSize ?? 12), // По умолчанию 12px
    maxSize: Number(args.maxSize ?? 64), // По умолчанию 64px
  };
}

// --- Utility Functions ---
const STANDARD_SIZES = [12, 16, 20, 24, 28, 32, 36, 48, 64];

function nearestStandardSize(px: number): number {
  if (!isFinite(px) || px <= 0) return 24;
  let nearest = STANDARD_SIZES[0];
  let bestDiff = Math.abs(px - nearest);
  for (const s of STANDARD_SIZES) {
    const d = Math.abs(px - s);
    if (d < bestDiff) {
      nearest = s;
      bestDiff = d;
    }
  }
  return nearest;
}

function safeName(name: string, keepSpaces = false): string {
  let n = name.trim();

  // Замена кириллических "двойников" на латиницу
  n = n.replace(/С/g, "C").replace(/с/g, "c");
  n = n.replace(/О/g, "O").replace(/о/g, "o");

  // camelCase → kebab-case
  n = n.replace(/([a-z])([A-Z])/g, "$1-$2");
  // Пробелы и подчёркивания → дефис
  if (!keepSpaces) n = n.replace(/[\s_]+/g, "-");
  // Только буквы, цифры, дефис
  // eslint-disable-next-line no-useless-escape
  n = n.replace(/[^a-zA-Z0-9\-]/g, "-");
  // Множественные дефисы → один
  n = n.replace(/-+/g, "-");
  // Убрать дефисы в начале и конце
  n = n.replace(/^-+|-+$/g, "");
  // В нижний регистр
  n = n.toLowerCase();

  return n || "icon";
}

async function loadSvgoConfig(configPath?: string) {
  const defaultCfg = {
    multipass: true,
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
            removeDoctype: false,
            removeXMLProcInst: false,
            removeComments: false,
            removeMetadata: false,
            removeTitle: false,
            removeDesc: false,
            removeUselessDefs: false,
            removeEditorsNSData: false,
            removeEmptyAttrs: false,
            removeHiddenElems: false,
            removeEmptyText: false,
            removeEmptyContainers: false,
            convertShapeToPath: true,
            convertPathData: false,
            collapseGroups: false,
            sortAttrs: false,
          },
        },
      },
    ],
  };

  if (!configPath) return defaultCfg;

  try {
    const raw = await fs.readFile(path.resolve(configPath), "utf8");
    return JSON.parse(raw);
  } catch (e) {
    console.warn(
      "Не удалось загрузить svgo config, используется дефолтный. Ошибка:",
      (e as Error).message,
    );
    return defaultCfg;
  }
}

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 5,
): Promise<Response> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url, options);

      if (res.status === 429) {
        const retryAfter = res.headers.get("retry-after");
        const delay = (retryAfter ? parseInt(retryAfter, 10) : 60) * 1000;

        console.log(
          `🟡 Rate limit. Повтор через ${delay / 1000} сек... (Попытка ${
            i + 1
          }/${maxRetries})`,
        );
        await new Promise((r) => setTimeout(r, delay));
        continue; // Повторяем попытку
      }

      return res; // Успешный ответ, не 429
    } catch (error) {
      console.error(
        `❌ Ошибка сети при попытке ${i + 1}:`,
        (error as Error).message,
      );
      if (i === maxRetries - 1) throw error; // Пробрасываем ошибку после последней попытки
      await new Promise((r) => setTimeout(r, 5000)); // Ждем 5 сек при ошибке сети
    }
  }
  throw new Error(
    `❌ Превышено максимальное количество попыток для URL: ${url}`,
  );
}

// --- Main Logic ---
async function main() {
  const args = parseArgs();
  const token = process.env.FIGMA_TOKEN;

  if (!token) {
    console.error("Ошибка: нужен FIGMA_TOKEN в .env файле.");
    process.exit(2);
  }

  let fileKey = args.fileKey;
  let nodeId = args.nodeId;

  if (args.figmaNodeUrl) {
    try {
      const url = new URL(args.figmaNodeUrl);
      const pathnameParts = url.pathname.split("/").filter(Boolean);
      if (pathnameParts[1] === "file" && pathnameParts[2]) {
        fileKey = pathnameParts[2];
      } else {
        throw new Error("Неверный формат URL: не найден fileKey");
      }

      const nodeIdParam = url.searchParams.get("node-id");
      if (nodeIdParam) {
        nodeId = nodeIdParam.replace(/%3A/gi, ":");
      } else {
        throw new Error("Параметр 'node-id' не найден в URL");
      }
    } catch (err) {
      console.error("Ошибка парсинга FIGMA_NODE_URL:", (err as Error).message);
      process.exit(2);
    }
  }

  if (!fileKey) {
    console.error("Ошибка: не указан FILE_KEY (в .env или аргументах).");
    process.exit(2);
  }
  if (!nodeId) {
    console.error("Ошибка: не указан NODE_ID (в .env или аргументах).");
    process.exit(2);
  }

  if (args.svgo && !svgoAvailable) {
    console.warn("SVGO включён, но не установлен. Пропускаем оптимизацию.");
    args.svgo = false;
  }

  const svgoOptions = args.svgo
    ? await loadSvgoConfig(args.svgoConfigPath)
    : undefined;
  const outDir = path.resolve(args.outDir);
  await fs.mkdir(outDir, { recursive: true });

  // 1. ПОЛУЧЕНИЕ ДАННЫХ ИЗ FIGMA
  const nodeDataUrl = `https://api.figma.com/v1/files/${encodeURIComponent(
    fileKey,
  )}/nodes?ids=${encodeURIComponent(nodeId)}`;
  console.log(`🔍 Получаем данные узла ${nodeId}...`);
  const nodeDataResp = await fetchWithRetry(nodeDataUrl, {
    headers: { "X-Figma-Token": token },
  });

  if (!nodeDataResp.ok) {
    console.error(
      `❌ Ошибка API Figma: ${nodeDataResp.status} — ${await nodeDataResp.text()}`,
    );
    process.exit(3);
  }

  const nodeData = await nodeDataResp.json();
  const rootNode = nodeData.nodes?.[nodeId]?.document;

  if (!rootNode) {
    // ... (код для обработки nodeId с тире)
    console.error(`❌ Узел '${nodeId}' не найден.`);
    process.exit(3);
  }

  const iconsToExport: Array<{
    id: string;
    name: string;
    width: number;
    height: number;
    lastModified: string;
  }> = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function traverse(node: any) {
    if (!node || typeof node !== "object") return;

    if (["COMPONENT", "INSTANCE", "VECTOR"].includes(node.type)) {
      const bbox = node.absoluteBoundingBox;
      if (
        bbox &&
        typeof bbox.width === "number" &&
        typeof bbox.height === "number" &&
        node.lastModified
      ) {
        const width = Math.round(bbox.width);
        const height = Math.round(bbox.height);

        // Фильтр по размерам из аргументов
        if (
          width >= args.minSize &&
          height >= args.minSize &&
          width <= args.maxSize &&
          height <= args.maxSize
        ) {
          // Фильтр по соотношению сторон
          const aspectRatio = Math.abs(width / height - 1);
          if (aspectRatio <= 0.2) {
            // до 20% отклонения
            iconsToExport.push({
              id: node.id,
              name: node.name,
              width: bbox.width,
              height: bbox.height,
              lastModified: node.lastModified,
            });
          }
        }
      }
    }

    if (Array.isArray(node.children)) {
      node.children.forEach(traverse);
    }
  }

  traverse(rootNode);
  console.log(`✅ Найдено ${iconsToExport.length} всего иконок в Figma.`);

  // 2. ЗАГРУЗКА И РАЗДЕЛЕНИЕ МАНИФЕСТА
  const manifest = await loadManifest(outDir);
  const figmaIconsFromManifest = manifest.icons.filter(
    (icon) => !icon.id.startsWith("local-"),
  );
  const localIconsFromManifest = manifest.icons.filter((icon) =>
    icon.id.startsWith("local-"),
  );

  // 3. ОБРАБОТКА УДАЛЕНИЙ (DEPRECATION)
  const deletedIcons = findDeletedIcons(iconsToExport, figmaIconsFromManifest);
  const deprecatedEntries = deletedIcons.map((icon) => ({
    ...icon,
    deprecated: true,
  }));
  if (deprecatedEntries.length > 0) {
    console.log(
      `🟡 Помечено как устаревшие: ${deprecatedEntries.length} иконок.`,
    );
  }

  // 4. ОПРЕДЕЛЕНИЕ АКТИВНЫХ ИКОНОК
  const activeFigmaIconsFromManifest = figmaIconsFromManifest.filter(
    (icon) => !deletedIcons.some((d) => d.id === icon.id),
  );
  const activeFigmaIconsFromApi = iconsToExport;

  const iconsToDownload = activeFigmaIconsFromApi.filter((apiIcon) => {
    const manifestIcon = activeFigmaIconsFromManifest.find(
      (mIcon) => mIcon.id === apiIcon.id,
    );
    if (!manifestIcon) return true; // Новая
    return (
      new Date(apiIcon.lastModified).getTime() >
      new Date(manifestIcon.lastModified).getTime()
    ); // Изменилась
  });

  const unchangedFigmaIcons = activeFigmaIconsFromManifest.filter(
    (mIcon) => !iconsToDownload.some((dIcon) => dIcon.id === mIcon.id),
  );

  // 5. СКАЧИВАНИЕ И ОБРАБОТКА
  const downloadedEntries: IconManifestEntry[] = [];
  if (iconsToDownload.length > 0) {
    console.log(
      `🔎 Требуется скачать ${iconsToDownload.length} новых или обновленных иконок.`,
    );

    const BATCH_SIZE = 100;
    for (let i = 0; i < iconsToDownload.length; i += BATCH_SIZE) {
      const batch = iconsToDownload.slice(i, i + BATCH_SIZE);
      const idsParam = batch.map((n) => n.id).join(",");
      const imagesUrl = `https://api.figma.com/v1/images/${encodeURIComponent(
        fileKey,
      )}?ids=${idsParam}&format=svg&use_absolute_bounds=true`;

      let resp;
      try {
        resp = await fetchWithRetry(imagesUrl, {
          headers: { "X-Figma-Token": token },
        });
      } catch (err) {
        console.error(
          `❌ Не удалось обработать пакет иконок:`,
          (err as Error).message,
        );
        continue;
      }

      if (!resp.ok) {
        console.error(
          `❌ Ошибка API изображений: ${resp.status}`,
          await resp.text(),
        );
        continue;
      }

      const json = await resp.json();
      const imageUrls = json.images ?? {};

      for (const icon of batch) {
        const svgUrl = imageUrls[icon.id];
        if (!svgUrl) {
          console.warn(`- Не удалось получить URL для ${icon.name}`);
          continue;
        }

        try {
          const svgResp = await fetch(svgUrl);
          let svgText = await svgResp.text();
          if (svgResp.ok) {
            if (svgoAvailable && optimizeFn) {
              const result = await optimizeFn(svgText, svgoOptions);
              svgText = result.data;
            }
            svgText = svgText.replace(/fill="[^"]+"/g, 'fill="currentColor"');

            const size = nearestStandardSize(icon.width);
            const baseName = safeName(icon.name, args.keepOriginalNameSpaces);
            const hasSizeSuffix = /-\d+px$/.test(baseName);
            const fileName = hasSizeSuffix
              ? `${baseName}.svg`
              : `${baseName}-${size}px.svg`;

            await fs.writeFile(path.join(outDir, fileName), svgText, "utf8");
            console.log(`✅ Сохранён: ${fileName}`);

            downloadedEntries.push(
              createManifestEntry(
                icon.id,
                icon.name,
                fileName,
                icon.width,
                icon.height,
                icon.lastModified,
                crypto.createHash("sha256").update(svgText).digest("hex"),
              ),
            );
          }
        } catch (err) {
          console.error(
            `- Ошибка обработки ${icon.name}:`,
            (err as Error).message,
          );
        }
      }
    }
  } else {
    console.log("✅ Нет новых или обновленных иконок для скачивания.");
  }

  // 6. СБОРКА И СОХРАНЕНИЕ МАНИФЕСТА
  const finalIcons = [
    ...unchangedFigmaIcons,
    ...downloadedEntries,
    ...deprecatedEntries,
    ...localIconsFromManifest,
  ];

  manifest.icons = finalIcons;
  await saveManifest(outDir, manifest);

  console.log("💾 Манифест обновлён.");
  console.log("🎉 Экспорт завершён.");
}

main().catch((err) => {
  console.error("🚨 Критическая ошибка:", err);
  process.exit(99);
});
