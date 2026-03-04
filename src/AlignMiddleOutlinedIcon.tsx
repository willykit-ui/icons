import * as React from "react";
import type { IconProps } from "./types";

/**
 * AlignMiddleOutlinedIcon icon component.
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
      __html: `<path fillRule="evenodd" d="M9.5 2a.5.5 0 0 1 .5.5v3.05h.5a.45.45 0 0 1 0 .9H10V9.5a.5.5 0 0 1-.5.5h-3l-.1-.01A.5.5 0 0 1 6 9.5V6.45H5V8.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.49-.4L2 8.5V6.45h-.5a.45.45 0 0 1 0-.9H2V3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2.05h1V2.5a.5.5 0 0 1 .4-.49L6.5 2zM6.9 9.1h2.2V2.9H6.9zm-4-3.302q.048.091.05.202-.002.11-.05.201V8.1h1.2V3.9H2.9z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fillRule="evenodd" d="M11.5 3a.5.5 0 0 1 .5.5v4h1.5a.5.5 0 0 1 0 1H12v4l-.01.1a.5.5 0 0 1-.49.4h-3l-.1-.01a.5.5 0 0 1-.39-.39L8 12.5v-4H7v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.49-.4L4 10.5V8.482a.5.5 0 0 1-.125.018H2.5a.5.5 0 0 1 0-1h1.375A.5.5 0 0 1 4 7.517V5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2h1v-4a.5.5 0 0 1 .4-.49L8.5 3zM9 12h2V4H9zm-4-2h1V6H5z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fillRule="evenodd" d="M14.5 3a.5.5 0 0 1 .5.5v5.95h2.5a.55.55 0 1 1 0 1.1H15v5.95a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.49-.4l-.01-.1v-5.95H9v2.95a.5.5 0 0 1-.5.5h-3l-.1-.01a.5.5 0 0 1-.4-.49v-2.95H2.5a.55.55 0 1 1 0-1.1H5V6.5a.5.5 0 0 1 .4-.49L5.5 6h3a.5.5 0 0 1 .5.5v2.95h1V3.5a.5.5 0 0 1 .4-.49l.1-.01zm-3.4 12.9h2.8V4.1h-2.8zm-5-3h1.8V7.1H6.1z" clipRule="evenodd" fill="currentColor"/>`,
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

const AlignMiddleOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

AlignMiddleOutlinedIcon.displayName = "AlignMiddleOutlinedIcon";

export default AlignMiddleOutlinedIcon;
