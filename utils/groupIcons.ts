import fs from "fs";
import path from "path";

export interface IconManifestItem {
  fileName: string;
  width: number;
  height: number;
  baseName: string;
  size: "small" | "medium" | "large";
}

export interface IconManifest {
  icons: IconManifestItem[];
  metadata: {
    version: string;
    generatedAt: string;
    totalIcons: number;
  };
}

export interface GroupedIcon {
  baseName: string;
  sizes: Record<string, IconManifestItem>;
}

/**
 * Извлекает базовое имя иконки из имени файла
 * Примеры:
 * "arrow-left-16.svg" -> "arrow-left"
 * "home_24.svg" -> "home"
 * "user-small.svg" -> "user"
 */
export function extractBaseName(fileName: string): string {
  const nameWithoutExt = path.basename(fileName, path.extname(fileName));

  return nameWithoutExt
    .replace(
      /[-_](small|medium|large|sm|md|lg|s|m|l|12px|16px|20px|12|16|20|24|32)$/i,
      "",
    )
    .replace(/[-_]\d+$/, "")
    .replace(/[-_](12|16|20|24|32)$/, "");
}

/**
 * Определяет размер иконки на основе имени файла и размеров
 */
export function determineIconSize(
  fileName: string,
  width: number,
): "small" | "medium" | "large" {
  const lowerFileName = fileName.toLowerCase();

  if (lowerFileName.includes("small") || lowerFileName.includes("sm")) {
    return "small";
  }
  if (lowerFileName.includes("large") || lowerFileName.includes("lg")) {
    return "large";
  }
  if (lowerFileName.includes("medium") || lowerFileName.includes("md")) {
    return "medium";
  }

  if (width <= 12) return "small";
  if (width <= 16) return "medium";
  if (width <= 20) return "large";

  return "large";
}

/**
 * Читает манифест иконок и группирует их по базовому имени
 */
export function groupIconsByBaseName(manifestPath: string): GroupedIcon[] {
  try {
    const manifestContent = fs.readFileSync(manifestPath, "utf-8");
    const manifest: IconManifest = JSON.parse(manifestContent);

    const grouped = new Map<string, GroupedIcon>();

    for (const icon of manifest.icons) {
      const baseName = extractBaseName(icon.fileName);
      const size = determineIconSize(icon.fileName, icon.width);

      if (!grouped.has(baseName)) {
        grouped.set(baseName, {
          baseName,
          sizes: {},
        });
      }

      const group = grouped.get(baseName)!;

      // Добавляем иконку в соответствующий размер
      // Если размер уже существует, выбираем лучший (приоритет по качеству)
      const currentIcon = group.sizes[size];
      if (!currentIcon || icon.width > currentIcon.width) {
        group.sizes[size] = {
          ...icon,
          baseName,
          size,
        };
      }

      // Также добавляем по числовому ключу для обратной совместимости
      group.sizes[icon.width.toString()] = {
        ...icon,
        baseName,
        size,
      };
    }

    return Array.from(grouped.values()).sort((a, b) =>
      a.baseName.localeCompare(b.baseName),
    );
  } catch {
    // В случае ошибки чтения файла или парсинга JSON возвращаем пустой массив
    // Не логируем ошибку, чтобы не засорять консоль в тестах и при нормальной работе
    return [];
  }
}

/**
 * Создает манифест иконок из директории с SVG файлами
 */
