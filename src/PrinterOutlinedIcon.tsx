import * as React from "react";
import type { IconProps } from "./types";

/**
 * PrinterOutlinedIcon icon component.
 *
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
      __html: `<path stroke="currentColor" strokeLinecap="round" d="M3.846 8.585H2.6a.6.6 0 0 1-.6-.6V5.062a.6.6 0 0 1 .6-.6h.63m.616 4.123V7.523a.6.6 0 0 1 .6-.6h3.108a.6.6 0 0 1 .6.6V9.4a.6.6 0 0 1-.6.6H4.446a.6.6 0 0 1-.6-.6zm4.308 0H9.4a.6.6 0 0 0 .6-.6V5.062a.6.6 0 0 0-.6-.6h-.63m-5.54 0V2.6a.6.6 0 0 1 .6-.6h4.34a.6.6 0 0 1 .6.6v1.862m-5.54 0h5.54"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fill="currentColor" d="M10.192 9.754a.1.1 0 0 0-.1-.1H5.908a.1.1 0 0 0-.1.1V12.4a.1.1 0 0 0 .1.1h4.186a.1.1 0 0 0 .1-.1zm1 .976H12.4a.1.1 0 0 0 .1-.1V6.678a.1.1 0 0 0-.1-.1H3.6a.1.1 0 0 0-.1.1v3.954l.008.039a.1.1 0 0 0 .092.06h1.208v-.976a1.1 1.1 0 0 1 1.1-1.1h4.185a1.1 1.1 0 0 1 1.1 1.1zm-.23-7.13a.1.1 0 0 0-.1-.1H5.138a.1.1 0 0 0-.1.1v1.977h5.923zm1 1.977h.438a1.1 1.1 0 0 1 1.1 1.1v3.954a1.1 1.1 0 0 1-1.1 1.1h-1.208v.67a1.1 1.1 0 0 1-1.1 1.099H5.908a1.1 1.1 0 0 1-1.1-1.1v-.67H3.6a1.1 1.1 0 0 1-1.094-.987l-.006-.112V6.677a1.1 1.1 0 0 1 1.1-1.1h.438V3.6a1.1 1.1 0 0 1 1.1-1.1h5.723a1.1 1.1 0 0 1 1.1 1.1z"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path stroke="currentColor" strokeLinecap="round" d="M6.23 14.523H3.6a.6.6 0 0 1-.6-.6V7.908a.6.6 0 0 1 .6-.6h1.554m1.077 7.215v-2.308a.6.6 0 0 1 .6-.6h6.338a.6.6 0 0 1 .6.6V16.4a.6.6 0 0 1-.6.6H6.831a.6.6 0 0 1-.6-.6zm7.538 0H16.4a.6.6 0 0 0 .6-.6V7.908a.6.6 0 0 0-.6-.6h-1.554m-9.692 0V3.6a.6.6 0 0 1 .6-.6h8.492a.6.6 0 0 1 .6.6v3.708m-9.692 0h9.692"/>`,
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

const PrinterOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

PrinterOutlinedIcon.displayName = "PrinterOutlinedIcon";

export default PrinterOutlinedIcon;
