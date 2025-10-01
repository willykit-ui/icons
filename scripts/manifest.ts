import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export interface IconManifestEntry {
  id: string;
  name: string;
  fileName: string;
  width: number;
  height: number;
  lastModified: string;
  hash: string;
}

export interface IconManifest {
  version: string;
  generatedAt: string;
  icons: IconManifestEntry[];
}

const MANIFEST_FILE = "icons-manifest.json";

export async function calculateFileHash(filePath: string): Promise<string> {
  try {
    const data = await fs.readFile(filePath);
    return crypto.createHash("sha256").update(data).digest("hex");
  } catch {
    return "";
  }
}

export async function loadManifest(outDir: string): Promise<IconManifest> {
  const manifestPath = path.join(outDir, MANIFEST_FILE);
  try {
    const data = await fs.readFile(manifestPath, "utf8");
    return JSON.parse(data);
  } catch {
    return {
      version: "1.0.0",
      generatedAt: new Date().toISOString(),
      icons: [],
    };
  }
}

export async function saveManifest(
  outDir: string,
  manifest: IconManifest,
): Promise<void> {
  const manifestPath = path.join(outDir, MANIFEST_FILE);
  manifest.generatedAt = new Date().toISOString();
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
}

export function findNewIcons(
  currentIcons: IconManifestEntry[],
  manifestIcons: IconManifestEntry[],
): IconManifestEntry[] {
  return currentIcons.filter(
    (currentIcon) =>
      !manifestIcons.some((manifestIcon) => manifestIcon.id === currentIcon.id),
  );
}

export function findDeletedIcons(
  currentIcons: IconManifestEntry[],
  manifestIcons: IconManifestEntry[],
): IconManifestEntry[] {
  return manifestIcons.filter(
    (manifestIcon) =>
      !currentIcons.some((currentIcon) => currentIcon.id === manifestIcon.id),
  );
}

export function findUpdatedIcons(
  currentIcons: IconManifestEntry[],
  manifestIcons: IconManifestEntry[],
): IconManifestEntry[] {
  return currentIcons.filter((currentIcon) => {
    const manifestIcon = manifestIcons.find(
      (icon) => icon.id === currentIcon.id,
    );
    if (!manifestIcon) return false;

    return (
      manifestIcon.name !== currentIcon.name ||
      manifestIcon.width !== currentIcon.width ||
      manifestIcon.height !== currentIcon.height ||
      manifestIcon.fileName !== currentIcon.fileName ||
      manifestIcon.hash !== currentIcon.hash
    );
  });
}

export function createManifestEntry(
  id: string,
  name: string,
  fileName: string,
  width: number,
  height: number,
  hash: string = "",
): IconManifestEntry {
  return {
    id,
    name,
    fileName,
    width,
    height,
    lastModified: new Date().toISOString(),
    hash,
  };
}
