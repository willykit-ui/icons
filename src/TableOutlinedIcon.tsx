import * as React from "react";
import type { IconProps } from "./types";

/**
 * TableOutlinedIcon icon component.
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
      __html: `<path d="M10.05 7.896H6.394v2.55a.5.5 0 0 1-.014.105H9.2c.47 0 .85-.38.85-.85zm-3.656-.9h3.656v-2.1H6.394zm-4.444 0h3.543v-2.1H1.95zm0 2.705c0 .47.38.85.85.85h2.708a.5.5 0 0 1-.015-.106v-2.55H1.95zm8.1-7.4a.85.85 0 0 0-.85-.85H6.394v2.544h3.656zm-8.1 1.694h3.543V1.451H2.8a.85.85 0 0 0-.85.85zm9 5.706a1.75 1.75 0 0 1-1.75 1.75H2.8a1.75 1.75 0 0 1-1.75-1.75v-7.4c0-.967.783-1.75 1.75-1.75h6.4c.966 0 1.75.783 1.75 1.75z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M13.41 11H8.5v3h3.41a1.5 1.5 0 0 0 1.5-1.5zm-.093-4H8.5v3h4.91V6.99a.5.5 0 0 1-.093.01M2.591 10H7.5V7H2.59zm0 2.5a1.5 1.5 0 0 0 1.5 1.5H7.5v-3H2.59zm10.818-9a1.5 1.5 0 0 0-1.347-1.492L11.91 2H8.5v4h4.817q.047 0 .092.009zM2.591 6H7.5V2H4.09a1.5 1.5 0 0 0-1.5 1.5zm11.818 6.5a2.5 2.5 0 0 1-2.5 2.5H4.091a2.5 2.5 0 0 1-2.5-2.5v-1.99l-.001-.01v-7A2.5 2.5 0 0 1 4.09 1h7.82l.255.013A2.5 2.5 0 0 1 14.409 3.5z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M16.649 13.115h-5.97v4.334h4.22a1.75 1.75 0 0 0 1.75-1.75zm-5.97-1.1h5.97V8.05h-5.97zm-7.33 0h6.23V8.05H3.35zm0 3.684c0 .967.784 1.75 1.75 1.75h4.48v-4.334H3.35zm13.3-11.4a1.75 1.75 0 0 0-1.75-1.75h-4.22v4.4h5.97zm-13.3 2.65h6.23v-4.4H5.1a1.75 1.75 0 0 0-1.75 1.75zm14.4 8.75a2.85 2.85 0 0 1-2.85 2.85h-9.8a2.85 2.85 0 0 1-2.85-2.85V4.3a2.85 2.85 0 0 1 2.85-2.85h9.8a2.85 2.85 0 0 1 2.85 2.85z" fill="currentColor"/>`,
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

const TableOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

TableOutlinedIcon.displayName = "TableOutlinedIcon";

export default TableOutlinedIcon;
