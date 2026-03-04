import * as React from "react";
import type { IconProps } from "./types";

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
      __html: `<path d="M4.182 7.182a.45.45 0 0 1 .636.636l-2.232 2.233h.913a.45.45 0 0 1 0 .9h-2a.45.45 0 0 1-.45-.45v-2a.45.45 0 0 1 .9 0v.913zm3 .001a.45.45 0 0 1 .635 0l1.501 1.5.732.731v-.833a.45.45 0 0 1 .9 0v1.92a.45.45 0 0 1-.45.45h-2a.45.45 0 0 1 0-.9h.913L7.182 7.819a.45.45 0 0 1 0-.636M3.501 1.05a.45.45 0 0 1 0 .901h-.913l2.231 2.232a.45.45 0 0 1-.636.636L1.95 2.588V3.5a.45.45 0 0 1-.9 0v-2a.45.45 0 0 1 .45-.45zm6.999 0a.45.45 0 0 1 .45.451v2a.45.45 0 0 1-.9 0v-.913L7.818 4.819a.45.45 0 0 1-.636-.636L9.413 1.95H8.5a.45.45 0 0 1 0-.9z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M5.646 9.646a.5.5 0 1 1 .708.706L3.707 13H5.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 1 0v1.793zm4 0a.5.5 0 0 1 .707 0L13 12.293V10.5a.5.5 0 0 1 1 0v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1h1.793l-2.647-2.646a.5.5 0 0 1 0-.708m4.021-7.812a.5.5 0 0 1 .5.5v2.667a.5.5 0 0 1-1 0v-1.46l-2.813 2.813a.5.5 0 0 1-.708-.707l2.814-2.813H11a.5.5 0 0 1 0-1zM5.5 2a.5.5 0 0 1 0 1H3.707l2.647 2.646a.5.5 0 0 1-.708.708L3 3.707V5.5a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M12.11 12.11a.55.55 0 0 1 .778 0l3.645 3.645v-1.872a.55.55 0 0 1 1.1 0v3.199a.553.553 0 0 1-.55.55h-3.334a.55.55 0 0 1 0-1.1h2.006l-3.645-3.644a.55.55 0 0 1 0-.778m-4.999-.002a.55.55 0 0 1 .778.779L4.244 16.53H6.25a.55.55 0 0 1 0 1.1H2.917a.55.55 0 0 1-.55-.55v-3.333a.55.55 0 0 1 1.1 0v2.005zm9.972-9.742a.55.55 0 0 1 .55.55v3.333a.55.55 0 0 1-1.1 0V4.244L12.89 7.89a.55.55 0 0 1-.778-.779l3.645-3.644H13.75a.55.55 0 1 1 0-1.1zM6.251 2.365a.551.551 0 0 1 0 1.1H4.245L7.89 7.11a.55.55 0 0 1-.779.778L3.467 4.243V6.25a.55.55 0 0 1-1.1 0V2.916a.55.55 0 0 1 .55-.55z" fill="currentColor"/>`,
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

const FullScreenOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

FullScreenOutlinedIcon.displayName = "FullScreenOutlinedIcon";

export default FullScreenOutlinedIcon;
