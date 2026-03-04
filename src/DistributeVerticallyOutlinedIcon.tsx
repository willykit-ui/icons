import * as React from "react";
import type { IconProps } from "./types";

/**
 * DistributeVerticallyOutlinedIcon icon component.
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
      __html: `<path fillRule="evenodd" d="M7.5 0a.5.5 0 0 1 .5.5v2l-.01.1a.5.5 0 0 1-.49.4H6.45v1h4.05a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H6.45v1H8.5a.5.5 0 0 1 .5.5v2l-.01.1a.5.5 0 0 1-.49.4h-5a.5.5 0 0 1-.49-.4L3 11.5v-2a.5.5 0 0 1 .4-.49L3.5 9h2.05V8H1.5l-.1-.01A.5.5 0 0 1 1 7.5v-3a.5.5 0 0 1 .4-.49L1.5 4h4.05V3H4.5a.5.5 0 0 1-.49-.4L4 2.5v-2a.5.5 0 0 1 .5-.5zM3.9 11.1h4.2V9.9H6.202A.45.45 0 0 1 6 9.95a.45.45 0 0 1-.202-.05H3.9zm-2-4h3.898q.091-.048.202-.05.11.002.202.05H10.1V4.9H6.202A.45.45 0 0 1 6 4.95a.45.45 0 0 1-.202-.05H1.9zm3-5h.898q.091-.048.202-.05.11.002.202.05H7.1V.9H4.9z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fillRule="evenodd" d="M10.5 2a.5.5 0 0 1 .5.5v2l-.01.1a.5.5 0 0 1-.49.4h-2v1h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5v1h3a.5.5 0 0 1 .5.5v2l-.01.1a.5.5 0 0 1-.49.4h-7a.5.5 0 0 1-.49-.4L4 13.5v-2a.5.5 0 0 1 .5-.5h3v-1h-5l-.1-.01A.5.5 0 0 1 2 9.5v-3a.5.5 0 0 1 .4-.49L2.5 6h5V5h-2a.5.5 0 0 1-.49-.4L5 4.5v-2a.5.5 0 0 1 .4-.49L5.5 2zM5 13h6v-1H5zM3 9h10V7H3zm3-5h4V3H6z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fillRule="evenodd" d="M13.5 2a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-2.95v1h6.95a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-6.95v1h3.95a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-9l-.1-.01a.5.5 0 0 1-.4-.49v-3a.5.5 0 0 1 .4-.49l.1-.01h3.95v-1H2.5a.5.5 0 0 1-.49-.4L2 12.5v-5l.01-.1a.5.5 0 0 1 .39-.39L2.5 7h6.95V6H6.5a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5zM6.1 16.9h7.8v-1.8H6.1zm-3-5h13.8V8.1H3.1zm4-7h5.8V3.1H7.1z" clipRule="evenodd" fill="currentColor"/>`,
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

const DistributeVerticallyOutlinedIcon = React.forwardRef<
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

DistributeVerticallyOutlinedIcon.displayName =
  "DistributeVerticallyOutlinedIcon";

export default DistributeVerticallyOutlinedIcon;
