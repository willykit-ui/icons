import * as React from "react";
import type { IconProps } from "./types";

/**
 * DocumentGeoOutlinedIcon icon component.
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
      __html: `<path d="M9.2.55c.966 0 1.75.784 1.75 1.75v2.201a.45.45 0 0 1-.9 0v-2.2a.85.85 0 0 0-.85-.85H2.8a.85.85 0 0 0-.85.85v7.4c0 .47.38.85.85.85h3.7a.45.45 0 0 1 0 .9H2.8a1.75 1.75 0 0 1-1.75-1.75v-7.4c0-.967.783-1.75 1.75-1.75zm0 4.8c1.35 0 2.4 1.152 2.4 2.516 0 .615-.235 1.284-.566 1.863-.332.582-.79 1.126-1.292 1.473-.104.072-.275.204-.542.204s-.438-.132-.542-.204c-.502-.348-.96-.89-1.293-1.473-.33-.579-.565-1.248-.565-1.863 0-1.364 1.05-2.515 2.4-2.515m0 .901c-.804 0-1.5.698-1.5 1.615 0 .406.163.919.447 1.417.283.496.657.926 1.023 1.179l.03.02.03-.02c.366-.253.74-.683 1.023-1.179.284-.498.447-1.011.447-1.417 0-.917-.696-1.615-1.5-1.615m0 .85a.541.541 0 1 1 0 1.083.541.541 0 0 1 0-1.082m-3.7-.05a.45.45 0 0 1 0 .9H4a.45.45 0 0 1 0-.9zm.9-1.5a.45.45 0 0 1 0 .9H4a.45.45 0 0 1 0-.9zM8 4.05a.45.45 0 0 1 0 .9H4a.45.45 0 0 1 0-.9z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M12 7.5c1.679 0 3 1.42 3 3.122 0 .766-.297 1.605-.718 2.335-.423.733-1.005 1.413-1.64 1.846-.133.091-.332.24-.642.24s-.509-.15-.643-.24c-.633-.433-1.215-1.113-1.638-1.846-.422-.73-.719-1.569-.719-2.335C9 8.921 10.321 7.5 12 7.5M11.5 1A2.5 2.5 0 0 1 14 3.5V6a.5.5 0 0 1-1 0V3.5A1.5 1.5 0 0 0 11.5 2h-7A1.5 1.5 0 0 0 3 3.5v9A1.5 1.5 0 0 0 4.5 14h4a.5.5 0 0 1 0 1h-4A2.5 2.5 0 0 1 2 12.5v-9A2.5 2.5 0 0 1 4.5 1zm.5 7.5c-1.082 0-2 .928-2 2.122 0 .53.215 1.196.584 1.835.367.636.855 1.191 1.337 1.52l.079.052.08-.052c.48-.329.969-.883 1.336-1.52.37-.64.584-1.304.584-1.835 0-1.194-.918-2.122-2-2.122m-.001 1.2a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6M7.2 10a.5.5 0 0 1 0 1H5.602a.5.5 0 0 1 0-1zm1-2.502a.5.5 0 0 1 0 1H5.602a.5.5 0 0 1 0-1zM10.401 5a.5.5 0 0 1 0 1h-4.8a.5.5 0 0 1 0-1z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M14.7 1.45a2.85 2.85 0 0 1 2.85 2.849v3.7a.55.55 0 1 1-1.1 0v-3.7a1.75 1.75 0 0 0-1.75-1.75H5.3a1.75 1.75 0 0 0-1.75 1.75v11.4c0 .967.783 1.75 1.75 1.75h6.2a.55.55 0 1 1 0 1.1H5.3a2.85 2.85 0 0 1-2.85-2.85V4.3A2.85 2.85 0 0 1 5.3 1.45zm.6 7.7c2.086 0 3.75 1.737 3.75 3.846 0 .95-.377 1.997-.914 2.91-.54.916-1.282 1.763-2.083 2.295-.17.113-.398.281-.753.281s-.584-.168-.753-.28c-.801-.533-1.543-1.38-2.083-2.296-.538-.912-.914-1.96-.914-2.91 0-2.109 1.663-3.847 3.75-3.847m0 1.099c-1.448 0-2.65 1.214-2.65 2.747 0 .686.282 1.538.762 2.352.477.809 1.112 1.518 1.743 1.937l.113.073q.02.013.032.018l.032-.018c.03-.018.063-.04.112-.073.632-.42 1.266-1.128 1.743-1.937.48-.814.762-1.666.762-2.352 0-1.533-1.201-2.747-2.65-2.747m0 1.652a1.2 1.2 0 1 1 0 2.401 1.2 1.2 0 0 1 0-2.4m-5.3.048a.55.55 0 1 1 0 1.1H6.6a.55.55 0 1 1 0-1.1zm1-2.503a.55.55 0 0 1 0 1.1H6.6a.55.55 0 1 1 0-1.1zm2.4-2.497a.55.55 0 1 1 0 1.1H6.6a.55.55 0 1 1 0-1.1z" fill="currentColor"/>`,
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

const DocumentGeoOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

DocumentGeoOutlinedIcon.displayName = "DocumentGeoOutlinedIcon";

export default DocumentGeoOutlinedIcon;
