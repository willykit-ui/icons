import * as React from "react";
import type { IconProps } from "./types";

/**
 * NumberedListOutlinedIcon icon component.
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
      __html: `<path d="M2.501 8.419q.264 0 .46.096a.76.76 0 0 1 .309.258.62.62 0 0 1 .109.363.5.5 0 0 1-.134.356.6.6 0 0 1-.347.182v.02q.282.036.428.195a.55.55 0 0 1 .147.395q.001.217-.125.387a.84.84 0 0 1-.347.266 1.3 1.3 0 0 1-.508.097q-.278 0-.495-.096a.85.85 0 0 1-.342-.266.67.67 0 0 1-.128-.393h.541a.3.3 0 0 0 .062.164.4.4 0 0 0 .151.109.6.6 0 0 0 .213.038.5.5 0 0 0 .217-.043.36.36 0 0 0 .148-.121.3.3 0 0 0 .054-.178.3.3 0 0 0-.058-.18.37.37 0 0 0-.16-.125.6.6 0 0 0-.25-.044H2.21v-.395h.237a.5.5 0 0 0 .215-.042.35.35 0 0 0 .147-.117.3.3 0 0 0 .052-.177.31.31 0 0 0-.172-.282.5.5 0 0 0-.389-.001.35.35 0 0 0-.146.11.3.3 0 0 0-.058.17H1.58a.66.66 0 0 1 .125-.389.8.8 0 0 1 .328-.261q.208-.096.469-.096M10 9.999H5v-1h5zm-7.52-5.08q.273 0 .475.097a.76.76 0 0 1 .317.265.7.7 0 0 1 .113.39.8.8 0 0 1-.057.286 1.2 1.2 0 0 1-.2.312q-.144.17-.406.409l-.372.364v.017h1.069v.44H1.604v-.388l.906-.839a4 4 0 0 0 .194-.2.8.8 0 0 0 .12-.176.4.4 0 0 0 .041-.188.35.35 0 0 0-.05-.192.34.34 0 0 0-.14-.126.44.44 0 0 0-.2-.045.4.4 0 0 0-.204.048.33.33 0 0 0-.133.134.44.44 0 0 0-.048.211h-.51q0-.25.112-.434a.76.76 0 0 1 .317-.284q.204-.101.47-.101M10 6.499H5v-1h5zm-7.042-2.5h-.539V1.965h-.015l-.583.365v-.477l.631-.4h.506zm7.042-1H5v-1h5z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M2.501 11.05q.301 0 .527.11.226.108.35.295a.7.7 0 0 1 .126.415q0 .245-.151.407a.7.7 0 0 1-.397.207v.024q.321.04.488.223a.63.63 0 0 1 .168.452.7.7 0 0 1-.143.441.96.96 0 0 1-.397.304 1.4 1.4 0 0 1-.579.111q-.318 0-.567-.11a1 1 0 0 1-.39-.304.76.76 0 0 1-.147-.448h.62q.006.106.07.187a.4.4 0 0 0 .172.123q.108.044.243.044a.6.6 0 0 0 .25-.049.4.4 0 0 0 .168-.138.35.35 0 0 0 .06-.203.34.34 0 0 0-.065-.206.4.4 0 0 0-.184-.142.7.7 0 0 0-.285-.05h-.271v-.453h.271a.6.6 0 0 0 .247-.048.35.35 0 0 0 .228-.336.35.35 0 0 0-.2-.322.56.56 0 0 0-.444-.001.4.4 0 0 0-.165.126.33.33 0 0 0-.067.193h-.59a.76.76 0 0 1 .144-.443.93.93 0 0 1 .375-.3q.237-.11.535-.11M14 12.999H5v-1h9zM2.476 6.55q.312 0 .545.111a.86.86 0 0 1 .36.304q.13.195.13.446 0 .165-.065.325a1.4 1.4 0 0 1-.228.357q-.165.195-.465.468l-.425.416v.02H3.55v.502H1.476v-.443l1.036-.96q.132-.126.221-.229a1 1 0 0 0 .138-.2.5.5 0 0 0 .047-.215.4.4 0 0 0-.059-.22.4.4 0 0 0-.159-.143.5.5 0 0 0-.228-.052.5.5 0 0 0-.233.055.37.37 0 0 0-.154.154.5.5 0 0 0-.054.24h-.584a.87.87 0 0 1 .492-.821q.233-.114.537-.115M14 8.499H5v-1h9zm-10.978-3.5h-.614V2.674h-.017l-.666.418v-.546l.72-.456h.577zm10.978-1H5v-1h9z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fillRule="evenodd" d="M4.32 16.995h.362v.492H4.32V18h-.588v-.512H2.336v-.484L3.55 15.09h.77zm-1.364-.023v.023h.788v-1.234h-.022z" clipRule="evenodd" fill="currentColor"/><path d="M17 16.999H6v-1h11zM3.501 10.717q.301 0 .527.11.226.108.35.295.128.184.126.414 0 .245-.151.408a.7.7 0 0 1-.397.207v.023q.321.04.488.224a.63.63 0 0 1 .168.45.7.7 0 0 1-.143.443.96.96 0 0 1-.397.304q-.252.11-.579.11-.318 0-.567-.11a1 1 0 0 1-.39-.303.77.77 0 0 1-.147-.45h.62q.006.108.07.188a.43.43 0 0 0 .172.124q.108.044.243.044a.6.6 0 0 0 .25-.05.4.4 0 0 0 .168-.137.35.35 0 0 0 .06-.203.34.34 0 0 0-.065-.206.4.4 0 0 0-.184-.142.7.7 0 0 0-.285-.052h-.271v-.451h.271a.6.6 0 0 0 .247-.049.35.35 0 0 0 .228-.335.35.35 0 0 0-.2-.322.56.56 0 0 0-.444-.002.4.4 0 0 0-.165.127.33.33 0 0 0-.067.193h-.59a.76.76 0 0 1 .144-.443.93.93 0 0 1 .375-.3q.237-.11.535-.11M17 12.666H6v-1h11zM3.476 6.384q.312 0 .545.11a.86.86 0 0 1 .36.304.8.8 0 0 1 .13.446q0 .165-.065.325a1.4 1.4 0 0 1-.228.357q-.165.195-.465.468l-.425.416v.02H4.55v.502H2.476V8.89l1.036-.96q.132-.128.221-.23a1 1 0 0 0 .138-.2.5.5 0 0 0 .047-.215.4.4 0 0 0-.059-.22.4.4 0 0 0-.159-.143.5.5 0 0 0-.228-.05.5.5 0 0 0-.233.053.37.37 0 0 0-.154.154.5.5 0 0 0-.054.24h-.584q0-.285.13-.495A.86.86 0 0 1 2.94 6.5q.233-.115.537-.115M17 8.332H6v-1h11zM4.022 4.999h-.614V2.674h-.017l-.666.418v-.546l.72-.456h.577zm12.978-1H6v-1h11z" fill="currentColor"/>`,
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

const NumberedListOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

NumberedListOutlinedIcon.displayName = "NumberedListOutlinedIcon";

export default NumberedListOutlinedIcon;
