import * as React from "react";
import type { IconProps } from "./types";

/**
 * SquareArrowDownOutlinedIcon icon component.
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
      __html: `<path d="M11.05 3.001A2.05 2.05 0 0 0 9 .951H3a2.05 2.05 0 0 0-2.05 2.05v6A2.05 2.05 0 0 0 3 11.051h6A2.05 2.05 0 0 0 11.05 9zM7.182 5.183a.45.45 0 0 1 .636.636l-1.5 1.5a.45.45 0 0 1-.636 0l-1.5-1.5a.45.45 0 0 1 .636-.636L6 6.364zM11.95 9A2.95 2.95 0 0 1 9 11.951H3a2.95 2.95 0 0 1-2.95-2.95v-6A2.95 2.95 0 0 1 3 .051h6A2.95 2.95 0 0 1 11.95 3z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<g clipPath="url(#a)"><path d="M14.5 4A2.5 2.5 0 0 0 12 1.5H4A2.5 2.5 0 0 0 1.5 4v8A2.5 2.5 0 0 0 4 14.5h8a2.5 2.5 0 0 0 2.5-2.5zM9.646 6.847a.5.5 0 1 1 .707.707l-2 2a.5.5 0 0 1-.707 0l-2-2a.5.5 0 0 1 .708-.707L8 8.493zM15.5 12a3.5 3.5 0 0 1-3.5 3.5H4A3.5 3.5 0 0 1 .5 12V4A3.5 3.5 0 0 1 4 .5h8A3.5 3.5 0 0 1 15.5 4z" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h16v16H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<g clipPath="url(#a)"><path d="M17.95 4.999A2.95 2.95 0 0 0 15 2.049H5a2.95 2.95 0 0 0-2.95 2.95v10A2.95 2.95 0 0 0 5 17.949h10A2.95 2.95 0 0 0 17.95 15zm-5.738 3.51a.55.55 0 0 1 .777.78l-2.6 2.599a.55.55 0 0 1-.778 0l-2.6-2.6a.55.55 0 0 1 .778-.778L10 10.72zM19.05 15A4.05 4.05 0 0 1 15 19.05H5A4.05 4.05 0 0 1 .95 15V5A4.05 4.05 0 0 1 5 .949h10A4.05 4.05 0 0 1 19.05 5z" fill="currentColor"/></g><defs><clipPath id="a"><rect width="20" height="20" rx="2" fill="currentColor"/></clipPath></defs>`,
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

const SquareArrowDownOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

SquareArrowDownOutlinedIcon.displayName = "SquareArrowDownOutlinedIcon";

export default SquareArrowDownOutlinedIcon;
