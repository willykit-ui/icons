import * as React from "react";
import type { IconProps } from "./types";

/**
 * FileTextOutlinedIcon icon component.
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
      __html: `<path d="M1.05 9.701v-7.4c0-.967.783-1.75 1.75-1.75h3.162c.464 0 .91.184 1.237.512l3.239 3.239c.328.328.512.773.512 1.237v4.162a1.75 1.75 0 0 1-1.75 1.75H2.8a1.75 1.75 0 0 1-1.75-1.75m4.45-1.65a.45.45 0 0 1 0 .9h-2a.45.45 0 0 1 0-.9zm1-1.5a.45.45 0 0 1 0 .9h-3a.45.45 0 0 1 0-.9zm.396-2h2.507L6.896 2.077zM1.95 9.7c0 .47.38.85.85.85h6.4c.47 0 .85-.38.85-.85V5.54q0-.045-.005-.09l-.032.002H6.646a.65.65 0 0 1-.65-.65V1.479l.001-.027H2.8a.85.85 0 0 0-.85.849z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M1.5 12.5v-9A2.5 2.5 0 0 1 4 1h3.799c.528 0 1.033.169 1.454.464q.147.054.273.175l2.159 2.104.01.009a48 48 0 0 1 2.117 2.027c.45.46.688 1.079.688 1.711v5.01A2.5 2.5 0 0 1 12 15H4a2.5 2.5 0 0 1-2.5-2.5M7.3 11a.5.5 0 0 1 0 1H4a.5.5 0 0 1 0-1zM9 9a.5.5 0 0 1 0 1H4a.5.5 0 0 1 0-1zm.168-2.8h3.605l-1.754-1.71a53 53 0 0 1-1.851-1.755zM2.5 12.5A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5V7.49q-.001-.162-.035-.317a.8.8 0 0 1-.201.027H8.969a.8.8 0 0 1-.801-.8V2.212a1 1 0 0 1 .016-.16A1.5 1.5 0 0 0 7.799 2H4a1.5 1.5 0 0 0-1.5 1.5z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M2.45 15.7V4.298a2.85 2.85 0 0 1 2.85-2.85h4.506c.643 0 1.262.22 1.762.614q.034.02.067.042l.107.096 5.001 5.145.008.008.097.1a1 1 0 0 1 .117.153 2.85 2.85 0 0 1 .585 1.726v6.366a2.85 2.85 0 0 1-2.85 2.85H5.3a2.85 2.85 0 0 1-2.85-2.85m8-1.75a.55.55 0 1 1 0 1.099h-5a.55.55 0 1 1 0-1.1zm1.05-2.5a.55.55 0 1 1 0 1.099h-6a.55.55 0 1 1 0-1.1zm-.17-3.601h4.367L11.33 3.354zm-7.78 7.85c0 .967.783 1.75 1.75 1.75h9.4a1.75 1.75 0 0 0 1.75-1.75V9.333c0-.138-.02-.273-.05-.405a1 1 0 0 1-.185.021H11.11a.88.88 0 0 1-.882-.88V2.813q.001-.107.025-.205a1.8 1.8 0 0 0-.448-.06H5.3a1.75 1.75 0 0 0-1.75 1.75z" fill="currentColor"/>`,
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

const FileTextOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

FileTextOutlinedIcon.displayName = "FileTextOutlinedIcon";

export default FileTextOutlinedIcon;
