import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // Основная точка входа
  splitting: false, // Отключаем для библиотек, лучше для tree-shaking
  sourcemap: false, // Можно отключить для production
  clean: true,
  dts: true,
  format: ["esm", "cjs"], // ESM первым для лучшего tree-shaking
  minify: true,
  bundle: true,
  outDir: "dist",
  external: ["react", "react-dom"],
  noExternal: [], // Убедитесь, что нет лишних зависимостей
  target: "es2020", // Современный таргет для меньшего размера
  treeshake: true, // Агрессивное tree-shaking
  skipNodeModulesBundle: true, // Не бандлить node_modules
  esbuildOptions(options) {
    // Дополнительные оптимизации
    options.drop = ["console", "debugger"];
    options.minifyWhitespace = true;
    options.minifyIdentifiers = true;
    options.minifySyntax = true;
  },
});
