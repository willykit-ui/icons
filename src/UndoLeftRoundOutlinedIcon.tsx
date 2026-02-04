import * as React from "react";
import type { IconProps } from "./types";

/**
 * UndoLeftRoundOutlinedIcon icon component.
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
      __html: `<path d="M10.5 6.923c0-1.416-1.168-2.577-2.625-2.577H2.22l1.006.99a.5.5 0 0 1-.702.713L.65 4.202a.5.5 0 0 1 0-.712l1.875-1.847a.5.5 0 0 1 .702.713l-1.005.99h5.654c1.995 0 3.625 1.594 3.625 3.577S9.87 10.5 7.875 10.5H3.5a.5.5 0 0 1 0-1h4.375c1.457 0 2.625-1.161 2.625-2.577" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M14.45 9.316a3.83 3.83 0 0 0-3.825-3.835H2.326l1.689 1.692a.55.55 0 0 1-.78.778L.61 5.32a.55.55 0 0 1 0-.778l2.625-2.63a.55.55 0 0 1 .78.777L2.326 4.38h8.299a4.93 4.93 0 0 1 4.925 4.935 4.93 4.93 0 0 1-4.925 4.934H4.5a.55.55 0 0 1 0-1.1h6.125a3.83 3.83 0 0 0 3.825-3.834" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M17.4 11.454c0-2.328-1.952-4.247-4.4-4.247H3.481l1.937 1.877a.6.6 0 0 1-.836.862l-3-2.908a.6.6 0 0 1 0-.862l3-2.907a.6.6 0 0 1 .836.861L3.481 6.007H13c3.075 0 5.6 2.421 5.6 5.447 0 3.025-2.525 5.446-5.6 5.446H6a.6.6 0 0 1 0-1.2h7c2.448 0 4.4-1.919 4.4-4.246" fill="currentColor"/>`,
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

const UndoLeftRoundOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

UndoLeftRoundOutlinedIcon.displayName = "UndoLeftRoundOutlinedIcon";

export default UndoLeftRoundOutlinedIcon;
