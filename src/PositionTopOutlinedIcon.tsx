import * as React from "react";
import type { IconProps } from "./types";

/**
 * PositionTopOutlinedIcon icon component.
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
      __html: `<path d="M6.001 6.675a.45.45 0 0 1 .45.45v2.29l1-1a.45.45 0 0 1 .636.637l-1.768 1.767a.45.45 0 0 1-.636 0L3.915 9.051a.45.45 0 0 1 .636-.636l1 1v-2.29a.45.45 0 0 1 .45-.45M6 3.05a.45.45 0 0 1 .45.449v1.002a.45.45 0 0 1-.9 0V3.5A.45.45 0 0 1 6 3.05m3.5-2a.45.45 0 0 1 0 .901h-7a.45.45 0 0 1 0-.9z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M8.001 8.999a.5.5 0 0 1 .5.5v2.793l1.504-1.504a.5.5 0 0 1 .707.707l-2.358 2.358a.5.5 0 0 1-.707 0L5.29 11.494a.5.5 0 0 1 .707-.707l1.504 1.504V9.499a.5.5 0 0 1 .5-.5m-.002-5a.5.5 0 0 1 .5.5L8.5 6.5a.5.5 0 0 1-1 0l-.001-2.001a.5.5 0 0 1 .5-.5M13.5 2a.5.5 0 0 1 0 1h-11a.5.5 0 0 1 0-1z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M10.001 10.948a.55.55 0 0 1 .55.551v3.672l2.008-2.009a.55.55 0 0 1 .778.778l-2.947 2.947a.55.55 0 0 1-.778 0L6.666 13.94a.55.55 0 0 1 .777-.778l2.008 2.009v-3.672a.55.55 0 0 1 .55-.55m-.003-6.001a.55.55 0 0 1 .55.55V8.5a.55.55 0 0 1-1.099 0V5.497a.55.55 0 0 1 .549-.549M16.5 2.95a.55.55 0 1 1 0 1.099h-13a.55.55 0 1 1 0-1.1z" fill="currentColor"/>`,
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

const PositionTopOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

PositionTopOutlinedIcon.displayName = "PositionTopOutlinedIcon";

export default PositionTopOutlinedIcon;
