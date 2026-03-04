import * as React from "react";
import type { IconProps } from "./types";

/**
 * ObjectsFilledIcon icon component.
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
      __html: `<path d="M5 1a1 1 0 0 1 1 1v1.05h2V2a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3.95H6V5a1 1 0 0 1-1 1H2.95v1H3a1 1 0 0 1 1 1v.55h1V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-.55H4V10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h.05V6H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M7 2a1 1 0 0 1 1 1v1h2V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5H8v1a1 1 0 0 1-1 1H4v2l.103.005A1 1 0 0 1 5 10v1h2v-1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-1H5v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3a1 1 0 0 1 .897-.995L3 9V7l-.103-.005A1 1 0 0 1 2 6V3a1 1 0 0 1 1-1z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M8.7 2A1.3 1.3 0 0 1 10 3.3V5h3V3.3A1.3 1.3 0 0 1 14.3 2h2.4A1.3 1.3 0 0 1 18 3.3v4.4A1.3 1.3 0 0 1 16.7 9h-2.4A1.3 1.3 0 0 1 13 7.7V6h-3v1.7A1.3 1.3 0 0 1 8.7 9H5v2h.7A1.3 1.3 0 0 1 7 12.3v1.699h2v-1.7A1.3 1.3 0 0 1 10.3 11h6.4a1.3 1.3 0 0 1 1.3 1.3v4.4a1.3 1.3 0 0 1-1.3 1.3h-6.4A1.3 1.3 0 0 1 9 16.7V15H7v1.7A1.3 1.3 0 0 1 5.7 18H3.3A1.3 1.3 0 0 1 2 16.7v-4.4A1.3 1.3 0 0 1 3.3 11H4V9h-.7A1.3 1.3 0 0 1 2 7.7V3.3A1.3 1.3 0 0 1 3.3 2z" fill="currentColor"/>`,
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

const ObjectsFilledIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

ObjectsFilledIcon.displayName = "ObjectsFilledIcon";

export default ObjectsFilledIcon;
