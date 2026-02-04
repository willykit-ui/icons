import * as React from "react";
import type { IconProps } from "./types";

/**
 * VerifiedOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M5.168 6.633a1.31 1.31 0 0 1 1.703 0c.066.056.148.09.234.096A1.31 1.31 0 0 1 8.31 7.934a.4.4 0 0 0 .097.234q.15.176.227.383H9.7c.47 0 .85-.38.85-.85v-5.4a.85.85 0 0 0-.85-.85H2.3a.85.85 0 0 0-.85.85v5.4c0 .47.38.85.85.85h1.106a1.3 1.3 0 0 1 .227-.383.4.4 0 0 0 .097-.234 1.31 1.31 0 0 1 1.204-1.205.4.4 0 0 0 .234-.096m1.12.684a.41.41 0 0 0-.536 0c-.21.18-.471.288-.746.31a.41.41 0 0 0-.38.378c-.02.26-.118.507-.28.71a.45.45 0 0 1 .104.286.45.45 0 0 1-.119.302c.171.207.274.462.296.73a.41.41 0 0 0 .379.378c.275.022.536.13.746.31a.41.41 0 0 0 .535 0c.21-.18.471-.288.746-.31a.41.41 0 0 0 .38-.378c.021-.275.129-.536.308-.746a.41.41 0 0 0 0-.535 1.3 1.3 0 0 1-.309-.747.41.41 0 0 0-.379-.378 1.3 1.3 0 0 1-.746-.31m.155.855a.45.45 0 0 1 .614.658l-1.072 1a.45.45 0 0 1-.614 0l-.428-.4a.45.45 0 1 1 .614-.658l.12.113zM8.5 4.3a.45.45 0 0 1 0 .9h-5a.45.45 0 0 1 0-.9zm-1-1.75a.45.45 0 0 1 0 .9h-3a.45.45 0 0 1 0-.9zm3.95 5.15A1.75 1.75 0 0 1 9.7 9.45H8.646q-.078.226-.24.42a.4.4 0 0 0-.097.234 1.31 1.31 0 0 1-1.204 1.204.4.4 0 0 0-.234.097 1.31 1.31 0 0 1-1.703 0 .4.4 0 0 0-.234-.097 1.31 1.31 0 0 1-1.204-1.203.4.4 0 0 0-.097-.236 1.3 1.3 0 0 1-.24-.419H2.3A1.75 1.75 0 0 1 .55 7.7V2.3c0-.967.783-1.75 1.75-1.75h7.4c.966 0 1.75.783 1.75 1.75z" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h12v12H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M6.953 8.888a1.61 1.61 0 0 1 2.091 0c.098.083.22.134.349.144.788.063 1.415.69 1.478 1.479.01.128.06.25.144.347.163.192.273.412.333.642H12.5A1.5 1.5 0 0 0 14 10V3.5A1.5 1.5 0 0 0 12.5 2h-9A1.5 1.5 0 0 0 2 3.5V10a1.5 1.5 0 0 0 1.5 1.5h1.15c.06-.23.17-.45.332-.642a.6.6 0 0 0 .145-.347 1.61 1.61 0 0 1 1.478-1.479.6.6 0 0 0 .348-.144m1.443.76a.61.61 0 0 0-.793 0c-.259.22-.58.353-.918.38a.61.61 0 0 0-.561.562c-.027.338-.16.659-.38.917a.61.61 0 0 0 0 .794c.22.258.353.579.38.917a.61.61 0 0 0 .56.56c.339.027.66.16.919.38a.61.61 0 0 0 .793 0c.258-.22.579-.353.916-.38a.61.61 0 0 0 .562-.56c.027-.338.16-.66.38-.917a.61.61 0 0 0 0-.794 1.6 1.6 0 0 1-.38-.917.61.61 0 0 0-.562-.562 1.6 1.6 0 0 1-.916-.38m.238 1.24a.5.5 0 0 1 .682.731l-1.393 1.3a.5.5 0 0 1-.682 0l-.557-.52a.5.5 0 0 1 .682-.731l.216.201zm2.617-5.01a.5.5 0 0 1 0 1h-6.5a.5.5 0 0 1 0-1zm-1.3-2.274a.5.5 0 0 1 0 1H6.05a.5.5 0 0 1 0-1zM15 10a2.5 2.5 0 0 1-2.5 2.5h-1.216a1.6 1.6 0 0 1-.27.45.6.6 0 0 0-.143.347 1.61 1.61 0 0 1-1.478 1.478.6.6 0 0 0-.35.145 1.61 1.61 0 0 1-2.09 0 .6.6 0 0 0-.348-.145 1.61 1.61 0 0 1-1.478-1.478.6.6 0 0 0-.145-.348 1.6 1.6 0 0 1-.268-.449H3.5A2.5 2.5 0 0 1 1 10V3.5A2.5 2.5 0 0 1 3.5 1h9A2.5 2.5 0 0 1 15 3.5z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M8.733 11.118a1.96 1.96 0 0 1 2.538 0 .8.8 0 0 0 .446.185 1.96 1.96 0 0 1 1.794 1.795c.013.164.078.32.184.445.22.258.36.558.425.871h1.58c.946 0 1.713-.767 1.713-1.713v-8.4c0-.946-.767-1.713-1.713-1.713H4.3c-.946 0-1.713.767-1.713 1.713v8.4c0 .946.767 1.713 1.713 1.713h1.585c.065-.313.205-.613.425-.871a.8.8 0 0 0 .184-.445 1.96 1.96 0 0 1 1.794-1.795.8.8 0 0 0 .445-.185m1.777.894a.78.78 0 0 0-1.015 0 1.96 1.96 0 0 1-1.113.46.78.78 0 0 0-.718.718c-.033.41-.194.8-.46 1.114a.8.8 0 0 0-.183.433.58.58 0 0 1 .055.37q.045.114.127.212c.267.313.428.703.461 1.113.03.383.335.688.718.718.41.033.8.194 1.113.461a.78.78 0 0 0 1.015 0 1.96 1.96 0 0 1 1.113-.46.78.78 0 0 0 .718-.72 1.96 1.96 0 0 1 .46-1.112.8.8 0 0 0 .123-.203.6.6 0 0 1 .057-.386.8.8 0 0 0-.18-.426 1.96 1.96 0 0 1-.46-1.114.78.78 0 0 0-.718-.717c-.41-.033-.8-.194-1.113-.461m.29 1.568a.587.587 0 1 1 .8.857l-1.714 1.6a.587.587 0 0 1-.801 0l-.686-.64a.587.587 0 0 1 .801-.857l.285.266zm3.198-6.158a.587.587 0 0 1 0 1.173h-8a.586.586 0 1 1 0-1.173zm-1.599-2.8a.587.587 0 0 1 0 1.173H7.6a.586.586 0 0 1 0-1.173zm6.188 8.08a2.887 2.887 0 0 1-2.887 2.886H14a2 2 0 0 1-.305.492.8.8 0 0 0-.184.445 1.956 1.956 0 0 1-1.794 1.794.8.8 0 0 0-.446.185 1.96 1.96 0 0 1-2.538 0 .8.8 0 0 0-.445-.185 1.956 1.956 0 0 1-1.794-1.794.8.8 0 0 0-.184-.445 2 2 0 0 1-.306-.492H4.3A2.887 2.887 0 0 1 1.413 12.7V4.3A2.887 2.887 0 0 1 4.3 1.414h11.4a2.887 2.887 0 0 1 2.887 2.887z" fill="currentColor"/>`,
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

const VerifiedOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

VerifiedOutlinedIcon.displayName = "VerifiedOutlinedIcon";

export default VerifiedOutlinedIcon;
