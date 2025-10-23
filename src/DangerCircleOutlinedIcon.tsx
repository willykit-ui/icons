import * as React from "react";
import type { IconProps } from "./types";

/**
 * DangerCircleOutlinedIcon icon component.
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
      __html: `<g fill="currentColor" clipPath="url(#a)"><path d="M10.5 6a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0m1 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/><path d="M5.5 6.5v-3a.5.5 0 0 1 1 0v3a.5.5 0 0 1-1 0m1 1.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/></g><defs><clipPath id="a"><path fill="currentColor" d="M0 0h12v12H0z"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<g fill="currentColor" clipPath="url(#a)"><path d="M14.169 8.003a6.167 6.167 0 1 0-12.333 0 6.167 6.167 0 0 0 12.333 0m1 0A7.167 7.167 0 1 1 .836 8.002a7.167 7.167 0 0 1 14.333 0"/><path d="M7.5 8.664v-4a.5.5 0 0 1 1 0v4a.5.5 0 0 1-1 0m1.17 2.003a.667.667 0 1 1-1.334 0 .667.667 0 0 1 1.333 0"/></g><defs><clipPath id="a"><path fill="currentColor" d="M0 0h16v16H0z"/></clipPath></defs>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<g fill="currentColor" clipPath="url(#a)"><path d="M18.125 10a8.125 8.125 0 1 0-16.25 0 8.125 8.125 0 0 0 16.25 0m1.25 0a9.375 9.375 0 1 1-18.75 0 9.375 9.375 0 0 1 18.75 0"/><path d="M9.375 10.83v-5a.625.625 0 1 1 1.25 0v5a.625.625 0 1 1-1.25 0m1.463 2.503a.833.833 0 1 1-1.666 0 .833.833 0 0 1 1.666 0"/></g><defs><clipPath id="a"><path fill="currentColor" d="M0 0h20v20H0z"/></clipPath></defs>`,
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

const DangerCircleOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

DangerCircleOutlinedIcon.displayName = "DangerCircleOutlinedIcon";

export default DangerCircleOutlinedIcon;
