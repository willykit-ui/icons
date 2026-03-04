import * as React from "react";
import type { IconProps } from "./types";

/**
 * Figures3OutlinedIcon icon component.
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
      __html: `<path fillRule="evenodd" d="M3.5 1c.84 0 1.58.415 2.033 1.05H9.95v7.2L11 11H5l.63-1.05H2.05V5.533A2.5 2.5 0 0 1 1 3.5 2.5 2.5 0 0 1 3.5 1m3.089 9.1H9.41l-.36-.6v-.002L8 7.749zm-.652-7.15Q6 3.216 6 3.5a2.5 2.5 0 0 1-3.05 2.437V9.05h3.22L8 6l1.05 1.749V2.95zM3.5 1.9a1.6 1.6 0 1 0 0 3.199 1.6 1.6 0 0 0 0-3.199" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fillRule="evenodd" d="M4.5 1a3.5 3.5 0 0 1 3.163 2H13v7.889L15 14H6l.643-1H3V7.663A3.5 3.5 0 0 1 4.5 1m3.331 12h5.337L10.5 8.85zm.133-9q.035.245.036.5a3.5 3.5 0 0 1-4 3.464V12h3.286L10.5 7 12 9.333V4zM4.5 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fillRule="evenodd" d="M5.5 1a4.5 4.5 0 0 1 4.226 2.95h6.324v9.222L19 18H8l1.191-1.95h-5.24V9.725A4.5 4.5 0 0 1 5.5 1m4.46 15.9h7.08l-3.54-5.79zm.018-11.85q.021.222.022.45a4.5 4.5 0 0 1-4.95 4.477v4.973h4.814L13.5 9l1.45 2.373V5.05zM5.5 2.1a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8" clipRule="evenodd" fill="currentColor"/>`,
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

const Figures3OutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

Figures3OutlinedIcon.displayName = "Figures3OutlinedIcon";

export default Figures3OutlinedIcon;
