import * as React from "react";
import type { IconProps } from "./types";

/**
 * ImportOutlinedIcon icon component.
 *
 * @description Supports sizes: small (12px), medium (16px, default), large (20px).
 * Automatically falls back to the closest available size if exact one is missing.
 *
 * @param fontSize - Icon size preset or custom pixel value
 * @param color - Icon color (supports CSS colors, variables, and 'currentColor')
 * @param ...props - All other SVG element props
 */

const svgChildren = {
  small: { content: { __html: "" }, viewBox: "0 0 16 16" },

  medium: {
    content: {
      __html: `<path fill="currentColor" d="M1.5 10.769v-.539c0-.745-.001-1.36.071-1.846.076-.506.242-.942.622-1.283.326-.293.72-.437 1.173-.511.442-.073.983-.087 1.631-.09l.006 1c-.656.003-1.122.019-1.475.077-.342.057-.532.147-.667.268-.146.131-.244.313-.3.686-.06.395-.061.922-.061 1.7v.538c0 .777.001 1.304.06 1.699.057.373.155.555.301.686.154.139.38.237.824.29.453.055 1.054.056 1.915.056h4.8c.861 0 1.462-.001 1.915-.056.444-.053.67-.152.824-.29.146-.13.244-.313.3-.686.06-.395.061-.922.061-1.7v-.538c0-.777-.002-1.304-.06-1.699-.057-.373-.155-.555-.301-.686-.135-.121-.325-.211-.667-.268-.353-.058-.819-.074-1.475-.077l.006-1c.648.003 1.189.017 1.63.09.453.074.848.218 1.174.51.38.342.546.778.622 1.284.072.485.071 1.1.071 1.846v.539c0 .745.001 1.36-.071 1.846-.076.506-.242.941-.622 1.283-.374.335-.836.475-1.372.54-.527.063-1.2.062-2.035.062H5.6c-.836 0-1.508.001-2.035-.062-.536-.065-.998-.205-1.372-.54-.38-.341-.546-.777-.622-1.283-.072-.485-.071-1.1-.071-1.846M7.5 3a.5.5 0 0 1 1 0v6.727l1.134-1.221a.5.5 0 1 1 .732.68l-2 2.154a.5.5 0 0 1-.732 0l-2-2.153a.5.5 0 0 1 .732-.681L7.5 9.726z"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: { content: { __html: "" }, viewBox: "0 0 16 16" },
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

const ImportOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

ImportOutlinedIcon.displayName = "ImportOutlinedIcon";

export default ImportOutlinedIcon;
