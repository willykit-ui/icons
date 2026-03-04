import * as React from "react";
import type { IconProps } from "./types";

/**
 * SquareAddOutlinedIcon icon component.
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
      __html: `<path d="M6 3.55a.45.45 0 0 1 .45.45v1.55H8a.45.45 0 0 1 0 .9H6.45V8a.45.45 0 0 1-.9 0V6.45H4a.45.45 0 0 1 0-.9h1.55V4A.45.45 0 0 1 6 3.55" fill="currentColor"/><path fillRule="evenodd" d="M9.256.513A2.5 2.5 0 0 1 11.5 3v6l-.013.256a2.5 2.5 0 0 1-2.231 2.231L9 11.5H3A2.5 2.5 0 0 1 .513 9.256L.5 9V3A2.5 2.5 0 0 1 3 .5h6zM3 1.4A1.6 1.6 0 0 0 1.4 3v6A1.6 1.6 0 0 0 3 10.6h6A1.6 1.6 0 0 0 10.6 9V3A1.6 1.6 0 0 0 9 1.4z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M8 4.5a.5.5 0 0 1 .5.5v2.5H11a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V8.5H5a.5.5 0 0 1 0-1h2.5V5a.5.5 0 0 1 .5-.5" fill="currentColor"/><path fillRule="evenodd" d="M12.154 1.004A3 3 0 0 1 15 4v8l-.004.154a3 3 0 0 1-2.842 2.842L12 15H4a3 3 0 0 1-2.996-2.846L1 12V4a3 3 0 0 1 3-3h8zM4 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M10 5.95a.55.55 0 0 1 .55.55v2.95h2.95a.55.55 0 1 1 0 1.1h-2.95v2.95a.55.55 0 1 1-1.1 0v-2.95H6.5a.55.55 0 1 1 0-1.1h2.95V6.5a.55.55 0 0 1 .55-.55" fill="currentColor"/><path fillRule="evenodd" d="M15.18 1.505A3.5 3.5 0 0 1 18.5 5v10l-.005.18a3.5 3.5 0 0 1-3.315 3.315L15 18.5H5a3.5 3.5 0 0 1-3.495-3.32L1.5 15V5A3.5 3.5 0 0 1 5 1.5h10zM5 2.6A2.4 2.4 0 0 0 2.6 5v10A2.4 2.4 0 0 0 5 17.4h10a2.4 2.4 0 0 0 2.4-2.4V5A2.4 2.4 0 0 0 15 2.6z" clipRule="evenodd" fill="currentColor"/>`,
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

const SquareAddOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

SquareAddOutlinedIcon.displayName = "SquareAddOutlinedIcon";

export default SquareAddOutlinedIcon;
