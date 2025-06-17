import { parseIconSize } from "../size";
import { describe, it, expect } from "vitest";

describe("parseIconSize", () => {
  it("преобразует строку в число", () => {
    expect(parseIconSize("24")).toBe(24);
    expect(parseIconSize("32")).toBe(32);
  });

  it("возвращает исходную строку при некорректном значении", () => {
    expect(parseIconSize("abc")).toBe("abc");
    expect(parseIconSize("")).toBe("");
  });
});
