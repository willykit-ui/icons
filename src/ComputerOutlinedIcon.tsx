import * as React from "react";
import type { IconProps } from "./types";

/**
 * ComputerOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M11.5 10.55a.45.45 0 0 1 0 .901H.5a.45.45 0 0 1 0-.9zm-.95-8.25a.85.85 0 0 0-.85-.849H2.3a.85.85 0 0 0-.85.85v5.4c0 .47.38.85.85.85h7.4c.47 0 .85-.38.85-.85zM7.5 6.55a.45.45 0 0 1 0 .901h-3a.45.45 0 0 1 0-.9zm3.95 1.151a1.75 1.75 0 0 1-1.75 1.75H2.3a1.75 1.75 0 0 1-1.75-1.75v-5.4c0-.967.783-1.75 1.75-1.75h7.4c.966 0 1.75.783 1.75 1.75z" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h12v12H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M15 14a.5.5 0 0 1 0 1H1a.5.5 0 0 1 0-1zM14 3.5A1.5 1.5 0 0 0 12.5 2h-9A1.5 1.5 0 0 0 2 3.5v7A1.5 1.5 0 0 0 3.5 12h9a1.5 1.5 0 0 0 1.5-1.5zM10 10a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1zm5 .5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 10.5v-7A2.5 2.5 0 0 1 3.5 1h9A2.5 2.5 0 0 1 15 3.5z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M19 17.45v1.099H1a.55.55 0 1 1 0-1.1zM17.95 4.298a1.75 1.75 0 0 0-1.75-1.75H3.8a1.75 1.75 0 0 0-1.75 1.75v9.4c0 .967.783 1.75 1.75 1.75h12.4a1.75 1.75 0 0 0 1.75-1.75zM13 13.449v1.1H7a.55.55 0 1 1 0-1.1zm6.05.25a2.85 2.85 0 0 1-2.85 2.85H3.8a2.85 2.85 0 0 1-2.85-2.85V4.3A2.85 2.85 0 0 1 3.8 1.45h12.4a2.85 2.85 0 0 1 2.85 2.85z" fill="currentColor"/>`,
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

const ComputerOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

ComputerOutlinedIcon.displayName = "ComputerOutlinedIcon";

export default ComputerOutlinedIcon;
