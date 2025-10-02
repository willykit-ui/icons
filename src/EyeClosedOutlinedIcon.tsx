import * as React from "react";
import type { IconProps } from "./types";

/**
 * EyeClosedOutlinedIcon icon component.
 *
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
      __html: `<path fill="currentColor" d="M2.346 1.896a.5.5 0 0 1 .707 0l7.5 7.5.064.079a.5.5 0 0 1-.693.693l-.078-.064-.96-.96c-.755.462-1.71.782-2.895.762-2-.033-3.325-.96-4.138-1.874A6.3 6.3 0 0 1 .795 6.375l-.049-.122-.014-.035-.003-.011-.001-.004H.727V6.2l-.054-.155.049-.157v-.002l.002-.002.002-.006.005-.02.024-.066a6.3 6.3 0 0 1 .476-.984A5.9 5.9 0 0 1 2.802 3.06l-.457-.458-.065-.078a.5.5 0 0 1 .065-.629M3.52 3.777a4.9 4.9 0 0 0-1.43 1.544 5 5 0 0 0-.323.633l-.032.076q.05.116.142.293c.15.284.384.664.723 1.044.671.755 1.747 1.512 3.408 1.54.874.013 1.579-.192 2.146-.495L7.047 7.305c-.29.223-.654.356-1.048.356-.926 0-1.7-.734-1.7-1.668 0-.4.145-.768.383-1.054zM5.999 2.05c2.035 0 3.365.966 4.173 1.922a6.4 6.4 0 0 1 1.039 1.735l.047.127.013.037.004.015.001.002-.477.15.474.158V6.2l-.003.007a1 1 0 0 1-.038.1 6.3 6.3 0 0 1-.598 1.13l-.064.08a.5.5 0 0 1-.767-.634c.189-.284.322-.54.407-.725q.032-.071.054-.127a5.4 5.4 0 0 0-.856-1.415c-.667-.788-1.737-1.566-3.41-1.566q-.285 0-.546.03a.5.5 0 0 1-.107-.995q.314-.035.653-.035m5.325 3.993-.05.152-.475-.157.477-.15zM5.3 5.993c0 .356.3.668.7.668a.7.7 0 0 0 .324-.08l-.927-.928a.64.64 0 0 0-.097.34"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: { content: { __html: "" }, viewBox: "0 0 16 16" },

  large: { content: { __html: "" }, viewBox: "0 0 16 16" },
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

const EyeClosedOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

EyeClosedOutlinedIcon.displayName = "EyeClosedOutlinedIcon";

export default EyeClosedOutlinedIcon;
