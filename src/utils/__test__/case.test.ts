import { toComponentName } from "../case";
import { describe, it, expect } from "vitest";

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
    expect(toComponentName("download-filled", "unknown")).toBe(
      "download-filled",
    );
  });
});
