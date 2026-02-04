import * as React from "react";
import type { IconProps } from "./types";

/**
 * EchargeableAcidBatteryOutlinedIcon icon component.
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
      __html: `<path d="M9.55 3.3a.85.85 0 0 0-.85-.849H2.3a.85.85 0 0 0-.85.85v5.4c0 .47.38.85.85.85h6.4c.47 0 .85-.38.85-.85zm-4.046.913a.45.45 0 0 1 .691.576l-.634.762h.789a.452.452 0 0 1 .345.738l-1.25 1.5a.45.45 0 0 1-.691-.576l.635-.762h-.79a.45.45 0 0 1-.345-.738zm4.946.338h.05c.093 0 .253-.003.392.034a.68.68 0 0 1 .363.241l.074.12.049.118c.04.12.054.244.062.358.01.155.01.35.01.579 0 .23 0 .424-.01.58-.01.15-.033.32-.11.475a.68.68 0 0 1-.437.361c-.14.037-.3.034-.393.034h-.05v1.25a1.75 1.75 0 0 1-1.75 1.75H2.3a1.75 1.75 0 0 1-1.75-1.75v-5.4c0-.967.783-1.75 1.75-1.75h6.4c.967 0 1.75.783 1.75 1.75z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M13 5a1.5 1.5 0 0 0-1.5-1.5h-8A1.5 1.5 0 0 0 2 5v6a1.5 1.5 0 0 0 1.5 1.5h8A1.5 1.5 0 0 0 13 11zm-5.299.48a.5.5 0 0 1 .77.64L7.365 7.45H8.8a.5.5 0 0 1 .385.82l-1.787 2.15a.5.5 0 0 1-.768-.64l1.104-1.33H6.3a.5.5 0 0 1-.385-.82zM14 6.21q.1.007.19.024a.9.9 0 0 1 .528.293l.061.08.048.077c.102.18.138.377.154.557.02.206.019.464.019.76 0 .297 0 .554-.019.76s-.063.434-.202.635a.9.9 0 0 1-.59.373q-.09.015-.189.022V11a2.5 2.5 0 0 1-2.5 2.5h-8A2.5 2.5 0 0 1 1 11V5a2.5 2.5 0 0 1 2.5-2.5h8A2.5 2.5 0 0 1 14 5z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M16.696 6.115c0-1.03-.835-1.865-1.865-1.865H4.014c-1.03 0-1.865.835-1.865 1.865v7.77c0 1.03.835 1.866 1.865 1.866h10.817c1.03 0 1.865-.835 1.865-1.865v-1.76h-.002v-4.25h.002zm-7.044.91a.55.55 0 0 1 .847.702L9.069 9.45h1.876a.55.55 0 0 1 .424.9l-2.176 2.626a.55.55 0 1 1-.847-.702l1.429-1.724H7.9a.55.55 0 0 1-.424-.902zm8.143.865q.095.008.182.023c.256.047.508.16.696.418.172.233.228.502.252.752.025.248.024.558.024.918s0 .67-.024.918c-.024.25-.08.518-.252.752a1.06 1.06 0 0 1-.696.417q-.087.015-.182.023v1.775a2.966 2.966 0 0 1-2.964 2.966H4.014a2.966 2.966 0 0 1-2.965-2.966v-7.77A2.965 2.965 0 0 1 4.014 3.15h10.817a2.965 2.965 0 0 1 2.964 2.965z" fill="currentColor"/>`,
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

const EchargeableAcidBatteryOutlinedIcon = React.forwardRef<
  SVGSVGElement,
  IconProps
>((props, ref) => {
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
});

EchargeableAcidBatteryOutlinedIcon.displayName =
  "EchargeableAcidBatteryOutlinedIcon";

export default EchargeableAcidBatteryOutlinedIcon;
