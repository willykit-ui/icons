import * as React from "react";
import type { IconProps } from "./types";

/**
 * ColumnsOutlinedIcon icon component.
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
      __html: `<path d="M10.05 2.3a.85.85 0 0 0-.85-.849H7.95v9.1H9.2c.47 0 .85-.38.85-.85zm-5.1 8.25h2.1V1.452h-2.1zm-3-.849c0 .47.38.85.85.85h1.25v-9.1H2.8a.85.85 0 0 0-.85.85zm9 0a1.75 1.75 0 0 1-1.75 1.75H2.8a1.75 1.75 0 0 1-1.75-1.75v-7.4c0-.967.783-1.75 1.75-1.75h6.4c.966 0 1.75.783 1.75 1.75z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M13.2 3.5A1.5 1.5 0 0 0 11.7 2h-1.3v12h1.3a1.5 1.5 0 0 0 1.5-1.5zM6.5 14h2.9V2H6.5zm-4-1.5A1.5 1.5 0 0 0 4 14h1.5V2H4a1.5 1.5 0 0 0-1.5 1.5zm11.7 0a2.5 2.5 0 0 1-2.5 2.5H4a2.5 2.5 0 0 1-2.5-2.5v-9A2.5 2.5 0 0 1 4 1h7.7a2.5 2.5 0 0 1 2.5 2.5z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M16.649 4.299a1.75 1.75 0 0 0-1.75-1.75h-1.75v14.9h1.75a1.75 1.75 0 0 0 1.75-1.75zm-8.3 13.15h3.7V2.55h-3.7zm-5-1.75c0 .967.784 1.75 1.75 1.75h2.15V2.55H5.1A1.75 1.75 0 0 0 3.35 4.3zm14.4 0a2.85 2.85 0 0 1-2.85 2.85h-9.8a2.85 2.85 0 0 1-2.85-2.85V4.3a2.85 2.85 0 0 1 2.85-2.85h9.8a2.85 2.85 0 0 1 2.85 2.85z" fill="currentColor"/>`,
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

const ColumnsOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

ColumnsOutlinedIcon.displayName = "ColumnsOutlinedIcon";

export default ColumnsOutlinedIcon;
