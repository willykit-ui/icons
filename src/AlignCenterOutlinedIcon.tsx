import * as React from "react";
import type { IconProps } from "./types";

/**
 * AlignCenterOutlinedIcon icon component.
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
      __html: `<path fillRule="evenodd" d="M6 1.05a.45.45 0 0 1 .45.451v.5H8.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H6.45v1H9.5a.5.5 0 0 1 .49.4l.01.1v3a.5.5 0 0 1-.5.5H6.45v.5a.45.45 0 0 1-.9 0v-.5H2.5a.5.5 0 0 1-.5-.5v-3l.01-.1A.5.5 0 0 1 2.5 6h3.05V5H3.5a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .4-.49L3.5 2h2.05v-.5A.45.45 0 0 1 6 1.05M2.9 9.1h6.2V6.902H2.9zm1-5h4.2V2.902H6.202a.45.45 0 0 1-.202.05.45.45 0 0 1-.202-.05H3.9z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v1.375A.5.5 0 0 1 8.482 4H10.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2v1h4a.5.5 0 0 1 .49.4l.01.1v3a.5.5 0 0 1-.5.5h-4v1.5a.5.5 0 0 1-1 0V12h-4l-.1-.01a.5.5 0 0 1-.4-.49v-3l.01-.1a.5.5 0 0 1 .39-.39L3.5 8h4V7h-2a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .4-.49L5.5 4h2.018a.5.5 0 0 1-.018-.125V2.5A.5.5 0 0 1 8 2m-4 9h8V9H4zm2-5h4V5H6z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fillRule="evenodd" d="M10 1.95a.55.55 0 0 1 .55.549v2.5h2.95a.5.5 0 0 1 .49.4l.01.1v3a.5.5 0 0 1-.5.5h-2.95v1h5.95a.5.5 0 0 1 .49.4l.01.1v4a.5.5 0 0 1-.5.5h-5.95v2.5a.55.55 0 1 1-1.1 0v-2.5H3.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .4-.49l.1-.01h5.95v-1H6.5a.5.5 0 0 1-.5-.5v-3l.01-.1a.5.5 0 0 1 .49-.4h2.95v-2.5a.55.55 0 0 1 .55-.55M4.1 13.9h11.8v-2.801H4.1zm3-6h5.8V6.098H7.1z" clipRule="evenodd" fill="currentColor"/>`,
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

const AlignCenterOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

AlignCenterOutlinedIcon.displayName = "AlignCenterOutlinedIcon";

export default AlignCenterOutlinedIcon;
