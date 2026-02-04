import * as React from "react";
import type { IconProps } from "./types";

/**
 * DangerTriangleOutlinedIcon icon component.
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
      __html: `<path d="M4.904 1.558a1.25 1.25 0 0 1 2.192 0l4.146 7.54a1.25 1.25 0 0 1-1.094 1.852H1.853A1.25 1.25 0 0 1 .758 9.098zm1.403.433a.35.35 0 0 0-.614 0l-4.147 7.54a.35.35 0 0 0 .307.519h8.295a.35.35 0 0 0 .306-.519zM6 7.501a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1M6 4.05a.45.45 0 0 1 .45.45v2a.45.45 0 0 1-.9 0v-2A.45.45 0 0 1 6 4.05" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M6.598 1.548C7.156.478 8.683.472 9.25 1.536l6.006 11.258A1.5 1.5 0 0 1 13.934 15H2.05a1.5 1.5 0 0 1-1.33-2.194zm1.77.459a.5.5 0 0 0-.884.004L1.608 13.269A.5.5 0 0 0 2.05 14h11.883a.5.5 0 0 0 .441-.735zm-.373 8.692a.666.666 0 1 1 0 1.333.666.666 0 0 1 0-1.333M8 4.8a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 1 .5-.5" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M8.378 2.811c.702-1.28 2.542-1.28 3.244 0l6.804 12.398c.676 1.233-.216 2.74-1.622 2.74H3.196c-1.406 0-2.298-1.507-1.622-2.74zm2.28.53a.75.75 0 0 0-1.315 0L2.539 15.738a.75.75 0 0 0 .657 1.11h13.608a.75.75 0 0 0 .657-1.11zM10 12.999a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5m0-6.75a.55.55 0 0 1 .55.55v4.6a.55.55 0 1 1-1.1 0v-4.6a.55.55 0 0 1 .55-.55" fill="currentColor"/>`,
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

const DangerTriangleOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

DangerTriangleOutlinedIcon.displayName = "DangerTriangleOutlinedIcon";

export default DangerTriangleOutlinedIcon;
