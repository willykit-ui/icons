import * as React from "react";
import type { IconProps } from "./types";

/**
 * OutputOutlinedIcon icon component.
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
      __html: `<path d="M3.932 4.433a.45.45 0 0 1 .636.636l-.481.482H7.5a.45.45 0 0 1 0 .9H4.087l.481.482a.45.45 0 0 1-.636.636l-1.25-1.25a.45.45 0 0 1 0-.636zM3.55 3.2v-.25H2.5a.55.55 0 0 0-.55.55v5c0 .304.246.55.55.55h1.05V8.8a.45.45 0 0 1 .9 0v.9c0 .47.38.85.85.85h3.9c.47 0 .85-.38.85-.85V2.3a.85.85 0 0 0-.85-.85H5.3a.85.85 0 0 0-.85.85v.9a.45.45 0 0 1-.9 0m7.4 6.5a1.75 1.75 0 0 1-1.75 1.75H5.3a1.75 1.75 0 0 1-1.73-1.5H2.5c-.8 0-1.45-.65-1.45-1.45v-5c0-.8.65-1.45 1.45-1.45h1.07A1.75 1.75 0 0 1 5.3.55h3.9c.966 0 1.75.783 1.75 1.75z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M5.44 6.006a.5.5 0 0 1 .675.738l-.827.756H10.4a.5.5 0 0 1 0 1H5.288l.827.756a.5.5 0 0 1-.675.738L3.663 8.37a.5.5 0 0 1 0-.738zM5 4.5V4H3.5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1H5v-.5a.5.5 0 0 1 1 0v1A1.5 1.5 0 0 0 7.5 14H12a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 12 2H7.5A1.5 1.5 0 0 0 6 3.5v1a.5.5 0 0 1-1 0m9.5 8A2.5 2.5 0 0 1 12 15H7.5a2.5 2.5 0 0 1-2.45-2H3.5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h1.55A2.5 2.5 0 0 1 7.5 1H12a2.5 2.5 0 0 1 2.5 2.5z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M6.45 13.999a.55.55 0 1 1 1.1 0v1.8c0 .911.739 1.65 1.65 1.65h6.1a1.65 1.65 0 0 0 1.65-1.65v-11.6a1.65 1.65 0 0 0-1.65-1.65H9.2a1.65 1.65 0 0 0-1.65 1.65V6a.55.55 0 1 1-1.1 0V4.55H4.3c-.69 0-1.25.56-1.25 1.25v8.4c0 .69.56 1.25 1.25 1.25h2.15zm.374-6.406a.55.55 0 1 1 .74.812L6.42 9.45h6.48a.55.55 0 0 1 0 1.1H6.42l1.145 1.044a.55.55 0 1 1-.74.812l-2.194-2a.55.55 0 0 1 0-.812zm11.226 8.206a2.75 2.75 0 0 1-2.75 2.75H9.2a2.75 2.75 0 0 1-2.644-2H4.3a2.35 2.35 0 0 1-2.35-2.35V5.8A2.35 2.35 0 0 1 4.3 3.45h2.256a2.75 2.75 0 0 1 2.644-2h6.1a2.75 2.75 0 0 1 2.75 2.75z" fill="currentColor"/>`,
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

const OutputOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

OutputOutlinedIcon.displayName = "OutputOutlinedIcon";

export default OutputOutlinedIcon;
