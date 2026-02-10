import * as React from "react";
import type { IconProps } from "./types";

/**
 * TreeAddOutlinedIcon icon component.
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
      __html: `<path fillRule="evenodd" d="M8.625 7.5c.7 0 1.051 0 1.313.15.17.1.313.241.412.412l.05.103c.1.252.1.597.1 1.21s0 .958-.1 1.21l-.05.102q-.113.195-.29.33l-.123.083c-.26.15-.611.15-1.312.15-.7 0-1.051 0-1.312-.15a1.1 1.1 0 0 1-.413-.412c-.15-.261-.15-.612-.15-1.313 0-.7 0-1.051.15-1.312.1-.172.241-.314.412-.413.262-.15.612-.15 1.313-.15m0 .9c-.367 0-.582 0-.74.015-.135.012-.15.03-.128.019a.2.2 0 0 0-.073.073c.01-.022-.007-.007-.019.128a10 10 0 0 0-.015.74c0 .367 0 .582.015.74a1 1 0 0 0 .019.127q.027.046.073.073a1 1 0 0 0 .128.02c.158.014.373.015.74.015s.582 0 .74-.015a1 1 0 0 0 .127-.02.2.2 0 0 0 .073-.073 1 1 0 0 0 .02-.127c.014-.158.015-.373.015-.74s0-.582-.015-.74a1 1 0 0 0-.02-.128.2.2 0 0 0-.073-.073 1 1 0 0 0-.127-.019 10 10 0 0 0-.74-.015" clipRule="evenodd" fill="currentColor"/><path d="M1.502.656a.45.45 0 0 1 .45.45V3.05l.04-.003h2.475a.45.45 0 0 1 0 .9H1.99q-.02-.001-.039-.004v4.809c0 .193.157.35.35.35H4.5a.45.45 0 0 1 0 .9H2.302c-.69 0-1.25-.56-1.25-1.25V1.106a.45.45 0 0 1 .45-.45m7.006.903a.45.45 0 0 1 .45.45v1.05h1.05a.45.45 0 0 1 0 .9h-1.05v1.05a.45.45 0 0 1-.9 0v-1.05h-1.05a.45.45 0 0 1 0-.9h1.05v-1.05a.45.45 0 0 1 .45-.45" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fillRule="evenodd" d="M11.5 10c.935 0 1.402 0 1.75.201l.163.11a1.5 1.5 0 0 1 .386.439c.2.348.201.815.201 1.75s0 1.402-.201 1.75a1.5 1.5 0 0 1-.549.549c-.348.2-.815.201-1.75.201s-1.402 0-1.75-.201a1.5 1.5 0 0 1-.549-.549c-.2-.348-.201-.815-.201-1.75s0-1.402.201-1.75l.11-.163c.119-.156.268-.287.439-.386l.137-.066C10.222 10 10.682 10 11.5 10m0 1c-.486 0-.783.001-1.005.021-.103.01-.165.021-.202.03a.2.2 0 0 0-.043.016.5.5 0 0 0-.183.183s-.007.01-.015.043c-.01.037-.021.1-.03.202-.02.222-.022.52-.022 1.005 0 .486.001.783.021 1.005.01.103.021.165.03.202a.2.2 0 0 0 .016.043.5.5 0 0 0 .183.183s.01.007.043.015c.037.01.1.021.202.03.222.02.52.022 1.005.022.486 0 .783-.001 1.005-.021.103-.01.165-.021.202-.03.033-.01.043-.016.043-.016a.5.5 0 0 0 .183-.183s.007-.01.015-.043c.01-.037.021-.1.03-.202.02-.222.022-.52.022-1.005 0-.486-.001-.783-.021-1.005a1.3 1.3 0 0 0-.03-.202c-.01-.033-.016-.043-.016-.043a.5.5 0 0 0-.183-.183s-.01-.007-.043-.015c-.037-.01-.1-.021-.202-.03A13 13 0 0 0 11.5 11" clipRule="evenodd" fill="currentColor"/><path d="M2.504 1a.5.5 0 0 1 .5.5V4H6a.5.5 0 0 1 0 1H3.004v6.772a.5.5 0 0 0 .5.5h2.568a.5.5 0 1 1 0 1H3.504a1.5 1.5 0 0 1-1.5-1.5V1.5a.5.5 0 0 1 .5-.5M11.5 2a.5.5 0 0 1 .5.5V4h1.5a.5.5 0 0 1 0 1H12v1.5a.5.5 0 0 1-1 0V5H9.5a.5.5 0 0 1 0-1H11V2.5a.5.5 0 0 1 .5-.5" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fillRule="evenodd" d="M14.742 12.004c.65.011 1.044.056 1.358.237l.1.063c.23.153.42.357.559.596l.08.165c.115.287.148.65.157 1.193L17 15c0 1.121 0 1.682-.241 2.1a1.8 1.8 0 0 1-.66.659c-.313.18-.706.226-1.357.237L14 18c-1.121 0-1.682 0-2.1-.241a1.8 1.8 0 0 1-.659-.66C11.001 16.683 11 16.122 11 15s0-1.682.241-2.1l.063-.1c.153-.23.357-.42.596-.559l.165-.08C12.467 12 13.019 12 14 12zM14 13c-.58 0-.947.001-1.224.026-.262.024-.344.063-.376.081a.8.8 0 0 0-.293.293c-.018.032-.057.114-.08.376C12 14.053 12 14.421 12 15c0 .58.001.947.026 1.224.024.262.063.344.081.376.07.121.172.222.293.293.032.018.114.057.376.08.277.026.645.027 1.224.027.58 0 .947-.001 1.224-.026.262-.024.344-.063.376-.081a.8.8 0 0 0 .293-.293c.018-.032.057-.114.08-.376C16 15.947 16 15.579 16 15c0-.58-.001-.947-.026-1.224-.024-.262-.063-.344-.081-.376a.8.8 0 0 0-.293-.293c-.032-.018-.114-.057-.376-.08C14.947 13 14.579 13 14 13" clipRule="evenodd" fill="currentColor"/><path d="M3.5 1.5A.5.5 0 0 1 4 2v3h4.501a.5.5 0 0 1 0 1H4v6.5A1.5 1.5 0 0 0 5.5 14h3.03a.5.5 0 0 1 0 1H5.5A2.5 2.5 0 0 1 3 12.5V2a.5.5 0 0 1 .5-.5m10.5 1a.5.5 0 0 1 .5.5v2h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0V6h-2a.5.5 0 0 1 0-1h2V3a.5.5 0 0 1 .5-.5" fill="currentColor"/>`,
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

const TreeAddOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

TreeAddOutlinedIcon.displayName = "TreeAddOutlinedIcon";

export default TreeAddOutlinedIcon;
