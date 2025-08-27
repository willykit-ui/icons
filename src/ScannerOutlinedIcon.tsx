import * as React from "react";
import type { IconProps } from "./types";

/**
 * ScannerOutlinedIcon icon component.
 *
 * @description Supports sizes: small (12px), medium (16px, default), large (20px).
 * Automatically falls back to the closest available size if exact one is missing.
 *
 * @param fontSize - Icon size preset or custom pixel value
 * @param color - Icon color (supports CSS colors, variables, and 'currentColor')
 * @param ...props - All other SVG element props
 */

const svgChildren = {
  small: { content: { __html: "" }, viewBox: "0 0 16 16" },

  medium: {
    content: {
      __html: `<g clipPath="url(#a)"><path fill="currentColor" d="M.828 10a.5.5 0 0 1 1 0c0 1.28.002 2.001.09 2.507.078.449.22.7.545 1.025.282.282.668.451 1.339.541.685.092 1.588.094 2.86.094a.5.5 0 0 1 0 1c-1.244 0-2.226 0-2.993-.102-.782-.106-1.414-.327-1.913-.826-.456-.456-.705-.89-.822-1.56C.827 12.065.828 11.235.828 10m13.333 0a.5.5 0 0 1 1 0c0 1.235.003 2.066-.104 2.679-.117.67-.366 1.104-.823 1.56-.498.5-1.131.72-1.913.825-.767.104-1.75.103-2.993.103a.5.5 0 0 1 0-1c1.271 0 2.174-.002 2.86-.094.67-.09 1.057-.259 1.34-.54.324-.325.465-.577.543-1.026.089-.506.09-1.228.09-2.507m.5-2.5a.5.5 0 1 1 0 1H1.328a.5.5 0 1 1 0-1zM.828 6.003c0-1.235-.001-2.066.106-2.679.117-.67.366-1.104.822-1.56.499-.5 1.131-.72 1.913-.826C4.436.835 5.419.836 6.66.836a.5.5 0 1 1 0 1c-1.27 0-2.174 0-2.86.093-.67.09-1.056.26-1.338.542-.325.324-.467.576-.545 1.025-.088.506-.09 1.228-.09 2.507a.5.5 0 0 1-1 0m13.333 0c0-1.28-.002-2.001-.09-2.507-.078-.449-.22-.7-.544-1.025-.282-.282-.669-.452-1.34-.542-.685-.092-1.588-.093-2.859-.093a.5.5 0 1 1 0-1c1.243 0 2.226 0 2.993.102.782.106 1.415.327 1.913.826.457.456.706.89.823 1.56.107.613.104 1.444.104 2.679a.5.5 0 0 1-1 0"/></g><defs><clipPath id="a"><rect width="16" height="16" fill="currentColor" rx="5"/></clipPath></defs>`,
    },
    viewBox: "0 0 16 16",
  },

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

const ScannerOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

ScannerOutlinedIcon.displayName = "ScannerOutlinedIcon";

export default ScannerOutlinedIcon;
