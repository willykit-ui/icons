import * as React from "react";
import type { IconProps } from "./types";

/**
 * AlignLeftOutlinedIcon icon component.
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
      __html: `<path d="M1.5 1.05a.45.45 0 0 1 .45.451v9a.45.45 0 0 1-.9 0v-9a.45.45 0 0 1 .45-.45" fill="currentColor"/><path fillRule="evenodd" d="M10.5 7.001a.5.5 0 0 1 .5.5v2l-.01.1a.5.5 0 0 1-.49.4h-7a.5.5 0 0 1-.49-.4l-.01-.1v-2a.5.5 0 0 1 .5-.5zm-6.6 2.1h6.2V7.9H3.9z" clipRule="evenodd" fill="currentColor"/><path d="M4.307 2.058a.45.45 0 0 1 .636.636l-.356.357H7.5a.45.45 0 0 1 0 .9H4.587l.356.357a.45.45 0 0 1-.636.636L3.182 3.82l-.056-.068a.45.45 0 0 1 .056-.568z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M2.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5" fill="currentColor"/><path fillRule="evenodd" d="M13.5 9a.5.5 0 0 1 .49.4l.01.1v3a.5.5 0 0 1-.5.5h-9l-.1-.01a.5.5 0 0 1-.4-.49v-3l.01-.1a.5.5 0 0 1 .39-.39L4.5 9zM5 12h8v-2H5z" clipRule="evenodd" fill="currentColor"/><path d="M5.646 3.646a.5.5 0 1 1 .708.708L5.707 5H10.5a.5.5 0 0 1 0 1H5.707l.647.646a.5.5 0 1 1-.708.708l-1.5-1.5-.062-.077a.5.5 0 0 1 .062-.63z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M2.5 1.95a.55.55 0 0 1 .55.549v15a.55.55 0 1 1-1.1 0v-15a.55.55 0 0 1 .55-.55" fill="currentColor"/><path fillRule="evenodd" d="M17.6 11.009c.196.04.35.194.39.39l.01.1v5l-.01.1a.5.5 0 0 1-.49.4h-13a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5h13zm-12.5 4.89h11.8v-3.8H5.1z" clipRule="evenodd" fill="currentColor"/><path d="M6.111 4.11a.55.55 0 1 1 .778.778L5.827 5.949H13.5a.55.55 0 1 1 0 1.1H5.827L6.89 8.11a.55.55 0 1 1-.778.778l-2-2-.07-.086a.55.55 0 0 1 .07-.692z" fill="currentColor"/>`,
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

const AlignLeftOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

AlignLeftOutlinedIcon.displayName = "AlignLeftOutlinedIcon";

export default AlignLeftOutlinedIcon;
