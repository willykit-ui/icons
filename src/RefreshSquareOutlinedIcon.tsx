import * as React from "react";
import type { IconProps } from "./types";

/**
 * RefreshSquareOutlinedIcon icon component.
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

  medium: {
    content: {
      __html: `<g clipPath="url(#a)"><path fill="currentColor" d="M14.169 8.003c0-1.585 0-2.724-.117-3.59-.115-.853-.333-1.367-.712-1.747-.38-.38-.894-.598-1.746-.713-.867-.116-2.006-.117-3.591-.117s-2.724 0-3.59.117c-.853.115-1.367.333-1.747.713s-.598.894-.713 1.746c-.116.867-.117 2.006-.117 3.59 0 1.586 0 2.725.117 3.592.115.852.333 1.366.713 1.746s.894.597 1.746.712c.867.116 2.006.117 3.59.117 1.586 0 2.725 0 3.592-.117.852-.115 1.366-.332 1.746-.712s.597-.894.712-1.746c.116-.867.117-2.006.117-3.591M10.149 4a.5.5 0 0 1 1 0v1.81a.5.5 0 0 1-.5.5H8.881a.5.5 0 0 1 0-1h.367a2.775 2.775 0 0 0-3.25.547 2.97 2.97 0 0 0 0 4.127 2.78 2.78 0 0 0 4 0c.644-.66.917-1.561.81-2.428a.5.5 0 0 1 .993-.122 3.96 3.96 0 0 1-1.09 3.25 3.78 3.78 0 0 1-5.429 0 3.97 3.97 0 0 1 0-5.526 3.78 3.78 0 0 1 4.867-.475zm5.02 4.003c0 1.557.002 2.775-.126 3.724-.13.963-.4 1.723-.996 2.32-.597.596-1.357.867-2.32.996-.95.128-2.167.126-3.724.126s-2.776.002-3.725-.126c-.963-.13-1.723-.4-2.319-.996-.597-.597-.867-1.357-.996-2.32-.128-.95-.127-2.167-.127-3.724s0-2.776.127-3.725c.13-.963.4-1.723.996-2.319.596-.597 1.356-.867 2.32-.996C5.226.835 6.445.836 8.002.836s2.775 0 3.724.127c.963.13 1.723.4 2.32.996s.867 1.356.996 2.32c.128.948.126 2.167.126 3.724"/></g><defs><clipPath id="a"><path fill="currentColor" d="M0 0h16v16H0z"/></clipPath></defs>`,
    },
    viewBox: "0 0 16 16",
  },

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

const RefreshSquareOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

RefreshSquareOutlinedIcon.displayName = "RefreshSquareOutlinedIcon";

export default RefreshSquareOutlinedIcon;
