import * as React from "react";
import type { IconProps } from "./types";

/**
 * StatisticsOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M.625 8.875v-7.75a.5.5 0 0 1 1 0v7.75a1.5 1.5 0 0 0 1.5 1.5h7.75a.5.5 0 0 1 0 1h-7.75a2.5 2.5 0 0 1-2.5-2.5" fill="currentColor"/><path d="M9.95 2.734a.5.5 0 0 1 .849.532l-1.62 2.577c-.12.191-.223.356-.314.482-.09.126-.2.257-.344.355-.378.255-.85.27-1.243.032a1.4 1.4 0 0 1-.36-.339 10 10 0 0 1-.33-.465 9 9 0 0 0-.293-.413.6.6 0 0 0-.092-.101c-.055-.034-.106-.035-.165.005a.6.6 0 0 0-.092.11 9 9 0 0 0-.28.43L4.05 8.516a.5.5 0 0 1-.848-.532l1.62-2.577c.12-.191.222-.356.314-.482.09-.126.199-.257.343-.355.379-.255.85-.27 1.243-.032.15.091.264.218.36.339s.204.28.33.465c.135.196.223.322.294.413a.6.6 0 0 0 .092.101c.054.034.106.035.165-.005a.6.6 0 0 0 .091-.11 9 9 0 0 0 .28-.43z" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h12v12H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M1 12.5v-11a.5.5 0 0 1 1 0v11A1.5 1.5 0 0 0 3.5 14h11a.5.5 0 0 1 0 1h-11A2.5 2.5 0 0 1 1 12.5" fill="currentColor"/><path d="M13.41 3.734a.5.5 0 0 1 .847.532L12.097 7.7c-.161.258-.295.471-.412.635a1.7 1.7 0 0 1-.416.432 1.35 1.35 0 0 1-1.479.039 1.7 1.7 0 0 1-.434-.412 13 13 0 0 1-.435-.612c-.178-.26-.299-.434-.398-.56a.8.8 0 0 0-.166-.174.35.35 0 0 0-.4.013.8.8 0 0 0-.164.187c-.095.132-.21.313-.378.581l-2.158 3.436a.5.5 0 0 1-.848-.532l2.16-3.436c.161-.257.295-.47.412-.634.118-.163.248-.318.416-.432a1.35 1.35 0 0 1 1.479-.039c.174.106.31.256.434.412.123.158.265.364.435.612.178.26.299.434.398.56a.8.8 0 0 0 .166.174.35.35 0 0 0 .4-.013.8.8 0 0 0 .164-.187c.095-.132.21-.313.378-.581z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M1.375 16.125V1.875a.5.5 0 0 1 1 0v14.25a1.5 1.5 0 0 0 1.5 1.5h14.25a.5.5 0 0 1 0 1H3.875a2.5 2.5 0 0 1-2.5-2.5" fill="currentColor"/><path d="M16.867 4.734a.5.5 0 0 1 .848.532L15.017 9.56c-.203.323-.368.585-.513.786-.144.2-.296.379-.488.508a1.56 1.56 0 0 1-1.713.046 2 2 0 0 1-.51-.485 16 16 0 0 1-.539-.758 15 15 0 0 0-.5-.706c-.128-.162-.2-.221-.243-.248a.56.56 0 0 0-.634.019c-.045.03-.115.095-.237.264s-.266.4-.477.735l-2.698 4.294a.5.5 0 0 1-.848-.532l2.7-4.295c.203-.323.367-.585.511-.786.144-.2.297-.379.489-.508a1.56 1.56 0 0 1 1.713-.046c.198.12.358.293.51.485.15.193.325.446.538.758.222.322.375.545.501.706.127.161.199.221.242.248.204.124.43.12.635-.019.046-.03.115-.096.237-.264.121-.169.266-.4.476-.735z" fill="currentColor"/>`,
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

const StatisticsOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

StatisticsOutlinedIcon.displayName = "StatisticsOutlinedIcon";

export default StatisticsOutlinedIcon;
