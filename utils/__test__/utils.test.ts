import { describe, it, expect } from "vitest";
import { getBaseIconName } from "../utils";

describe("getBaseIconName", () => {
  it("убирает префикс Icon и суффиксы Filled/Outlined", () => {
    expect(getBaseIconName("IconDownloadFilled")).toBe("Download");
    expect(getBaseIconName("IconDownloadOutlined")).toBe("Download");
    expect(getBaseIconName("IconUser")).toBe("User");
    expect(getBaseIconName("DownloadFilled")).toBe("Download");
    expect(getBaseIconName("DownloadOutlined")).toBe("Download");
    expect(getBaseIconName("IconSettings")).toBe("Settings");
  });

  it("разделяет слова пробелами по camelCase", () => {
    expect(getBaseIconName("IconUserSettingsFilled")).toBe("User Settings");
    expect(getBaseIconName("IconUserSettingsOutlined")).toBe("User Settings");
    expect(getBaseIconName("UserProfile")).toBe("User Profile");
    expect(getBaseIconName("UserSettings")).toBe("User Settings");
  });

  it("корректно обрабатывает пустую строку", () => {
    expect(getBaseIconName("")).toBe("");
  });

  it("корректно обрабатывает строки без префиксов и суффиксов", () => {
    expect(getBaseIconName("Download")).toBe("Download");
    expect(getBaseIconName("UserSettings")).toBe("User Settings");
  });

  it("корректно обрабатывает разные регистры суффиксов", () => {
    expect(getBaseIconName("IconDownloadfilled")).toBe("Download");
    expect(getBaseIconName("IconDownloadoutlined")).toBe("Download");
    expect(getBaseIconName("IconDownloadFILLED")).toBe("Download");
    expect(getBaseIconName("IconDownloadOUTLINED")).toBe("Download");
  });
});
