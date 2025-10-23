import * as React from "react";
import type { IconProps } from "./types";

/**
 * DocumentsOutlinedIcon icon component.
 *
 * @description Supports sizes: small (12px), medium (16px, default), large (20px).
 * Automatically falls back to the closest available size if exact one is missing.
 *
 * @param fontSize - Icon size preset or custom pixel value
 * @param color - Icon color (supports CSS colors, variables, and 'currentColor')
 * @param ...props - All other SVG element props
 */

const svgChildren = {
  small: { content: { __html: "" }, viewBox: "0 0 16 16" },

  medium: {
    content: {
      __html: `<g clipPath="url(#a)"><path fill="currentColor" d="M2.834 5.334c0-.815-.002-1.49.051-2.038-.29.07-.473.171-.612.31-.185.185-.305.444-.371.933-.068.504-.068 1.171-.068 2.128v2.667c0 .957 0 1.624.068 2.128.066.49.186.748.37.933.14.139.322.24.613.31-.053-.549-.051-1.223-.051-2.038zM8 10.834a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1zm2-2.667a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1zm0-2.666a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1zm5.166 3.833c0 .928.002 1.675-.077 2.26-.08.6-.253 1.106-.654 1.508-.412.412-.934.58-1.556.659a2 2 0 0 1-.444.675c-.401.4-.907.573-1.507.654-.586.079-1.333.077-2.262.077H7.333c-.928 0-1.675.002-2.26-.077-.6-.08-1.106-.253-1.507-.655a2 2 0 0 1-.445-.674c-.622-.078-1.143-.247-1.555-.66-.401-.4-.574-.906-.654-1.506-.08-.586-.079-1.333-.079-2.261V6.667c0-.929 0-1.675.079-2.26.08-.6.253-1.106.654-1.508.412-.411.933-.582 1.555-.66.103-.249.246-.473.445-.673.401-.4.907-.573 1.507-.654.585-.079 1.332-.078 2.26-.078h1.333c.93 0 1.676 0 2.262.078.6.08 1.106.253 1.507.654.2.2.341.425.444.674.622.078 1.144.247 1.556.66.401.4.574.906.654 1.506.08.586.077 1.333.077 2.261zM3.834 10.667c0 .957 0 1.624.068 2.128.066.489.187.748.37.932.185.185.444.306.934.372.503.067 1.17.068 2.127.068h1.333c.957 0 1.625 0 2.128-.068.49-.066.749-.187.933-.372.185-.184.305-.443.371-.932.068-.504.068-1.171.068-2.128V5.334c0-.957 0-1.624-.068-2.128-.066-.49-.186-.748-.37-.933-.185-.184-.444-.305-.934-.37-.503-.068-1.17-.069-2.128-.069H7.333c-.956 0-1.624 0-2.127.068-.49.066-.749.187-.933.371-.185.185-.305.444-.371.933-.068.504-.069 1.171-.069 2.128zm9.333 0c0 .815 0 1.49-.053 2.038.292-.07.474-.171.613-.31.185-.185.305-.444.371-.933.068-.504.068-1.171.068-2.128V6.667c0-.957 0-1.624-.068-2.128-.066-.489-.187-.748-.37-.933-.14-.139-.322-.24-.614-.31.053.549.052 1.223.052 2.038z"/></g><defs><clipPath id="a"><rect width="16" height="16" fill="currentColor" rx="5"/></clipPath></defs>`,
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

const DocumentsOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

DocumentsOutlinedIcon.displayName = "DocumentsOutlinedIcon";

export default DocumentsOutlinedIcon;
