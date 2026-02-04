import * as React from "react";
import type { IconProps } from "./types";

/**
 * PhoneFilledIcon icon component.
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
      __html: `<path d="M6.672 8.989a8.4 8.4 0 0 1-3.66-3.661l1.112-.83a1 1 0 0 0 .375-1.031L4.1 1.77A1 1 0 0 0 3.125 1h-1.57A.557.557 0 0 0 1 1.556 9.444 9.444 0 0 0 10.444 11c.306 0 .556-.25.556-.556v-1.57a1 1 0 0 0-.768-.974l-1.697-.403a1 1 0 0 0-1.034.376z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M8.941 12.184A11.8 11.8 0 0 1 3.816 7.06l1.768-1.32a1 1 0 0 0 .375-1.031L5.265 1.77A1 1 0 0 0 4.292 1H1.778A.78.78 0 0 0 1 1.778C1 9.08 6.919 15 14.222 15a.78.78 0 0 0 .778-.778v-2.515a1 1 0 0 0-.768-.973l-2.939-.7a1 1 0 0 0-1.034.377z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M11.076 14.782a13.47 13.47 0 0 1-5.858-5.858l2.201-1.641a.8.8 0 0 0 .3-.825l-.907-3.842A.8.8 0 0 0 6.034 2H2.889C2.4 2 2 2.4 2 2.889 2 11.236 8.764 18 17.111 18c.489 0 .889-.4.889-.889v-3.146a.8.8 0 0 0-.615-.778l-3.841-.914a.8.8 0 0 0-.827.301z" fill="currentColor"/>`,
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

const PhoneFilledIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

PhoneFilledIcon.displayName = "PhoneFilledIcon";

export default PhoneFilledIcon;
