import * as React from "react";
import type { IconProps } from "./types";

/**
 * TickCircleOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M6 .5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11m0 .9a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2m1.68 2.785a.45.45 0 1 1 .64.63l-2.856 2.9a.45.45 0 0 1-.642 0L3.68 6.556a.45.45 0 0 1 .64-.631l.823.834z" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M14 8a6 6 0 1 0-6 6v1A7 7 0 1 1 8 1a7 7 0 0 1 0 14v-1a6 6 0 0 0 6-6m-3.636-2.26a.5.5 0 0 1 .693.72l-3.858 3.701a.5.5 0 0 1-.691 0l-1.543-1.48a.5.5 0 0 1 .692-.722l1.197 1.148z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M17.45 9.999a7.45 7.45 0 1 0-14.9 0 7.45 7.45 0 0 0 14.9 0m-4.79-2.541a.55.55 0 1 1 .772.782l-4.357 4.301a.55.55 0 0 1-.773 0l-1.742-1.72a.55.55 0 1 1 .772-.783l1.356 1.338zm5.89 2.541a8.55 8.55 0 0 1-8.55 8.55 8.55 8.55 0 1 1 8.55-8.55" fill="currentColor"/>`,
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

const TickCircleOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

TickCircleOutlinedIcon.displayName = "TickCircleOutlinedIcon";

export default TickCircleOutlinedIcon;
