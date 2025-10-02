import { toComponentName, splitWords, capitalize } from "../case";
import { describe, it, expect } from "vitest";

describe("splitWords", () => {
  it("разбивает строку по разделителям", () => {
    expect(splitWords("download-file")).toEqual(["download", "file"]);
    expect(splitWords("download_file")).toEqual(["download", "file"]);
    expect(splitWords("download file")).toEqual(["download", "file"]);
  });

  it("разбивает строку по границе регистра", () => {
    expect(splitWords("downloadFile")).toEqual(["download", "File"]);
    expect(splitWords("DownloadFile")).toEqual(["Download", "File"]);
  });

  it("разбивает строку с комбинированными разделителями", () => {
    expect(splitWords("download-file_name")).toEqual([
      "download",
      "file",
      "name",
    ]);
    expect(splitWords("downloadFile-name")).toEqual([
      "download",
      "File",
      "name",
    ]);
  });

  it("возвращает пустой массив для пустой строки", () => {
    expect(splitWords("")).toEqual([]);
  });
});

describe("capitalize", () => {
  it("делает первую букву заглавной", () => {
    expect(capitalize("download")).toBe("Download");
    expect(capitalize("file")).toBe("File");
  });

  it("делает остальные буквы строчными", () => {
    expect(capitalize("DOWNLOAD")).toBe("Download");
    expect(capitalize("FILE")).toBe("File");
  });

  it("работает с пустой строкой", () => {
    expect(capitalize("")).toBe("");
  });
});

describe("toComponentName", () => {
  it("преобразует в pascal case", () => {
    expect(toComponentName("download-filled", "pascal")).toBe("DownloadFilled");
    expect(toComponentName("icon-outlined", "pascal")).toBe("IconOutlined");
  });

  it("преобразует в camel case", () => {
    expect(toComponentName("download-filled", "camel")).toBe("downloadFilled");
    expect(toComponentName("icon-outlined", "camel")).toBe("iconOutlined");
  });

  it("преобразует в kebab case", () => {
    expect(toComponentName("DownloadFilled", "kebab")).toBe("download-filled");
    expect(toComponentName("IconOutlined", "kebab")).toBe("icon-outlined");
  });

  it("преобразует в snake case", () => {
    expect(toComponentName("DownloadFilled", "snake")).toBe("download_filled");
    expect(toComponentName("IconOutlined", "snake")).toBe("icon_outlined");
  });

  it("возвращает исходную строку при неизвестном формате", () => {
    // @ts-expect-error - intentionally passing invalid format
    expect(toComponentName("download-filled", "unknown")).toBe(
      "download-filled",
    );
  });

  it("корректно обрабатывает пустую строку", () => {
    expect(toComponentName("", "pascal")).toBe("");
    expect(toComponentName("", "camel")).toBe("");
    expect(toComponentName("", "kebab")).toBe("");
    expect(toComponentName("", "snake")).toBe("");
  });

  it("корректно обрабатывает строки с пробелами", () => {
    expect(toComponentName("download file", "pascal")).toBe("DownloadFile");
    expect(toComponentName("download file", "camel")).toBe("downloadFile");
    expect(toComponentName("download file", "kebab")).toBe("download-file");
    expect(toComponentName("download file", "snake")).toBe("download_file");
  });

  it("корректно обрабатывает строки с цифрами", () => {
    expect(toComponentName("icon24", "pascal")).toBe("Icon24");
    expect(toComponentName("icon24", "camel")).toBe("icon24");
    expect(toComponentName("icon24", "kebab")).toBe("icon24");
    expect(toComponentName("icon24", "snake")).toBe("icon24");
  });
});
