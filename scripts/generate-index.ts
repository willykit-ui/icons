import { readdirSync, writeFileSync } from "fs";
import { resolve, join, basename } from "path";

const iconsDir = resolve("src/components");
const indexPath = join(resolve(), "src/index.ts");

const files = readdirSync(iconsDir).filter((file) => file.endsWith(".tsx"));

const exportStatements = files
  .map((file) => {
    const componentName = basename(file, ".tsx");
    return `export { default as ${componentName} } from "./components/${componentName}";`;
  })
  .join("\n");

writeFileSync(indexPath, exportStatements);

console.log(`Generated index.ts with ${files.length} icon exports.`);
