import * as React from "react";
import type { IconProps } from "./types";

/**
 * VerifiedOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path fill="currentColor" d="M14.167 5.334c0-.957-.001-1.624-.069-2.128-.066-.49-.186-.748-.37-.933-.185-.184-.444-.305-.934-.37-.503-.068-1.17-.069-2.128-.069H5.333c-.956 0-1.624 0-2.127.068-.49.066-.749.187-.933.371-.185.185-.305.444-.371.933-.068.504-.068 1.171-.068 2.128v2.667c0 .957 0 1.624.068 2.128.066.489.186.748.37.933.163.162.382.273.76.342.38.07.877.09 1.572.094.065-.2.168-.392.313-.561a.64.64 0 0 0 .15-.365 1.64 1.64 0 0 1 1.505-1.504.64.64 0 0 0 .364-.151 1.64 1.64 0 0 1 2.128 0 .64.64 0 0 0 .364.151 1.64 1.64 0 0 1 1.505 1.504.64.64 0 0 0 .15.365c.144.168.247.36.312.561h.146l.46-.009a6 6 0 0 0 1.024-.095c.342-.07.547-.178.702-.332.184-.185.305-.444.371-.933.068-.504.068-1.171.068-2.128zM8.415 9.678a.64.64 0 0 0-.832 0 1.64 1.64 0 0 1-.932.386.64.64 0 0 0-.588.588 1.64 1.64 0 0 1-.387.933.64.64 0 0 0 0 .831c.224.263.36.59.387.934a.64.64 0 0 0 .588.587c.344.027.67.163.932.386a.64.64 0 0 0 .832 0c.262-.224.59-.359.933-.386a.64.64 0 0 0 .587-.587 1.64 1.64 0 0 1 .387-.934.64.64 0 0 0 0-.831 1.64 1.64 0 0 1-.387-.933.64.64 0 0 0-.587-.587 1.64 1.64 0 0 1-.933-.387m.243 1.29a.5.5 0 0 1 .682.731l-1.428 1.334a.5.5 0 0 1-.683 0l-.571-.534a.5.5 0 0 1 .682-.73l.23.213zm2.675-5.134a.5.5 0 0 1 0 1H4.667a.5.5 0 0 1 0-1zM10 3.501a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1zm5.166 4.5c0 .928.001 1.675-.078 2.26-.08.6-.253 1.106-.654 1.508-.332.332-.737.508-1.21.604-.46.094-1.016.118-1.673.125h-.156a1.6 1.6 0 0 1-.312.567.64.64 0 0 0-.15.364 1.64 1.64 0 0 1-1.506 1.505.64.64 0 0 0-.364.15 1.64 1.64 0 0 1-2.128 0 .64.64 0 0 0-.364-.15 1.64 1.64 0 0 1-1.504-1.505.64.64 0 0 0-.151-.364 1.6 1.6 0 0 1-.314-.567c-.694-.005-1.275-.023-1.752-.11-.505-.093-.935-.27-1.285-.62-.401-.4-.574-.906-.654-1.506C.832 9.676.833 8.929.833 8V5.334c0-.928 0-1.675.079-2.26.08-.6.253-1.106.654-1.508.401-.4.907-.573 1.507-.654.585-.079 1.332-.078 2.26-.078h5.333c.93 0 1.676 0 2.262.078.6.08 1.106.253 1.507.654.401.402.574.907.654 1.507.079.586.077 1.333.077 2.261z"/></g><defs><clipPath id="a"><path fill="currentColor" d="M0 0h16v16H0z"/></clipPath></defs>`,
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

const VerifiedOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

VerifiedOutlinedIcon.displayName = "VerifiedOutlinedIcon";

export default VerifiedOutlinedIcon;
