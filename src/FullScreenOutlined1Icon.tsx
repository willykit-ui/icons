import * as React from "react";
import type { IconProps } from "./types";

/**
 * FullScreenOutlined1Icon icon component.
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
      __html: `<path d="M7.182 7.183a.45.45 0 0 1 .636 0L9.8 9.164v-.833a.45.45 0 0 1 .9 0v1.92a.45.45 0 0 1-.45.45h-2a.45.45 0 0 1 0-.9h.913L7.182 7.819a.45.45 0 0 1 0-.636m-3-.003a.45.45 0 0 1 .636.637L2.837 9.8h.913a.45.45 0 0 1 0 .9h-2a.45.45 0 0 1-.45-.45v-2a.45.45 0 0 1 .9 0v.913zM3.75 1.299a.45.45 0 0 1 0 .9h-.913l1.981 1.982a.45.45 0 0 1-.636.636L2.2 2.836v.913a.45.45 0 0 1-.9 0v-2a.45.45 0 0 1 .45-.45zm6.5 0a.45.45 0 0 1 .45.45v2a.45.45 0 0 1-.9 0v-.913L7.818 4.817a.45.45 0 0 1-.636-.636l1.981-1.982H8.25a.45.45 0 0 1 0-.9z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M9.646 9.647a.5.5 0 0 1 .706 0l2.814 2.814v-1.353a.5.5 0 0 1 1 0v2.56a.5.5 0 0 1-.5.5h-2.667a.5.5 0 0 1 0-1h1.46l-2.813-2.813a.5.5 0 0 1 0-.708m-4-.001a.5.5 0 0 1 .708.707L3.54 13.168H5a.5.5 0 0 1 0 1H2.333a.5.5 0 0 1-.5-.5V11a.5.5 0 0 1 1 0v1.46zm8.021-7.811a.5.5 0 0 1 .5.5v2.667a.5.5 0 0 1-1 0v-1.46l-2.813 2.813a.5.5 0 0 1-.708-.707l2.814-2.813H11a.5.5 0 0 1 0-1zm-8.666-.001a.5.5 0 0 1 0 1h-1.46l2.813 2.813a.5.5 0 0 1-.707.707L2.834 3.541v1.46a.5.5 0 0 1-1 0V2.334a.5.5 0 0 1 .5-.5z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M7.146 12.147a.5.5 0 0 1 .708.707l-3.73 3.729H6.25a.5.5 0 0 1 0 1H2.917a.5.5 0 0 1-.5-.5V13.75a.5.5 0 0 1 1 0v2.126zm5-.001a.5.5 0 0 1 .706 0l3.731 3.729v-1.992a.5.5 0 0 1 1 0v3.199a.5.5 0 0 1-.5.5h-3.334a.5.5 0 0 1 0-1h2.127l-3.73-3.73a.5.5 0 0 1 0-.707m4.937-9.728a.5.5 0 0 1 .5.5V6.25a.5.5 0 0 1-1 0V4.124l-3.73 3.73a.5.5 0 0 1-.707-.708l3.73-3.729H13.75a.5.5 0 0 1 0-1zM6.251 2.416a.5.5 0 0 1 0 1H4.124l3.73 3.73a.5.5 0 0 1-.707.707l-3.73-3.73V6.25a.5.5 0 1 1-1 0V2.916a.5.5 0 0 1 .5-.5z" fill="currentColor"/>`,
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

const FullScreenOutlined1Icon = React.forwardRef<SVGSVGElement, IconProps>(
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

FullScreenOutlined1Icon.displayName = "FullScreenOutlined1Icon";

export default FullScreenOutlined1Icon;
