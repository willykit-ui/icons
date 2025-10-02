import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getBaseIconName, groupIconsByBaseName } from "../groupIcons";
import fs from "fs";

// Мокаем fs.readFileSync
vi.mock("fs", async () => {
  const actual = await vi.importActual("fs");
  return {
    ...actual,
    readFileSync: vi.fn(),
  };
});

describe("groupIcons", () => {
  describe("getBaseIconName", () => {
    it("должна удалять расширение .svg", () => {
      expect(getBaseIconName("icon.svg")).toBe("icon");
    });

    it("должна удалять суффиксы размеров", () => {
      expect(getBaseIconName("icon-12px.svg")).toBe("icon");
      expect(getBaseIconName("icon-16px.svg")).toBe("icon");
      expect(getBaseIconName("icon-20px.svg")).toBe("icon");
      expect(getBaseIconName("icon-s.svg")).toBe("icon");
      expect(getBaseIconName("icon-m.svg")).toBe("icon");
      expect(getBaseIconName("icon-l.svg")).toBe("icon");
    });

    it("должна корректно обрабатывать имена без суффиксов", () => {
      expect(getBaseIconName("icon.svg")).toBe("icon");
      expect(getBaseIconName("user-profile.svg")).toBe("user-profile");
    });
  });

  describe("groupIconsByBaseName", () => {
    const mockManifest = {
      icons: [
        {
          fileName: "arrow-down-12px.svg",
          width: 12,
          height: 12,
          baseName: "arrow-down",
          size: "small",
        },
        {
          fileName: "arrow-down-16px.svg",
          width: 16,
          height: 16,
          baseName: "arrow-down",
          size: "medium",
        },
        {
          fileName: "arrow-down-20px.svg",
          width: 20,
          height: 20,
          baseName: "arrow-down",
          size: "large",
        },
        {
          fileName: "setting-s.svg",
          width: 12,
          height: 12,
          baseName: "setting",
          size: "small",
        },
        {
          fileName: "setting-m.svg",
          width: 16,
          height: 16,
          baseName: "setting",
          size: "medium",
        },
        {
          fileName: "setting-l.svg",
          width: 20,
          height: 20,
          baseName: "setting",
          size: "large",
        },
      ],
      metadata: {
        version: "1.0.0",
        generatedAt: "2023-01-01T00:00:00.000Z",
        totalIcons: 6,
      },
    };

    beforeEach(() => {
      vi.spyOn(fs, "readFileSync").mockReturnValue(
        JSON.stringify(mockManifest),
      );
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it("должна группировать иконки по базовому имени", () => {
      const result = groupIconsByBaseName("manifest.json");

      expect(result).toHaveLength(2);
      expect(result[0].baseName).toBe("arrow-down");
      expect(result[1].baseName).toBe("setting");

      // Проверяем, что у arrow-down есть три размера
      expect(Object.keys(result[0].sizes)).toContain("small");
      expect(Object.keys(result[0].sizes)).toContain("medium");
      expect(Object.keys(result[0].sizes)).toContain("large");
      expect(Object.keys(result[0].sizes)).toContain("12");
      expect(Object.keys(result[0].sizes)).toContain("16");
      expect(Object.keys(result[0].sizes)).toContain("20");

      // Проверяем, что у setting есть три размера
      expect(Object.keys(result[1].sizes)).toContain("small");
      expect(Object.keys(result[1].sizes)).toContain("medium");
      expect(Object.keys(result[1].sizes)).toContain("large");
      expect(Object.keys(result[1].sizes)).toContain("12");
      expect(Object.keys(result[1].sizes)).toContain("16");
      expect(Object.keys(result[1].sizes)).toContain("20");
    });

    it("должна возвращать пустой массив при ошибке чтения файла", () => {
      vi.spyOn(fs, "readFileSync").mockImplementation(() => {
        throw new Error("File not found");
      });

      const result = groupIconsByBaseName("nonexistent.json");
      expect(result).toEqual([]);
    });

    it("должна возвращать пустой массив при ошибке парсинга JSON", () => {
      vi.spyOn(fs, "readFileSync").mockReturnValue("invalid json");

      const result = groupIconsByBaseName("invalid.json");
      expect(result).toEqual([]);
    });
  });
});
