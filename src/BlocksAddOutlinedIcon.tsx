import * as React from "react";
import type { IconProps } from "./types";

/**
 * BlocksAddOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path fillRule="evenodd" d="M8.75 6.3a2.45 2.45 0 1 1 0 4.902 2.45 2.45 0 0 1 0-4.901m0 .901a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1m-5.5-.903c.458 0 .847 0 1.157.04.322.044.624.14.868.385.244.244.34.546.384.868.041.31.04.698.04 1.157s.001.848-.04 1.157c-.044.322-.14.624-.384.868s-.546.34-.868.384c-.31.042-.699.041-1.157.041-.46 0-.848 0-1.158-.04-.322-.044-.624-.14-.868-.385-.244-.244-.34-.545-.384-.868C.8 9.597.8 9.208.8 8.75s-.001-.848.04-1.157c.044-.322.14-.624.384-.868s.546-.34.868-.384c.31-.042.699-.041 1.158-.041m0 .9c-.484 0-.802 0-1.038.032-.222.03-.302.08-.351.13-.05.048-.1.128-.13.35-.03.236-.031.554-.031 1.038s0 .802.032 1.037c.03.223.08.303.129.352s.129.099.351.129c.236.031.554.032 1.038.032.483 0 .801 0 1.037-.032.222-.03.302-.08.351-.13.05-.048.1-.129.13-.35.03-.236.031-.554.031-1.038s0-.802-.032-1.037c-.03-.223-.08-.303-.129-.352s-.129-.099-.351-.129C4.05 7.2 3.733 7.2 3.25 7.2m0-6.4a2.45 2.45 0 1 1 0 4.901 2.45 2.45 0 0 1 0-4.9m0 .901a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1" clipRule="evenodd" fill="currentColor"/><path d="M8.75 1.3a.45.45 0 0 1 .45.451v1.05h1.05a.45.45 0 0 1 0 .9H9.2v1.05a.45.45 0 0 1-.9 0v-1.05H7.25a.45.45 0 0 1 0-.9H8.3V1.75a.45.45 0 0 1 .45-.45" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h12v12H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fillRule="evenodd" d="M4.333 8.5c.614 0 1.125 0 1.53.054.418.056.795.18 1.099.483.304.304.428.681.484 1.1.055.404.053.916.053 1.53s.002 1.125-.053 1.53c-.056.418-.18.795-.484 1.099s-.681.428-1.1.484c-.404.055-.915.053-1.529.053s-1.126.002-1.53-.053c-.419-.056-.796-.18-1.1-.484-.303-.304-.427-.681-.483-1.1-.055-.404-.054-.915-.054-1.529s0-1.126.054-1.53c.056-.419.18-.796.483-1.1.304-.303.681-.427 1.1-.483.404-.055.916-.054 1.53-.054m0 1c-.642 0-1.074 0-1.396.044-.308.041-.44.113-.527.2s-.159.219-.2.527c-.043.321-.044.753-.044 1.396s0 1.075.044 1.396c.041.308.113.439.2.526s.219.159.527.2c.322.043.754.044 1.396.044.643 0 1.075 0 1.396-.044.308-.041.439-.113.526-.2s.159-.218.2-.526c.043-.322.044-.754.044-1.396 0-.643 0-1.075-.044-1.396-.041-.308-.113-.44-.2-.527s-.218-.159-.526-.2c-.321-.043-.753-.044-1.396-.044m7.334-1a3.167 3.167 0 1 1-.001 6.333 3.167 3.167 0 0 1 .001-6.333m0 1a2.167 2.167 0 1 0 0 4.335 2.167 2.167 0 0 0 0-4.335M4.333 1.166a3.167 3.167 0 1 1-.001 6.333 3.167 3.167 0 0 1 .001-6.333m0 1a2.167 2.167 0 1 0 0 4.334 2.167 2.167 0 0 0 0-4.334" clipRule="evenodd" fill="currentColor"/><path d="M11.666 1.834a.5.5 0 0 1 .5.5v1.5h1.5a.5.5 0 1 1 0 1h-1.5v1.5a.5.5 0 1 1-1 0v-1.5h-1.5a.5.5 0 1 1 0-1h1.5v-1.5a.5.5 0 0 1 .5-.5" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fillRule="evenodd" d="M5.416 10.7c.77 0 1.403-.002 1.902.065.515.069.97.22 1.332.584.363.363.514.817.583 1.332.067.499.067 1.131.067 1.901s0 1.403-.067 1.902c-.069.515-.22.97-.583 1.332-.363.364-.817.514-1.332.583-.499.067-1.132.067-1.902.067s-1.403 0-1.901-.067c-.515-.069-.97-.22-1.332-.583-.364-.363-.515-.817-.584-1.332-.067-.499-.066-1.132-.066-1.902s-.001-1.402.066-1.901c.069-.515.22-.97.584-1.332.363-.364.817-.515 1.332-.584.498-.067 1.131-.066 1.901-.066m0 1.099c-.8 0-1.346.002-1.755.056-.392.053-.576.146-.701.271s-.218.308-.27.701c-.055.409-.057.954-.057 1.755s.002 1.347.056 1.756c.053.393.146.576.271.701s.309.218.701.27c.409.055.954.056 1.755.056s1.347 0 1.756-.055c.392-.053.576-.146.701-.27.125-.126.218-.31.27-.702.055-.409.056-.955.056-1.756 0-.8 0-1.346-.055-1.755-.053-.392-.146-.576-.271-.701s-.309-.218-.701-.27c-.409-.056-.955-.057-1.756-.057m9.167-1.098a3.884 3.884 0 1 1 0 7.766 3.884 3.884 0 0 1 0-7.767m0 1.099a2.784 2.784 0 1 0 .001 5.567 2.784 2.784 0 0 0-.001-5.567M5.416 1.531a3.884 3.884 0 1 1 0 7.768 3.884 3.884 0 0 1 0-7.768m0 1.1a2.784 2.784 0 1 0 0 5.567 2.784 2.784 0 0 0 0-5.567" clipRule="evenodd" fill="currentColor"/><path d="M14.583 2.367a.55.55 0 0 1 .55.55v1.95h1.95a.55.55 0 0 1 0 1.1h-1.95v1.95a.55.55 0 0 1-1.1 0v-1.95h-1.95a.55.55 0 1 1 0-1.1h1.95v-1.95a.55.55 0 0 1 .55-.55" fill="currentColor"/>`,
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

const BlocksAddOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

BlocksAddOutlinedIcon.displayName = "BlocksAddOutlinedIcon";

export default BlocksAddOutlinedIcon;
