import fs from "fs/promises";
import path from "path";
import { optimize, Config as SVGOConfig } from "svgo";
import { toComponentName } from "../utils/case";
import { buildComponentCode, extractSvgData } from "../utils/transform";
import { groupIconsByBaseName } from "../utils/groupIcons";

export type FilenameCase = "pascal" | "camel" | "kebab" | "snake";

export interface Options {
  outDir: string;
  filenameCase: FilenameCase;
  iconSize: string | number;
  typescript: boolean;
  memo: boolean;
  ref: boolean;
  dryRun: boolean;
  verbose: boolean;
  fontSize?: "small" | "medium" | "large" | number;
}

const svgoConfig: SVGOConfig = {
  multipass: true,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false,
          removeUselessStrokeAndFill: false,
        },
      },
    },
    "removeDimensions",
    "sortAttrs",
  ],
};

/**
 * Создает типы для TypeScript проекта
 */
async function generateTypesFile(outDir: string): Promise<void> {
  const typesContent = `import * as React from 'react';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  /**
   * Size of the icon. Can be a preset size or custom pixel value.
   * @default 'medium'
   */
  children?: never;
  fontSize?: 'small' | 'medium' | 'large' | number;
  
  /**
   * Color of the icon. Supports CSS colors, CSS variables, and 'currentColor'.
   * @default 'currentColor'
   */
  color?: string;
}
`;

  const typesPath = path.join(outDir, "types.tsx");
  await fs.writeFile(typesPath, typesContent, "utf-8");
  console.log("✅ Generated: types.tsx");
}

/**
 * Создает индексный файл со всеми экспортами
 */
async function generateIndexFile(
  outDir: string,
  componentNames: string[],
  typescript: boolean,
): Promise<void> {
  const indexContent = [
    "// Auto-generated icon components",
    "",
    ...componentNames.map(
      (name) => `export { default as ${name} } from './${name}';`,
    ),
    "",
  ].join("\n");

  const indexPath = path.join(outDir, `index.${typescript ? "tsx" : "js"}`);
  await fs.writeFile(indexPath, indexContent, "utf-8");
  console.log(`✅ Generated: index.${typescript ? "tsx" : "js"}`);
}

export async function generateIcons(inputDir: string, options: Options) {
  const manifestPath = path.join(inputDir, "icons-manifest.json");

  // Проверяем существование манифеста
  try {
    await fs.access(manifestPath);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    console.error(`❌ Manifest file not found: ${manifestPath}`);
    process.exit(1);
  }

  // Группируем иконки по базовому имени
  const groupedIcons = groupIconsByBaseName(manifestPath);

  if (groupedIcons.length === 0) {
    console.warn("⚠️  No icons found in manifest");
    return;
  }

  console.log(`📦 Found ${groupedIcons.length} icon groups to process`);

  if (!options.dryRun) {
    await fs.mkdir(options.outDir, { recursive: true });

    // Создаем файл типов для TypeScript
    if (options.typescript) {
      await generateTypesFile(options.outDir);
    }
  }

  const generatedComponents: string[] = [];
  const errors: string[] = [];

  for (const groupedIcon of groupedIcons) {
    try {
      const componentName = `${toComponentName(groupedIcon.baseName, options.filenameCase)}Icon`;
      const ext = options.typescript ? "tsx" : "jsx";
      const outPath = path.join(options.outDir, `${componentName}.${ext}`);

      const svgData: Record<
        "small" | "medium" | "large",
        { content: string; viewBox: string }
      > = {
        small: { content: "", viewBox: "0 0 12 12" },
        medium: { content: "", viewBox: "0 0 16 16" },
        large: { content: "", viewBox: "0 0 20 20" },
      };

      let hasValidSvg = false;

      for (const [sizeKey, iconData] of Object.entries(groupedIcon.sizes)) {
        if (!["small", "medium", "large"].includes(sizeKey)) continue;

        const svgPath = path.join(inputDir, iconData.fileName);

        try {
          const rawSvg = await fs.readFile(svgPath, "utf-8");

          // Оптимизируем SVG
          const optimized = optimize(rawSvg, svgoConfig);

          if ("data" in optimized) {
            const svgDataItem = extractSvgData(optimized.data);
            svgData[sizeKey as "small" | "medium" | "large"] = svgDataItem;
            hasValidSvg = true;

            if (options.verbose) {
              console.log(
                `✓ Processed ${sizeKey} size for ${groupedIcon.baseName}`,
              );
            }
          }
        } catch (error) {
          console.warn(
            `⚠️  Could not read or optimize ${iconData.fileName}: ${error}`,
          );
        }
      }

      if (!hasValidSvg) {
        errors.push(`No valid SVG data found for ${groupedIcon.baseName}`);
        continue;
      }

      const code = await buildComponentCode({
        svgData,
        componentName,
        typescript: options.typescript,
        memo: options.memo,
        ref: options.ref,
      });

      if (options.dryRun) {
        console.log(`📝 Dry-run: Would generate ${componentName}.${ext}`);
      } else {
        await fs.writeFile(outPath, code, "utf-8");
        console.log(`✅ Generated: ${componentName}.${ext}`);
      }

      generatedComponents.push(componentName);

      if (options.verbose) {
        console.log(
          `ℹ️  Generated component for icon: ${groupedIcon.baseName}`,
        );
      }
    } catch (error) {
      errors.push(
        `Failed to generate component for ${groupedIcon.baseName}: ${error}`,
      );
    }
  }

  if (!options.dryRun && generatedComponents.length > 0) {
    await generateIndexFile(
      options.outDir,
      generatedComponents,
      options.typescript,
    );
  }

  console.log("\n📊 Generation Summary:");
  console.log(
    `✅ Successfully generated: ${generatedComponents.length} components`,
  );

  if (errors.length > 0) {
    console.log(`❌ Errors: ${errors.length}`);
    errors.forEach((error) => console.log(`   - ${error}`));
  }

  if (options.dryRun) {
    console.log("🔍 This was a dry-run. No files were actually created.");
  }
}

export function printUsage() {
  console.log(`
Usage: icon-generator <input-dir> [options]

Options:
  --out-dir <dir>         Output directory (default: ./generated)
  --filename-case <case>  Component filename case: pascal|camel|kebab|snake (default: pascal)
  --typescript           Generate TypeScript files (default: false)
  --memo                 Wrap components with React.memo (default: false)
  --ref                  Add forwardRef support (default: true)
  --dry-run              Show what would be generated without writing files
  --verbose              Show detailed processing information

Examples:
  icon-generator ./icons --out-dir ./src/icons --typescript --memo
  icon-generator ./icons --dry-run --verbose
`);
}
