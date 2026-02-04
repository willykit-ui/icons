import * as React from "react";
import type { IconProps } from "./types";

/**
 * InputOutlinedIcon icon component.
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
      __html: `<path d="M3.55 8.001a.45.45 0 0 1 .9 0v1.7c0 .47.38.85.85.85h3.9c.47 0 .85-.38.85-.85v-7.4a.85.85 0 0 0-.85-.85H5.3a.85.85 0 0 0-.85.85V4a.45.45 0 0 1-.9 0V2.95H2.5a.55.55 0 0 0-.55.55v5c0 .304.246.55.55.55h1.05zm2.382-3.568a.45.45 0 0 1 .636 0l1.25 1.25a.45.45 0 0 1 0 .636l-1.25 1.25a.45.45 0 0 1-.636-.636l.481-.482H3a.45.45 0 0 1 0-.9h3.413l-.481-.482a.45.45 0 0 1 0-.636M10.95 9.7a1.75 1.75 0 0 1-1.75 1.75H5.3a1.75 1.75 0 0 1-1.73-1.5H2.5c-.8 0-1.45-.65-1.45-1.45v-5c0-.8.65-1.45 1.45-1.45h1.07A1.75 1.75 0 0 1 5.3.55h3.9c.966 0 1.75.783 1.75 1.75z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M5 10.5a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 0 7.5 14H12a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 12 2H7.5A1.5 1.5 0 0 0 6 3.5v2a.5.5 0 0 1-1 0V4H3.5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1H5zm3.253-4.462a.5.5 0 0 1 .707-.032l1.777 1.625a.5.5 0 0 1 0 .738L8.96 9.994a.5.5 0 0 1-.675-.738l.827-.756H4a.5.5 0 0 1 0-1h5.112l-.827-.756a.5.5 0 0 1-.032-.706M14.5 12.5A2.5 2.5 0 0 1 12 15H7.5a2.5 2.5 0 0 1-2.45-2H3.5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h1.55A2.5 2.5 0 0 1 7.5 1H12a2.5 2.5 0 0 1 2.5 2.5z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M6.45 12.999a.55.55 0 1 1 1.1 0v2.8c0 .911.739 1.65 1.65 1.65h6.1a1.65 1.65 0 0 0 1.65-1.65v-11.6a1.65 1.65 0 0 0-1.65-1.65H9.2a1.65 1.65 0 0 0-1.65 1.65V7a.55.55 0 1 1-1.1 0V4.55H4.3c-.69 0-1.25.56-1.25 1.25v8.4c0 .69.56 1.25 1.25 1.25h2.15zm3.849-5.37a.55.55 0 0 1 .777-.036l2.194 2a.55.55 0 0 1 0 .812l-2.194 2a.55.55 0 0 1-.741-.812l1.145-1.044H5a.55.55 0 1 1 0-1.1h6.48l-1.145-1.044a.55.55 0 0 1-.036-.776m7.75 8.17a2.75 2.75 0 0 1-2.75 2.75H9.2a2.75 2.75 0 0 1-2.644-2H4.3a2.35 2.35 0 0 1-2.35-2.35V5.8A2.35 2.35 0 0 1 4.3 3.45h2.256a2.75 2.75 0 0 1 2.644-2h6.1a2.75 2.75 0 0 1 2.75 2.75z" fill="currentColor"/>`,
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

const InputOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

InputOutlinedIcon.displayName = "InputOutlinedIcon";

export default InputOutlinedIcon;
