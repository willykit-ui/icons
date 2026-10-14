import { describe, it, expect } from "vitest";
import { safeName } from "../local-import.js";

describe("safeName sanitization", () => {
  it("converts standard names to kebab-case", () => {
    expect(safeName("ArrowLeft_Outlined_16px")).toBe(
      "arrow-left-outlined-16px",
    );
    expect(safeName("CheckCircle_Filled_20px")).toBe(
      "check-circle-filled-20px",
    );
  });

  it("handles and fixes Cyrillic homoglyphs safely", () => {
    expect(safeName("Text\u0410lignMiddle_Outlined_12px")).toBe(
      "text-align-middle-outlined-12px",
    );
    // Русская 'С' (U+0421)
    expect(safeName("\u0421opy_Outlined_16px")).toBe("copy-outlined-16px");
    // Русская 'О' (U+041E)
    expect(safeName("\u041Etions_Outlined_16px")).toBe("otions-outlined-16px");
    // Строчные русские буквы 'а', 'е', 'р', 'с'
    expect(safeName("\u0441\u0430\u0440\u0443")).toBe("capy");
  });

  it("removes unwanted punctuation and collapses hyphens", () => {
    expect(safeName("QR-Code_Outlined_16px")).toBe("qr-code-outlined-16px");
    expect(safeName("BulletedList _Outlined_16px")).toBe(
      "bulleted-list-outlined-16px",
    );
  });
});
