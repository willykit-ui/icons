import * as React from "react";
import type { IconProps } from "./types";

/**
 * EyeOpenOutlinedIcon icon component.
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
      __html: `<path d="M5.999 2.072c2.035 0 3.365.966 4.173 1.922A6.4 6.4 0 0 1 11.21 5.73l.06.165q0 .006.003.01l.001.004.001.002-.477.15.474.159v.002l-.005.014-.013.036-.049.125a6.3 6.3 0 0 1-1.058 1.7c-.814.932-2.145 1.866-4.157 1.833-2-.033-3.325-.96-4.138-1.874A6.3 6.3 0 0 1 .795 6.397l-.049-.122-.014-.035-.003-.01-.001-.004-.001-.002.472-.163-.476-.15v-.007l.005-.01a3 3 0 0 1 .06-.165c.04-.106.103-.256.19-.434a6.4 6.4 0 0 1 .85-1.3c.807-.957 2.137-1.923 4.171-1.923m0 1c-1.673 0-2.743.779-3.408 1.567a5.4 5.4 0 0 0-.856 1.413q.05.116.142.293c.15.284.384.664.723 1.045.671.755 1.747 1.512 3.408 1.539 1.65.027 2.718-.725 3.388-1.492a5.3 5.3 0 0 0 .868-1.382 5.4 5.4 0 0 0-.856-1.416c-.666-.788-1.736-1.567-3.409-1.567m.7 2.944c0-.356-.3-.668-.7-.668s-.7.312-.7.668c0 .355.3.667.7.667s.7-.311.7-.667m-5.5.045-.472.162-.054-.156.049-.156zm10.125.003-.05.154-.475-.157.477-.15zM7.7 6.016c0 .933-.774 1.667-1.7 1.667s-1.7-.734-1.7-1.667c0-.934.774-1.668 1.7-1.668s1.7.734 1.7 1.668" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M8 2.928c2.652 0 4.382 1.256 5.435 2.503.524.62.881 1.238 1.108 1.7a7 7 0 0 1 .311.73l.016.047.005.014v.005l.002.002.047.154-.05.153-.001.002-.001.005-.005.014a3 3 0 0 1-.08.207 8.3 8.3 0 0 1-1.38 2.219c-1.062 1.215-2.794 2.43-5.416 2.386-2.611-.042-4.335-1.25-5.396-2.443A8.3 8.3 0 0 1 1.47 9.002a7 7 0 0 1-.32-.696l-.017-.044-.005-.014v-.004l-.002-.002-.053-.156.049-.157.477.15-.476-.15v-.002l.002-.005.003-.014.017-.047.06-.164A8.4 8.4 0 0 1 2.563 5.43c1.054-1.246 2.785-2.502 5.438-2.502m0 1c-2.292 0-3.761 1.07-4.672 2.148a7.4 7.4 0 0 0-1.19 1.984l-.006.01.002.003c.046.11.119.27.221.463.204.388.525.906.987 1.426.92 1.033 2.394 2.07 4.665 2.107 2.26.037 3.73-.994 4.647-2.044a7.3 7.3 0 0 0 1.208-1.94l.004-.01-.005-.015a7.4 7.4 0 0 0-1.19-1.983c-.91-1.08-2.38-2.15-4.671-2.15m1.1 4.09c0-.57-.48-1.056-1.1-1.056S6.9 7.447 6.9 8.018c0 .57.48 1.056 1.1 1.056S9.1 8.59 9.1 8.02m1 0c0 1.15-.954 2.057-2.1 2.057s-2.101-.91-2.101-2.057c0-1.15.954-2.057 2.1-2.057s2.1.908 2.1 2.057" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M9.999 3.736c3.288 0 5.431 1.556 6.737 3.102.65.769 1.094 1.536 1.376 2.111a9 9 0 0 1 .403.961l.006.017.001.006v.002L18 10.1l.521.173-.001.003v.005l-.007.017-.02.056-.077.199a10.3 10.3 0 0 1-1.714 2.753c-1.317 1.506-3.461 3.01-6.711 2.958-3.239-.053-5.376-1.55-6.69-3.03a10.3 10.3 0 0 1-1.396-2.015 9 9 0 0 1-.417-.916l-.006-.017-.001-.005H1.48v-.002l.52-.18-.525-.164v-.001l.001-.001.001-.006.006-.017.02-.056q.024-.074.075-.204c.066-.171.167-.413.308-.7.282-.576.727-1.343 1.376-2.112C4.567 5.292 6.71 3.736 10 3.736m0 1.1c-2.891 0-4.748 1.351-5.898 2.712a9.3 9.3 0 0 0-1.5 2.5l-.017.043q.008.014.014.032c.059.138.15.34.278.583a9.2 9.2 0 0 0 1.245 1.798c1.159 1.303 3.022 2.612 5.886 2.66 2.853.046 4.708-1.257 5.866-2.582a9.2 9.2 0 0 0 1.523-2.445l.017-.043-.017-.045a9.3 9.3 0 0 0-1.5-2.5C14.747 6.187 12.89 4.836 10 4.836m1.45 5.188c0-.756-.636-1.395-1.45-1.395-.815 0-1.45.639-1.45 1.395 0 .757.634 1.397 1.45 1.397.815 0 1.45-.64 1.45-1.397M2 10.1l-.521.178-.059-.17.055-.172zm16.578.005-.057.168L18 10.1l.524-.164zm-6.029-.08c0 1.392-1.155 2.496-2.55 2.496s-2.55-1.104-2.55-2.497 1.157-2.496 2.55-2.496c1.395 0 2.55 1.104 2.55 2.496" fill="currentColor"/>`,
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

const EyeOpenOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

EyeOpenOutlinedIcon.displayName = "EyeOpenOutlinedIcon";

export default EyeOpenOutlinedIcon;
