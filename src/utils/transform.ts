export function convertSvgAttributesToCamelCase(svg: string): string {
  return svg.replace(/([a-zA-Z-]+)=/g, (match) => {
    const attr = match.slice(0, -1); // remove '='
    const camelAttr = attr.replace(/-([a-z])/g, (_, char: string) =>
      char.toUpperCase(),
    );
    return `${camelAttr}=`;
  });
}

export function buildComponentCode({
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
}): string {
  const propsType = typescript
    ? "SVGProps<SVGSVGElement> & { size?: string | number; color?: string }"
    : "any";

  const sizeLogic = `{...(props.size ? { width: props.size, height: props.size } : { width: "${iconSize}", height: "${iconSize}" })}`;

  const processedSvg = convertSvgAttributesToCamelCase(svg);

  const svgWithProps = processedSvg
    .replace(/<svg([^>]*)>/, () => {
      return `<svg\n
  xmlns="http://www.w3.org/2000/svg"\n
  ${sizeLogic}\n
  viewBox="0 0 16 16"\n
  {...props}\n
  fill={props.color ?? "currentColor"}\n
>`;
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

  const result = `
${typesImport}

${memoWrapper}

export default ${componentName};
`;

  return result.trim();
}
