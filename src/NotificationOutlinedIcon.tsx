import * as React from "react";
import type { IconProps } from "./types";

/**
 * NotificationOutlinedIcon icon component.
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

  medium: { content: { __html: "" }, viewBox: "0 0 16 16" },

  large: {
    content: {
      __html: `<path fill="currentColor" d="M14.007 8.268c0-2.048-1.772-3.768-3.988-3.768-2.224 0-3.989 1.713-3.989 3.768v2.055c0 .28-.06.605-.146.898a3.5 3.5 0 0 1-.357.834v.002l-.861 1.358c-.19.3-.2.577-.116.791.084.216.29.431.652.549a15.9 15.9 0 0 0 9.624 0h.002c.612-.193.843-.853.535-1.34l-.86-1.358-.005-.008.428-.26-.428.259a3.6 3.6 0 0 1-.347-.83 3.4 3.4 0 0 1-.144-.895zm-5.442 8.167A1.51 1.51 0 0 0 10 17.5c.672 0 1.245-.45 1.434-1.062-.955.08-1.914.079-2.869-.003M10 2.5c-.235 0-.452.07-.634.188-.146.096-.248.252-.311.494q-.049.192-.063.42a5.2 5.2 0 0 1 2.01-.008 2 2 0 0 0-.053-.417c-.054-.222-.145-.366-.273-.46A1.15 1.15 0 0 0 10 2.5m5.008 7.823c0 .154.036.379.105.618.069.238.158.452.24.587l.856 1.352h.001c.68 1.078.117 2.452-1.081 2.829l-.001-.001c-.868.276-1.755.478-2.65.61A2.505 2.505 0 0 1 10 18.5a2.506 2.506 0 0 1-2.479-2.186 17 17 0 0 1-2.62-.606h-.003c-.608-.196-1.07-.603-1.28-1.14-.21-.54-.138-1.149.203-1.688l.86-1.359a2.5 2.5 0 0 0 .243-.58 2.4 2.4 0 0 0 .106-.618V8.268c0-1.952 1.223-3.61 2.955-4.352-.002-.31.016-.657.1-.985.104-.397.314-.805.731-1.078a2.15 2.15 0 0 1 2.443.053c.378.273.568.658.66 1.032.08.322.09.66.082.958 1.756.733 3.006 2.407 3.006 4.372z"/>`,
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

const NotificationOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

NotificationOutlinedIcon.displayName = "NotificationOutlinedIcon";

export default NotificationOutlinedIcon;
