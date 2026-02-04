import * as React from "react";
import type { IconProps } from "./types";

/**
 * SubdOutlinedIcon icon component.
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
      __html: `<path d="M9.55 7.503a4 4 0 0 1-.52.314c-.8.4-1.87.634-3.03.634s-2.23-.234-3.03-.634a4 4 0 0 1-.52-.314V9c0 .29.247.674.923 1.012.65.324 1.577.538 2.627.538s1.978-.214 2.627-.538c.676-.338.923-.722.923-1.012zm0-3a4 4 0 0 1-.52.314c-.8.4-1.87.634-3.03.634s-2.23-.234-3.03-.634a4 4 0 0 1-.52-.314V6l.012.113c.057.273.32.603.911.899.65.324 1.577.538 2.627.538s1.978-.214 2.627-.538c.676-.338.923-.722.923-1.012zM9.55 3c0-.29-.247-.674-.923-1.012C7.977 1.664 7.05 1.45 6 1.45s-1.978.214-2.627.538C2.697 2.326 2.45 2.71 2.45 3s.247.674.923 1.012c.65.324 1.577.538 2.627.538s1.978-.214 2.627-.538c.676-.338.923-.722.923-1.012m.9 6c0 .815-.649 1.43-1.42 1.816-.8.4-1.87.634-3.03.634s-2.23-.234-3.03-.634C2.199 10.43 1.55 9.815 1.55 9V3c0-.815.649-1.43 1.42-1.816C3.77.785 4.84.55 6 .55s2.23.234 3.03.634C9.8 1.57 10.45 2.186 10.45 3z" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M12.699 9.783a4.7 4.7 0 0 1-.8.502c-1.023.512-2.403.815-3.9.815s-2.876-.303-3.9-.815a4.7 4.7 0 0 1-.8-.502V11.9l.004.081c.043.41.411.894 1.243 1.31C5.404 13.72 6.625 14 8 14s2.595-.28 3.453-.709c.887-.444 1.245-.964 1.246-1.39zm0-3.9c-.241.19-.512.359-.8.503-1.023.512-2.403.814-3.9.814s-2.876-.302-3.9-.814a4.7 4.7 0 0 1-.8-.502V8l.004.081c.043.41.411.894 1.243 1.31.858.43 2.079.709 3.454.709s2.595-.28 3.453-.708c.832-.417 1.2-.9 1.242-1.311L12.699 8zm0-1.782c0-.427-.359-.948-1.246-1.392C10.595 2.28 9.375 2 8 2s-2.596.28-3.454.709C3.66 3.153 3.3 3.674 3.3 4.101s.36.946 1.247 1.39c.858.43 2.079.71 3.454.71s2.595-.28 3.453-.71c.887-.443 1.245-.964 1.246-1.39m1 7.8c0 1.008-.805 1.787-1.8 2.284-1.023.513-2.403.815-3.9.815s-2.876-.303-3.9-.815c-.932-.465-1.698-1.18-1.79-2.098L2.3 11.9V4.1c0-1.009.806-1.788 1.8-2.286C5.123 1.302 6.503 1 8 1s2.877.302 3.9.814c.995.498 1.8 1.277 1.8 2.287z" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M15.85 12.057a5.5 5.5 0 0 1-1.078.697c-1.25.625-2.938.995-4.772.995s-3.522-.37-4.771-.995a5.6 5.6 0 0 1-1.08-.696v2.74c0 .564.471 1.222 1.57 1.772 1.068.534 2.58.88 4.281.88s3.212-.346 4.28-.88c1.1-.55 1.57-1.208 1.57-1.771zm0-4.8a5.6 5.6 0 0 1-1.078.697c-1.25.625-2.938.995-4.772.995s-3.522-.37-4.771-.995a5.6 5.6 0 0 1-1.08-.696v2.741c0 .563.471 1.22 1.57 1.77 1.068.534 2.58.88 4.281.88s3.213-.346 4.28-.88c1.099-.55 1.57-1.207 1.57-1.77zm0-2.058c0-.563-.47-1.221-1.57-1.771-1.068-.534-2.58-.88-4.28-.88s-3.213.346-4.28.88c-1.1.55-1.57 1.208-1.57 1.771s.47 1.221 1.57 1.77c1.067.534 2.58.88 4.28.88s3.212-.346 4.28-.88c1.1-.55 1.57-1.207 1.57-1.77m1.1 9.6c0 1.204-.962 2.146-2.178 2.755-1.25.624-2.938.995-4.772.995s-3.522-.37-4.771-.995c-1.217-.609-2.18-1.551-2.18-2.755v-9.6c0-1.204.963-2.146 2.18-2.755C6.478 1.82 8.166 1.45 10 1.45s3.522.37 4.772.995c1.216.609 2.178 1.551 2.178 2.755z" fill="currentColor"/>`,
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

const SubdOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

SubdOutlinedIcon.displayName = "SubdOutlinedIcon";

export default SubdOutlinedIcon;
