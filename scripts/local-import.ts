#!/usr/bin/env node

/**
 * Импортирует и обрабатывает SVG иконки из локальной директории.
 * Назначение: обходной путь для добавления/обновления иконок без доступа к API Figma.
 */

import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

import {
  loadManifest,
  saveManifest,
  createManifestEntry,
  // type IconManifest,
  type IconManifestEntry,
} from "./manifest.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const LOCAL_ICONS_DIR = path.join(ROOT_DIR, "tasks/downloads/IU-Kit");
const TARGET_ICONS_DIR = path.join(ROOT_DIR, "icons");

// Загрузка SVGO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let optimizeFn: any;
try {
  const svgoModule = await import("svgo");
  optimizeFn = svgoModule.optimize;
} catch (e) {
  console.warn(
    `SVGO не найден. Оптимизация SVG не будет производиться. Установите: npm install svgo ${e}`,
  );
}

function safeName(name: string): string {
  let n = name.trim();
  // Замена кириллических "двойников" на латиницу
  n = n.replace(/С/g, "C").replace(/с/g, "c");
  n = n.replace(/О/g, "O").replace(/о/g, "o");
  n = n.replace(/([a-z])([A-Z])/g, "$1-$2");
  n = n.replace(/[\s_]+/g, "-");
  // eslint-disable-next-line no-useless-escape
  n = n.replace(/[^a-zA-Z0-9\-]/g, "-");
  n = n.replace(/-+/g, "-");
  n = n.replace(/^-+|-+$/g, "");
  return n.toLowerCase() || "icon";
}

// Извлечение размеров из SVG
function getSvgDimensions(svgContent: string): {
  width: number;
  height: number;
} {
  const viewBoxMatch = svgContent.match(/viewBox="0 0 (\d+) (\d+)"/);
  if (viewBoxMatch) {
    return {
      width: parseInt(viewBoxMatch[1], 10),
      height: parseInt(viewBoxMatch[2], 10),
    };
  }

  const widthMatch = svgContent.match(/width="(\d+)"/);
  const heightMatch = svgContent.match(/height="(\d+)"/);
  if (widthMatch && heightMatch) {
    return {
      width: parseInt(widthMatch[1], 10),
      height: parseInt(heightMatch[1], 10),
    };
  }

  return { width: 24, height: 24 };
}

async function main() {
  console.log(`🔎 Поиск локальных SVG в: ${LOCAL_ICONS_DIR}`);

  let localFileNames: string[];
  try {
    localFileNames = (await fs.readdir(LOCAL_ICONS_DIR)).filter((f) =>
      f.endsWith(".svg"),
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.log(`🟡 Директория ${LOCAL_ICONS_DIR} не найдена, пропускаем.`);
      process.exit(0);
    }
    console.error(
      `❌ Ошибка чтения директории ${LOCAL_ICONS_DIR}:`,
      (error as Error).message,
    );
    process.exit(1);
  }
  console.log(`🚚 Найдено ${localFileNames.length} SVG файлов для обработки.`);

  const manifest = await loadManifest(TARGET_ICONS_DIR);
  const manifestIconsBySafeName = new Map<string, IconManifestEntry>();
  for (const icon of manifest.icons) {
    manifestIconsBySafeName.set(safeName(icon.name), icon);
  }

  const finalIcons: IconManifestEntry[] = [];
  const processedSafeNames = new Set<string>();
  const svgoOptions = { multipass: true };

  for (const fileName of localFileNames) {
    const basename = path.basename(fileName, ".svg");
    const safeBasename = safeName(basename);
    processedSafeNames.add(safeBasename);

    const filePath = path.join(LOCAL_ICONS_DIR, fileName);

    try {
      const fileStats = await fs.stat(filePath);
      let svgText = await fs.readFile(filePath, "utf8");

      const oldEntry = manifestIconsBySafeName.get(safeBasename);

      if (optimizeFn) {
        const result = await optimizeFn(svgText, svgoOptions);
        if (result?.data) svgText = result.data;
      }
      svgText = svgText.replace(/fill="[^"]+"/g, 'fill="currentColor"');
      const newHash = crypto.createHash("sha256").update(svgText).digest("hex");

      if (
        oldEntry &&
        oldEntry.hash === newHash &&
        !oldEntry.deprecated &&
        oldEntry.name === basename
      ) {
        finalIcons.push(oldEntry);
        continue;
      }

      const { width, height } = getSvgDimensions(svgText);
      const finalFileName = `${safeBasename}.svg`;

      const newEntry = createManifestEntry(
        oldEntry?.id ?? `local-${basename}`,
        basename,
        finalFileName,
        width,
        height,
        fileStats.mtime.toISOString(),
        newHash,
      );

      finalIcons.push(newEntry);

      await fs.mkdir(TARGET_ICONS_DIR, { recursive: true });
      await fs.writeFile(
        path.join(TARGET_ICONS_DIR, finalFileName),
        svgText,
        "utf8",
      );
      if (!oldEntry || oldEntry.hash !== newHash) {
        console.log(`✅ Сохранён: ${finalFileName}`);
      }
    } catch (err) {
      console.error(`- Ошибка обработки ${fileName}:`, (err as Error).message);
    }
  }

  for (const [safeNameKey, oldIcon] of manifestIconsBySafeName.entries()) {
    if (!processedSafeNames.has(safeNameKey)) {
      if (!oldIcon.deprecated) {
        console.log(`🟡 Помечена как устаревшая: ${oldIcon.name}`);
        finalIcons.push({ ...oldIcon, deprecated: true });
      } else {
        finalIcons.push(oldIcon);
      }
    }
  }

  manifest.icons = finalIcons.sort((a, b) => a.name.localeCompare(b.name));

  await saveManifest(TARGET_ICONS_DIR, manifest);
  console.log("💾 Манифест обновлён.");
  console.log("🎉 Локальный импорт завершён.");
}

main().catch((err) => {
  console.error("🚨 Критическая ошибка в скрипте локального импорта:", err);
  process.exit(99);
});
