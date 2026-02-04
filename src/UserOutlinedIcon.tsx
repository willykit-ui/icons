import * as React from "react";
import type { IconProps } from "./types";

/**
 * UserOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M10.55 6.001a4.55 4.55 0 1 0-7.873 3.106c.1-.444.28-.865.614-1.21.552-.574 1.428-.846 2.71-.846 1.28 0 2.157.272 2.71.845.333.346.512.767.612 1.211a4.53 4.53 0 0 0 1.227-3.106M6 7.951c-1.18 0-1.757.255-2.061.57-.273.284-.404.693-.457 1.269.721.48 1.587.76 2.518.76.932 0 1.797-.28 2.518-.76-.053-.576-.182-.985-.455-1.269-.304-.315-.881-.57-2.063-.57m1.05-3.45a1.05 1.05 0 1 0-2.1 0 1.05 1.05 0 0 0 2.1 0m4.4 1.5a5.45 5.45 0 1 1-10.9 0 5.45 5.45 0 0 1 10.9 0m-3.5-1.5a1.95 1.95 0 1 1-3.9 0 1.95 1.95 0 0 1 3.9 0" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h12v12H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M14.003 8a6 6 0 1 0-10.269 4.215c.119-.626.349-1.216.808-1.692.695-.72 1.805-1.073 3.46-1.073 1.657 0 2.767.353 3.463 1.073.458.476.686 1.067.805 1.692A5.98 5.98 0 0 0 14.003 8m-6 2.45c-1.545 0-2.323.333-2.742.767-.383.398-.553.97-.62 1.754A5.97 5.97 0 0 0 8.003 14a5.97 5.97 0 0 0 3.361-1.03c-.067-.783-.235-1.355-.62-1.753-.418-.434-1.196-.767-2.741-.767m1.447-4.4a1.45 1.45 0 1 0-2.9 0 1.45 1.45 0 0 0 2.9 0M15.003 8a7 7 0 1 1-14 0 7 7 0 0 1 14 0M10.45 6.05a2.45 2.45 0 1 1-4.9 0 2.45 2.45 0 0 1 4.9 0" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M17.452 10.001a7.45 7.45 0 0 0-14.9 0c0 2.085.858 3.969 2.239 5.321.138-.807.415-1.566.998-2.17.838-.87 2.182-1.301 4.213-1.301s3.376.432 4.214 1.3c.583.605.858 1.364.996 2.171a7.43 7.43 0 0 0 2.24-5.321m-7.45 2.95c-1.908 0-2.888.411-3.421.964-.494.513-.704 1.247-.784 2.234a7.4 7.4 0 0 0 4.205 1.302 7.4 7.4 0 0 0 4.205-1.302c-.08-.987-.289-1.722-.783-2.234-.534-.553-1.513-.964-3.422-.964m1.848-5.35a1.85 1.85 0 1 0-3.7 0 1.85 1.85 0 0 0 3.7 0m6.702 2.4a8.55 8.55 0 1 1-17.1 0 8.55 8.55 0 1 1 17.1 0m-5.602-2.4a2.95 2.95 0 1 1-5.9 0 2.95 2.95 0 0 1 5.9 0" fill="currentColor"/>`,
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

const UserOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

UserOutlinedIcon.displayName = "UserOutlinedIcon";

export default UserOutlinedIcon;
