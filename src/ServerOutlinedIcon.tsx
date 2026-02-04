import * as React from "react";
import type { IconProps } from "./types";

/**
 * ServerOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M11.05 8.911c0-.287-.071-.556-.194-.786-.259-.488-.742-.802-1.28-.802H2.424c-.539 0-1.022.314-1.281.802-.123.23-.194.499-.194.786 0 .902.684 1.589 1.475 1.589h7.15c.79 0 1.475-.687 1.475-1.589M4.725 9.3v-.55a.45.45 0 0 1 .9 0v.55a.45.45 0 0 1-.9 0m1.375 0v-.55a.45.45 0 0 1 .9 0v.55a.45.45 0 0 1-.9 0m1.375 0v-.55a.45.45 0 0 1 .9 0v.55a.45.45 0 0 1-.9 0m1.375 0v-.55a.45.45 0 0 1 .9 0v.55a.45.45 0 0 1-.9 0M3.525 1.5c-.229 0-.4.053-.536.16-.139.108-.288.306-.407.678l-1.05 4.268c.274-.117.575-.183.893-.183h7.15c.317 0 .618.067.893.183L9.417 2.338c-.119-.372-.267-.57-.406-.679-.136-.106-.307-.159-.536-.159zm8.425 7.411c0 1.35-1.04 2.488-2.375 2.488h-7.15C1.089 11.4.05 10.261.05 8.911c0-.414.098-.805.27-1.15l1.393-5.655.008-.027c.155-.494.39-.875.716-1.13.33-.257.71-.35 1.088-.35h4.95c.378 0 .758.093 1.088.35.286.223.5.543.654.95l.062.18.008.027 1.393 5.655c.172.345.27.736.27 1.15" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M14.5 11.775c0-.388-.094-.75-.256-1.061-.344-.66-.984-1.081-1.694-1.081h-9.1c-.71 0-1.35.421-1.694 1.08a2.3 2.3 0 0 0-.256 1.062c0 1.22.908 2.142 1.95 2.142h9.1c1.042 0 1.95-.922 1.95-2.142m-8.068.542v-.816a.5.5 0 1 1 1 0v.816a.5.5 0 0 1-1 0m1.78 0v-.816a.5.5 0 0 1 1 0v.816a.5.5 0 0 1-1 0m1.783 0v-.816a.5.5 0 1 1 1 0v.816a.5.5 0 0 1-1 0m1.782 0v-.816a.5.5 0 1 1 1 0v.816a.5.5 0 0 1-1 0M4.85 2.084c-.302 0-.534.072-.723.222-.194.153-.393.43-.548.93L2.203 8.927a2.8 2.8 0 0 1 1.247-.295h9.1c.448 0 .87.107 1.246.295L12.42 3.235c-.155-.5-.353-.776-.547-.93-.189-.15-.421-.221-.723-.221zm10.65 9.691c0 1.7-1.286 3.142-2.95 3.142h-9.1c-1.664 0-2.95-1.443-2.95-3.142 0-.526.124-1.025.34-1.463l1.774-7.335.004-.016.004-.015c.194-.628.484-1.106.884-1.424.405-.321.873-.438 1.344-.438h6.3c.471 0 .94.117 1.344.438.35.278.616.679.807 1.196l.077.228.004.015.004.016 1.773 7.335c.217.438.341.937.341 1.463" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M17.95 14.58a2.8 2.8 0 0 0-.316-1.295c-.425-.805-1.22-1.326-2.109-1.326H4.475c-.89 0-1.684.521-2.109 1.326-.2.38-.316.822-.316 1.295 0 1.48 1.118 2.62 2.425 2.62h11.05c1.307 0 2.425-1.14 2.425-2.62m-9.78.536v-.931a.55.55 0 1 1 1.1 0v.931a.55.55 0 0 1-1.1 0m2.328 0v-.931a.551.551 0 0 1 1.1 0v.931a.55.55 0 0 1-1.1 0m2.33 0v-.931a.55.55 0 0 1 1.1 0v.931a.55.55 0 0 1-1.1 0m2.328 0v-.931a.55.55 0 1 1 1.1 0v.931a.55.55 0 0 1-1.1 0M6.175 2.9c-.378 0-.673.09-.915.28-.247.193-.492.534-.683 1.14l-1.7 6.943a3.36 3.36 0 0 1 1.598-.404h11.05c.578 0 1.119.147 1.596.404l-1.7-6.944c-.19-.605-.434-.946-.68-1.14-.243-.189-.538-.279-.916-.279zM19.05 14.58c0 2.021-1.546 3.72-3.525 3.72H4.475C2.495 18.3.95 16.602.95 14.58c0-.626.149-1.218.41-1.74l2.156-8.809.004-.016.005-.017c.235-.749.581-1.312 1.055-1.684.48-.376 1.034-.513 1.595-.513h7.65c.561 0 1.115.137 1.595.513.474.372.82.935 1.055 1.684l.005.017.004.016 2.156 8.81c.261.52.41 1.113.41 1.74" fill="currentColor"/>`,
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

const ServerOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

ServerOutlinedIcon.displayName = "ServerOutlinedIcon";

export default ServerOutlinedIcon;
