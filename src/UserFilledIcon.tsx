import * as React from "react";
import type { IconProps } from "./types";

/**
 * UserFilledIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M6.001.55a5.45 5.45 0 0 1 5.21 7.049l-.016.05a5.4 5.4 0 0 1-.516 1.146l-.037.061-.104.16-.04.06-.103.148-.05.065-.098.125-.067.083q-.054.064-.11.125l-.058.066-.116.12-.06.062q-.067.067-.138.131l-.048.045-.108.095q-.05.045-.104.088l-.057.045-.133.102-.095.067a5.4 5.4 0 0 1-1.727.818l-.019.005q-.675.182-1.406.184v.001H6a5.45 5.45 0 0 1 0-10.9zm0 6.5c-1.259 0-2.132.214-2.69.727-.386.356-.57.812-.663 1.301A4.54 4.54 0 0 0 6 10.551a4.54 4.54 0 0 0 3.366-1.49c-.095-.484-.281-.933-.667-1.285-.56-.511-1.436-.725-2.697-.725m0-4.5a1.95 1.95 0 1 0 .001 3.901 1.95 1.95 0 0 0 0-3.9" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h12v12H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M8.002 1a6.97 6.97 0 0 1 4.707 1.818 6.98 6.98 0 0 1 2.28 5.599l-.003.034a7 7 0 0 1-.086.728 7 7 0 0 1-.074.375q-.017.082-.038.163-.095.378-.23.74l-.027.066q-.058.151-.124.298l-.037.082q-.068.15-.143.296l-.022.043a7 7 0 0 1-12.732-.719l-.019-.046a7 7 0 0 1-.24-.76l-.025-.11a7 7 0 0 1-.168-1.119q-.004-.036-.006-.073a6.98 6.98 0 0 1 2.799-6.024 7 7 0 0 1 1.463-.841A7 7 0 0 1 8.002 1m0 8.45c-1.655 0-2.766.353-3.461 1.073-.46.477-.688 1.068-.807 1.694A5.98 5.98 0 0 0 8.002 14a5.98 5.98 0 0 0 4.268-1.785c-.118-.625-.346-1.216-.805-1.692-.695-.72-1.806-1.073-3.462-1.073M8 3.6a2.45 2.45 0 1 0 0 4.902A2.45 2.45 0 0 0 8 3.6" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M10.003 1.45a8.55 8.55 0 0 1 8.044 11.448l-.032.085a8 8 0 0 1-.405.915l-.06.117a9 9 0 0 1-.49.807l-.02.03q-.267.386-.575.74l-.044.05a8.6 8.6 0 0 1-1.445 1.31l-.013.009.005-.005a8.55 8.55 0 0 1-13.294-5.025l-.03-.132a8 8 0 0 1-.108-.611q-.016-.108-.028-.217l-.012-.098-.026-.337-.001-.02a9 9 0 0 1-.015-.418l-.002-.099a8.54 8.54 0 0 1 3.454-6.864l.077-.056a8.6 8.6 0 0 1 1.52-.88 8.5 8.5 0 0 1 3.5-.75m0 10.4c-2.03 0-3.374.432-4.212 1.3-.583.605-.86 1.365-.998 2.173a7.42 7.42 0 0 0 5.209 2.126 7.42 7.42 0 0 0 5.212-2.129c-.138-.806-.415-1.565-.997-2.17-.838-.868-2.182-1.3-4.213-1.3m-.001-7.2a2.95 2.95 0 1 0 0 5.9 2.95 2.95 0 0 0 0-5.9" fill="currentColor"/>`,
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

const UserFilledIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

UserFilledIcon.displayName = "UserFilledIcon";

export default UserFilledIcon;
