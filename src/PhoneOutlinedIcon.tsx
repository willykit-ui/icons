import * as React from "react";
import type { IconProps } from "./types";

/**
 * PhoneOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M7.247 6.073c.601-.588 1.521-.763 2.257-.352l.582.325c1.133.632 1.187 2.152.299 3.04-.46.46-1.085.882-1.832.91-1.07.041-2.833-.236-4.573-1.976-1.739-1.74-2.017-3.503-1.976-4.572.028-.747.452-1.372.911-1.832.888-.888 2.407-.834 3.04.299l.325.582c.41.734.235 1.649-.35 2.25l-.003.007a.2.2 0 0 0-.023.092c-.004.082.019.345.462.789.443.443.707.466.79.462a.2.2 0 0 0 .091-.023m-2.165-3.67c-.252-.452-.955-.585-1.46-.08-.377.377-.604.777-.62 1.163-.03.84.174 2.316 1.685 3.827S7.676 9.03 8.515 8.998c.386-.015.785-.242 1.163-.62.505-.504.372-1.207-.08-1.46l-.581-.323c-.308-.172-.756-.12-1.078.202l-.353-.354.353.355-.003.002-.001.003-.007.005-.017.016-.046.037a1 1 0 0 1-.146.095 1.2 1.2 0 0 1-.515.14c-.451.022-.974-.183-1.545-.754s-.776-1.094-.754-1.545c.01-.218.074-.392.14-.515a1 1 0 0 1 .132-.192l.015-.017.006-.007.005-.005.204.204-.203-.204c.322-.321.374-.77.202-1.077zm2.16 3.678-.005.004.008-.009zm.013-.012-.01.007.002-.003z"/>`,
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

const PhoneOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

PhoneOutlinedIcon.displayName = "PhoneOutlinedIcon";

export default PhoneOutlinedIcon;
