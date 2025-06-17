import {
  convertSvgAttributesToCamelCase,
  buildComponentCode,
} from "../transform";
import { describe, it, expect } from "vitest";

describe("convertSvgAttributesToCamelCase", () => {
  it("преобразует атрибуты в camelCase", () => {
    const svg = '<svg view-box="0 0 16 16" stroke-width="2"></svg>';
    expect(convertSvgAttributesToCamelCase(svg)).toBe(
      '<svg viewBox="0 0 16 16" strokeWidth="2"></svg>',
    );
  });

  it("не меняет атрибуты, если они уже в camelCase", () => {
    const svg = '<svg viewBox="0 0 16 16" strokeWidth="2"></svg>';
    expect(convertSvgAttributesToCamelCase(svg)).toBe(svg);
  });
});

describe("buildComponentCode", () => {
  it("генерирует код React-компонента", async () => {
    const svg = '<svg viewBox="0 0 16 16" stroke-width="2"></svg>';
    const componentName = "TestIcon";
    const result = await buildComponentCode({
      svg,
      componentName,
      typescript: true,
      memo: false,
      ref: false,
      iconSize: 24,
    });
    expect(result).toContain(
      "const TestIcon = (props: SVGProps<SVGSVGElement>",
    );
    expect(result).toContain('viewBox="0 0 16 16"');
    expect(result).toContain('strokeWidth="2"');
  });
});
