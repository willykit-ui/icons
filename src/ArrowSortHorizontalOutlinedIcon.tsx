import * as React from "react";
import type { IconProps } from "./types";

/**
 * ArrowSortHorizontalOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M4.715 1.64a.5.5 0 0 1 .695.72L4.234 3.5H9a.5.5 0 0 1 0 1H4.234L5.41 5.64a.5.5 0 0 1-.695.72l-2.063-2a.5.5 0 0 1 0-.72z"/><path fill="currentColor" d="M7.285 5.64a.5.5 0 0 0-.695.72L7.766 7.5H3a.5.5 0 0 0 0 1h4.766L6.59 9.64a.5.5 0 0 0 .695.72l2.063-2a.5.5 0 0 0 0-.72z"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fill="currentColor" d="M8.89 7.652a.5.5 0 0 1 .708-.012l2.75 2.667a.5.5 0 0 1 0 .718l-2.75 2.667a.5.5 0 1 1-.696-.718l1.865-1.807H4a.5.5 0 0 1 0-1h6.767L8.902 8.359a.5.5 0 0 1-.011-.707M6.403 2.304a.5.5 0 0 1 .696.72L5.233 4.83H12a.5.5 0 0 1 0 1H5.233l1.865 1.807a.5.5 0 1 1-.696.718L3.652 5.69a.5.5 0 0 1 0-.718z"/>`,
    },
    viewBox: "0 0 16 16",
  },

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

const ArrowSortHorizontalOutlinedIcon = React.forwardRef<
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

ArrowSortHorizontalOutlinedIcon.displayName = "ArrowSortHorizontalOutlinedIcon";

export default ArrowSortHorizontalOutlinedIcon;
