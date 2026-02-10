import * as React from "react";
import type { IconProps } from "./types";

/**
 * MoonOutlinedIcon icon component.
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
      __html: `<path fillRule="evenodd" d="M6.139 1.065c.302.064.455.333.484.545a.7.7 0 0 1-.326.696A2.474 2.474 0 0 0 7.575 6.9c.899 0 1.686-.479 2.12-1.197l.068-.094a.71.71 0 0 1 .628-.232c.242.033.56.228.56.623A4.95 4.95 0 1 1 6 1.051zm-.94.965A4.051 4.051 0 0 0 6 10.05 4.05 4.05 0 0 0 9.97 6.8 3.375 3.375 0 1 1 5.2 2.03" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fillRule="evenodd" d="M8 1.5c.462 0 .692.37.731.66a.84.84 0 0 1-.386.827 3.4 3.4 0 1 0 4.668 4.668l.08-.11a.85.85 0 0 1 .748-.276c.29.039.659.269.659.731A6.5 6.5 0 1 1 8 1.5m-.753 1.052a5.5 5.5 0 1 0 6.2 6.2 4.4 4.4 0 1 1-6.2-6.2" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fillRule="evenodd" d="M10 2c.497 0 .748.396.791.716a.92.92 0 0 1-.425.912 4.375 4.375 0 1 0 6.006 6.006.92.92 0 0 1 .912-.425c.32.043.716.294.716.791a8 8 0 1 1-8-8m-.524 1.02a7 7 0 1 0 7.502 7.503A5.375 5.375 0 1 1 9.476 3.02" clipRule="evenodd" fill="currentColor"/>`,
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

const MoonOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

MoonOutlinedIcon.displayName = "MoonOutlinedIcon";

export default MoonOutlinedIcon;
