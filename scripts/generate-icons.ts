import fs from "fs/promises";
import path from "path";
import { optimize } from "svgo";
import { toComponentName } from "../src/utils/case";
import { buildComponentCode } from "../src/utils/transform";

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
}

export async function generateIcons(inputDir: string, options: Options) {
  const files = await fs.readdir(inputDir);
  const svgFiles = files.filter((f) => f.endsWith(".svg"));

  if (svgFiles.length === 0) {
    console.warn("⚠️  No SVG files found in:", inputDir);
    return;
  }

  if (!options.dryRun) {
    await fs.mkdir(options.outDir, { recursive: true });
  }

  for (const file of svgFiles) {
    const svgPath = path.join(inputDir, file);
    const rawSvg = await fs.readFile(svgPath, "utf-8");
    const optimized = optimize(rawSvg, { multipass: true });

    if (!("data" in optimized)) {
      console.error(`❌ Failed to optimize: ${file}`);
      continue;
    }

    const baseName = path.basename(file, ".svg");
    const componentName = `${toComponentName(baseName, options.filenameCase)}Icon`;
    const ext = options.typescript ? "tsx" : "jsx";
    const outPath = path.join(options.outDir, `${componentName}.${ext}`);

    const code = await buildComponentCode({
      svg: optimized.data,
      componentName,
      typescript: options.typescript,
      memo: options.memo,
      ref: options.ref,
      iconSize: options.iconSize,
    });

    if (options.dryRun) {
      console.log(`📝 Dry-run: Would generate ${componentName}.${ext}`);
    } else {
      await fs.writeFile(outPath, code, "utf-8");
      console.log(`✅ Generated: ${componentName}.${ext}`);
    }

    if (options.verbose) {
      console.log(`ℹ️  Source file: ${svgPath}`);
    }
  }
}
