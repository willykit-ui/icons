import * as React from "react";
import type { IconProps } from "./types";

/**
 * HeightOutlinedIcon icon component.
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
      __html: `<path fillRule="evenodd" d="M10.5 1a.5.5 0 0 1 .5.5v9l-.01.1a.5.5 0 0 1-.49.4h-3a.5.5 0 0 1-.49-.4L7 10.5v-9a.5.5 0 0 1 .5-.5zm-2.6 9.1h2.2V1.9H7.9z" clipRule="evenodd" fill="currentColor"/><path d="M2.5 10.05a.45.45 0 0 1 0 .9h-1a.45.45 0 0 1 0-.9zm3 0a.45.45 0 0 1 0 .9h-1a.45.45 0 0 1 0-.9zM3.252 3.124a.45.45 0 0 1 .566.058l1.125 1.125a.45.45 0 0 1-.636.636l-.357-.356v2.826l.357-.356a.45.45 0 0 1 .636.636L3.818 8.818a.45.45 0 0 1-.636 0L2.057 7.693a.45.45 0 0 1 .636-.636l.357.356V4.587l-.357.356a.45.45 0 0 1-.636-.636l1.125-1.125zM2.5 1.05a.45.45 0 0 1 0 .9h-1a.45.45 0 0 1 0-.9zm3 0a.45.45 0 0 1 0 .9h-1a.45.45 0 0 1 0-.9z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M3.5 13a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm5 0a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1z" fill="currentColor"/><path fillRule="evenodd" d="M13.5 2a.5.5 0 0 1 .5.5v11l-.01.1a.5.5 0 0 1-.49.4h-3a.5.5 0 0 1-.49-.4l-.01-.1v-11a.5.5 0 0 1 .5-.5zM11 13h2V3h-2z" clipRule="evenodd" fill="currentColor"/><path d="M4.225 4.082a.5.5 0 0 1 .629.064l1.5 1.5a.5.5 0 1 1-.708.708L5 5.707v4.586l.646-.647a.5.5 0 1 1 .708.707l-1.5 1.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.707l.646.647V5.707l-.646.647a.5.5 0 1 1-.708-.708l1.5-1.5zM3.5 2a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm5 0a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M4.5 16.95a.55.55 0 1 1 0 1.099h-2a.55.55 0 1 1 0-1.1zm6 0a.55.55 0 1 1 0 1.099h-4a.55.55 0 1 1 0-1.1z" fill="currentColor"/><path fillRule="evenodd" d="M17.5 1.999a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.4.49l-.1.01h-5l-.1-.01a.5.5 0 0 1-.39-.39l-.01-.1v-15a.5.5 0 0 1 .5-.5zm-4.4 14.9h3.8V3.1h-3.8z" clipRule="evenodd" fill="currentColor"/><path d="M5.197 5.04a.55.55 0 0 1 .692.07l1.875 1.875a.55.55 0 1 1-.778.778l-.936-.937v6.346l.936-.937a.55.55 0 1 1 .778.778l-1.875 1.875a.55.55 0 0 1-.778 0l-1.875-1.875a.55.55 0 1 1 .778-.778l.936.937V6.826l-.936.937a.55.55 0 1 1-.778-.778L5.111 5.11zM4.5 1.95a.55.55 0 1 1 0 1.099h-2a.55.55 0 1 1 0-1.1zm6 0a.55.55 0 1 1 0 1.099h-4a.55.55 0 1 1 0-1.1z" fill="currentColor"/>`,
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

const HeightOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

HeightOutlinedIcon.displayName = "HeightOutlinedIcon";

export default HeightOutlinedIcon;
