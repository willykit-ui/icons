import * as React from "react";
import type { IconProps } from "./types";

/**
 * RestartOutlinedIcon icon component.
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
      __html: `<path d="M9.13 1.001a.45.45 0 0 1 .9 0v2.468a.45.45 0 0 1-.45.45H7.193a.45.45 0 0 1 0-.9h1.278a3.94 3.94 0 0 0-5.33.351c-1.588 1.643-1.588 4.312 0 5.955a3.946 3.946 0 0 0 5.717 0 4.3 4.3 0 0 0 1.16-3.505.45.45 0 0 1 .894-.108 5.2 5.2 0 0 1-1.406 4.24c-1.934 2-5.078 2-7.012 0-1.926-1.992-1.926-5.216 0-7.208a4.843 4.843 0 0 1 6.636-.351z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M12.194 1.5a.5.5 0 0 1 1 0v3.208a.5.5 0 0 1-.5.5h-3.13a.5.5 0 0 1 0-1h1.914a5.293 5.293 0 0 0-7.292.314c-2.115 2.169-2.115 5.689 0 7.857a5.3 5.3 0 0 0 7.628 0 5.63 5.63 0 0 0 1.544-4.623.5.5 0 1 1 .992-.121 6.63 6.63 0 0 1-1.82 5.442 6.297 6.297 0 0 1-9.06 0c-2.493-2.556-2.493-6.696 0-9.253a6.293 6.293 0 0 1 8.724-.318z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M15.256 1.999a.55.55 0 0 1 1.1 0v3.948a.55.55 0 0 1-.55.55h-3.871a.55.55 0 0 1 0-1.1h2.544a6.646 6.646 0 0 0-9.249.278c-2.64 2.693-2.64 7.065 0 9.759a6.65 6.65 0 0 0 9.539 0 6.97 6.97 0 0 0 1.927-5.744.55.55 0 0 1 1.092-.133 8.07 8.07 0 0 1-2.234 6.646 7.75 7.75 0 0 1-11.11 0c-3.06-3.121-3.06-8.177 0-11.299a7.75 7.75 0 0 1 10.812-.289z" fill="currentColor"/>`,
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

const RestartOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

RestartOutlinedIcon.displayName = "RestartOutlinedIcon";

export default RestartOutlinedIcon;
