import prettier from "prettier";

/**
 * Преобразует все атрибуты SVG из kebab-case в camelCase.
 * @param {string} svg - SVG-строка
 * @returns {string} SVG-строка с camelCase-атрибутами
 */
export function convertSvgAttributesToCamelCase(svg: string): string {
  return svg.replace(/([a-zA-Z-]+)=/g, (match) => {
    const attr = match.slice(0, -1); // remove '='
    const camelAttr = attr.replace(/-([a-z])/g, (_, char: string) =>
      char.toUpperCase(),
    );
    return `${camelAttr}=`;
  });
}

/**
 * Генерирует код React-компонента для иконки на основе SVG.
 * @param {object} params - Параметры генерации
 * @param {string} params.svg - SVG-строка
 * @param {string} params.componentName - Имя компонента
 * @param {boolean} params.typescript - Использовать типизацию TypeScript
 * @param {boolean} params.memo - Оборачивать в React.memo
 * @param {boolean} params.ref - Использовать forwardRef
 * @param {string|number} params.iconSize - Размер иконки по умолчанию
 * @returns {string} Код React-компонента
 */
export async function buildComponentCode({
  svg,
  componentName,
  typescript,
  memo,
  ref,
  iconSize,
}: {
  svg: string;
  componentName: string;
  typescript: boolean;
  memo: boolean;
  ref: boolean;
  iconSize: string | number;
}): Promise<string> {
  const propsType = typescript
    ? "SVGProps<SVGSVGElement> & { size?: string | number; color?: string }"
    : "any";

  const sizeLogic = `{...(props.size ? { width: props.size, height: props.size } : { width: '${iconSize}', height: '${iconSize}' })}`;

  const processedSvg = convertSvgAttributesToCamelCase(svg);

  const svgWithProps = processedSvg
    .replace(/<svg([^>]*)>/, () => {
      return `<svg xmlns="http://www.w3.org/2000/svg" ${sizeLogic} viewBox="0 0 16 16" {...props} fill={props.color ?? 'currentColor'} strokeWidth="2">`;
    })
    .replace(/\s{2,}/g, " ");

  const componentBody = ref
    ? `React.forwardRef<SVGSVGElement, ${propsType}>((props, ref) => (${svgWithProps}))`
    : `(props: ${propsType}) => (${svgWithProps})`;

  const memoWrapper = memo
    ? `const ${componentName} = React.memo(${componentBody});`
    : `const ${componentName} = ${componentBody};`;

  const typesImport = typescript
    ? 'import * as React from "react";\nimport type { SVGProps } from "react";'
    : 'import * as React from "react";';

  const code = `${typesImport}\n\n${memoWrapper}\n\nexport default ${componentName};`;

  try {
    return await prettier.format(code, {
      parser: "typescript",
      semi: true,
      singleQuote: true,
      trailingComma: "es5",
      printWidth: 100,
    });
  } catch (error) {
    console.error("Error formatting code:", error);
    return code;
  }
}
