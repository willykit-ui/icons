import { parseIconSize } from "../size";
import { describe, it, expect } from "vitest";

describe("parseIconSize", () => {
  it("преобразует строку в число", () => {
    expect(parseIconSize("24")).toBe(24);
    expect(parseIconSize("32")).toBe(32);
    expect(parseIconSize("0")).toBe(0);
    expect(parseIconSize("100")).toBe(100);
  });

  it("возвращает исходную строку при некорректном значении", () => {
    expect(parseIconSize("abc")).toBe("abc");
    expect(parseIconSize("")).toBe("");
    expect(parseIconSize("24px")).toBe(24); // Частично корректное значение
  });

  it("возвращает число, если передано число", () => {
    expect(parseIconSize(24)).toBe(24);
    expect(parseIconSize(0)).toBe(0);
    expect(parseIconSize(100)).toBe(100);
  });

  it("возвращает NaN как строку", () => {
    expect(parseIconSize(NaN)).toBeNaN();
  });
});
