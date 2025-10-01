import * as React from "react";
import type { IconProps } from "./types";

/**
 * LegendOutlinedIcon icon component.
 *
 * @description Supports sizes: small (12px), medium (16px, default), large (20px).
 * Automatically falls back to the closest available size if exact one is missing.
 *
 * @param fontSize - Icon size preset or custom pixel value
 * @param color - Icon color (supports CSS colors, variables, and 'currentColor')
 * @param ...props - All other SVG element props
 */

const svgChildren = {
  small: { content: { __html: "" }, viewBox: "0 0 16 16" },

  medium: { content: { __html: "" }, viewBox: "0 0 16 16" },

  large: {
    content: {
      __html: `<path fill="currentColor" d="M10 13.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5m1.5-6.003c0-.525-.155-.886-.383-1.114S10.53 6 10.005 6s-.888.155-1.118.385c-.23.229-.387.588-.387 1.112a.5.5 0 0 1-1 0c0-.726.222-1.364.682-1.821C8.64 5.219 9.28 5 10.005 5s1.363.219 1.82.677.675 1.096.675 1.82c0 .448-.179.841-.392 1.171-.211.327-.488.637-.731.912-.255.288-.478.541-.64.793-.161.249-.232.45-.232.627v.005l-.005.5a.5.5 0 0 1-1-.01l.005-.5c.001-.446.18-.837.392-1.165.212-.327.487-.638.73-.913.256-.288.479-.54.642-.792.16-.25.231-.45.231-.628"/><path fill="currentColor" fillRule="evenodd" d="M14 18H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h8l.206.005A4 4 0 0 1 18 6v8l-.005.206A4 4 0 0 1 14 18m0-1H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3" clipRule="evenodd"/>`,
    },
    viewBox: "0 0 20 20",
  },
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

const LegendOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

LegendOutlinedIcon.displayName = "LegendOutlinedIcon";

export default LegendOutlinedIcon;
