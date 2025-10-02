import * as React from "react";
import type { IconProps } from "./types";

/**
 * TreeOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M12.833 13.003c0-.32 0-.529-.015-.686a.6.6 0 0 0-.051-.231.5.5 0 0 0-.184-.183.6.6 0 0 0-.231-.052 9 9 0 0 0-.685-.015c-.32 0-.529 0-.686.015a.6.6 0 0 0-.231.052.5.5 0 0 0-.183.183.6.6 0 0 0-.052.231 9 9 0 0 0-.015.686c0 .32 0 .528.015.684.013.15.037.205.052.232a.5.5 0 0 0 .183.183c.027.016.082.039.231.052.157.014.365.015.686.015.32 0 .528 0 .685-.015.149-.013.204-.036.231-.052a.5.5 0 0 0 .184-.183.6.6 0 0 0 .051-.232c.015-.156.015-.364.015-.684M2.164 9.668V1.5a.5.5 0 0 1 1 0V6h4.833a.5.5 0 0 1 0 1H3.164v2.668c0 .8.001 1.35.057 1.763.053.398.15.594.285.73.136.135.331.23.73.284.412.056.962.057 1.761.057h2a.5.5 0 1 1 0 1h-2c-.771 0-1.4.001-1.895-.066-.51-.068-.95-.216-1.303-.569-.353-.352-.501-.794-.57-1.304-.066-.494-.065-1.124-.065-1.895m10.669-3.001c0-.32 0-.529-.015-.686a.6.6 0 0 0-.051-.231.5.5 0 0 0-.184-.183.6.6 0 0 0-.231-.052 9 9 0 0 0-.685-.015c-.32 0-.529 0-.686.015a.6.6 0 0 0-.231.052.5.5 0 0 0-.183.183.6.6 0 0 0-.052.231 9 9 0 0 0-.015.686c0 .32 0 .528.015.685a.6.6 0 0 0 .052.231.5.5 0 0 0 .183.184.6.6 0 0 0 .231.051c.157.015.365.015.686.015.32 0 .528 0 .685-.015a.6.6 0 0 0 .231-.051.5.5 0 0 0 .184-.184.6.6 0 0 0 .051-.231c.015-.157.015-.364.015-.685m1 6.336c0 .302 0 .562-.018.774-.02.22-.064.437-.182.642a1.5 1.5 0 0 1-.55.55 1.5 1.5 0 0 1-.642.181c-.212.02-.472.019-.774.019s-.563 0-.775-.019a1.5 1.5 0 0 1-.642-.181 1.5 1.5 0 0 1-.549-.55 1.5 1.5 0 0 1-.182-.642c-.02-.212-.019-.472-.019-.774s0-.563.019-.776c.02-.219.064-.436.182-.641a1.5 1.5 0 0 1 .549-.549c.205-.118.422-.163.642-.183.212-.019.473-.018.775-.018s.562 0 .774.018c.22.02.437.065.642.183a1.5 1.5 0 0 1 .55.549c.118.205.162.422.182.641.019.213.018.474.018.776m0-6.336c0 .302 0 .562-.018.774-.02.22-.064.437-.182.642a1.5 1.5 0 0 1-.55.55 1.5 1.5 0 0 1-.642.181c-.212.02-.472.019-.774.019s-.563 0-.775-.019a1.5 1.5 0 0 1-.642-.181 1.5 1.5 0 0 1-.549-.55 1.5 1.5 0 0 1-.182-.642c-.02-.212-.019-.472-.019-.774s0-.563.019-.775c.02-.22.064-.437.182-.642a1.5 1.5 0 0 1 .549-.549c.205-.118.422-.163.642-.182.212-.02.473-.019.775-.019s.562 0 .774.019c.22.02.437.064.642.182.228.132.418.321.55.549.118.205.162.422.182.642.019.212.018.473.018.775"/>`,
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

const TreeOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

TreeOutlinedIcon.displayName = "TreeOutlinedIcon";

export default TreeOutlinedIcon;
