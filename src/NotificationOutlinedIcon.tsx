import * as React from "react";
import type { IconProps } from "./types";

/**
 * NotificationOutlinedIcon icon component.
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
      __html: `<path d="M8.253 4.96c0-1.138-.988-2.11-2.242-2.11-1.258 0-2.243.968-2.243 2.11v1.234c0 .188-.04.396-.094.58a2.2 2.2 0 0 1-.23.539l-.001.001-.517.816v-.001c-.092.144-.087.26-.056.34.032.082.116.182.297.241a9.4 9.4 0 0 0 5.683 0h.002c.279-.088.367-.377.238-.581v-.001l-.515-.814-.004-.007a2.3 2.3 0 0 1-.225-.534 2.2 2.2 0 0 1-.093-.579zM5.47 10.13c.136.135.326.22.53.22a.75.75 0 0 0 .61-.32q-.61.036-1.223 0 .038.054.083.1M6 1.65q-.093 0-.173.028c-.084.028-.159.094-.214.279l-.005.019a3.3 3.3 0 0 1 .821.002l-.006-.036c-.027-.11-.066-.161-.106-.19A.54.54 0 0 0 6 1.65m3.154 4.544c0 .074.018.193.057.33.04.135.09.25.13.316h-.002l.512.808h.001c.463.735.076 1.666-.73 1.92a10 10 0 0 1-1.504.355A1.655 1.655 0 0 1 6 11.25a1.654 1.654 0 0 1-1.62-1.33q-.753-.12-1.486-.352h-.002c-.401-.13-.718-.402-.862-.772-.145-.373-.093-.788.135-1.148l.516-.815c.04-.065.09-.177.128-.31a1.3 1.3 0 0 0 .058-.329V4.961c0-1.208.739-2.232 1.789-2.714.013-.182.04-.37.094-.549.105-.35.331-.72.79-.874a1.45 1.45 0 0 1 1.302.198c.265.191.394.459.454.706.043.175.055.354.055.516 1.055.481 1.802 1.508 1.802 2.717z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M11.105 6.614c0-1.578-1.368-2.915-3.09-2.915-1.729 0-3.09 1.331-3.09 2.915V8.26c0 .237-.051.505-.121.745s-.172.493-.297.692l-.001.002-.689 1.087c-.136.216-.138.405-.084.543.055.142.194.295.461.381 2.48.788 5.156.788 7.637 0v-.001c.432-.135.584-.592.375-.924v.001l-.688-1.087-.005-.008a3 3 0 0 1-.287-.688 2.8 2.8 0 0 1-.12-.743zm-4.1 6.648c.055.117.128.225.218.315.198.198.478.322.777.322.438 0 .819-.262.995-.636q-.996.072-1.99-.001M7.999 2.1a.8.8 0 0 0-.34.073c-.129.058-.227.174-.292.404a2 2 0 0 0-.039.179 4.3 4.3 0 0 1 1.363-.002 1.4 1.4 0 0 0-.03-.19c-.04-.161-.102-.253-.18-.31A.82.82 0 0 0 8 2.1m4.106 6.159c0 .11.028.28.081.467.053.18.119.338.177.437l.688 1.087v.001c.581.92.099 2.091-.918 2.411h-.001q-1.017.321-2.063.48A2.104 2.104 0 0 1 8 14.9a2.1 2.1 0 0 1-1.484-.615 2.1 2.1 0 0 1-.584-1.145 13.6 13.6 0 0 1-2.04-.478H3.89c-.511-.164-.908-.509-1.087-.97-.181-.466-.118-.986.17-1.441l.689-1.087c.06-.097.129-.256.183-.44.054-.185.08-.354.08-.464V6.614c0-1.586.981-2.934 2.374-3.552.01-.247.037-.51.107-.757.114-.403.355-.822.84-1.042a1.82 1.82 0 0 1 1.821.18c.328.236.49.57.567.883.06.245.073.499.07.726 1.406.614 2.402 1.97 2.402 3.562z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M13.957 8.267c0-2.018-1.747-3.718-3.938-3.718-2.199 0-3.938 1.693-3.939 3.718v2.055c0 .287-.06.616-.147.911a3.5 3.5 0 0 1-.362.847l-.002.002-.86 1.358c-.182.289-.189.55-.112.747.078.2.271.407.623.52 3.114.99 6.477.99 9.592 0 .583-.184.798-.808.509-1.267l-.86-1.358-.006-.009a3.6 3.6 0 0 1-.351-.842 3.4 3.4 0 0 1-.147-.909zM8.64 16.49a1.46 1.46 0 0 0 1.36.96c.623 0 1.156-.4 1.36-.955-.906.072-1.816.07-2.721-.003M9.999 2.55a1.1 1.1 0 0 0-.606.18c-.133.087-.23.23-.29.464a2 2 0 0 0-.056.346 5.3 5.3 0 0 1 1.902-.007 2 2 0 0 0-.05-.344c-.052-.214-.137-.347-.253-.431a1.1 1.1 0 0 0-.647-.208m5.058 7.773c0 .148.035.368.104.605.066.23.152.436.23.567l.86 1.358v.002c.698 1.106.12 2.516-1.108 2.902l-.001-.001q-1.292.409-2.621.606A2.554 2.554 0 0 1 10 18.55a2.556 2.556 0 0 1-2.523-2.192 17 17 0 0 1-2.593-.602l-.002-.001c-.62-.2-1.096-.615-1.311-1.168-.217-.557-.141-1.182.208-1.734l.858-1.356.062-.11c.062-.124.125-.284.176-.461.07-.236.105-.456.105-.603V8.267c0-1.962 1.221-3.63 2.954-4.385 0-.304.02-.642.103-.965.106-.405.32-.825.751-1.107.348-.229.765-.36 1.21-.36a2.2 2.2 0 0 1 1.29.414c.39.282.585.68.68 1.06.077.317.089.646.083.94 1.757.746 3.005 2.428 3.005 4.403z" fill="currentColor"/>`,
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

const NotificationOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

NotificationOutlinedIcon.displayName = "NotificationOutlinedIcon";

export default NotificationOutlinedIcon;
