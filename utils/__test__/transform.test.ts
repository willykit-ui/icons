import {
  buildComponentCode,
  convertSvgAttributesToCamelCase,
  extractSvgData,
  replaceFillAttribute,
} from "../transform";
import { describe, it, expect } from "vitest";

describe("convertSvgAttributesToCamelCase", () => {
  it("преобразует kebab-case атрибуты в camelCase", () => {
    const input = '<svg stroke-width="2" fill-opacity="0.5"></svg>';
    const expected = '<svg strokeWidth="2" fillOpacity="0.5"></svg>';
    expect(convertSvgAttributesToCamelCase(input)).toBe(expected);
  });

  it("не изменяет уже существующие camelCase атрибуты", () => {
    const input = '<svg strokeWidth="2" fillOpacity="0.5"></svg>';
    expect(convertSvgAttributesToCamelCase(input)).toBe(input);
  });

  it("возвращает пустую строку при пустом входе", () => {
    expect(convertSvgAttributesToCamelCase("")).toBe("");
  });
});

describe("extractSvgData", () => {
  it("извлекает viewBox из SVG контента", () => {
    const input = '<svg viewBox="0 0 16 16" stroke-width="2"></svg>';
    const result = extractSvgData(input);
    expect(result.viewBox).toBe("0 0 16 16");
  });

  it("возвращает значение по умолчанию при отсутствии viewBox", () => {
    const input = '<svg stroke-width="2"></svg>';
    const result = extractSvgData(input);
    expect(result.viewBox).toBe("0 0 16 16");
  });

  it("возвращает весь контент SVG", () => {
    const input = '<svg viewBox="0 0 16 16" stroke-width="2"></svg>';
    const result = extractSvgData(input);
    expect(result.content).toBe(input);
  });
});

describe("replaceFillAttribute", () => {
  it('заменяет fill="currentColor" на fill={color}', () => {
    const input = '<path fill="currentColor" d="M0 0h16v16H0z"/>';
    const expected = '<path fill={color} d="M0 0h16v16H0z"/>';
    expect(replaceFillAttribute(input)).toBe(expected);
  });

  it('не изменяет fill="none"', () => {
    const input = '<path fill="none" d="M0 0h16v16H0z"/>';
    expect(replaceFillAttribute(input)).toBe(input);
  });

  it("возвращает пустую строку при пустом входе", () => {
    expect(replaceFillAttribute("")).toBe("");
  });
});

describe("buildComponentCode", () => {
  const svgData = {
    small: {
      content: '<path stroke-width="2" d="M0 0h12v12H0z"/>',
      viewBox: "0 0 12 12",
    },
    medium: {
      content: '<path stroke-width="2" d="M0 0h16v16H0z"/>',
      viewBox: "0 0 16 16",
    },
    large: {
      content: '<path stroke-width="2" d="M0 0h20v20H0z"/>',
      viewBox: "0 0 20 20",
    },
  };

  it("генерирует код React-компонента", async () => {
    const componentName = "TestIcon";
    const result = await buildComponentCode({
      svgData,
      componentName,
      typescript: true,
      memo: false,
      ref: false,
    });
    expect(result).toContain("const TestIcon = (props: IconProps) => {");
    expect(result).not.toContain("React.forwardRef");
    expect(result).toContain("strokeWidth");
  });

  it("генерирует код React-компонента с memo", async () => {
    const componentName = "TestIcon";
    const result = await buildComponentCode({
      svgData,
      componentName,
      typescript: true,
      memo: true,
      ref: false,
    });
    expect(result).toContain("export default React.memo(TestIcon)");
  });

  it("генерирует код React-компонента с ref", async () => {
    const componentName = "TestIcon";
    const result = await buildComponentCode({
      svgData,
      componentName,
      typescript: true,
      memo: false,
      ref: true,
    });
    expect(result).toContain("React.forwardRef<");
    expect(result).toContain("SVGSVGElement");
  });

  it("генерирует код React-компонента без TypeScript", async () => {
    const componentName = "TestIcon";
    const result = await buildComponentCode({
      svgData,
      componentName,
      typescript: false,
      memo: false,
      ref: false,
    });
    expect(result).toContain("const TestIcon = (props) => {");
    expect(result).not.toContain("React.forwardRef");
    expect(result).not.toContain("SVGProps");
  });
});
