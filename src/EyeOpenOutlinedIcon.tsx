import * as React from "react";
import type { IconProps } from "./types";

/**
 * EyeOpenOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M5.999 2.072c2.035 0 3.365.966 4.173 1.922A6.4 6.4 0 0 1 11.21 5.73l.06.165q0 .006.003.01l.001.004.001.002-.477.15.474.159v.002l-.005.014-.013.036-.049.125a6.3 6.3 0 0 1-1.058 1.7c-.814.932-2.145 1.866-4.157 1.833-2-.033-3.325-.96-4.138-1.874A6.3 6.3 0 0 1 .795 6.397l-.049-.122-.014-.035-.003-.01-.001-.004-.001-.002.472-.163-.476-.15v-.007l.005-.01a3 3 0 0 1 .06-.165c.04-.106.103-.256.19-.434a6.4 6.4 0 0 1 .85-1.3c.807-.957 2.137-1.923 4.171-1.923m0 1c-1.673 0-2.743.779-3.408 1.567a5.4 5.4 0 0 0-.856 1.413q.05.116.142.293c.15.284.384.664.723 1.045.671.755 1.747 1.512 3.408 1.539 1.65.027 2.718-.725 3.388-1.492a5.3 5.3 0 0 0 .868-1.382 5.4 5.4 0 0 0-.856-1.416c-.666-.788-1.736-1.567-3.409-1.567m.7 2.944c0-.356-.3-.668-.7-.668s-.7.312-.7.668c0 .355.3.667.7.667s.7-.311.7-.667m-5.5.045-.472.162-.054-.156.049-.156zm10.125.003-.05.154-.475-.157.477-.15zM7.7 6.016c0 .933-.774 1.667-1.7 1.667s-1.7-.734-1.7-1.667c0-.934.774-1.668 1.7-1.668s1.7.734 1.7 1.668"/>`,
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

const EyeOpenOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

EyeOpenOutlinedIcon.displayName = "EyeOpenOutlinedIcon";

export default EyeOpenOutlinedIcon;
