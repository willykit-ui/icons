import * as React from "react";
import type { IconProps } from "./types";

/**
 * PrinterOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M8.05 8.001a.05.05 0 0 0-.05-.05H4a.05.05 0 0 0-.05.05v2.5c0 .028.022.05.05.05h4a.05.05 0 0 0 .05-.05zm.9.55h1.55a.05.05 0 0 0 .05-.05v-4a.05.05 0 0 0-.05-.05h-9a.05.05 0 0 0-.05.05v4c0 .028.022.05.05.05h1.55V8A.95.95 0 0 1 4 7.05h4a.95.95 0 0 1 .95.95zm.1-7.05a.05.05 0 0 0-.05-.05H3a.05.05 0 0 0-.05.05v2.05h6.1zm.9 2.05h.55a.95.95 0 0 1 .95.95v4a.95.95 0 0 1-.95.95H8.95v1.05a.95.95 0 0 1-.95.95H4a.95.95 0 0 1-.95-.95v-1.05H1.5a.95.95 0 0 1-.95-.95v-4a.95.95 0 0 1 .95-.95h.55V1.5A.95.95 0 0 1 3 .551h6a.95.95 0 0 1 .95.95z" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h12v12H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M11 10.3a.3.3 0 0 0-.3-.3H5.3a.3.3 0 0 0-.3.3v3.4a.3.3 0 0 0 .3.3h5.4a.3.3 0 0 0 .3-.3zm1 1.2h1.7a.3.3 0 0 0 .3-.3V6.3a.3.3 0 0 0-.3-.3H2.3a.3.3 0 0 0-.3.3v4.9a.3.3 0 0 0 .3.3H4v-1.2A1.3 1.3 0 0 1 5.3 9h5.4a1.3 1.3 0 0 1 1.3 1.3zm0-9.2a.3.3 0 0 0-.24-.294L11.7 2H4.3a.3.3 0 0 0-.3.3V5h8zM13 5h.7A1.3 1.3 0 0 1 15 6.3v4.9a1.3 1.3 0 0 1-1.3 1.3H12v1.2a1.3 1.3 0 0 1-1.3 1.3H5.3A1.3 1.3 0 0 1 4 13.7v-1.2H2.3A1.3 1.3 0 0 1 1 11.2V6.3A1.3 1.3 0 0 1 2.3 5H3V2.3A1.3 1.3 0 0 1 4.3 1h7.4l.133.007A1.3 1.3 0 0 1 13 2.3z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M13.45 12.999a.45.45 0 0 0-.45-.45H7a.45.45 0 0 0-.45.45v4c0 .249.201.45.45.45h6a.45.45 0 0 0 .45-.45zm1.1 1.45H17a.45.45 0 0 0 .45-.45v-6a.45.45 0 0 0-.45-.45H3a.45.45 0 0 0-.45.45v6c0 .249.201.45.45.45h2.45V13c0-.856.694-1.55 1.55-1.55h6c.856 0 1.55.694 1.55 1.55zM14.95 3a.45.45 0 0 0-.45-.45h-9a.45.45 0 0 0-.45.45v3.45h9.9zm1.1 3.45H17c.856 0 1.55.694 1.55 1.55v6A1.55 1.55 0 0 1 17 15.55h-2.45V17A1.55 1.55 0 0 1 13 18.55H7A1.55 1.55 0 0 1 5.45 17v-1.45H3A1.55 1.55 0 0 1 1.45 14V8c0-.856.694-1.55 1.55-1.55h.95V3c0-.856.694-1.55 1.55-1.55h9c.856 0 1.55.694 1.55 1.55z" fill="currentColor"/>`,
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

const PrinterOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

PrinterOutlinedIcon.displayName = "PrinterOutlinedIcon";

export default PrinterOutlinedIcon;
