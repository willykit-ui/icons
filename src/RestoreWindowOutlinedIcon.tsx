import * as React from "react";
import type { IconProps } from "./types";

/**
 * RestoreWindowOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M11 .55a.45.45 0 0 1 .45.451v7.5a.45.45 0 0 1-.45.45H8.95v2.05a.45.45 0 0 1-.45.45H1a.45.45 0 0 1-.45-.45v-7.5a.45.45 0 0 1 .45-.45h2.05V1A.45.45 0 0 1 3.5.55zm-9.55 10h6.6V3.952h-6.6zm2.5-7.5H8.5a.45.45 0 0 1 .45.451v4.55h1.6v-6.6h-6.6z" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M14.5 1a.5.5 0 0 1 .5.5v9.75a.5.5 0 0 1-.5.5h-2.75v2.75a.5.5 0 0 1-.5.5H1.5a.5.5 0 0 1-.5-.5V4.75a.5.5 0 0 1 .5-.5h2.75V1.5a.5.5 0 0 1 .5-.5zM2 14h8.75V5.25H2zm3.25-9.75h6a.5.5 0 0 1 .5.5v6H14V2H5.25z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M18 1.45a.55.55 0 0 1 .55.549v12a.55.55 0 0 1-.55.55h-3.45v3.45a.55.55 0 0 1-.55.55H2a.55.55 0 0 1-.55-.55v-12a.55.55 0 0 1 .55-.55h3.45V2A.55.55 0 0 1 6 1.45zm-15.45 16h10.9V6.548H2.55zm4-12H14a.55.55 0 0 1 .55.549v7.45h2.9V2.55H6.55z" fill="currentColor"/>`,
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

const RestoreWindowOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

RestoreWindowOutlinedIcon.displayName = "RestoreWindowOutlinedIcon";

export default RestoreWindowOutlinedIcon;
