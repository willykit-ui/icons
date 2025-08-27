import prettier from "prettier";
import ejs from "ejs";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { resolve, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEMPLATE_PATH = resolve(__dirname, "../templates/icon-component.tsx.ejs");

interface SvgFile {
  content: string;
  viewBox: string;
}

interface BuildComponentOptions {
  svgData: Record<"small" | "medium" | "large", SvgFile>;
  componentName: string;
  typescript: boolean;
  memo: boolean;
  ref: boolean;
}

/**
 * Экранирует символы, опасные в шаблонных строках JavaScript: `, $, \
 */
function escapeTemplateString(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

/**
 * Преобразует все атрибуты SVG из kebab-case в camelCase.
 */
export function convertSvgAttributesToCamelCase(svg: string): string {
  if (!svg) return "";

  // Словарь специальных случаев для SVG атрибутов
  const specialCases: Record<string, string> = {
    "xml:lang": "xmlLang",
    "xml:space": "xmlSpace",
    "xmlns:xlink": "xmlnsXlink",
  };

  return svg.replace(/([a-zA-Z-:]+)=/g, (match) => {
    const attr = match.slice(0, -1);

    if (specialCases[attr]) {
      return `${specialCases[attr]}=`;
    }

    // Стандартная конвертация kebab-case в camelCase
    const camelAttr = attr.replace(/-([a-z])/g, (_, char: string) =>
      char.toUpperCase(),
    );

    return `${camelAttr}=`;
  });
}

/**
 * Заменяет атрибуты fill и stroke в SVG на выражения для React
 */
export function replaceColorAttributes(svg: string): string {
  if (!svg) return "";

  return (
    svg
      // Заменяем fill="currentColor" на fill="currentColor" (оставляем как есть)
      .replace(/fill="currentColor"/g, 'fill="currentColor"')
      // Заменяем stroke="currentColor" на stroke="currentColor" (оставляем как есть)
      .replace(/stroke="currentColor"/g, 'stroke="currentColor"')
      // Заменяем другие значения fill на currentColor для динамической окраски
      .replace(
        /fill="(?!none|transparent|currentColor)[^"]*"/g,
        'fill="currentColor"',
      )
      .replace(
        /stroke="(?!none|transparent|currentColor)[^"]*"/g,
        'stroke="currentColor"',
      )
  );
}

/**
 * Извлекает viewBox из SVG контента
 */
export function extractSvgData(svgContent: string): SvgFile {
  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']*)["']/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 16 16";

  return {
    content: svgContent,
    viewBox,
  };
}

/**
 * Очищает SVG контент от внешних тегов и комментариев
 */
function cleanSvgContent(content: string): string {
  return content
    .replace(/<\?xml.*?\?>/g, "") // XML декларации
    .replace(/<!DOCTYPE.*?>/g, "") // DOCTYPE
    .replace(/<!--[\s\S]*?-->/g, "") // Комментарии
    .replace(/<svg[^>]*>/g, "") // Открывающий тег svg
    .replace(/<\/svg>/g, "") // Закрывающий тег svg
    .trim();
}

export async function buildComponentCode({
  svgData,
  componentName,
  typescript,
  memo,
  ref,
}: BuildComponentOptions): Promise<string> {
  const sizes = ["small", "medium", "large"] as const;

  const processedSvgData = {} as Record<
    "small" | "medium" | "large",
    { content: string; viewBox: string }
  >;

  for (const size of sizes) {
    const data = svgData[size];
    if (!data || !data.content) {
      processedSvgData[size] = { content: "", viewBox: "0 0 16 16" };
      continue;
    }

    const { content, viewBox } = extractSvgData(data.content);

    const cleanedContent = cleanSvgContent(content);
    const camelCasedContent = convertSvgAttributesToCamelCase(cleanedContent);
    const colorProcessedContent = replaceColorAttributes(camelCasedContent);

    const safeContent = escapeTemplateString(colorProcessedContent);

    processedSvgData[size] = { content: safeContent, viewBox };
  }

  const sizeToPixel: Record<"small" | "medium" | "large", number> = {
    small: 12,
    medium: 16,
    large: 20,
  };

  const typesImport = typescript
    ? 'import * as React from "react";'
    : 'import * as React from "react";';

  const displayName = `\n${componentName}.displayName = '${componentName}';`;

  const jsDoc = typescript
    ? `
/**
 * ${componentName} icon component.
 * 
 * @description Supports sizes: small (12px), medium (16px, default), large (20px).
 * Automatically falls back to the closest available size if exact one is missing.
 * 
 * @param fontSize - Icon size preset or custom pixel value
 * @param color - Icon color (supports CSS colors, variables, and 'currentColor')
 * @param ...props - All other SVG element props
 */`
    : `
/**
 * ${componentName} icon component.
 * Supports sizes: small (12px), medium (16px, default), large (20px).
 * Automatically falls back to the closest available size if exact one is missing.
 */`;

  const templateData = {
    typesImport,
    jsDoc,
    componentName,
    displayName,
    memo,
    typescript,
    ref,
    processedSvgData,
    sizes,
    sizeToPixel,
  };

  try {
    const templateContent = await readFile(TEMPLATE_PATH, "utf-8");

    const renderedCode = ejs.render(templateContent, templateData);

    const formatted = await prettier.format(renderedCode, {
      parser: typescript ? "typescript" : "babel",
      semi: true,
      singleQuote: true,
      trailingComma: "es5",
      printWidth: 80,
      tabWidth: 2,
    });

    return formatted;
  } catch (error) {
    console.error("Error generating component code:", error);
    throw error;
  }
}

/**
 * Заменяет fill="currentColor" на fill={color} в SVG строке
 */
export function replaceFillAttribute(svg: string): string {
  if (!svg) return svg;

  return svg.replace(/fill="currentColor"/g, "fill={color}");
}
