import * as React from "react";
import type { IconProps } from "./types";

/**
 * ArrowLines2OutlinedIcon icon component.
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
      __html: `<path d="M5.97 9.784a.45.45 0 0 1 .638.633l-.653.66a.45.45 0 0 1-.639-.635zm2.473-6.247a.45.45 0 0 1 .639.634l-5.225 5.27a.45.45 0 0 1-.638-.634zm.138 3.612a.45.45 0 0 1 .64.634L7.914 9.1a.45.45 0 0 1-.639-.635zM6.932 1.313a.2.2 0 0 1 .258.259l-.88 2.265a.2.2 0 0 1-.328.07l-.336-.336-4.214 4.216a.45.45 0 0 1-.637-.637L5.01 2.934l-.413-.413a.2.2 0 0 1 .069-.328zm3.609 3.859a.45.45 0 1 1 .639.634l-.654.66a.451.451 0 0 1-.638-.636z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M8.03 13.117a.5.5 0 0 1 .71.705l-.87.877a.5.5 0 0 1-.711-.703zm3.299-8.329a.5.5 0 0 1 .71.705l-6.966 7.026a.5.5 0 1 1-.711-.703zm.184 4.816a.5.5 0 0 1 .711.703l-1.742 1.758a.5.5 0 0 1-.71-.705zm-2.13-7.906a.2.2 0 0 1 .259.258L8.377 5.213a.2.2 0 0 1-.328.07l-.59-.591-5.622 5.62a.5.5 0 0 1-.707-.706l5.621-5.621-.694-.695a.2.2 0 0 1 .07-.328zm4.742 5.27a.5.5 0 0 1 .71.704l-.87.878a.5.5 0 1 1-.71-.703z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M9.728 16.814a.55.55 0 1 1 .78.774l-.725.732a.55.55 0 1 1-.78-.775zm2.902-2.929a.55.55 0 0 1 .782.776l-1.452 1.464a.55.55 0 0 1-.781-.776zm1.584-7.85a.55.55 0 0 1 .78.774l-8.707 8.784a.55.55 0 0 1-.781-.774zm1.319 4.923a.55.55 0 1 1 .78.774l-1.45 1.464a.55.55 0 0 1-.782-.775zm-3.74-8.913a.2.2 0 0 1 .266.251l-1.535 4.292a.2.2 0 0 1-.327.079l-.916-.869-7.038 7.038a.55.55 0 1 1-.777-.777l7.017-7.017-.953-.904a.2.2 0 0 1 .06-.329zm5.917 6.716a.55.55 0 0 1 .78.775l-.724.732a.55.55 0 0 1-.782-.775z" fill="currentColor"/>`,
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

const ArrowLines2OutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

ArrowLines2OutlinedIcon.displayName = "ArrowLines2OutlinedIcon";

export default ArrowLines2OutlinedIcon;
