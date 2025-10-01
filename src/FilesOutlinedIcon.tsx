import * as React from "react";
import type { IconProps } from "./types";

/**
 * FilesOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M1.5 12.934V5.066c0-.178 0-.342.01-.478.012-.142.039-.298.117-.451.112-.22.29-.398.51-.51.153-.078.309-.105.45-.116.137-.011.301-.01.48-.01h3.1v-.435c0-.178 0-.342.01-.478.012-.142.039-.298.117-.451.112-.22.29-.398.51-.51.153-.078.309-.105.45-.116.137-.011.301-.01.48-.01h3.158c.139 0 .29-.004.437.031q.18.044.338.14c.13.08.234.189.332.287l2.042 2.042c.099.099.208.203.287.332q.095.156.14.337c.035.147.032.297.032.434v5.83c0 .178 0 .342-.01.478a1.2 1.2 0 0 1-.117.451 1.17 1.17 0 0 1-.51.51 1.2 1.2 0 0 1-.45.116c-.136.011-.3.011-.478.011H9.833v.434c0 .178 0 .342-.01.478a1.2 1.2 0 0 1-.117.451c-.111.219-.29.398-.51.51a1.2 1.2 0 0 1-.45.116c-.137.011-.3.011-.478.011H3.065c-.177 0-.341 0-.477-.01a1.2 1.2 0 0 1-.451-.117 1.17 1.17 0 0 1-.51-.51 1.2 1.2 0 0 1-.116-.45 4 4 0 0 1-.01-.225zm5.008-6.27.01.078a.17.17 0 0 0 .073.074c-.011-.006-.002.004.078.01.086.007.202.007.396.007H8.79l-.003-.004c-.024-.027-.058-.06-.119-.12L6.626 4.665l-.122-.12q-.003 0-.004-.003v1.724c0 .195 0 .311.008.397M2.5 12.934l.008.396.01.08a.17.17 0 0 0 .073.072c.008.002.03.006.078.01.086.007.202.008.396.008h5.203c.194 0 .31 0 .396-.008l.078-.01a.17.17 0 0 0 .072-.073.4.4 0 0 0 .012-.079c.007-.086.007-.202.007-.396v-5.1H7.065c-.178 0-.341 0-.477-.012a1.2 1.2 0 0 1-.451-.116 1.17 1.17 0 0 1-.51-.51 1.2 1.2 0 0 1-.116-.45c-.011-.137-.011-.3-.011-.48V4.5H3.066c-.195 0-.311 0-.397.008l-.078.01a.17.17 0 0 0-.072.073l-.011.079a6 6 0 0 0-.008.396zm8.674-8.27c.006.08.016.09.01.078a.17.17 0 0 0 .074.074c-.011-.006-.002.004.078.01.086.007.202.007.396.007h1.724l-.003-.004c-.024-.027-.058-.06-.119-.12l-2.042-2.043c-.06-.06-.094-.095-.121-.12q-.003 0-.004-.003v1.724c0 .195 0 .311.007.397M7.167 3.8q.088.08.166.16l2.042 2.042c.098.099.207.203.286.332q.096.156.14.337c.036.147.032.297.032.434V11.5h3.102c.194 0 .31 0 .396-.008l.078-.01a.16.16 0 0 0 .072-.073c-.005.01.005 0 .011-.079a6 6 0 0 0 .008-.396v-5.1h-1.768c-.178 0-.342 0-.478-.012a1.2 1.2 0 0 1-.45-.116 1.17 1.17 0 0 1-.51-.51 1.2 1.2 0 0 1-.116-.45c-.011-.137-.011-.3-.011-.48V2.5H7.733c-.195 0-.311 0-.397.008l-.078.01a.17.17 0 0 0-.073.073c.005-.011-.005-.001-.011.079-.007.086-.007.202-.007.396z"/>`,
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

const FilesOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

FilesOutlinedIcon.displayName = "FilesOutlinedIcon";

export default FilesOutlinedIcon;
