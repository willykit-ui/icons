import * as React from "react";
import type { IconProps } from "./types";

/**
 * DangerTriangleFilledIcon icon component.
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
      __html: `<path d="M4.904 1.558a1.25 1.25 0 0 1 2.192 0l4.146 7.54a1.25 1.25 0 0 1-1.094 1.852H1.853A1.25 1.25 0 0 1 .758 9.098zM6 7.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1m0-3.45a.45.45 0 0 0-.45.45v2a.45.45 0 0 0 .9 0v-2A.45.45 0 0 0 6 4.05" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M6.598 1.548C7.156.478 8.683.472 9.25 1.536l6.006 11.258A1.5 1.5 0 0 1 13.934 15H2.05a1.5 1.5 0 0 1-1.33-2.194zm1.397 9.151a.667.667 0 0 0-.654.791q.005.025.013.048l.022.072q.01.023.022.045a.7.7 0 0 0 .144.197l.046.039.052.038q.022.013.046.024.03.016.061.03a1 1 0 0 0 .113.036l.135.013a1 1 0 0 0 .131-.013l.016-.005a1 1 0 0 0 .095-.029q.028-.01.053-.024a.64.64 0 0 0 .233-.192 1 1 0 0 0 .07-.114q.01-.019.018-.039a.7.7 0 0 0 .05-.25.67.67 0 0 0-.532-.653zM8 4.8a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 1 0v-4a.5.5 0 0 0-.5-.5" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M8.378 2.811c.702-1.28 2.542-1.28 3.244 0l6.804 12.398c.676 1.233-.216 2.74-1.622 2.74H3.196c-1.406 0-2.298-1.507-1.622-2.74zM10 13a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5m0-6.75a.55.55 0 0 0-.55.55v4.6a.55.55 0 1 0 1.1 0V6.8a.55.55 0 0 0-.55-.55" fill="currentColor"/>`,
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

const DangerTriangleFilledIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

DangerTriangleFilledIcon.displayName = "DangerTriangleFilledIcon";

export default DangerTriangleFilledIcon;
