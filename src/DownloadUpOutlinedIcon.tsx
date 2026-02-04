import * as React from "react";
import type { IconProps } from "./types";

/**
 * DownloadUpOutlinedIcon icon component.
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
      __html: `<path d="M9.75 10a.5.5 0 0 1 0 1h-7.5a.5.5 0 0 1 0-1zM5.5 7.5V2.658l-1.032.973a.5.5 0 0 1-.686-.728l1.875-1.767.077-.06a.5.5 0 0 1 .609.06l1.875 1.767a.5.5 0 1 1-.686.728L6.5 2.658V7.5a.5.5 0 0 1-1 0" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<g clipPath="url(#a)"><path d="M14.5 13.95a.55.55 0 1 1 0 1.099h-13a.55.55 0 1 1 0-1.1zm-7.05-2.451V2.915L5.206 5.37a.55.55 0 1 1-.811-.742l3.199-3.5a.55.55 0 0 1 .812 0l3.2 3.5a.55.55 0 0 1-.811.742L8.55 2.915v8.584a.55.55 0 1 1-1.1 0" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h16v16H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M18 16.9a.6.6 0 1 1 0 1.2H2a.6.6 0 1 1 0-1.2zm-8.708-2.4V3.986l-2.86 2.97a.6.6 0 0 1-.864-.834L9.46 2.084l.092-.078a.6.6 0 0 1 .772.078l3.892 4.038a.6.6 0 0 1-.864.833l-2.86-2.968V14.5a.6.6 0 0 1-1.2 0" fill="currentColor"/>`,
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

const DownloadUpOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

DownloadUpOutlinedIcon.displayName = "DownloadUpOutlinedIcon";

export default DownloadUpOutlinedIcon;
