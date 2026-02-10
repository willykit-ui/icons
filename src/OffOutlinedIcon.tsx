import * as React from "react";
import type { IconProps } from "./types";

/**
 * OffOutlinedIcon icon component.
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
      __html: `<path d="M7.745 2.754a.45.45 0 0 1 .623-.129 4.4 4.4 0 0 1 1.982 3.682c0 2.42-1.943 4.39-4.35 4.39s-4.35-1.97-4.35-4.39c0-1.542.789-2.9 1.981-3.682a.45.45 0 0 1 .494.752 3.5 3.5 0 0 0-1.575 2.93c0 1.93 1.55 3.489 3.45 3.489s3.45-1.558 3.45-3.49a3.5 3.5 0 0 0-1.575-2.929.45.45 0 0 1-.13-.623" fill="currentColor"/><path d="M6 1.8a.45.45 0 0 1 .45.451v3.3a.45.45 0 1 1-.9 0v-3.3a.45.45 0 0 1 .45-.45" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M10.411 3.726a.5.5 0 0 1 .693-.144A5.76 5.76 0 0 1 13.7 8.408c0 3.172-2.547 5.752-5.7 5.752s-5.7-2.58-5.7-5.752c0-2.02 1.033-3.8 2.596-4.826a.5.5 0 0 1 .55.836A4.76 4.76 0 0 0 3.3 8.408c0 2.63 2.11 4.752 4.7 4.752s4.7-2.123 4.7-4.752a4.76 4.76 0 0 0-2.145-3.99.5.5 0 0 1-.144-.692" fill="currentColor"/><path d="M8 2.4c.22 0 .4.18.4.4v4.8a.4.4 0 0 1-.8 0V2.8c0-.22.18-.4.4-.4" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M13.118 4.726a.5.5 0 0 1 .692-.144A7.08 7.08 0 0 1 17 10.51c0 3.897-3.13 7.065-7 7.065s-7-3.168-7-7.065a7.08 7.08 0 0 1 3.19-5.928.5.5 0 0 1 .548.836A6.08 6.08 0 0 0 4 10.51c0 3.355 2.691 6.065 6 6.065s6-2.71 6-6.065c0-2.135-1.09-4.01-2.738-5.092a.5.5 0 0 1-.144-.692" fill="currentColor"/><path d="M10 3a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6A.5.5 0 0 1 10 3" fill="currentColor"/>`,
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

const OffOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

OffOutlinedIcon.displayName = "OffOutlinedIcon";

export default OffOutlinedIcon;
