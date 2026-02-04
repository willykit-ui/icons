import * as React from "react";
import type { IconProps } from "./types";

/**
 * BugOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M9.05 5.97c0-.84-.68-1.52-1.519-1.52H4.47a1.52 1.52 0 0 0-1.519 1.52V7.5a3.05 3.05 0 0 0 2.6 3.016V7.501a.45.45 0 0 1 .9 0v3.015a3.05 3.05 0 0 0 2.6-3.015zM6 1.95a1.8 1.8 0 0 0-1.791 1.614q.128-.013.26-.013H7.53q.132 0 .259.013A1.8 1.8 0 0 0 6 1.951m3.95 4.6H11a.45.45 0 0 1 0 .9H9.95v.05c0 .623-.145 1.212-.401 1.736l.868.347a.45.45 0 0 1-.334.836l-1-.4-.028-.015A3.94 3.94 0 0 1 6 11.45a3.94 3.94 0 0 1-3.056-1.447l-.027.014-1 .4a.45.45 0 0 1-.334-.835l.867-.347a3.9 3.9 0 0 1-.4-1.735v-.05H1a.45.45 0 0 1 0-.9h1.05v-.582c0-.449.124-.869.338-1.229l-.805-.321a.45.45 0 0 1 .334-.836l1 .4a.5.5 0 0 1 .098.056A2.4 2.4 0 0 1 3.3 3.85v-.1c0-.734.293-1.398.767-1.885l-.798-.48a.45.45 0 1 1 .461-.77l1.141.685a2.69 2.69 0 0 1 2.255 0L8.269.615a.45.45 0 1 1 .462.771l-.8.48a2.7 2.7 0 0 1 .77 1.885v.1q.148.084.283.188a.5.5 0 0 1 .099-.056l1-.4a.45.45 0 0 1 .334.836l-.806.321c.214.36.34.78.34 1.23z" fill="currentColor"/></g><defs><clipPath id="a"><rect width="12" height="12" rx="2" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M12.049 7.959A2.06 2.06 0 0 0 9.989 5.9H6.01a2.06 2.06 0 0 0-2.06 2.059V9.95a4.05 4.05 0 0 0 3.55 4.018V9.95a.5.5 0 0 1 1 0v4.018a4.05 4.05 0 0 0 3.549-4.018v-.633l-.002-.017.002-.019zm-4.05-5.31a2.423 2.423 0 0 0-2.418 2.28q.21-.029.428-.029h3.98q.218 0 .427.03a2.42 2.42 0 0 0-2.417-2.28m5.05 6.15h1.448a.5.5 0 0 1 0 1H13.05v.151c0 .828-.201 1.61-.555 2.299l1.217.486a.5.5 0 0 1-.371.929l-1.3-.52a.5.5 0 0 1-.093-.048A5.04 5.04 0 0 1 8 15a5.04 5.04 0 0 1-3.948-1.903.5.5 0 0 1-.09.048l-1.3.519a.5.5 0 1 1-.372-.929l1.214-.486A5 5 0 0 1 2.95 9.95V9.8H1.5a.5.5 0 1 1 0-1h1.45v-.841c0-.604.177-1.166.479-1.64L2.29 5.864a.5.5 0 0 1 .371-.929l1.3.52q.091.037.157.102.214-.17.457-.3v-.182c0-.97.403-1.845 1.05-2.468L4.491 1.93a.5.5 0 1 1 .515-.858l1.518.91A3.4 3.4 0 0 1 8 1.65c.527 0 1.027.12 1.473.332l1.52-.91a.5.5 0 0 1 .513.858l-1.132.678a3.42 3.42 0 0 1 1.05 2.468v.182q.244.13.458.3a.5.5 0 0 1 .159-.102l1.3-.52a.5.5 0 1 1 .37.93l-1.14.455a3.04 3.04 0 0 1 .479 1.639z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M9.452 12.399a.55.55 0 0 1 1.1 0v5.02a5.05 5.05 0 0 0 4.5-5.02V9.95a2.6 2.6 0 0 0-2.6-2.6h-4.9a2.6 2.6 0 0 0-2.6 2.6v2.45a5.05 5.05 0 0 0 4.5 5.02zm.55-9.05a3.05 3.05 0 0 0-3.048 2.949q.292-.049.597-.049h4.9q.306.001.597.05a3.05 3.05 0 0 0-3.046-2.95m6.15 7.7h1.85a.55.55 0 0 1 0 1.1h-1.85v.25a6.1 6.1 0 0 1-.708 2.864l1.563.626a.55.55 0 1 1-.409 1.021l-1.6-.64a.5.5 0 0 1-.147-.091 6.14 6.14 0 0 1-4.85 2.37 6.14 6.14 0 0 1-4.85-2.37.5.5 0 0 1-.146.09l-1.6.641a.551.551 0 0 1-.408-1.021l1.561-.626a6.1 6.1 0 0 1-.707-2.863v-.25h-1.85a.55.55 0 0 1 0-1.101h1.85v-1.1c0-.758.228-1.464.62-2.05l-1.474-.59a.55.55 0 1 1 .409-1.02l1.6.639a.55.55 0 0 1 .208.152q.296-.24.637-.417V6.4a4.14 4.14 0 0 1 1.335-3.05l-1.467-.88a.55.55 0 0 1 .566-.942l1.9 1.14A4.1 4.1 0 0 1 10 2.248c.652 0 1.269.15 1.818.418l1.9-1.14a.55.55 0 1 1 .566.944l-1.468.88a4.14 4.14 0 0 1 1.336 3.05v.263q.34.177.636.417a.55.55 0 0 1 .21-.152l1.6-.64a.551.551 0 0 1 .41 1.022l-1.476.589c.391.587.62 1.292.62 2.05z" fill="currentColor"/>`,
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

const BugOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

BugOutlinedIcon.displayName = "BugOutlinedIcon";

export default BugOutlinedIcon;
