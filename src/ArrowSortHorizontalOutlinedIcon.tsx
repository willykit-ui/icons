import * as React from "react";
import type { IconProps } from "./types";

/**
 * ArrowSortHorizontalOutlinedIcon icon component.
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
      __html: `<path d="M6.948 5.682a.45.45 0 0 1 .637.001l2.234 2.25a.45.45 0 0 1 0 .635l-2.234 2.25a.45.45 0 0 1-.639-.634L8.418 8.7H3a.45.45 0 0 1 0-.9h5.418L6.946 6.318a.45.45 0 0 1 .002-.636M4.415 1.183a.45.45 0 0 1 .639.635L3.582 3.301H9a.45.45 0 0 1 0 .9H3.582l1.472 1.482a.45.45 0 0 1-.64.635l-2.233-2.25a.45.45 0 0 1 0-.635z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M9.38 7.647a.5.5 0 0 1 .706-.002l3.266 3.25a.5.5 0 0 1 0 .708l-3.266 3.25a.5.5 0 1 1-.705-.71l2.408-2.394h-7.79a.5.5 0 1 1 0-1h7.79L9.38 8.354a.5.5 0 0 1-.002-.707M5.912 1.143a.5.5 0 0 1 .705.71L4.21 4.246H12a.5.5 0 0 1 0 1H4.21l2.408 2.395a.5.5 0 0 1-.705.709L2.647 5.1a.5.5 0 0 1 0-.708z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M12.148 9.62a.55.55 0 0 1 .778-.02l3.953 3.75a.55.55 0 0 1 0 .799l-3.953 3.75a.55.55 0 0 1-.758-.799l2.952-2.8H5a.55.55 0 1 1 0-1.1h10.12l-2.952-2.801a.55.55 0 0 1-.02-.778M7.074 2.1a.55.55 0 0 1 .758.799l-2.952 2.8H15a.55.55 0 1 1 0 1.1H4.88L7.832 9.6a.55.55 0 0 1-.758.799l-3.953-3.75a.55.55 0 0 1 0-.799z" fill="currentColor"/>`,
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
