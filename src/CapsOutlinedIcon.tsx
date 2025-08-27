import * as React from "react";
import type { IconProps } from "./types";

/**
 * CapsOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M8.802 2.96v-.754a.426.426 0 0 0-.425-.425h-6.46a.426.426 0 0 0-.425.425v.755l-.01.102a.5.5 0 0 1-.98 0l-.01-.102v-.755c0-.786.639-1.425 1.425-1.425h6.46c.786 0 1.425.639 1.425 1.425v.755a.5.5 0 0 1-1 0"/><path fill="currentColor" d="M4.648 9.046v-7.39a.5.5 0 1 1 1 0v7.39a.5.5 0 0 1-1 0"/><path fill="currentColor" d="m6.243 8.547.1.01a.5.5 0 0 1 0 .98l-.1.01h-2.79a.5.5 0 0 1 0-1zM10.51 6.23v-.399a.16.16 0 0 0-.16-.16H6.844a.5.5 0 0 1 0-1h3.505c.64 0 1.16.519 1.16 1.16v.4a.5.5 0 0 1-1 0"/><path fill="currentColor" d="M7.54 10.718v-5.28a.5.5 0 0 1 1 0v5.28a.5.5 0 0 1-1 0"/><path fill="currentColor" d="M9.108 10.219a.5.5 0 1 1 0 1h-2.14a.5.5 0 0 1 0-1z"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: { content: { __html: "" }, viewBox: "0 0 16 16" },

  large: { content: { __html: "" }, viewBox: "0 0 16 16" },
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

const CapsOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

CapsOutlinedIcon.displayName = "CapsOutlinedIcon";

export default CapsOutlinedIcon;
