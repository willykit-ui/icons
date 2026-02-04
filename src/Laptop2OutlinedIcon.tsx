import * as React from "react";
import type { IconProps } from "./types";

/**
 * Laptop2OutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M9.55 1.8a.35.35 0 0 0-.35-.349H2.8a.35.35 0 0 0-.35.35v5.25h7.1zm-8.368 8.75h9.636L9.703 7.952H2.297zM6 4.55a.45.45 0 0 1 0 .901H4a.45.45 0 0 1 0-.9zm2-1.5a.45.45 0 0 1 0 .901H4a.45.45 0 0 1 0-.9zm2.45 4.25q0 .05-.01.096l.026.05 1.33 3.099a.65.65 0 0 1-.598.906H.803a.65.65 0 0 1-.597-.906l1.329-3.1.024-.049a1 1 0 0 1-.009-.095V1.8c0-.69.56-1.25 1.25-1.25h6.4c.69 0 1.25.56 1.25 1.25z" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h12v12H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M13 2.7a.7.7 0 0 0-.701-.7h-8.6a.7.7 0 0 0-.7.7v6.84h10zM1.272 14h13.455l-1.552-3.46H2.824zM8.7 6a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1zm1.5-1.5a.5.5 0 0 1 0 1H5.7a.5.5 0 0 1 0-1zM14 9.957l.003.006.064.118 1.574 3.51A1 1 0 0 1 14.728 15H1.273a1 1 0 0 1-.913-1.41l1.574-3.509.063-.118L2 9.96V2.7A1.7 1.7 0 0 1 3.7 1h8.6A1.7 1.7 0 0 1 14 2.7z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M2.752 3.898A1.95 1.95 0 0 1 4.7 1.95h10.6a1.95 1.95 0 0 1 1.95 1.95v8.633l.007.008.078.127 2.248 4.306a1.077 1.077 0 0 1-.955 1.576H1.37c-.81 0-1.33-.859-.955-1.576l2.249-4.306.077-.127.007-.009zM1.407 17.45h17.186l-2.227-4.262H3.634zm9.593-9a.55.55 0 1 1 0 1.1H7a.55.55 0 0 1 0-1.1zm2-2a.55.55 0 1 1 0 1.1H7a.55.55 0 0 1 0-1.1zm-9.152 5.639h12.304v-8.19a.85.85 0 0 0-.85-.85H4.7a.85.85 0 0 0-.85.85z" fill="currentColor"/>`,
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

const Laptop2OutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

Laptop2OutlinedIcon.displayName = "Laptop2OutlinedIcon";

export default Laptop2OutlinedIcon;
