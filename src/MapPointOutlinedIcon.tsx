import * as React from "react";
import type { IconProps } from "./types";

/**
 * MapPointOutlinedIcon icon component.
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
      __html: `<path d="M6 .55c2.41.001 4.35 1.99 4.35 4.424 0 1.047-.403 2.21-1 3.252-.598 1.046-1.417 2.016-2.303 2.668-.143.104-.294.217-.456.296-.183.088-.369.13-.591.13s-.408-.042-.59-.13c-.163-.079-.314-.192-.457-.296-.886-.652-1.705-1.622-2.304-2.668-.596-1.042-1-2.205-1-3.252C1.65 2.539 3.59.55 6 .55m0 .901c-1.898 0-3.45 1.57-3.45 3.523 0 .836.33 1.844.88 2.805.549.958 1.29 1.825 2.056 2.389.164.12.243.176.315.21a.4.4 0 0 0 .199.04.4.4 0 0 0 .2-.04c.07-.034.15-.09.314-.21.767-.564 1.507-1.431 2.055-2.389.55-.961.88-1.969.88-2.805C9.45 3.02 7.897 1.45 6 1.45M6 3.7a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M12.701 6.704A4.703 4.703 0 0 0 8.001 2a4.7 4.7 0 0 0-4.7 4.704c0 1.156.48 2.545 1.265 3.852.783 1.302 1.836 2.464 2.912 3.177.345.23.393.247.523.247s.178-.017.523-.247c1.076-.713 2.129-1.874 2.912-3.176C12.22 9.25 12.7 7.86 12.7 6.704M9.5 6.4a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0m4.201.304c0 1.401-.57 2.971-1.409 4.367-.842 1.401-1.99 2.684-3.215 3.496-.318.211-.604.413-1.076.413s-.757-.202-1.075-.413c-1.225-.812-2.374-2.095-3.216-3.496C2.87 9.675 2.3 8.105 2.3 6.704A5.7 5.7 0 0 1 8.002 1c3.148 0 5.7 2.554 5.7 5.704M10.5 6.4a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M15.75 8.354c0-3.21-2.579-5.805-5.75-5.805S4.25 5.144 4.25 8.354c0 1.446.603 3.182 1.58 4.8.972 1.613 2.278 3.045 3.607 3.904.385.248.436.266.564.266.129 0 .18-.018.564-.266 1.33-.86 2.634-2.291 3.607-3.905.976-1.617 1.578-3.353 1.578-4.799M11.95 8a1.95 1.95 0 1 0-3.9 0 1.95 1.95 0 0 0 3.9 0m4.9.355c0 1.717-.7 3.65-1.736 5.368-1.038 1.721-2.452 3.29-3.952 4.26-.346.223-.66.442-1.161.442-.5 0-.815-.219-1.161-.443-1.5-.97-2.914-2.538-3.952-4.26-1.036-1.716-1.738-3.65-1.738-5.367 0-3.81 3.062-6.905 6.85-6.905s6.85 3.096 6.85 6.905M13.05 8a3.05 3.05 0 1 1-6.1 0 3.05 3.05 0 0 1 6.1 0" fill="currentColor"/>`,
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

const MapPointOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

MapPointOutlinedIcon.displayName = "MapPointOutlinedIcon";

export default MapPointOutlinedIcon;
