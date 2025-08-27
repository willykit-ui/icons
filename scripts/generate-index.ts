import { readdirSync, writeFileSync } from "fs";
import { join } from "path";

const srcDir = join(process.cwd(), "src");
const files = readdirSync(srcDir);

const iconFiles = files
  .filter(
    (file) =>
      file.endsWith(".tsx") &&
      !file.startsWith("index.") &&
      file !== "types.tsx",
  )
  .sort();

const exports = iconFiles.map((file) => {
  const name = file.replace(".tsx", "");
  return `export { default as ${name} } from "./${name}";`;
});

const indexContent = `
export type { IconProps } from "./types";

${exports.join("\n")}
`;

writeFileSync(join(srcDir, "index.ts"), indexContent, "utf-8");

console.log(`✓ Generated index.ts with ${iconFiles.length} icons`);
