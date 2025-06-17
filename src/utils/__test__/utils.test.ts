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
  });
});
