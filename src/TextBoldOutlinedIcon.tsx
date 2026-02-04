import * as React from "react";
import type { IconProps } from "./types";

/**
 * TextBoldOutlinedIcon icon component.
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
      __html: `<path d="M9.063 8.375A1.877 1.877 0 0 0 7.187 6.5h-4.25v3.25c0 .274.227.5.5.5h3.75a1.877 1.877 0 0 0 1.875-1.875m1 0a2.877 2.877 0 0 1-2.876 2.875h-3.75c-.826 0-1.5-.674-1.5-1.5v-7.5c0-.826.674-1.5 1.5-1.5h2.56a2.877 2.877 0 0 1 2.875 2.875c0 .781-.313 1.49-.82 2.008a2.88 2.88 0 0 1 2.01 2.742M2.936 5.5h3.06a1.877 1.877 0 0 0 1.875-1.875A1.877 1.877 0 0 0 5.997 1.75h-2.56c-.273 0-.5.226-.5.5z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M11.95 10.999c0-1.35-1.099-2.45-2.45-2.45H4.05v4.187c0 .39.322.713.713.713H9.5a2.453 2.453 0 0 0 2.45-2.45m1.1 0a3.55 3.55 0 0 1-3.55 3.55H4.763a1.816 1.816 0 0 1-1.813-1.813V3.262c0-.998.815-1.813 1.813-1.813h3.234A3.553 3.553 0 0 1 11.547 5a3.54 3.54 0 0 1-1.11 2.575A3.555 3.555 0 0 1 13.05 11m-9-3.55h3.947c1.35 0 2.45-1.1 2.45-2.45s-1.1-2.45-2.45-2.45H4.763a.717.717 0 0 0-.713.713z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M15.025 13.75a3.154 3.154 0 0 0-3.15-3.15h-6.9v5.32c0 .538.442.98.98.98h5.92a3.154 3.154 0 0 0 3.15-3.15m1.2 0c0 2.4-1.95 4.35-4.35 4.35h-5.92c-1.2 0-2.18-.98-2.18-2.18V4.08c0-1.2.98-2.18 2.18-2.18h4.041c2.4 0 4.35 1.95 4.35 4.35 0 1.3-.573 2.467-1.48 3.265a4.355 4.355 0 0 1 3.359 4.235M4.975 9.4h5.021a3.154 3.154 0 0 0 3.15-3.15 3.154 3.154 0 0 0-3.15-3.15H5.954a.985.985 0 0 0-.98.98z" fill="currentColor"/>`,
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

const TextBoldOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

TextBoldOutlinedIcon.displayName = "TextBoldOutlinedIcon";

export default TextBoldOutlinedIcon;
