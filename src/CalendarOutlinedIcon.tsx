import * as React from "react";
import type { IconProps } from "./types";

/**
 * CalendarOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M6 9.182a.45.45 0 0 0 .416-.28.46.46 0 0 0-.098-.496.449.449 0 0 0-.768.321c0 .12.047.236.132.322A.45.45 0 0 0 6 9.182m2.25 0a.45.45 0 0 0 .416-.28.46.46 0 0 0-.098-.496.449.449 0 0 0-.768.321c0 .12.047.236.132.322a.45.45 0 0 0 .318.133m0-1.818a.45.45 0 0 0 .416-.281.46.46 0 0 0-.098-.495.449.449 0 0 0-.768.321c0 .12.047.236.132.322a.45.45 0 0 0 .318.133m-2.25 0a.45.45 0 0 0 .416-.281.46.46 0 0 0-.098-.495.449.449 0 0 0-.768.321c0 .12.047.236.132.322A.45.45 0 0 0 6 7.364m3.15-5.455H8.7v-.454a.46.46 0 0 0-.132-.322.448.448 0 0 0-.768.322v.454H4.2v-.454a.46.46 0 0 0-.132-.322.448.448 0 0 0-.768.322v.454h-.45c-.358 0-.701.144-.955.4a1.37 1.37 0 0 0-.395.964v6.363c0 .362.142.709.395.965.254.255.597.399.955.399h6.3c.358 0 .701-.144.955-.4a1.37 1.37 0 0 0 .395-.964V3.273a1.37 1.37 0 0 0-.395-.965 1.34 1.34 0 0 0-.955-.399m.45 7.727c0 .12-.047.237-.132.322a.45.45 0 0 1-.318.133h-6.3a.45.45 0 0 1-.318-.133.46.46 0 0 1-.132-.322v-4.09h7.2zm0-5H2.4V3.273c0-.12.047-.236.132-.322a.45.45 0 0 1 .318-.133h.45v.455c0 .12.047.236.132.321a.448.448 0 0 0 .768-.321v-.455h3.6v.455c0 .12.047.236.132.321a.448.448 0 0 0 .768-.321v-.455h.45c.12 0 .234.048.318.133a.46.46 0 0 1 .132.322zM3.75 7.364a.45.45 0 0 0 .416-.281.46.46 0 0 0-.098-.495.449.449 0 0 0-.768.321c0 .12.047.236.132.322a.45.45 0 0 0 .318.133m0 1.818a.45.45 0 0 0 .416-.28.46.46 0 0 0-.098-.496.449.449 0 0 0-.768.321c0 .12.047.236.132.322a.45.45 0 0 0 .318.133"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fill="currentColor" d="M14.169 7.997c0-.568-.001-1.063-.01-1.497H1.846c-.009.434-.01.929-.01 1.497v1.334c0 1.271 0 2.174.093 2.86.09.67.26 1.056.542 1.338s.668.452 1.339.542c.685.092 1.588.093 2.859.093h2.667c1.271 0 2.174 0 2.86-.093.67-.09 1.056-.26 1.338-.542s.452-.668.542-1.339c.092-.685.093-1.588.093-2.859zM11.5 11a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0M6.669 3.164c-1.271 0-2.174 0-2.86.093-.67.09-1.056.26-1.338.542s-.452.668-.542 1.339a7 7 0 0 0-.038.362h12.223a8 8 0 0 0-.038-.362c-.09-.67-.26-1.057-.542-1.34-.282-.281-.668-.451-1.339-.541-.685-.092-1.588-.093-2.86-.093zM12.5 11a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m2.669-1.669c0 1.243.002 2.225-.102 2.992-.105.782-.326 1.415-.825 1.913-.499.5-1.132.72-1.913.825-.767.104-1.75.103-2.993.103H6.669c-1.243 0-2.225 0-2.992-.102-.782-.106-1.414-.327-1.913-.826s-.72-1.131-.826-1.913c-.103-.767-.102-1.75-.102-2.992V7.997c0-1.243 0-2.225.102-2.992.106-.782.327-1.414.826-1.913s1.131-.72 1.913-.825a9 9 0 0 1 .487-.05v-.553a.5.5 0 0 1 1 0v.51q.678-.012 1.505-.01h2.667q.823-.002 1.5.01v-.51a.5.5 0 0 1 1 0v.553q.26.019.493.05c.781.105 1.414.326 1.913.825s.72 1.131.825 1.913c.104.767.102 1.75.102 2.992z"/>`,
    },
    viewBox: "0 0 16 16",
  },

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

const CalendarOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

CalendarOutlinedIcon.displayName = "CalendarOutlinedIcon";

export default CalendarOutlinedIcon;