export async function createIconManifest(
  iconsDir: string,
  outputPath?: string,
): Promise<IconManifest> {
  const files = fs.readdirSync(iconsDir);
  const svgFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === ".svg",
  );

  const icons: IconManifestItem[] = [];

  for (const file of svgFiles) {
    const filePath = path.join(iconsDir, file);
    const content = fs.readFileSync(filePath, "utf-8");

    // Извлекаем размеры из SVG
    const viewBoxMatch = content.match(/viewBox=["']([^"']*)["']/);
    const widthMatch = content.match(/width=["']([^"']*)["']/);
    const heightMatch = content.match(/height=["']([^"']*)["']/);

    let width = 16,
      height = 16;

    if (viewBoxMatch) {
      const viewBoxValues = viewBoxMatch[1].split(/\s+/).map(Number);
      if (viewBoxValues.length >= 4) {
        width = viewBoxValues[2] - viewBoxValues[0];
        height = viewBoxValues[3] - viewBoxValues[1];
      }
    } else if (widthMatch && heightMatch) {
      width = parseInt(widthMatch[1]) || 16;
      height = parseInt(heightMatch[1]) || 16;
    }

    const baseName = extractBaseName(file);
    const size = determineIconSize(file, width);

    icons.push({
      fileName: file,
      width,
      height,
      baseName,
      size,
    });
  }

  const manifest: IconManifest = {
    icons: icons.sort((a, b) => a.fileName.localeCompare(b.fileName)),
    metadata: {
      version: "1.0.0",
      generatedAt: new Date().toISOString(),
      totalIcons: icons.length,
    },
  };

  if (outputPath) {
    fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
    console.log(`✅ Created manifest: ${outputPath}`);
  }

  return manifest;
}

/**
 * Валидирует манифест иконок
 */
export function validateIconManifest(manifest: IconManifest): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!manifest.icons || !Array.isArray(manifest.icons)) {
    errors.push("Manifest must contain an 'icons' array");
    return { isValid: false, errors, warnings };
  }

  const baseNames = new Set<string>();
  const duplicateFiles = new Set<string>();
  const fileNames = new Set<string>();

  for (const icon of manifest.icons) {
    if (!icon.fileName) {
      errors.push("Icon missing fileName");
      continue;
    }

    if (typeof icon.width !== "number" || icon.width <= 0) {
      errors.push(`Invalid width for ${icon.fileName}`);
    }

    if (typeof icon.height !== "number" || icon.height <= 0) {
      errors.push(`Invalid height for ${icon.fileName}`);
    }

    // Проверяем дубликаты файлов
    if (fileNames.has(icon.fileName)) {
      duplicateFiles.add(icon.fileName);
    }
    fileNames.add(icon.fileName);

    baseNames.add(icon.baseName || extractBaseName(icon.fileName));
  }

  if (duplicateFiles.size > 0) {
    errors.push(
      `Duplicate files found: ${Array.from(duplicateFiles).join(", ")}`,
    );
  }

  if (manifest.icons.length === 0) {
    warnings.push("No icons found in manifest");
  }

  const grouped = new Map<string, GroupedIcon>();

  for (const icon of manifest.icons) {
    const baseName = icon.baseName || extractBaseName(icon.fileName);
    const size = determineIconSize(icon.fileName, icon.width);

    if (!grouped.has(baseName)) {
      grouped.set(baseName, {
        baseName,
        sizes: {},
      });
    }

    const group = grouped.get(baseName)!;

    // Добавляем иконку в соответствующий размер
    // Если размер уже существует, выбираем лучший (приоритет по качеству)
    const currentIcon = group.sizes[size];
    if (!currentIcon || icon.width > currentIcon.width) {
      group.sizes[size] = {
        ...icon,
        baseName,
        size,
      };
    }

    // Также добавляем по числовому ключу для обратной совместимости
    group.sizes[icon.width.toString()] = {
      ...icon,
      baseName,
      size,
    };
  }

  for (const group of grouped.values()) {
    const availableSizes = Object.keys(group.sizes).filter((key) =>
      ["small", "medium", "large"].includes(key),
    );

    if (availableSizes.length === 1) {
      warnings.push(
        `Icon '${group.baseName}' has only one size: ${availableSizes[0]}`,
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Извлекает базовое имя иконки из имени файла
 * @deprecated Use extractBaseName instead
 */
export function getBaseIconName(fileName: string): string {
  return extractBaseName(fileName);
}
