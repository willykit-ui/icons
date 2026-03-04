import * as React from "react";
import type { IconProps } from "./types";

/**
 * SaveAsOutlinedIcon icon component.
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
      __html: `<path fillRule="evenodd" d="M7.5 1.05a.45.45 0 0 1 0 .901H2.8a.85.85 0 0 0-.85.85v6.4c0 .47.38.85.85.85h1.272l-.014-1.036a.95.95 0 0 1 .949-.963l1.967-.001a.95.95 0 0 1 .95.936l.014 1.064H9.2c.47 0 .85-.38.85-.85v-3.2a.45.45 0 0 1 .9 0v3.2a1.75 1.75 0 0 1-1.75 1.75H2.8a1.75 1.75 0 0 1-1.75-1.75v-6.4c0-.967.783-1.75 1.75-1.75zM5.007 8.952a.05.05 0 0 0-.05.051l.015 1.049h2.066L7.023 9a.05.05 0 0 0-.05-.049z" clipRule="evenodd" fill="currentColor"/><path fillRule="evenodd" d="M10.106 1.493a.72.72 0 0 1 .792 0l.114.092.638.634a.72.72 0 0 1 0 1.021L7.84 7.022a.45.45 0 0 1-.317.131H6.5a.45.45 0 0 1-.45-.45V5.687a.45.45 0 0 1 .133-.319l3.81-3.783zM6.95 5.874v.379h.388l3.55-3.524-.386-.382z" clipRule="evenodd" fill="currentColor"/><path d="M5.5 3.05a.45.45 0 0 1 0 .901h-1a.45.45 0 0 1 0-.9z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fillRule="evenodd" d="M9.102 1c.714 0 1.394.305 1.869.839l.903 1.016a.5.5 0 0 1-.748.665l-.903-1.016A1.5 1.5 0 0 0 9.102 2H4a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 4 14h1v-1.5A1.5 1.5 0 0 1 6.5 11h3a1.5 1.5 0 0 1 1.5 1.5V14h1a1.5 1.5 0 0 0 1.5-1.5V9a.5.5 0 0 1 1 0v3.5A2.5 2.5 0 0 1 12 15H4a2.5 2.5 0 0 1-2.5-2.5v-9A2.5 2.5 0 0 1 4 1zM6.5 12a.5.5 0 0 0-.5.5V14h4v-1.5a.5.5 0 0 0-.5-.5z" clipRule="evenodd" fill="currentColor"/><path fillRule="evenodd" d="M12.762 4.397a.45.45 0 0 1 .321.132l1.25 1.25a.45.45 0 0 1 .005.631l-3.3 3.403a.45.45 0 0 1-.323.137h-1.25a.45.45 0 0 1-.45-.45V8.25a.45.45 0 0 1 .127-.313l3.3-3.403.068-.057a.45.45 0 0 1 .252-.08M9.915 8.432v.618h.61l2.858-2.948-.613-.614zm3.943-5.206a.78.78 0 0 1 1.047.053l.78.78c.306.306.306.8 0 1.106l-.61.61a.45.45 0 0 1-.635 0l-1.25-1.25a.45.45 0 0 1 0-.635l.61-.61zm.286.981.613.613.209-.208L14.352 4z" clipRule="evenodd" fill="currentColor"/><path d="M8.5 4.047a.5.5 0 1 1 0 1h-3a.5.5 0 0 1 0-1z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fillRule="evenodd" d="M11.476 1.95c.807 0 1.578.342 2.119.943l.44.488a.55.55 0 0 1-.818.736l-.44-.49a1.75 1.75 0 0 0-1.301-.578H5.3a1.75 1.75 0 0 0-1.75 1.75v10.4c0 .967.783 1.75 1.75 1.75h.65v-1.451c0-.856.694-1.55 1.55-1.55h5c.856 0 1.55.693 1.55 1.55v1.451h.65a1.75 1.75 0 0 0 1.75-1.75v-4.7a.55.55 0 1 1 1.1 0v4.7a2.85 2.85 0 0 1-2.85 2.85H5.3a2.85 2.85 0 0 1-2.85-2.85V4.8A2.85 2.85 0 0 1 5.3 1.95zM7.5 15.047a.45.45 0 0 0-.45.45v1.451h5.9v-1.452a.45.45 0 0 0-.45-.45z" clipRule="evenodd" fill="currentColor"/><path fillRule="evenodd" d="M15.5 4.524a.55.55 0 0 1 .392.16l1.706 1.694a.55.55 0 0 1 .006.774L13.1 11.764a.55.55 0 0 1-.394.165H11a.55.55 0 0 1-.55-.55V9.686c0-.144.056-.282.156-.385l4.504-4.61.084-.07a.55.55 0 0 1 .306-.097M11.55 9.91v.92h.925l3.96-4.057-.925-.918zm5.49-6.987c.393-.32.972-.297 1.339.068l1.064 1.057a.997.997 0 0 1 0 1.417l-.832.826a.55.55 0 0 1-.775 0L16.13 4.598a.55.55 0 0 1 0-.78l.833-.827zm.258 1.284.925.918.372-.37-.925-.917z" clipRule="evenodd" fill="currentColor"/><path d="M10.5 4.95a.55.55 0 1 1 0 1.099h-4a.55.55 0 1 1 0-1.1z" fill="currentColor"/>`,
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

const SaveAsOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

SaveAsOutlinedIcon.displayName = "SaveAsOutlinedIcon";

export default SaveAsOutlinedIcon;
