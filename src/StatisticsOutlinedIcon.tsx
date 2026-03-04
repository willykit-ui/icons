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
      __html: `<path d="M1.5 1.05a.45.45 0 0 1 .45.451v7.5c0 .58.47 1.05 1.05 1.05h7.725a.45.45 0 0 1 0 .9H3a1.95 1.95 0 0 1-1.95-1.95v-7.5a.45.45 0 0 1 .45-.45" fill="currentColor"/><path d="M9.994 2.762a.45.45 0 1 1 .762.478l-1.62 2.577c-.12.192-.222.355-.312.48a1.4 1.4 0 0 1-.33.342 1.09 1.09 0 0 1-1.19.03 1.3 1.3 0 0 1-.345-.325 10 10 0 0 1-.33-.463 9 9 0 0 0-.295-.416.6.6 0 0 0-.105-.113q-.106-.067-.218.007a.5.5 0 0 0-.105.122 9 9 0 0 0-.281.433L4.005 8.49a.45.45 0 1 1-.76-.478l1.618-2.577q.18-.291.313-.48c.09-.124.194-.249.33-.342a1.09 1.09 0 0 1 1.19-.031c.142.086.252.206.346.326.095.12.202.278.33.463.133.195.222.324.294.416.07.09.1.11.105.113a.19.19 0 0 0 .22-.007.6.6 0 0 0 .103-.122c.07-.097.154-.23.281-.433z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M1.5 1a.5.5 0 0 1 .5.5v11A1.5 1.5 0 0 0 3.5 14h11a.5.5 0 0 1 0 1h-11A2.5 2.5 0 0 1 1 12.5v-11a.5.5 0 0 1 .5-.5" fill="currentColor"/><path d="M13.41 3.734a.5.5 0 0 1 .847.532L12.097 7.7c-.161.258-.295.471-.412.635a1.7 1.7 0 0 1-.416.432 1.35 1.35 0 0 1-1.479.039 1.7 1.7 0 0 1-.434-.412 13 13 0 0 1-.435-.612c-.178-.26-.299-.434-.398-.56a.8.8 0 0 0-.166-.174.35.35 0 0 0-.4.013.8.8 0 0 0-.164.187c-.095.132-.21.313-.378.581l-2.158 3.436a.5.5 0 0 1-.848-.532l2.16-3.436c.161-.257.295-.47.412-.634.118-.163.248-.318.416-.432a1.35 1.35 0 0 1 1.479-.039c.174.106.31.256.434.412.123.158.265.364.435.612.178.26.299.434.398.56a.8.8 0 0 0 .166.174.35.35 0 0 0 .4-.013.8.8 0 0 0 .164-.187c.095-.132.21-.313.378-.581z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M2.5 1.95a.55.55 0 0 1 .55.549v13c0 .8.65 1.45 1.45 1.45h13a.55.55 0 1 1 0 1.1h-13a2.55 2.55 0 0 1-2.55-2.55v-13a.55.55 0 0 1 .55-.55" fill="currentColor"/><path d="M16.825 4.706a.55.55 0 0 1 .932.586l-2.698 4.294a16 16 0 0 1-.515.789c-.145.201-.3.387-.5.521a1.61 1.61 0 0 1-1.768.047 2 2 0 0 1-.522-.497c-.153-.194-.328-.45-.541-.76a15 15 0 0 0-.5-.705c-.125-.16-.191-.214-.228-.236a.51.51 0 0 0-.58.018c-.039.025-.104.085-.224.253s-.265.396-.476.731l-2.698 4.295a.55.55 0 0 1-.932-.586l2.698-4.294c.203-.323.37-.587.515-.789a2 2 0 0 1 .501-.521 1.61 1.61 0 0 1 1.767-.047c.206.125.37.303.522.497s.328.45.541.76c.222.324.375.545.5.705.126.16.193.214.229.236.187.113.39.109.58-.019.038-.025.104-.084.224-.252.12-.166.264-.396.475-.731z" fill="currentColor"/>`,
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
