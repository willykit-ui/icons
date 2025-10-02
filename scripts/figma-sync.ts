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
  findNewIcons,
  findDeletedIcons,
  findUpdatedIcons,
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
            removeDimensions: false,
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
            cleanupListOfValues: false,
            removeXMLNS: false,
            sortAttrs: false,
            removeStyleElement: false,
            removeScripts: false,
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

  // Парсим URL, если задан
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

  // Проверка SVGO
  if (args.svgo && !svgoAvailable) {
    console.warn("SVGO включён, но не установлен. Пропускаем оптимизацию.");
    args.svgo = false;
  }

  const svgoOptions = args.svgo
    ? await loadSvgoConfig(args.svgoConfigPath)
    : undefined;
  const outDir = path.resolve(args.outDir);
  await fs.mkdir(outDir, { recursive: true });

  const nodeDataUrl = `https://api.figma.com/v1/files/${encodeURIComponent(fileKey)}/nodes?ids=${encodeURIComponent(nodeId)}`;
  console.log(`🔍 Получаем данные узла ${nodeId}...`);

  let nodeDataResp;
  try {
    nodeDataResp = await fetch(nodeDataUrl, {
      headers: { "X-Figma-Token": token },
    });
  } catch (err) {
    console.error("Ошибка сети при запросе к Figma:", (err as Error).message);
    process.exit(3);
  }

  if (!nodeDataResp.ok) {
    const text = await nodeDataResp.text();
    console.error(`❌ Ошибка API: ${nodeDataResp.status} — ${text}`);
    process.exit(3);
  }

  const nodeData = await nodeDataResp.json();

  let rootNode = nodeData.nodes?.[nodeId]?.document;

  if (!rootNode && !nodeId.includes(":")) {
    const colonId = nodeId.replace(/-/g, ":");
    console.log(`⚠️ Узел '${nodeId}' не найден, пробуем с ':' → '${colonId}'`);
    rootNode = nodeData.nodes?.[colonId]?.document;

    if (rootNode) {
      nodeId = colonId;
      console.log(`✅ Найден узел по ID: ${colonId}`);
    }
  }

  if (!rootNode) {
    console.error(`❌ Узел '${nodeId}' не найден.`);
    console.error("Доступные ID в ответе:", Object.keys(nodeData.nodes || {}));
    process.exit(3);
  }

  // Собираем ТОЛЬКО иконки
  const iconsToExport: Array<{
    id: string;
    name: string;
    width: number;
    height: number;
  }> = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  function traverse(node: any, isRoot = false) {
    if (!node || typeof node !== "object") return;

    const type = node.type ?? "";
    const name = node.name ?? `icon-${node.id}`;
    const id = node.id ?? "";

    // 🔥 КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: СТРОГАЯ ФИЛЬТРАЦИЯ
    // Иконка должна быть компонентом ИЛИ вектором с правильными размерами
    if (["COMPONENT", "VECTOR"].includes(type)) {
      const bbox = node.absoluteBoundingBox;
      if (
        !bbox ||
        typeof bbox.width !== "number" ||
        typeof bbox.height !== "number"
      ) {
        return;
      }

      const width = Math.round(bbox.width);
      const height = Math.round(bbox.height);

      // 🔥 ФИЛЬТР ПО РАЗМЕРАМ (настраивается через --minSize и --maxSize)
      if (
        width < args.minSize ||
        height < args.minSize ||
        width > args.maxSize ||
        height > args.maxSize
      ) {
        console.debug(
          `🟡 Пропускаем вне диапазона размеров [${width}x${height}]: ${name}`,
        );
        return;
      }

      // 🔥 ФИЛЬТР ПО СООТНОШЕНИЮ СТОРОН (иконки обычно квадратные)
      const aspectRatio = Math.abs(width / height - 1);
      if (aspectRatio > 0.2) {
        // Допускаем 20% отклонения
        console.debug(
          `🟡 Пропускаем из-за соотношения сторон [${width}x${height}]: ${name}`,
        );
        return;
      }

      iconsToExport.push({ id, name, width, height });
      return;
    }

    // Рекурсивно обходим детей только если это контейнеры
    if (
      ["FRAME", "GROUP", "COMPONENT_SET"].includes(type) &&
      Array.isArray(node.children)
    ) {
      for (const child of node.children) {
        traverse(child, false);
      }
    }
  }

  traverse(rootNode, true);

  if (iconsToExport.length === 0) {
    console.warn(
      "⚠️ Не найдено подходящих иконок для экспорта. Попробуйте изменить minSize/maxSize.",
    );
    console.log(
      `💡 Совет: используйте --minSize=16 --maxSize=48 для типичных иконок`,
    );
    process.exit(0);
  }

  const manifestPath = path.join(outDir, "icons-manifest.json");
  try {
    await fs.access(manifestPath);
  } catch {
    const defaultManifest = {
      version: "1.0.0",
      generatedAt: new Date().toISOString(),
      icons: [],
    };
    await fs.writeFile(
      manifestPath,
      JSON.stringify(defaultManifest, null, 2),
      "utf8",
    );
    console.log(`✅ Создан новый манифест: ${manifestPath}`);
  }

  const manifest = await loadManifest(outDir);
  const manifestIcons = manifest.icons;

  const currentIcons: IconManifestEntry[] = [];

  console.log(
    `✅ Найдено ${iconsToExport.length} иконок для экспорта (размеры ${args.minSize}x${args.minSize}–${args.maxSize}x${args.maxSize} px).`,
  );

  const manifestIconsMap = new Map(
    manifestIcons.map((icon) => [icon.id, icon]),
  );

  const BATCH_SIZE = 10;

  for (let i = 0; i < iconsToExport.length; i += BATCH_SIZE) {
    const batch = iconsToExport.slice(i, i + BATCH_SIZE);
    const idsParam = batch.map((n) => n.id).join(",");

    const imagesUrl = `https://api.figma.com/v1/images/${encodeURIComponent(fileKey)}?ids=${idsParam}&format=svg${args.useAbsoluteBounds ? "&use_absolute_bounds=true" : ""}`;

    let resp;
    try {
      resp = await fetch(imagesUrl, {
        headers: { "X-Figma-Token": token },
      });
    } catch (err) {
      console.error(
        "❌ Ошибка при получении URL изображений:",
        (err as Error).message,
      );
      continue;
    }

    if (!resp.ok) {
      console.error(
        "❌ Ошибка Figma Images API:",
        resp.status,
        await resp.text(),
      );
      continue;
    }

    const json = await resp.json();
    const imageUrls = json.images ?? {};

    // Обрабатываем каждый узел
    for (const icon of batch) {
      const svgUrl = imageUrls[icon.id];
      if (!svgUrl) {
        console.warn(
          `❌ Не удалось получить URL для ${icon.id} (${icon.name})`,
        );
        continue;
      }

      // Проверяем, изменилась ли иконка по сравнению с манифестом
      const existingIcon = manifestIconsMap.get(icon.id);
      // Всегда скачиваем файлы с Figma для проверки содержимого
      // Позже решим, сохранять ли их на диск

      try {
        const svgResp = await fetch(svgUrl);
        if (!svgResp.ok) throw new Error(`HTTP ${svgResp.status}`);
        let svgText = await svgResp.text();

        // Удаляем BOM
        if (svgText.charCodeAt(0) === 0xfeff) {
          svgText = svgText.slice(1);
        }

        // SVGO
        if (args.svgo && svgoAvailable && optimizeFn) {
          try {
            const result = await optimizeFn(svgText, svgoOptions);
            if (result?.data) svgText = result.data;
          } catch (err) {
            console.warn(
              `⚠️ SVGO ошибка для ${icon.name}:`,
              (err as Error).message,
            );
          }
        }
        // Замена цвета fill="#..." на fill="currentColor"
        svgText = svgText.replace(
          /fill="(#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}))"/g,
          'fill="currentColor"',
        );

        const size = nearestStandardSize(icon.width);
        const baseName = safeName(icon.name, args.keepOriginalNameSpaces);
        const cleanedName = baseName
          .replace(
            /^(s|l|small|large|mini|huge|m|xl|xs|xxs|xxl|3xl|4xl|5xl)[_-]/i,
            "",
          )
          .trim();
        // Удаление префиксов s и l из середины или конца имени
        let finalName = cleanedName
          .replace(/[-_]s(?=[-_]|$)/gi, "-")
          .replace(/[-_]l(?=[-_]|$)/gi, "-");
        // Нормализация имени после удаления префиксов
        finalName = safeName(finalName, args.keepOriginalNameSpaces) || "icon";

        // Автоматическое добавление суффикса размера только если он не в имени
        // Проверяем, есть ли в конце имени суффикс в формате -16px.svg
        const hasSizeSuffix = /-\d+px\.svg$/.test(finalName + ".svg");
        const fileName = hasSizeSuffix
          ? `${finalName}.svg`
          : `${finalName}-${size}px.svg`;

        const filePath = path.join(outDir, fileName);

        // Проверяем, изменился ли файл по сравнению с манифестом
        let shouldSave = true;
        if (existingIcon) {
          // Вычисляем хэш нового содержимого
          const newHash = crypto
            .createHash("sha256")
            .update(svgText)
            .digest("hex");

          // Если хэши совпадают и имя файла не изменилось, не сохраняем файл повторно
          if (
            existingIcon.hash === newHash &&
            existingIcon.fileName === fileName
          ) {
            shouldSave = false;
            // Добавляем существующую иконку в currentIcons
            currentIcons.push(existingIcon);
            console.log(
              `⏭ Пропущена (нет изменений): ${fileName} (${icon.width}x${icon.height}px)`,
            );
          } else {
            // Если хэши не совпадают или имя файла изменилось, сохраняем файл
            // Если имя файла изменилось, удаляем старый файл
            if (existingIcon.fileName !== fileName) {
              const oldFilePath = path.join(outDir, existingIcon.fileName);
              try {
                await fs.access(oldFilePath);
                await fs.unlink(oldFilePath);
                console.log(`🗑 Удалён старый файл: ${existingIcon.fileName}`);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
              } catch (err) {
                // Файл уже удален или не существует
              }
            }
            console.log(
              `🔄 Обновлена иконка: ${fileName} (${icon.width}x${icon.height}px)`,
            );
          }
        }

        if (!shouldSave) {
          continue;
        }

        await fs.writeFile(filePath, svgText, "utf8");
        console.log(
          `✅ Сохранён: ${fileName} (${icon.width}x${icon.height}px)${args.svgo ? " (оптимизирован)" : ""}`,
        );

        // Вычисляем хэш файла из svgText (не из файла на диске)
        const fileHash = crypto
          .createHash("sha256")
          .update(svgText)
          .digest("hex");

        // Добавляем иконку в массив для манифеста
        currentIcons.push(
          createManifestEntry(
            icon.id,
            icon.name,
            fileName,
            icon.width,
            icon.height,
            fileHash,
          ),
        );
      } catch (err) {
        console.error(
          `❌ Ошибка при обработке ${icon.id} (${icon.name}):`,
          (err as Error).message,
        );
      }
    }
  }

  // Анализируем изменения
  const newIcons = findNewIcons(currentIcons, manifestIcons);
  const deletedIcons = findDeletedIcons(currentIcons, manifestIcons);
  const updatedIcons = findUpdatedIcons(currentIcons, manifestIcons);

  // Выводим информацию о изменениях
  if (newIcons.length > 0) {
    console.log(`✨ Новых иконок: ${newIcons.length}`);
    newIcons.forEach((icon) =>
      console.log(`  + ${icon.name} (${icon.fileName})`),
    );
  }

  if (deletedIcons.length > 0) {
    console.log(`🗑 Удаленных иконок: ${deletedIcons.length}`);
    deletedIcons.forEach((icon) =>
      console.log(`  - ${icon.name} (${icon.fileName})`),
    );
  }

  if (updatedIcons.length > 0) {
    console.log(`🔄 Обновленных иконок: ${updatedIcons.length}`);
    updatedIcons.forEach((icon) =>
      console.log(`  ~ ${icon.name} (${icon.fileName})`),
    );
  }

  if (
    newIcons.length === 0 &&
    deletedIcons.length === 0 &&
    updatedIcons.length === 0
  ) {
    console.log("🔁 Нет изменений в иконках.");
  }

  // Обновляем и сохраняем манифест
  manifest.icons = currentIcons;
  await saveManifest(outDir, manifest);
  console.log("💾 Манифест обновлён.");

  console.log("🎉 Экспорт завершён.");
}

main().catch((err) => {
  console.error("🚨 Критическая ошибка:", err);
  process.exit(99);
});
