import * as React from "react";
import type { IconProps } from "./types";

/**
 * ZoomOutOutlinedIcon icon component.
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
      __html: `<path d="M7.542 5.016a.45.45 0 0 1 0 .9h-3.75a.45.45 0 0 1 0-.9z" fill="currentColor"/><path fillRule="evenodd" d="M5.907.807a4.667 4.667 0 0 1 4.426 4.66l-.006.241A4.64 4.64 0 0 1 9.27 8.432l2.048 2.05a.45.45 0 0 1-.635.636l-2.051-2.05a4.64 4.64 0 0 1-2.965 1.066l-.24-.006a4.667 4.667 0 0 1-4.421-4.42L1 5.468A4.667 4.667 0 0 1 5.667.8zm-.24.894a3.767 3.767 0 1 0 0 7.533 3.767 3.767 0 0 0 0-7.533" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M10.053 6.754a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" fill="currentColor"/><path fillRule="evenodd" d="M7.553 1c3.454 0 6.253 2.8 6.253 6.254l-.008.321a6.23 6.23 0 0 1-1.577 3.836l2.848 2.582a.55.55 0 0 1-.739.816l-2.912-2.641a6.254 6.254 0 0 1-10.11-4.593L1.3 7.254C1.3 3.8 4.1 1 7.553 1m0 1.1a5.154 5.154 0 1 0 .002 10.308A5.154 5.154 0 0 0 7.553 2.1" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M12.5 8.723a.5.5 0 0 1 0 1H6.25a.5.5 0 0 1 0-1z" fill="currentColor"/><path fillRule="evenodd" d="M9.42 1.8a7.421 7.421 0 0 1 5.545 12.351l3.444 3.211a.6.6 0 1 1-.817.878l-3.496-3.257A7.42 7.42 0 1 1 9.42 1.8m0 1.201a6.22 6.22 0 1 0 0 12.441 6.22 6.22 0 0 0 0-12.441" clipRule="evenodd" fill="currentColor"/>`,
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

const ZoomOutOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

ZoomOutOutlinedIcon.displayName = "ZoomOutOutlinedIcon";

export default ZoomOutOutlinedIcon;
