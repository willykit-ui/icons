#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import { generateIcons, Options, FilenameCase } from "./generate-icons.js";
import { createIconManifest } from "../utils/groupIcons.js";

const program = new Command();

program
  .name("icon-generator")
  .description(
    "Generate React components from SVG icons with multi-size support",
  )
  .version("1.0.0");

// Основная команда генерации
program
  .command("generate")
  .alias("gen")
  .description("Generate React components from SVG icons")
  .argument("<input-dir>", "Directory containing SVG icons")
  .option("-o, --out-dir <dir>", "Output directory", "./generated")
  .option(
    "-c, --filename-case <case>",
    "Component filename case: pascal|camel|kebab|snake",
    "pascal",
  )
  .option("--icon-size <size>", "Default icon size", "16")
  .option("--typescript", "Generate TypeScript files", false)
  .option("--memo", "Wrap components with React.memo", false)
  .option("--ref", "Add forwardRef support", true)
  .option(
    "--dry-run",
    "Show what would be generated without writing files",
    false,
  )
  .option("--verbose", "Show detailed processing information", false)
  .action(async (inputDir: string, options) => {
    try {
      const resolvedInputDir = path.resolve(inputDir);
      const resolvedOutputDir = path.resolve(options.outDir);

      const generatorOptions: Options = {
        outDir: resolvedOutputDir,
        filenameCase: options.filenameCase as FilenameCase,
        iconSize: options.iconSize,
        typescript: options.typescript,
        memo: options.memo,
        ref: options.ref,
        dryRun: options.dryRun,
        verbose: options.verbose,
      };

      console.log("🚀 Starting icon generation...");
      console.log(`📁 Input directory: ${resolvedInputDir}`);
      console.log(`📁 Output directory: ${resolvedOutputDir}`);
      console.log(
        `📝 Language: ${options.typescript ? "TypeScript" : "JavaScript"}`,
      );
      console.log("");

      await generateIcons(resolvedInputDir, generatorOptions);

      console.log("\n🎉 Icon generation completed!");
    } catch (error) {
      console.error("❌ Error during generation:", error);
      process.exit(1);
    }
  });

// Команда создания манифеста
program
  .command("manifest")
  .description("Create or update icons manifest from SVG directory")
  .argument("<input-dir>", "Directory containing SVG icons")
  .option(
    "-o, --output <file>",
    "Output manifest file",
    "./icons-manifest.json",
  )
  .option("--verbose", "Show detailed processing information", false)
  .action(async (inputDir: string, options) => {
    try {
      const resolvedInputDir = path.resolve(inputDir);
      const resolvedOutputPath = path.resolve(options.output);

      console.log("📋 Creating icons manifest...");
      console.log(`📁 Input directory: ${resolvedInputDir}`);
      console.log(`📄 Output file: ${resolvedOutputPath}`);
      console.log("");

      const manifest = await createIconManifest(
        resolvedInputDir,
        resolvedOutputPath,
      );

      console.log(`\n✅ Manifest created with ${manifest.icons.length} icons`);
      console.log(
        `📊 Found icons with ${new Set(manifest.icons.map((i) => i.baseName)).size} unique base names`,
      );
    } catch (error) {
      console.error("❌ Error creating manifest:", error);
      process.exit(1);
    }
  });

// Команда валидации манифеста
program
  .command("validate")
  .description("Validate an existing icons manifest")
  .argument("<manifest-file>", "Path to manifest file")
  .action(async (manifestFile: string) => {
    try {
      const resolvedPath = path.resolve(manifestFile);
      const { validateIconManifest } = await import("../utils/groupIcons.js");

      const fs = await import("fs");
      const manifestContent = fs.readFileSync(resolvedPath, "utf-8");
      const manifest = JSON.parse(manifestContent);

      console.log("🔍 Validating manifest...");
      console.log(`📄 File: ${resolvedPath}`);
      console.log("");

      const validation = validateIconManifest(manifest);

      if (validation.isValid) {
        console.log("✅ Manifest is valid!");
      } else {
        console.log("❌ Manifest validation failed:");
        validation.errors.forEach((error) => console.log(`   - ${error}`));
      }

      if (validation.warnings.length > 0) {
        console.log("\n⚠️  Warnings:");
        validation.warnings.forEach((warning) =>
          console.log(`   - ${warning}`),
        );
      }

      console.log(`\n📊 Total icons: ${manifest.icons?.length || 0}`);

      if (!validation.isValid) {
        process.exit(1);
      }
    } catch (error) {
      console.error("❌ Error validating manifest:", error);
      process.exit(1);
    }
  });

// Команда для создания примера конфигурации
program
  .command("init")
  .description("Initialize project with example configuration")
  .option("--typescript", "Create TypeScript configuration", true)
  .action(async (options) => {
    try {
      const fs = await import("fs/promises");

      // Создаем пример структуры директорий
      await fs.mkdir("icons", { recursive: true });
      await fs.mkdir("src/components/icons", { recursive: true });

      // Создаем пример конфига
      const configContent = `{
  "inputDir": "./icons",
  "outputDir": "./src/icons",
  "typescript": ${options.typescript},
  "memo": true,
  "ref": true,
  "filenameCase": "pascal"
}`;

      await fs.writeFile("icon-generator.config.json", configContent);

      // Создаем README
      const readmeContent = `# Icons

Place your SVG files in this directory following these naming conventions:

- For single size icons: \`icon-name.svg\`
- For multi-size icons: 
  - \`icon-name-small.svg\` or \`icon-name-12.svg\`
  - \`icon-name-medium.svg\` or \`icon-name-16.svg\`
  - \`icon-name-large.svg\` or \`icon-name-20.svg\`

## Usage

1. Add your SVG files to this directory
2. Run: \`npx icon-generator manifest ./icons\`
3. Run: \`npx icon-generator generate ./icons -o ./src/components/icons --typescript\`

## Size Guidelines

- **Small**: 12px - for compact UIs, buttons
- **Medium**: 16px - default size, most common use
- **Large**: 20px - for prominent elements, headers
`;

      await fs.writeFile("icons/README.md", readmeContent);

      console.log("✅ Project initialized!");
      console.log("📁 Created directories: icons/, src/components/icons/");
      console.log(
        "📄 Created files: icon-generator.config.json, icons/README.md",
      );
      console.log("\nNext steps:");
      console.log("1. Add your SVG files to the icons/ directory");
      console.log("2. Run: npx icon-generator manifest ./icons");
      console.log("3. Run: npx icon-generator generate ./icons");
    } catch (error) {
      console.error("❌ Error initializing project:", error);
      process.exit(1);
    }
  });

// Обработка ошибок
program.on("command:*", () => {
  console.error(
    "❌ Invalid command: %s\nSee --help for a list of available commands.",
    program.args.join(" "),
  );
  process.exit(1);
});

if (process.argv.length === 2) {
  program.help();
}

program.parse();
