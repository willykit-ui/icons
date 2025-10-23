import { defineConfig } from "tsup";
import { readdirSync } from "fs";
import { join } from "path";

// Получаем все .tsx файлы из src/
const srcDir = join(__dirname, "src");
const files = readdirSync(srcDir);
const iconFiles = files.filter(
  (file) => file.endsWith(".tsx") && file !== "index.tsx",
);

// Создаём entry для каждой иконки + index
const entry = iconFiles.reduce(
  (acc, file) => {
    const name = file.replace(".tsx", "");
    acc[name] = `src/${file}`;
    return acc;
  },
  { index: "src/index.ts" } as Record<string, string>,
);

export default defineConfig({
  entry,
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  minify: true,
  external: ["react"],
  treeshake: true,
  splitting: true,
  sourcemap: false,
  outDir: "dist",
  target: "es2020",
  bundle: false, // Важно! Не бандлим, чтобы сохранить структуру файлов
});
