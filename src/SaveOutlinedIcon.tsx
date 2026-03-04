import * as React from "react";
import type { IconProps } from "./types";

/**
 * SaveOutlinedIcon icon component.
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
      __html: `<path d="M6.5 3.05a.45.45 0 0 1 0 .901h-2a.45.45 0 0 1 0-.9z" fill="currentColor"/><path fillRule="evenodd" d="M6.962 1.05c.464 0 .91.185 1.237.513l2.239 2.239c.328.328.512.773.512 1.237v4.162a1.75 1.75 0 0 1-1.75 1.75H2.8a1.75 1.75 0 0 1-1.75-1.75v-6.4c0-.967.783-1.75 1.75-1.75zM2.8 1.952a.85.85 0 0 0-.85.85v6.4c0 .47.38.85.85.85h1.272l-.014-1.036a.95.95 0 0 1 .949-.963l1.967-.001a.95.95 0 0 1 .95.936l.014 1.064H9.2c.47 0 .85-.38.85-.85V5.04a.85.85 0 0 0-.25-.6L7.563 2.2a.85.85 0 0 0-.6-.249zm2.207 7a.05.05 0 0 0-.05.051l.015 1.049h2.066L7.023 9a.05.05 0 0 0-.05-.049z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M8.5 4.047a.5.5 0 1 1 0 1h-3a.5.5 0 0 1 0-1z" fill="currentColor"/><path fillRule="evenodd" d="M9.12 1c.701 0 1.37.295 1.843.812l2.88 3.143a2.5 2.5 0 0 1 .657 1.689V12.5A2.5 2.5 0 0 1 12 15H4a2.5 2.5 0 0 1-2.5-2.5v-9A2.5 2.5 0 0 1 4 1zM4 2a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 4 14h1v-1.5A1.5 1.5 0 0 1 6.5 11h3a1.5 1.5 0 0 1 1.5 1.5V14h1a1.5 1.5 0 0 0 1.5-1.5V6.644a1.5 1.5 0 0 0-.394-1.013l-2.88-3.145A1.5 1.5 0 0 0 9.12 2zm2.5 10a.5.5 0 0 0-.5.5V14h4v-1.5a.5.5 0 0 0-.5-.5z" clipRule="evenodd" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M10.5 4.95a.55.55 0 1 1 0 1.099h-4a.55.55 0 1 1 0-1.1z" fill="currentColor"/><path fillRule="evenodd" d="M11.476 1.95c.807 0 1.578.342 2.119.943l3.223 3.582c.471.523.732 1.203.732 1.907v6.817a2.85 2.85 0 0 1-2.85 2.85H5.3a2.85 2.85 0 0 1-2.85-2.85V4.8A2.85 2.85 0 0 1 5.3 1.95zM5.3 3.048a1.75 1.75 0 0 0-1.75 1.75v10.4c0 .967.783 1.75 1.75 1.75h.65v-1.451c0-.856.694-1.55 1.55-1.55h5c.856 0 1.55.693 1.55 1.55v1.451h.65a1.75 1.75 0 0 0 1.75-1.75V8.382c0-.432-.16-.85-.449-1.171l-3.225-3.583a1.75 1.75 0 0 0-1.3-.58zm2.2 11.999a.45.45 0 0 0-.45.45v1.451h5.9v-1.452a.45.45 0 0 0-.45-.45z" clipRule="evenodd" fill="currentColor"/>`,
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

const SaveOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

SaveOutlinedIcon.displayName = "SaveOutlinedIcon";

export default SaveOutlinedIcon;
