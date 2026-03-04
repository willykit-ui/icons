import * as React from "react";
import type { IconProps } from "./types";

/**
 * DrawerRightCloseOutlinedIcon icon component.
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
      __html: `<path fillRule="evenodd" d="M10 1a1 1 0 0 1 1 1v8l-.005.102a1 1 0 0 1-.893.893L10 11H7l-.103-.005a1 1 0 0 1-.892-.893L6 10V2a1 1 0 0 1 1-1zm-3 .9a.1.1 0 0 0-.1.1v8a.1.1 0 0 0 .1.1h3a.1.1 0 0 0 .1-.1V2a.1.1 0 0 0-.1-.1z" clipRule="evenodd" fill="currentColor"/><path d="M2.682 4.182a.45.45 0 0 1 .636 0l1.5 1.5.056.068a.45.45 0 0 1-.056.568l-1.5 1.5a.45.45 0 0 1-.636-.636l.731-.732H.75a.45.45 0 0 1 0-.9h2.663l-.731-.732a.45.45 0 0 1 0-.636" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fillRule="evenodd" d="M14 1a1 1 0 0 1 1 1v12l-.005.102a1 1 0 0 1-.893.893L14 15H9l-.103-.005a1 1 0 0 1-.892-.893L8 14V2a1 1 0 0 1 1-1zM9 14h5V2H9z" clipRule="evenodd" fill="currentColor"/><path d="M3.646 5.646a.5.5 0 0 1 .708 0l2 2 .062.077a.5.5 0 0 1-.062.63l-2 2a.5.5 0 1 1-.708-.707L4.793 8.5H1a.5.5 0 0 1 0-1h3.793L3.646 6.354a.5.5 0 0 1 0-.708" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fillRule="evenodd" d="M17 2a1 1 0 0 1 1 1v14a1 1 0 0 1-.898.995L17 18h-7l-.103-.005A1 1 0 0 1 9 17V3a1 1 0 0 1 1-1zm-6.9 14.9h6.8V3.1h-6.8z" clipRule="evenodd" fill="currentColor"/><path d="M4.611 7.111a.55.55 0 0 1 .778 0l2.5 2.5.069.084a.55.55 0 0 1-.07.694l-2.5 2.5a.55.55 0 1 1-.777-.778l1.562-1.561H1.5a.55.55 0 1 1 0-1.1h4.673L4.61 7.89a.55.55 0 0 1 0-.778" fill="currentColor"/>`,
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

const DrawerRightCloseOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

DrawerRightCloseOutlinedIcon.displayName = "DrawerRightCloseOutlinedIcon";

export default DrawerRightCloseOutlinedIcon;
