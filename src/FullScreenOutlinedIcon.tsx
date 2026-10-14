import * as React from "react";
import type { IconProps, IconComponent } from "./types";

/**
 * FullScreenOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M4.164 7.193a.455.455 0 0 1 .643.643L2.552 10.09h.922a.455.455 0 0 1 0 .909h-2.02A.455.455 0 0 1 1 10.545v-2.02a.455.455 0 0 1 .909 0v.922zm3.029.001a.454.454 0 0 1 .642 0l1.516 1.515.74.738v-.841a.454.454 0 0 1 .909 0v1.94a.455.455 0 0 1-.455.454h-2.02a.455.455 0 0 1 0-.91h.922L7.193 7.838a.455.455 0 0 1 0-.643M3.476 1a.455.455 0 0 1 0 .91h-.922l2.254 2.253a.455.455 0 0 1-.643.643L1.91 2.553v.922a.455.455 0 0 1-.91 0v-2.02C1 1.204 1.204 1 1.455 1zm7.069 0c.25 0 .454.204.454.455v2.02a.455.455 0 0 1-.909 0v-.922L7.836 4.806a.455.455 0 0 1-.643-.643L9.447 1.91h-.922a.455.455 0 0 1 0-.909z"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fill="currentColor" d="M5.646 9.646a.5.5 0 1 1 .708.706L3.707 13H5.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 1 0v1.793zm4 0a.5.5 0 0 1 .707 0L13 12.293V10.5a.5.5 0 0 1 1 0v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1h1.793l-2.647-2.646a.5.5 0 0 1 0-.708M5.5 2a.5.5 0 0 1 0 1H3.707l2.647 2.646a.5.5 0 0 1-.708.708L3 3.707V5.5a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zM14 5.5a.5.5 0 0 1-1 0V3.707l-2.646 2.647a.5.5 0 0 1-.708-.708L12.293 3H10.5a.5.5 0 0 1 0-1h3a.5.5 0 0 1 .5.5z"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fill="currentColor" d="M12.11 12.11a.55.55 0 0 1 .778 0l3.645 3.645v-1.872a.55.55 0 0 1 1.1 0v3.199a.553.553 0 0 1-.55.55h-3.334a.55.55 0 0 1 0-1.1h2.006l-3.645-3.644a.55.55 0 0 1 0-.778m-4.999-.002a.55.55 0 0 1 .778.779L4.244 16.53H6.25a.55.55 0 0 1 0 1.1H2.917a.55.55 0 0 1-.55-.55v-3.333a.55.55 0 0 1 1.1 0v2.005zm9.972-9.742a.55.55 0 0 1 .55.55v3.333a.55.55 0 0 1-1.1 0V4.244L12.89 7.89a.55.55 0 0 1-.778-.779l3.645-3.644H13.75a.55.55 0 1 1 0-1.1zM6.251 2.365a.551.551 0 0 1 0 1.1H4.245L7.89 7.11a.55.55 0 0 1-.779.778L3.467 4.243V6.25a.55.55 0 0 1-1.1 0V2.916a.55.55 0 0 1 .55-.55z"/>`,
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

const FullScreenOutlinedIcon: IconComponent = React.forwardRef<
  SVGSVGElement,
  IconProps
>((props, ref) => {
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
    flexShrink: 0,
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
});

FullScreenOutlinedIcon.displayName = "FullScreenOutlinedIcon";

export default FullScreenOutlinedIcon;
