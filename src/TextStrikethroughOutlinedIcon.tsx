import * as React from "react";
import type { IconProps } from "./types";

/**
 * TextStrikethroughOutlinedIcon icon component.
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
      __html: `<path d="M6.083.908q.956 0 1.688.34.735.334 1.159.91v.001q.228.304.34.654c.09.278-.147.532-.44.532-.245 0-.446-.183-.543-.408a1.66 1.66 0 0 0-.634-.738c-.442-.29-.982-.431-1.61-.431q-.689-.002-1.217.225a2 2 0 0 0-.825.633 1.55 1.55 0 0 0-.298.93c0 .287.069.542.211.757l.002.001q.211.306.535.51.316.194.661.32l.002.002q.339.119.624.194l1.026.275q.388.102.867.283l.234.097q.057.026.114.055h2.146a.45.45 0 0 1 0 .9H9.112q.07.095.132.197c.181.304.276.683.276 1.14q0 .786-.412 1.417a2.7 2.7 0 0 1-1.003.911l-.193.099q-.784.376-1.928.378-.932-.001-1.635-.26l-.197-.08q-.764-.34-1.197-.939a2.5 2.5 0 0 1-.354-.708c-.095-.295.151-.568.462-.568.26 0 .473.199.569.442q.101.26.287.467l.002.001q.361.391.902.582l.001.001q.542.184 1.16.183.719 0 1.3-.235.58-.24.927-.674v-.001q.35-.448.35-1.036c0-.357-.1-.658-.309-.893a2 2 0 0 0-.541-.424H1.875a.45.45 0 0 1 0-.9h3.1q-.985-.326-1.576-.867c-.434-.398-.654-.917-.654-1.569q0-.813.438-1.412a2.93 2.93 0 0 1 1.196-.95A4.1 4.1 0 0 1 6.083.909" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M8.11 1.21q1.275.002 2.251.453.98.446 1.545 1.215h.001q.303.408.453.872c.12.371-.196.709-.587.709-.326 0-.594-.242-.723-.542a2.2 2.2 0 0 0-.846-.984c-.59-.388-1.309-.577-2.146-.577q-.919-.001-1.623.301-.696.303-1.1.844l-.001.001a2.06 2.06 0 0 0-.396 1.238q-.002.578.28 1.01l.003.002q.28.407.714.68.42.258.881.427l.002.001q.452.16.833.26l1.367.367v.001q.517.135 1.156.376l.312.13.015.006H13.5a.5.5 0 0 1 0 1h-1.565q.217.24.39.53c.242.405.367.909.367 1.519q0 1.048-.547 1.89-.472.736-1.338 1.214l-.257.132q-1.046.502-2.57.504-1.245 0-2.182-.348l-.262-.105q-1.018-.453-1.596-1.252a3.4 3.4 0 0 1-.473-.943c-.126-.395.203-.758.617-.758.348 0 .63.264.758.588q.137.347.384.624l.002.002q.48.522 1.203.775l.002.001a4.8 4.8 0 0 0 1.546.244q.959.001 1.733-.313c.515-.214.93-.514 1.236-.9h.001c.311-.396.466-.86.466-1.381 0-.477-.134-.878-.413-1.191a2.9 2.9 0 0 0-1.038-.722 9 9 0 0 0-.27-.11H2.5a.5.5 0 0 1 0-1h3.942q-1.18-.421-1.91-1.09c-.579-.53-.872-1.222-.872-2.09q.001-1.085.583-1.883.592-.814 1.596-1.266V1.67q1.013-.459 2.271-.46" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M10.138 1.613q1.574.002 2.772.557l.293.143a4.6 4.6 0 0 1 1.6 1.344v.001q.37.495.551 1.06a.53.53 0 0 1-.107.521.7.7 0 0 1-.53.235c-.355 0-.661-.266-.813-.618a2.87 2.87 0 0 0-1.094-1.274c-.757-.496-1.676-.736-2.738-.736-.774 0-1.467.124-2.068.383-.59.257-1.066.617-1.412 1.082l-.001.002-.004.005a2.67 2.67 0 0 0-.515 1.607c0 .496.12.94.368 1.317l.005.009.002.002q.36.516.907.863l.003.004.01.006q.529.323 1.109.537l.003.002-.001.001.011.004q.567.2 1.05.327l1.682.452v.001l.027.007q.639.167 1.43.465l.07.028h4.127a.55.55 0 1 1 0 1.1h-2.294q.426.39.74.913c.29.488.445 1.1.445 1.849q-.001 1.28-.67 2.306c-.382.596-.924 1.094-1.633 1.485l-.321.165c-.855.408-1.908.619-3.167.619q-1.54-.002-2.69-.428l-.325-.13q-1.25-.559-1.954-1.533a4.1 4.1 0 0 1-.577-1.151c-.132-.413.21-.817.675-.817.381 0 .705.292.856.673q.177.45.497.81l.004.004c.41.445.925.774 1.535.99l.009.004.004.002q.92.311 1.966.31 1.214.002 2.203-.398v-.001c.653-.272 1.184-.653 1.579-1.147l.009-.009a2.82 2.82 0 0 0 .603-1.788c0-.614-.174-1.142-.542-1.554-.344-.387-.792-.696-1.333-.928a12 12 0 0 0-.626-.246H3.125a.55.55 0 1 1 0-1.1h5.086c-1.033-.354-1.856-.818-2.479-1.387-.7-.64-1.057-1.478-1.057-2.539 0-.886.24-1.647.71-2.295l.188-.24q.687-.823 1.767-1.31l.01-.005q1.24-.559 2.788-.56" fill="currentColor"/>`,
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

const TextStrikethroughOutlinedIcon = React.forwardRef<
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

TextStrikethroughOutlinedIcon.displayName = "TextStrikethroughOutlinedIcon";

export default TextStrikethroughOutlinedIcon;
