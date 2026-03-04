import * as React from "react";
import type { IconProps } from "./types";

/**
 * TextOutlinedIcon icon component.
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
      __html: `<path d="M3.5 8.05a.45.45 0 0 1 0 .901h-2a.45.45 0 0 1 0-.9z" fill="currentColor"/><path fillRule="evenodd" d="M8.25 3.176a.45.45 0 0 1 .408.261l2.25 4.876a.45.45 0 1 1-.816.376L9.29 6.951H7.21L6.408 8.69a.45.45 0 1 1-.816-.377l2.25-4.874.031-.057a.45.45 0 0 1 .377-.205M7.626 6.05h1.248L8.25 4.698z" clipRule="evenodd" fill="currentColor"/><path d="M4.5 5.55a.45.45 0 0 1 0 .901h-3a.45.45 0 0 1 0-.9zm1.875-2.5a.45.45 0 0 1 0 .901H1.5a.45.45 0 0 1 0-.9z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fillRule="evenodd" d="M11.04 4a.5.5 0 0 1 .458.305l2.963 7a.501.501 0 0 1-.922.39L12.4 9H9.624L8.45 11.7a.501.501 0 0 1-.918-.4l3.046-7 .034-.065A.5.5 0 0 1 11.04 4m-.98 4h1.916l-.946-2.232z" clipRule="evenodd" fill="currentColor"/><path d="M5.5 11a.5.5 0 0 1 0 1H1.991a.5.5 0 0 1 0-1zm1-3.5a.5.5 0 0 1 0 1H1.993a.5.5 0 0 1 0-1zm2-3.5a.5.5 0 0 1 0 1H1.993a.5.5 0 0 1 0-1z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M6.5 13.95a.55.55 0 1 1 0 1.099h-4a.55.55 0 1 1 0-1.1z" fill="currentColor"/><path fillRule="evenodd" d="M13.5 4.95a.55.55 0 0 1 .513.35l3.5 9a.55.55 0 0 1-1.026.398l-1.03-2.65h-3.914l-1.03 2.65a.55.55 0 0 1-1.026-.398l3.5-9a.55.55 0 0 1 .513-.35m-1.53 6h3.06L13.5 7.016z" clipRule="evenodd" fill="currentColor"/><path d="M8.325 9.45a.55.55 0 1 1 0 1.099H2.492a.55.55 0 1 1 0-1.1zm2.175-4.5a.55.55 0 1 1 0 1.099h-8a.55.55 0 1 1 0-1.1z" fill="currentColor"/>`,
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

const TextOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

TextOutlinedIcon.displayName = "TextOutlinedIcon";

export default TextOutlinedIcon;
