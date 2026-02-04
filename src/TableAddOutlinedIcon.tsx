import * as React from "react";
import type { IconProps } from "./types";

/**
 * TableAddOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M9.548 2.3a.85.85 0 0 0-.85-.849H5.993V4.05H9.5A.05.05 0 0 0 9.55 4zm-.813 8.247V9.179H7.368a.45.45 0 1 1 0-.9h1.367V6.911a.45.45 0 0 1 .9 0V8.28h1.367a.45.45 0 0 1 0 .9H9.635v1.368a.45.45 0 0 1-.9 0M1.449 7.05h3.6v-2.1h-3.6zm0 2.65c0 .47.38.85.85.85h2.7a.05.05 0 0 0 .05-.05V7.95h-3.6zm0-5.65h3.642v-2.6H2.298a.85.85 0 0 0-.85.85zm9-.051a.95.95 0 0 1-.95.95H6.473l-.018.001h-.506v2.513l.004.037-.004.036V10.5a.95.95 0 0 1-.95.95h-2.7A1.75 1.75 0 0 1 .549 9.7V2.3c0-.967.783-1.75 1.75-1.75h6.4c.966 0 1.75.783 1.75 1.75z" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M13 3.5A1.5 1.5 0 0 0 11.5 2H8v4h5zm-1.363 10.41v-1.864H9.772a.5.5 0 0 1 0-1h1.865V9.182a.5.5 0 0 1 1 0v1.864H14.5a.5.5 0 0 1 0 1h-1.863v1.863a.5.5 0 0 1-1 0M2 10h5V7H2zm0 2.5A1.5 1.5 0 0 0 3.5 14H7v-3H2zM2 6h5V2H3.5A1.5 1.5 0 0 0 2 3.5zm12 0a1 1 0 0 1-1 1H8v7a1 1 0 0 1-1 1H3.5A2.5 2.5 0 0 1 1 12.5v-9A2.5 2.5 0 0 1 3.5 1h8A2.5 2.5 0 0 1 14 3.5z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M15.951 4.3a1.75 1.75 0 0 0-1.75-1.75H9.823v4.4h5.678c.248 0 .45-.2.45-.449zm-1.409 12.973v-2.359h-2.358a.551.551 0 0 1 0-1.1h2.358v-2.359a.55.55 0 1 1 1.1 0v2.358h2.359a.55.55 0 0 1 0 1.101h-2.358v2.359a.55.55 0 0 1-1.101 0M2.551 11.95H8.7v-3.9H2.55zm0 3.75c0 .966.784 1.75 1.75 1.75h3.95a.45.45 0 0 0 .45-.45v-3.95h-6.15zm0-8.75h6.173v-4.4H4.3A1.75 1.75 0 0 0 2.55 4.3zm14.5-.449a1.55 1.55 0 0 1-1.55 1.55h-5.7V17a1.55 1.55 0 0 1-1.55 1.55h-3.95a2.85 2.85 0 0 1-2.85-2.85V4.3a2.85 2.85 0 0 1 2.85-2.849h9.9a2.85 2.85 0 0 1 2.85 2.85z" fill="currentColor"/>`,
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

const TableAddOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

TableAddOutlinedIcon.displayName = "TableAddOutlinedIcon";

export default TableAddOutlinedIcon;
