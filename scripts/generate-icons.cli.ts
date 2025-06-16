#!/usr/bin/env tsx

import { Command } from "commander";
import { generateIcons, Options } from "./generate-icons";

const program = new Command();

program
  .name("generate-icons")
  .description("Generate React components from SVG files")
  .argument("<inputDir>", "Directory with .svg files")
  .option("--out-dir <path>", "Output directory", "./components")
  .option(
    "--case <type>",
    "Naming style: pascal | camel | kebab | snake",
    "pascal",
  )
  .option("--size <value>", "Icon size (number or string)", "24")
  .option("--typescript", "Use .tsx instead of .jsx", false)
  .option("--memo", "Wrap components in React.memo", false)
  .option("--ref", "Forward refs with React.forwardRef", false)
  .option("--dry-run", "Print output but don’t write files", false)
  .option("--verbose", "Print additional debug info", false)
  .parse();

const args = program.opts();
const inputDir = program.args[0];

if (!inputDir) {
  console.error("❌ Input directory is required");
  process.exit(1);
}

const options: Options = {
  outDir: args.outDir,
  filenameCase: args.case,
  iconSize: args.size,
  typescript: args.typescript,
  memo: args.memo,
  ref: args.ref,
  dryRun: args.dryRun,
  verbose: args.verbose,
};

generateIcons(inputDir, options)
  .then(() => {
    if (!options.dryRun) console.log("✨ All icons generated.");
  })
  .catch((err) => {
    console.error("❌ Generation failed:", err);
    process.exit(1);
  });
