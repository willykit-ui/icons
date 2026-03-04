import * as React from "react";
import type { IconProps } from "./types";

/**
 * SyncOutlinedIcon icon component.
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
      __html: `<path d="M9.5 3.676a.45.45 0 0 1 .45.45V8.2A1.75 1.75 0 0 1 8.2 9.95H5.087l.731.732a.45.45 0 0 1-.636.636l-1.5-1.5a.45.45 0 0 1-.056-.568l.056-.068 1.5-1.5a.45.45 0 0 1 .636.636l-.731.732H8.2c.47 0 .85-.38.85-.85V4.126a.45.45 0 0 1 .45-.45M6.182.683a.45.45 0 0 1 .636 0l1.5 1.5a.45.45 0 0 1 .056.568l-.056.068-1.5 1.5a.45.45 0 0 1-.636-.636l.731-.732H3.8a.85.85 0 0 0-.85.85v4.075a.45.45 0 0 1-.9 0V3.8c0-.967.783-1.75 1.75-1.75h3.113l-.731-.732a.45.45 0 0 1 0-.636" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M13.5 5a.5.5 0 0 1 .5.5v6a2.5 2.5 0 0 1-2.5 2.5H5.207l1.147 1.146a.5.5 0 0 1-.708.707l-2-2a.5.5 0 0 1-.062-.63l.062-.077 2-2a.5.5 0 0 1 .708.707L5.207 13H11.5a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 1 .5-.5M9.646.146a.5.5 0 0 1 .707 0l2 2a.5.5 0 0 1 .063.631l-.062.076-2 2a.5.5 0 1 1-.708-.707L10.793 3H4.5A1.5 1.5 0 0 0 3 4.5v6a.5.5 0 0 1-1 0v-6A2.5 2.5 0 0 1 4.5 2h6.293L9.646.853a.5.5 0 0 1 0-.707" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M16.5 6.427a.55.55 0 0 1 .55.55V14.2a2.85 2.85 0 0 1-2.85 2.85H6.827l1.562 1.561a.55.55 0 1 1-.778.778l-2.5-2.5a.55.55 0 0 1-.069-.694l.07-.084 2.5-2.5a.55.55 0 1 1 .777.778L6.827 15.95H14.2a1.75 1.75 0 0 0 1.75-1.75V6.977a.55.55 0 0 1 .55-.55M11.611.612a.55.55 0 0 1 .778 0l2.5 2.5a.55.55 0 0 1 .069.694l-.07.084-2.5 2.5a.55.55 0 1 1-.777-.778l1.562-1.561H5.8A1.75 1.75 0 0 0 4.05 5.8v7.325a.55.55 0 1 1-1.1 0V5.8A2.85 2.85 0 0 1 5.8 2.95h7.373L11.61 1.39a.55.55 0 0 1 0-.778" fill="currentColor"/>`,
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

const SyncOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

SyncOutlinedIcon.displayName = "SyncOutlinedIcon";

export default SyncOutlinedIcon;
