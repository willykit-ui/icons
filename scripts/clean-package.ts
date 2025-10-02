import fs from "fs";
import path from "path";

interface PackageJson {
  name: string;
  version: string;
  private: boolean;
  main: string;
  module: string;
  types: string;
  type: string;
  sideEffects: boolean;
  files: string[];
  exports: {
    ".": {
      import: {
        types: string;
        default: string;
      };
      require: {
        types: string;
        default: string;
      };
    };
    "./package.json": string;
  };
  // scripts: {
  //   prepare: string;
  //   [key: string]: string;
  // };
  author: string;
  license: string;
  description: string;
  keywords: string[];
  engines?: {
    [key: string]: string;
  };
  publishConfig: {
    access: string;
    directory: string;
  };
  dependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
  peerDependenciesMeta: Record<string, { optional: boolean }>;
}

const packageJson = JSON.parse(
  fs.readFileSync("./package.json", "utf8"),
) as PackageJson;

// Fields to keep
const cleanPackage: Partial<PackageJson> = {
  name: packageJson.name,
  version: packageJson.version,
  private: packageJson.private,
  main: packageJson.main,
  module: packageJson.module,
  types: packageJson.types,
  type: packageJson.type,
  sideEffects: packageJson.sideEffects,
  files: packageJson.files,
  exports: {
    ".": {
      import: {
        types: "./dist/index.d.ts",
        default: "./dist/index.js",
      },
      require: {
        types: "./dist/index.d.cts",
        default: "./dist/index.cjs",
      },
    },
    "./package.json": "./package.json",
  },
  // scripts: {
  // prepare: packageJson.scripts.prepare,
  // },
  author: packageJson.author,
  license: packageJson.license,
  description: packageJson.description,
  keywords: packageJson.keywords,
  engines: packageJson.engines,
  publishConfig: packageJson.publishConfig,
  // dependencies: packageJson.dependencies,
  peerDependencies: packageJson.peerDependencies,
  peerDependenciesMeta: packageJson.peerDependenciesMeta,
};

// Write cleaned package.json
fs.writeFileSync(
  path.join(process.cwd(), "package.json"),
  JSON.stringify(cleanPackage, null, 2),
);

console.log("✅ Package.json cleaned successfully");
