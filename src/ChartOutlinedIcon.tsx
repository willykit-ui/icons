import * as React from "react";
import type { IconProps } from "./types";

/**
 * ChartOutlinedIcon icon component.
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
      __html: `<path d="M9.706 7.152c0-.221-.152-.318-.242-.318H8.079c-.09 0-.242.097-.242.318v3.397h1.869zM6.933 2.384c0-.34-.001-.549-.022-.7-.018-.139-.046-.16-.05-.164s-.029-.031-.164-.05a6 6 0 0 0-.699-.02c-.339 0-.549 0-.7.02-.138.02-.16.046-.164.05-.004.003-.03.025-.049.164-.02.151-.022.36-.022.7V4.06q.003.035.003.07v6.419h1.87v-.32h-.003zm-4.635 8.165h1.869v-.32h-.004V4.085a.44.44 0 0 0-.094-.247c-.053-.063-.105-.081-.144-.081H2.54c-.039 0-.092.018-.145.08a.46.46 0 0 0-.097.294zM7.832 5.96q.118-.027.247-.027h1.385c.674 0 1.141.591 1.141 1.218v3.397H11v.9H1a.45.45 0 0 1 0-.9h.397V4.13c0-.627.442-1.275 1.143-1.275h1.385q.125 0 .238.027v-.5c0-.313 0-.593.03-.819.031-.238.106-.481.305-.68s.442-.274.68-.306c.226-.03.507-.03.82-.03.314 0 .594 0 .82.03.238.032.481.107.68.306s.273.442.305.68c.03.226.029.506.029.82z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M12.9 9.5c0-.327-.227-.5-.4-.5h-1.8c-.172 0-.4.173-.4.5V14h2.6zM9.3 3.3c0-.438-.001-.717-.029-.921-.025-.19-.065-.238-.088-.262-.024-.023-.073-.063-.262-.089C8.717 2.001 8.438 2 8 2s-.717 0-.92.028c-.19.026-.24.066-.263.09s-.063.071-.088.26c-.028.205-.029.484-.029.922V14h2.6zM3.1 14h2.6V5.571l-.012-.14C5.638 5.132 5.425 5 5.3 5H3.5c-.143 0-.4.17-.4.571zm7.2-5.938Q10.488 8 10.7 8h1.8c.821 0 1.4.722 1.4 1.5V14h.6v1h-13a.5.5 0 0 1 0-1h.6V5.571C2.1 4.79 2.649 4 3.5 4h1.8q.213.002.4.063V3.3c0-.41-.001-.768.037-1.054.04-.3.133-.596.373-.836s.536-.332.836-.373C7.232 1 7.59 1 8 1s.768-.001 1.054.037c.3.04.595.133.836.373.24.24.332.536.373.836.038.286.037.644.037 1.054z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M16.096 11.846c0-.432-.303-.682-.558-.682h-2.216c-.252 0-.551.245-.556.67v4.935h-.001v.68h3.33zm-4.43-7.631c0-.538-.002-.886-.036-1.143-.033-.24-.084-.317-.127-.36s-.12-.095-.36-.127c-.257-.034-.605-.036-1.142-.036-.538 0-.886.001-1.143.036-.24.032-.317.084-.36.127s-.095.12-.127.36c-.034.257-.036.605-.036 1.143V17.45h3.33v-5.604l.001-.023zm-7.76 13.234h3.33V6.986c-.01-.502-.339-.745-.557-.745H4.463c-.222 0-.558.25-.558.769zm8.86-7.282a1.6 1.6 0 0 1 .556-.102h2.216c.969 0 1.657.853 1.657 1.78v5.604H18v1.1H2a.55.55 0 1 1 0-1.1h.806V7.01c0-.937.656-1.867 1.657-1.867h2.216c.2 0 .386.038.556.105V4.215c0-.507-.001-.942.045-1.29.049-.362.16-.709.44-.99.282-.282.63-.392.992-.44.347-.047.782-.046 1.289-.046s.941-.001 1.288.045c.363.049.71.16.991.44.282.282.392.63.44.992.047.347.046.782.046 1.289z" fill="currentColor"/>`,
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

const ChartOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

ChartOutlinedIcon.displayName = "ChartOutlinedIcon";

export default ChartOutlinedIcon;
