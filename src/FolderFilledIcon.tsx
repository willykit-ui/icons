import * as React from "react";
import type { IconProps } from "./types";

/**
 * FolderFilledIcon icon component.
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
      __html: `<path d="M3.8 1.05c.722 0 1.336.465 1.56 1.111.1.287.336.54.64.54h3.85c.91 0 1.65.738 1.65 1.65V9.3c0 .911-.74 1.65-1.65 1.65h-7.7a1.65 1.65 0 0 1-1.05-.377C.734 10.271.5 9.813.5 9.3V2.7c0-.911.74-1.65 1.65-1.65z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M5.146 1.7c.936 0 1.731.597 2.028 1.43.127.359.426.67.806.67h4.866c1.19 0 2.154.964 2.154 2.153v6.193a2.155 2.155 0 0 1-2.154 2.154H3.154A2.15 2.15 0 0 1 1 12.145v-8.29C1 2.665 1.965 1.7 3.154 1.7z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M6.494 2.3c1.15.001 2.126.73 2.496 1.752.155.43.516.8.973.8h5.88A2.656 2.656 0 0 1 18.5 7.508v7.437a2.657 2.657 0 0 1-2.656 2.657H4.156a2.65 2.65 0 0 1-2.05-.967 2.65 2.65 0 0 1-.606-1.69V4.957a2.656 2.656 0 0 1 2.656-2.656z" fill="currentColor"/>`,
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

const FolderFilledIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

FolderFilledIcon.displayName = "FolderFilledIcon";

export default FolderFilledIcon;
