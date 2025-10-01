import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs/promises";
import path from "path";
import {
  loadManifest,
  saveManifest,
  findNewIcons,
  findDeletedIcons,
  findUpdatedIcons,
  createManifestEntry,
  calculateFileHash,
} from "../manifest.js";

describe("Функции манифеста", () => {
  const testDir = path.join(process.cwd(), "test-temp");

  beforeEach(async () => {
    await fs.mkdir(testDir, { recursive: true });
  });

  afterEach(async () => {
    await fs.rm(testDir, { recursive: true, force: true });
  });

  describe("createManifestEntry", () => {
    it("должен создать запись манифеста с правильными свойствами", () => {
      const entry = createManifestEntry(
        "123",
        "test-icon",
        "test-icon.svg",
        24,
        24,
        "abc123",
      );

      expect(entry).toEqual({
        id: "123",
        name: "test-icon",
        fileName: "test-icon.svg",
        width: 24,
        height: 24,
        lastModified: expect.any(String),
        hash: "abc123",
      });
    });

    it("должен создать запись манифеста с пустым хэшем, если он не предоставлен", () => {
      const entry = createManifestEntry(
        "123",
        "test-icon",
        "test-icon.svg",
        24,
        24,
      );

      expect(entry.hash).toBe("");
    });

    it("должен создать валидную ISO дату в lastModified", () => {
      const entry = createManifestEntry(
        "123",
        "test-icon",
        "test-icon.svg",
        24,
        24,
      );

      expect(new Date(entry.lastModified).toISOString()).toBe(
        entry.lastModified,
      );
    });
  });

  describe("calculateFileHash", () => {
    it("должен корректно вычислять хэш файла", async () => {
      const testFile = path.join(testDir, "test-file.txt");
      const content = "Hello, world!";
      await fs.writeFile(testFile, content);

      const hash = await calculateFileHash(testFile);

      const expectedHash =
        "315f5bdb76d078c43b8ac0064e4a0164612b1fce77c869345bfc94c75894edd3";

      expect(hash).toBe(expectedHash);
    });

    it("должен вернуть пустой хэш для несуществующего файла", async () => {
      const hash = await calculateFileHash("/non-existent-file.txt");
      expect(hash).toBe("");
    });

    it("должен возвращать разные хэши для разных файлов", async () => {
      const testFile1 = path.join(testDir, "file1.txt");
      const testFile2 = path.join(testDir, "file2.txt");

      await fs.writeFile(testFile1, "content1");
      await fs.writeFile(testFile2, "content2");

      const hash1 = await calculateFileHash(testFile1);
      const hash2 = await calculateFileHash(testFile2);

      expect(hash1).not.toBe(hash2);
      expect(hash1).toHaveLength(64);
      expect(hash2).toHaveLength(64);
    });

    it("должен возвращать одинаковый хэш для одинакового содержимого", async () => {
      const testFile1 = path.join(testDir, "file1.txt");
      const testFile2 = path.join(testDir, "file2.txt");
      const content = "same content";

      await fs.writeFile(testFile1, content);
      await fs.writeFile(testFile2, content);

      const hash1 = await calculateFileHash(testFile1);
      const hash2 = await calculateFileHash(testFile2);

      expect(hash1).toBe(hash2);
    });
  });

  describe("loadManifest", () => {
    it("должен вернуть пустой манифест, если файл не существует", async () => {
      const manifest = await loadManifest("/non-existent-directory");

      expect(manifest).toEqual({
        version: "1.0.0",
        generatedAt: expect.any(String),
        icons: [],
      });
    });

    it("должен корректно загрузить существующий манифест", async () => {
      const manifest = {
        version: "1.0.0",
        generatedAt: new Date().toISOString(),
        icons: [
          createManifestEntry("123", "icon1", "icon1.svg", 24, 24, "hash1"),
        ],
      };

      await saveManifest(testDir, manifest);
      const loadedManifest = await loadManifest(testDir);

      expect(loadedManifest.version).toBe("1.0.0");
      expect(loadedManifest.icons).toHaveLength(1);
      expect(loadedManifest.icons[0].id).toBe("123");
    });

    it("должен возвращать валидную дату в generatedAt", async () => {
      const manifest = await loadManifest("/non-existent-directory");

      expect(new Date(manifest.generatedAt).toISOString()).toBe(
        manifest.generatedAt,
      );
    });
  });

  describe("saveManifest", () => {
    it("должен корректно сохранять манифест", async () => {
      const manifest = {
        version: "1.0.0",
        generatedAt: new Date().toISOString(),
        icons: [
          createManifestEntry("123", "icon1", "icon1.svg", 24, 24, "hash1"),
          createManifestEntry("456", "icon2", "icon2.svg", 16, 16, "hash2"),
        ],
      };

      await saveManifest(testDir, manifest);

      const manifestPath = path.join(testDir, "icons-manifest.json");
      const exists = await fs
        .access(manifestPath)
        .then(() => true)
        .catch(() => false);

      expect(exists).toBe(true);
    });

    it("должен обновлять generatedAt при сохранении", async () => {
      const oldDate = new Date("2020-01-01").toISOString();
      const manifest = {
        version: "1.0.0",
        generatedAt: oldDate,
        icons: [],
      };

      await saveManifest(testDir, manifest);

      expect(manifest.generatedAt).not.toBe(oldDate);
      expect(new Date(manifest.generatedAt).toISOString()).toBe(
        manifest.generatedAt,
      );
    });

    it("должен корректно сохранять и загружать манифест", async () => {
      const manifest = {
        version: "1.0.0",
        generatedAt: new Date().toISOString(),
        icons: [
          createManifestEntry("123", "icon1", "icon1.svg", 24, 24, "hash1"),
          createManifestEntry("456", "icon2", "icon2.svg", 16, 16, "hash2"),
        ],
      };

      await saveManifest(testDir, manifest);
      const loadedManifest = await loadManifest(testDir);

      expect(loadedManifest.version).toBe(manifest.version);
      expect(loadedManifest.icons.length).toBe(manifest.icons.length);
      expect(loadedManifest.icons[0].id).toBe(manifest.icons[0].id);
      expect(loadedManifest.icons[1].id).toBe(manifest.icons[1].id);
    });
  });

  describe("findNewIcons", () => {
    it("должен находить новые иконки", () => {
      const manifestIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
        createManifestEntry("2", "icon2", "icon2.svg", 16, 16, "hash2"),
      ];

      const currentIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
        createManifestEntry("2", "icon2", "icon2.svg", 16, 16, "hash2"),
        createManifestEntry("3", "icon3", "icon3.svg", 32, 32, "hash3"),
      ];

      const newFound = findNewIcons(currentIcons, manifestIcons);

      expect(newFound).toHaveLength(1);
      expect(newFound[0].id).toBe("3");
      expect(newFound[0].name).toBe("icon3");
    });

    it("должен возвращать пустой массив, если нет новых иконок", () => {
      const manifestIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
        createManifestEntry("2", "icon2", "icon2.svg", 16, 16, "hash2"),
      ];

      const currentIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
        createManifestEntry("2", "icon2", "icon2.svg", 16, 16, "hash2"),
      ];

      const newFound = findNewIcons(currentIcons, manifestIcons);
      expect(newFound).toEqual([]);
    });

    it("должен находить несколько новых иконок", () => {
      const manifestIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
      ];

      const currentIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
        createManifestEntry("2", "icon2", "icon2.svg", 16, 16, "hash2"),
        createManifestEntry("3", "icon3", "icon3.svg", 32, 32, "hash3"),
      ];

      const newFound = findNewIcons(currentIcons, manifestIcons);

      expect(newFound).toHaveLength(2);
      expect(newFound.map((icon) => icon.id)).toEqual(["2", "3"]);
    });

    it("должен работать с пустыми массивами", () => {
      const newFound = findNewIcons([], []);
      expect(newFound).toEqual([]);
    });
  });

  describe("findDeletedIcons", () => {
    it("должен находить удаленные иконки", () => {
      const manifestIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
        createManifestEntry("2", "icon2", "icon2.svg", 16, 16, "hash2"),
        createManifestEntry("3", "icon3", "icon3.svg", 32, 32, "hash3"),
      ];

      const currentIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
        createManifestEntry("2", "icon2", "icon2.svg", 16, 16, "hash2"),
      ];

      const deletedFound = findDeletedIcons(currentIcons, manifestIcons);

      expect(deletedFound).toHaveLength(1);
      expect(deletedFound[0].id).toBe("3");
      expect(deletedFound[0].name).toBe("icon3");
    });

    it("должен возвращать пустой массив, если нет удаленных иконок", () => {
      const manifestIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
        createManifestEntry("2", "icon2", "icon2.svg", 16, 16, "hash2"),
      ];

      const currentIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
        createManifestEntry("2", "icon2", "icon2.svg", 16, 16, "hash2"),
        createManifestEntry("3", "icon3", "icon3.svg", 32, 32, "hash3"),
      ];

      const deletedFound = findDeletedIcons(currentIcons, manifestIcons);
      expect(deletedFound).toEqual([]);
    });

    it("должен находить несколько удаленных иконок", () => {
      const manifestIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
        createManifestEntry("2", "icon2", "icon2.svg", 16, 16, "hash2"),
        createManifestEntry("3", "icon3", "icon3.svg", 32, 32, "hash3"),
      ];

      const currentIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
      ];

      const deletedFound = findDeletedIcons(currentIcons, manifestIcons);

      expect(deletedFound).toHaveLength(2);
      expect(deletedFound.map((icon) => icon.id)).toEqual(["2", "3"]);
    });

    it("должен работать с пустыми массивами", () => {
      const deletedFound = findDeletedIcons([], []);
      expect(deletedFound).toEqual([]);
    });
  });

  describe("findUpdatedIcons", () => {
    it("должен находить иконки с обновленным хэшем", () => {
      const manifestIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
        createManifestEntry("2", "icon2", "icon2.svg", 16, 16, "hash2"),
        createManifestEntry("3", "icon3", "icon3.svg", 32, 32, "hash3"),
      ];

      const currentIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
        createManifestEntry("2", "icon2", "icon2.svg", 16, 16, "hash2_updated"),
        createManifestEntry("3", "icon3", "icon3.svg", 32, 32, "hash3"),
      ];

      const updatedFound = findUpdatedIcons(currentIcons, manifestIcons);

      expect(updatedFound).toHaveLength(1);
      expect(updatedFound[0].id).toBe("2");
      expect(updatedFound[0].hash).toBe("hash2_updated");
    });

    it("должен находить иконки с обновленным именем", () => {
      const manifestIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
      ];

      const currentIcons = [
        createManifestEntry("1", "icon1-renamed", "icon1.svg", 24, 24, "hash1"),
      ];

      const updatedFound = findUpdatedIcons(currentIcons, manifestIcons);

      expect(updatedFound).toHaveLength(1);
      expect(updatedFound[0].name).toBe("icon1-renamed");
    });

    it("должен находить иконки с обновленными размерами", () => {
      const manifestIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
      ];

      const currentIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 32, 32, "hash1"),
      ];

      const updatedFound = findUpdatedIcons(currentIcons, manifestIcons);

      expect(updatedFound).toHaveLength(1);
      expect(updatedFound[0].width).toBe(32);
      expect(updatedFound[0].height).toBe(32);
    });

    it("должен находить иконки с обновленным именем файла", () => {
      const manifestIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
      ];

      const currentIcons = [
        createManifestEntry("1", "icon1", "icon1-renamed.svg", 24, 24, "hash1"),
      ];

      const updatedFound = findUpdatedIcons(currentIcons, manifestIcons);

      expect(updatedFound).toHaveLength(1);
      expect(updatedFound[0].fileName).toBe("icon1-renamed.svg");
    });

    it("должен возвращать пустой массив, если нет обновленных иконок", () => {
      const manifestIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
        createManifestEntry("2", "icon2", "icon2.svg", 16, 16, "hash2"),
      ];

      const currentIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
        createManifestEntry("2", "icon2", "icon2.svg", 16, 16, "hash2"),
      ];

      const updatedFound = findUpdatedIcons(currentIcons, manifestIcons);
      expect(updatedFound).toEqual([]);
    });

    it("должен находить несколько обновленных иконок", () => {
      const manifestIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
        createManifestEntry("2", "icon2", "icon2.svg", 16, 16, "hash2"),
        createManifestEntry("3", "icon3", "icon3.svg", 32, 32, "hash3"),
      ];

      const currentIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1_updated"),
        createManifestEntry("2", "icon2", "icon2.svg", 16, 16, "hash2"),
        createManifestEntry("3", "icon3-renamed", "icon3.svg", 32, 32, "hash3"),
      ];

      const updatedFound = findUpdatedIcons(currentIcons, manifestIcons);

      expect(updatedFound).toHaveLength(2);
      expect(updatedFound.map((icon) => icon.id)).toEqual(["1", "3"]);
    });

    it("должен игнорировать новые иконки (без совпадения по id)", () => {
      const manifestIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
      ];

      const currentIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
        createManifestEntry("2", "icon2", "icon2.svg", 16, 16, "hash2"),
      ];

      const updatedFound = findUpdatedIcons(currentIcons, manifestIcons);
      expect(updatedFound).toEqual([]);
    });

    it("должен работать с пустыми массивами", () => {
      const updatedFound = findUpdatedIcons([], []);
      expect(updatedFound).toEqual([]);
    });
  });

  describe("Интеграционные тесты", () => {
    it("должен корректно обрабатывать полный цикл создания и обновления манифеста", async () => {
      const manifestPath = path.join(testDir, "icons-manifest.json");
      await fs.rm(manifestPath, { force: true });

      const manifest = await loadManifest(testDir);
      expect(manifest.icons).toHaveLength(0);

      manifest.icons.push(
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
      );

      await saveManifest(testDir, manifest);

      const loadedManifest = await loadManifest(testDir);
      expect(loadedManifest.icons).toHaveLength(1);
      expect(loadedManifest.icons[0].id).toBe("1");
    });

    it("должен обрабатывать сценарий с добавлением, обновлением и удалением иконок", () => {
      const manifestIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
        createManifestEntry("2", "icon2", "icon2.svg", 16, 16, "hash2"),
        createManifestEntry("3", "icon3", "icon3.svg", 32, 32, "hash3"),
      ];

      const currentIcons = [
        createManifestEntry("1", "icon1", "icon1.svg", 24, 24, "hash1"),
        createManifestEntry(
          "2",
          "icon2-updated",
          "icon2.svg",
          16,
          16,
          "hash2_new",
        ),
        createManifestEntry("4", "icon4", "icon4.svg", 48, 48, "hash4"),
      ];

      const newIcons = findNewIcons(currentIcons, manifestIcons);
      const deletedIcons = findDeletedIcons(currentIcons, manifestIcons);
      const updatedIcons = findUpdatedIcons(currentIcons, manifestIcons);

      expect(newIcons).toHaveLength(1);
      expect(newIcons[0].id).toBe("4");

      expect(deletedIcons).toHaveLength(1);
      expect(deletedIcons[0].id).toBe("3");

      expect(updatedIcons).toHaveLength(1);
      expect(updatedIcons[0].id).toBe("2");
    });
  });
});
