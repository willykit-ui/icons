import * as React from "react";
import type { IconProps } from "./types";

/**
 * InputOutlinedIcon icon component.
 *
 * @description Supports sizes: small (12px), medium (16px, default), large (20px).
 * Automatically falls back to the closest available size if exact one is missing.
 *
 * @param fontSize - Icon size preset or custom pixel value
 * @param color - Icon color (supports CSS colors, variables, and 'currentColor')
 * @param ...props - All other SVG element props
 */

const svgChildren = {
  small: {
    content: {
      __html: `<path fill="currentColor" d="M5.896 4.396a.5.5 0 0 1 .63-.064l.078.064 1.25 1.25a.5.5 0 0 1 0 .708l-1.25 1.25a.5.5 0 1 1-.708-.708l.397-.396H3a.5.5 0 0 1 0-1h3.293l-.397-.396-.064-.079a.5.5 0 0 1 .064-.629M3.5 4a25 25 0 0 1 .02-1.247c-.35.003-.613.01-.825.038-.285.038-.4.104-.475.179-.075.074-.14.19-.179.475-.04.3-.041.702-.041 1.305v2.5c0 .603 0 1.005.041 1.305.038.285.104.4.179.475.074.075.19.14.475.179.212.028.475.034.825.037C3.5 8.887 3.5 8.472 3.5 8a.5.5 0 0 1 1 0c0 .721.001 1.212.05 1.58.048.352.132.516.243.627s.275.195.628.242c.367.05.858.051 1.579.051h.5c.721 0 1.212-.001 1.58-.05.352-.048.516-.132.627-.243s.195-.275.242-.628C10 9.212 10 8.721 10 8V4c0-.721-.001-1.212-.05-1.58-.048-.352-.132-.516-.243-.627s-.275-.195-.628-.242C8.712 1.5 8.221 1.5 7.5 1.5H7c-.721 0-1.212.001-1.58.05-.352.048-.516.132-.627.243s-.195.275-.242.628C4.5 2.788 4.5 3.279 4.5 4a.5.5 0 1 1-1 0M11 8c0 .693 0 1.263-.06 1.713-.062.464-.198.873-.526 1.201s-.737.464-1.201.526c-.45.06-1.02.06-1.713.06H7c-.693 0-1.263 0-1.713-.06-.464-.062-.873-.198-1.201-.526a1.7 1.7 0 0 1-.406-.667c-.436-.001-.81-.005-1.118-.047-.396-.053-.758-.171-1.05-.463-.29-.291-.409-.653-.462-1.049C.999 8.307 1 7.825 1 7.25v-2.5c0-.575-.001-1.057.05-1.438.053-.396.171-.758.463-1.05.291-.29.653-.409 1.049-.462.308-.042.682-.047 1.118-.048.084-.247.21-.471.406-.666.328-.328.737-.464 1.201-.526C5.737.5 6.307.5 7 .5h.5c.693 0 1.263 0 1.713.06.464.062.873.198 1.201.526s.464.737.526 1.201C11 2.737 11 3.307 11 4z"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: { content: { __html: "" }, viewBox: "0 0 16 16" },

  large: { content: { __html: "" }, viewBox: "0 0 16 16" },
};

const sizeToPixel = {
  small: 12,
  medium: 16,
  large: 20,
};

type SizeKey = keyof typeof svgChildren;

function pickClosestSvg(fontSize: "small" | "medium" | "large" | number) {
  const available = Object.entries(svgChildren).filter(
    ([, data]) => data && data.content.__html,
  ) as [SizeKey, (typeof svgChildren)[SizeKey]][];

  if (available.length === 0) {
    return { content: { __html: "" }, viewBox: "0 0 16 16" };
  }

  if (typeof fontSize === "string") {
    const found = available.find(([key]) => key === fontSize);
    if (found) return found[1];
  }

  if (typeof fontSize === "number") {
    return available.reduce((best, curr) => {
      const [bestKey] = best;
      const [currKey] = curr;
      const bestDiff = Math.abs(
        sizeToPixel[bestKey as keyof typeof sizeToPixel] - fontSize,
      );
      const currDiff = Math.abs(
        sizeToPixel[currKey as keyof typeof sizeToPixel] - fontSize,
      );
      return currDiff < bestDiff ? curr : best;
    })[1];
  }

  // Fallback to medium, then first available
  const medium = available.find(([key]) => key === "medium");
  return medium ? medium[1] : available[0][1];
}

const InputOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const {
      fontSize = "medium",
      color = "currentColor",
      style,
      ...other
    } = props;

    const selected = pickClosestSvg(fontSize);
    const viewBox = selected.viewBox;

    const sizeValue =
      typeof fontSize === "number"
        ? fontSize
        : sizeToPixel[fontSize as keyof typeof sizeToPixel] || 16;

    const finalStyle = {
      ...style,
      color,
    } as React.CSSProperties;

    return (
      <svg
        ref={ref}
        width={sizeValue}
        height={sizeValue}
        viewBox={viewBox}
        fill="none"
        style={finalStyle}
        xmlns="http://www.w3.org/2000/svg"
        {...other}
      >
        {selected.content.__html && (
          <g dangerouslySetInnerHTML={selected.content} />
        )}
      </svg>
    );
  },
);

InputOutlinedIcon.displayName = "InputOutlinedIcon";

export default InputOutlinedIcon;
