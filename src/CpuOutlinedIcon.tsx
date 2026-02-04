import * as React from "react";
import type { IconProps } from "./types";

/**
 * CpuOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M9.55 3.3a.85.85 0 0 0-.85-.849H3.3a.85.85 0 0 0-.85.85v5.4c0 .47.38.85.85.85h5.4c.47 0 .85-.38.85-.85zm-1.799 1a.05.05 0 0 0-.05-.049h-3.4a.05.05 0 0 0-.05.05v3.4c0 .028.022.05.05.05h3.4a.05.05 0 0 0 .05-.05zm.9 3.401a.95.95 0 0 1-.95.95h-3.4a.95.95 0 0 1-.95-.95v-3.4a.95.95 0 0 1 .95-.95h3.4a.95.95 0 0 1 .95.95zm1.8-3.65H11a.45.45 0 0 1 0 .9h-.55v2.1H11a.45.45 0 0 1 0 .9h-.55v.75a1.75 1.75 0 0 1-1.75 1.75h-.75v.55a.45.45 0 0 1-.9 0v-.55h-2.1v.55a.45.45 0 0 1-.9 0v-.55H3.3a1.75 1.75 0 0 1-1.75-1.75v-.75H1a.45.45 0 0 1 0-.9h.55v-2.1H1a.45.45 0 0 1 0-.9h.55V3.3c0-.967.783-1.75 1.75-1.75h.75V1a.45.45 0 0 1 .9 0v.55h2.1V1a.45.45 0 0 1 .9 0v.55h.75c.967 0 1.75.783 1.75 1.75z" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M12.701 4.8a1.5 1.5 0 0 0-1.5-1.5h-6.4a1.5 1.5 0 0 0-1.5 1.5v6.4a1.5 1.5 0 0 0 1.5 1.5h6.4a1.5 1.5 0 0 0 1.5-1.5V4.798m-2.1 1.1a.5.5 0 0 0-.5-.5H5.9a.5.5 0 0 0-.5.5v4.2a.5.5 0 0 0 .5.5h4.2a.5.5 0 0 0 .5-.5zm1 4.2a1.5 1.5 0 0 1-1.5 1.5H5.9a1.5 1.5 0 0 1-1.5-1.5V5.9a1.5 1.5 0 0 1 1.5-1.5h4.2a1.5 1.5 0 0 1 1.5 1.5zm2.1-4.55h.799a.5.5 0 0 1 0 1h-.799v2.9h.799a.5.5 0 0 1 0 1h-.799v.75a2.5 2.5 0 0 1-2.5 2.5h-.75v.799a.5.5 0 0 1-1 0v-.8H6.55v.8a.5.5 0 0 1-1 0v-.8H4.8a2.5 2.5 0 0 1-2.5-2.5v-.75h-.8a.5.5 0 1 1 0-1h.8v-2.9h-.8a.5.5 0 0 1 0-1h.802V4.8a2.5 2.5 0 0 1 2.5-2.5h.749v-.8a.5.5 0 0 1 1 0v.8H9.45v-.8a.5.5 0 0 1 1 0v.8h.75a2.5 2.5 0 0 1 2.5 2.5z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M15.95 5.999A1.95 1.95 0 0 0 14 4.049H6a1.95 1.95 0 0 0-1.95 1.95v8A1.95 1.95 0 0 0 6 15.949h8A1.95 1.95 0 0 0 15.95 14zm-2.5 1.5a.95.95 0 0 0-.95-.95h-5a.95.95 0 0 0-.95.95v5c0 .525.425.95.95.95h5a.95.95 0 0 0 .95-.95zm1.1 5a2.05 2.05 0 0 1-2.05 2.05h-5a2.05 2.05 0 0 1-2.05-2.05v-5a2.05 2.05 0 0 1 2.05-2.05h5a2.05 2.05 0 0 1 2.05 2.05zm2.5-5.45H18a.55.55 0 0 1 0 1.1h-.95v3.7H18a.55.55 0 1 1 0 1.1h-.95V14A3.05 3.05 0 0 1 14 17.05h-1.05V18a.55.55 0 0 1-1.1 0v-.951h-3.7V18a.55.55 0 0 1-1.1 0v-.951H6a3.05 3.05 0 0 1-3.05-3.05v-1.05H2a.55.55 0 1 1 0-1.1h.95v-3.7H2a.55.55 0 0 1 0-1.1h.95v-1.05A3.05 3.05 0 0 1 6 2.949h1.05V2a.55.55 0 1 1 1.1 0v.95h3.7V2a.55.55 0 1 1 1.1 0v.95H14A3.05 3.05 0 0 1 17.05 6z" fill="currentColor"/>`,
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

const CpuOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

CpuOutlinedIcon.displayName = "CpuOutlinedIcon";

export default CpuOutlinedIcon;
