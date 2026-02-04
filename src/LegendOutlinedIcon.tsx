import * as React from "react";
import type { IconProps } from "./types";

/**
 * LegendOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M9 .5A2.5 2.5 0 0 1 11.5 3v6A2.5 2.5 0 0 1 9 11.5H3A2.5 2.5 0 0 1 .5 9V3A2.5 2.5 0 0 1 3 .5zm-6 .9A1.6 1.6 0 0 0 1.4 3v6A1.6 1.6 0 0 0 3 10.6h6A1.6 1.6 0 0 0 10.6 9V3A1.6 1.6 0 0 0 9 1.4zm2.951 6.4a.65.65 0 1 1-.001 1.3.65.65 0 0 1 .001-1.3m.053-4.95c.465 0 .89.14 1.198.45.309.309.448.734.448 1.198 0 .31-.123.574-.258.784-.134.208-.308.403-.453.566-.154.174-.28.317-.37.457-.09.137-.115.229-.115.295v.004l-.003.3a.45.45 0 0 1-.9-.008l.003-.301c.001-.307.125-.57.26-.779a5 5 0 0 1 .452-.565 4 4 0 0 0 .37-.458c.088-.137.115-.23.115-.295 0-.285-.083-.46-.186-.562-.102-.103-.276-.186-.561-.186s-.461.083-.566.187c-.103.103-.187.277-.187.561a.45.45 0 0 1-.9 0c0-.466.143-.89.453-1.2.31-.307.735-.448 1.2-.448" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h12v12H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M12 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3zM4 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm3.95 8a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5m.054-5.5c.553 0 1.06.147 1.433.48.38.339.563.818.563 1.352 0 .36-.161.662-.33.893-.166.23-.383.446-.564.627a5 5 0 0 0-.464.51c-.113.154-.138.249-.138.305v.006l-.004.333a.5.5 0 0 1-1-.012l.004-.333c.002-.358.162-.658.329-.888s.384-.446.564-.627c.194-.194.352-.354.465-.51.113-.154.138-.248.138-.304 0-.3-.097-.487-.23-.605-.14-.125-.382-.227-.766-.227s-.63.101-.773.228c-.134.119-.231.307-.231.604a.5.5 0 0 1-1 0c0-.536.186-1.015.57-1.353.374-.332.88-.479 1.434-.479" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M15 1.5A3.5 3.5 0 0 1 18.5 5v10a3.5 3.5 0 0 1-3.5 3.5H5A3.5 3.5 0 0 1 1.5 15V5A3.5 3.5 0 0 1 5 1.5zM5 2.6A2.4 2.4 0 0 0 2.6 5v10A2.4 2.4 0 0 0 5 17.4h10a2.4 2.4 0 0 0 2.4-2.4V5A2.4 2.4 0 0 0 15 2.6zm5.001 9.7a.7.7 0 1 1 0 1.401.7.7 0 0 1 0-1.401m.004-6.55c.638 0 1.214.188 1.632.599.419.411.614.982.614 1.615 0 .412-.168.767-.355 1.052-.187.282-.43.549-.635.776-.219.242-.4.445-.531.645-.13.196-.174.337-.174.446v.006l-.005.417a.55.55 0 0 1-1.1-.012l.004-.417c.002-.41.169-.762.356-1.046.186-.282.429-.549.634-.776.219-.242.4-.445.532-.645.13-.197.173-.338.173-.446 0-.408-.12-.67-.284-.83-.164-.162-.437-.284-.861-.284s-.7.123-.866.286c-.165.16-.288.422-.288.828a.55.55 0 1 1-1.1 0c0-.635.199-1.206.62-1.616.42-.41.996-.598 1.634-.598" fill="currentColor"/>`,
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

const LegendOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

LegendOutlinedIcon.displayName = "LegendOutlinedIcon";

export default LegendOutlinedIcon;
