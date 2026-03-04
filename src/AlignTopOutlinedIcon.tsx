import * as React from "react";
import type { IconProps } from "./types";

/**
 * AlignTopOutlinedIcon icon component.
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
      __html: `<path fillRule="evenodd" d="M9.6 3.01a.5.5 0 0 1 .4.491v7a.5.5 0 0 1-.4.49l-.1.01h-2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h2zM7.9 10.1h1.2V3.902H7.9z" clipRule="evenodd" fill="currentColor"/><path d="M3.5 3.05a.45.45 0 0 1 .25.077l.068.056 1.125 1.125a.45.45 0 0 1-.636.636l-.357-.356V7.5a.45.45 0 0 1-.9 0V4.588l-.357.356a.45.45 0 0 1-.636-.636l1.125-1.125A.45.45 0 0 1 3.5 3.05m7-2a.45.45 0 0 1 0 .901h-9a.45.45 0 0 1 0-.9z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fillRule="evenodd" d="M12.5 4a.5.5 0 0 1 .5.5v9l-.01.1a.5.5 0 0 1-.49.4h-3l-.1-.01a.5.5 0 0 1-.39-.39L9 13.5v-9a.5.5 0 0 1 .4-.49L9.5 4zM10 13h2V5h-2z" clipRule="evenodd" fill="currentColor"/><path d="M5.5 4a.5.5 0 0 1 .277.084l.077.062 1.5 1.5a.5.5 0 1 1-.708.708L6 5.707V10.5a.5.5 0 0 1-1 0V5.707l-.646.647a.5.5 0 1 1-.708-.708l1.5-1.5A.5.5 0 0 1 5.5 4m8-2a.5.5 0 0 1 0 1h-11a.5.5 0 0 1 0-1z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fillRule="evenodd" d="M16.5 3.999a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.4.49l-.1.01h-5l-.1-.01a.5.5 0 0 1-.39-.39l-.01-.1v-13a.5.5 0 0 1 .5-.5zm-4.4 12.9h3.8V5.1h-3.8z" clipRule="evenodd" fill="currentColor"/><path d="M6.111 4.11a.55.55 0 0 1 .692-.07l.086.07 2 2a.55.55 0 1 1-.778.778L7.05 5.826V13.5a.55.55 0 1 1-1.1 0V5.826L4.89 6.888a.55.55 0 1 1-.778-.778zM17.5 1.95a.55.55 0 1 1 0 1.099h-15a.55.55 0 1 1 0-1.1z" fill="currentColor"/>`,
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

const AlignTopOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

AlignTopOutlinedIcon.displayName = "AlignTopOutlinedIcon";

export default AlignTopOutlinedIcon;
