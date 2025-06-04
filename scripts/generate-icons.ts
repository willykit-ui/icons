import fs from "fs/promises";
import path from "path";
import { optimize } from "svgo";
import { toComponentName } from "../src/utils/case";
// import { parseIconSize } from "../src/utils/size";
import { buildComponentCode } from "../src/utils/transform";

type Options = {
  outDir: string;
  filenameCase: "pascal" | "camel" | "kebab" | "snake";
  iconSize: string | number;
  typescript: boolean;
  memo: boolean;
  ref: boolean;
};

export async function generateIcons(inputDir: string, options: Options) {
  const files = await fs.readdir(inputDir);
  const svgFiles = files.filter((f) => f.endsWith(".svg"));

  await fs.mkdir(options.outDir, { recursive: true });

  for (const file of svgFiles) {
    const svgPath = path.join(inputDir, file);
    const rawSvg = await fs.readFile(svgPath, "utf-8");
    const optimized = optimize(rawSvg, { multipass: true });

    const baseName = path.basename(file, ".svg");
    const componentName = toComponentName(baseName, options.filenameCase);
    const ext = options.typescript ? "tsx" : "jsx";
    const outPath = path.join(options.outDir, `${componentName}.${ext}`);

    const code = buildComponentCode({
      svg: optimized.data,
      componentName,
      typescript: options.typescript,
      memo: options.memo,
      ref: options.ref,
      iconSize: options.iconSize,
    });

    await fs.writeFile(outPath, code, "utf-8");
  }
}
