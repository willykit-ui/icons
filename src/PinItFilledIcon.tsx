import * as React from "react";
import type { IconProps } from "./types";

/**
 * PinItFilledIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M8.148 7.351a.2.2 0 0 1 .007-.15l1.723-3.775a.2.2 0 0 1 .265-.099l.126.058a.2.2 0 0 0 .265-.099l.294-.644a.2.2 0 0 0-.099-.265L6.195.307a.2.2 0 0 0-.265.099l-.294.643a.2.2 0 0 0 .1.265l.125.058a.2.2 0 0 1 .099.265L4.236 5.412a.2.2 0 0 1-.11.103l-1.288.501a.2.2 0 0 0-.109.104l-.343.751a.2.2 0 0 0 .099.265l2.183.997a.2.2 0 0 1 .099.265l-1.215 2.66a.2.2 0 0 0 .1.264l.42.192a.2.2 0 0 0 .264-.099L5.55 8.756a.2.2 0 0 1 .265-.099l2.183.997a.2.2 0 0 0 .265-.099l.344-.751a.2.2 0 0 0 .006-.15z" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h12v12H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M10.208 9.067a.18.18 0 0 1 .005-.138L12.1 4.794a.18.18 0 0 1 .238-.089l.218.1a.18.18 0 0 0 .239-.09l.349-.763a.18.18 0 0 0-.09-.239l-5.13-2.342a.18.18 0 0 0-.238.089l-.349.764a.18.18 0 0 0 .089.238l.218.1a.18.18 0 0 1 .09.239L5.845 6.935a.18.18 0 0 1-.1.094l-1.45.541a.18.18 0 0 0-.102.094l-.392.86a.18.18 0 0 0 .089.239l2.401 1.096a.18.18 0 0 1 .09.239l-1.346 2.947a.18.18 0 0 0 .089.239l.764.349a.18.18 0 0 0 .238-.09l1.346-2.947a.18.18 0 0 1 .238-.089l2.402 1.097a.18.18 0 0 0 .239-.09l.392-.86a.18.18 0 0 0 .005-.137z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M12.756 11.316a.18.18 0 0 1 .005-.138l2.386-5.226a.18.18 0 0 1 .239-.09l.355.163a.18.18 0 0 0 .238-.09l.474-1.036a.18.18 0 0 0-.09-.239L9.868 1.695a.18.18 0 0 0-.238.089L9.156 2.82a.18.18 0 0 0 .09.238l.354.162a.18.18 0 0 1 .09.239L7.302 8.686a.18.18 0 0 1-.1.094l-1.849.69a.18.18 0 0 0-.1.093l-.518 1.133a.18.18 0 0 0 .09.239l3.083 1.408a.18.18 0 0 1 .089.238l-1.72 3.766a.18.18 0 0 0 .09.239l1.037.473a.18.18 0 0 0 .238-.089l1.72-3.766a.18.18 0 0 1 .238-.089l3.084 1.408a.18.18 0 0 0 .238-.089l.518-1.133a.18.18 0 0 0 .004-.137z" fill="currentColor"/>`,
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

const PinItFilledIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

PinItFilledIcon.displayName = "PinItFilledIcon";

export default PinItFilledIcon;
