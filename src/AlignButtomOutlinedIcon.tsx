import * as React from "react";
import type { IconProps } from "./types";

/**
 * AlignButtomOutlinedIcon icon component.
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
      __html: `<path d="M10.5 10.05a.45.45 0 0 1 0 .9h-9a.45.45 0 0 1 0-.9z" fill="currentColor"/><path fillRule="evenodd" d="M9.6 1.01a.5.5 0 0 1 .4.49v7a.5.5 0 0 1-.4.49L9.5 9h-2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h2zM7.9 8.1h1.2V1.9H7.9z" clipRule="evenodd" fill="currentColor"/><path d="M3.5 4.05a.45.45 0 0 1 .45.45v2.913l.357-.356a.45.45 0 0 1 .636.636L3.818 8.818l-.068.056a.45.45 0 0 1-.568-.056L2.057 7.693a.45.45 0 0 1 .636-.636l.357.356V4.5a.45.45 0 0 1 .45-.45" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M13.5 13a.5.5 0 0 1 0 1h-11a.5.5 0 0 1 0-1zm-8-8a.5.5 0 0 1 .5.5v4.793l.646-.647a.5.5 0 1 1 .708.707l-1.5 1.5a.5.5 0 0 1-.631.063l-.077-.062-1.5-1.5a.5.5 0 1 1 .708-.708l.646.647V5.5a.5.5 0 0 1 .5-.5" fill="currentColor"/><path fillRule="evenodd" d="M12.5 2a.5.5 0 0 1 .5.5v9l-.01.1a.5.5 0 0 1-.49.4h-3l-.1-.01a.5.5 0 0 1-.39-.39L9 11.5v-9a.5.5 0 0 1 .4-.49L9.5 2zM10 11h2V3h-2z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M17.5 16.95a.55.55 0 1 1 0 1.1h-15a.55.55 0 1 1 0-1.1zm-11-11a.55.55 0 0 1 .55.55v7.673l1.06-1.063a.55.55 0 1 1 .778.778l-2 2-.086.07a.55.55 0 0 1-.692-.07l-2-2a.55.55 0 1 1 .778-.778l1.061 1.062V6.5a.55.55 0 0 1 .55-.55" fill="currentColor"/><path fillRule="evenodd" d="M16.6 2.01a.5.5 0 0 1 .4.49v13a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-13l.01-.1a.5.5 0 0 1 .39-.39l.1-.01h5zM12.1 14.9h3.8V3.1h-3.8z" clipRule="evenodd" fill="currentColor"/>`,
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

const AlignButtomOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

AlignButtomOutlinedIcon.displayName = "AlignButtomOutlinedIcon";

export default AlignButtomOutlinedIcon;
