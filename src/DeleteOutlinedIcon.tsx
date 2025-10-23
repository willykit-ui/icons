import * as React from "react";
import type { IconProps } from "./types";

/**
 * DeleteOutlinedIcon icon component.
 *
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
      __html: `<path fill="currentColor" d="M9.45 3.75a.5.5 0 0 1 .466.531l-.23 3.45c-.043.65-.078 1.186-.162 1.608-.086.436-.238.819-.56 1.12s-.714.427-1.154.484c-.427.056-.964.055-1.616.055h-.386c-.652 0-1.19.001-1.617-.055-.44-.057-.83-.183-1.153-.484-.322-.301-.474-.684-.56-1.12-.084-.422-.12-.959-.163-1.609l-.23-3.449a.5.5 0 0 1 .998-.066l.23 3.45c.045.676.077 1.136.145 1.479.066.328.153.481.263.585s.268.18.6.223c.347.046.808.046 1.487.046h.386c.679 0 1.14 0 1.486-.046.332-.043.49-.12.6-.223s.197-.257.263-.585c.068-.343.1-.803.145-1.48l.23-3.45a.5.5 0 0 1 .532-.465"/><path fill="currentColor" d="M4.696 5.005a.5.5 0 0 1 .547.447l.25 2.5a.5.5 0 1 1-.994.1l-.25-2.5a.5.5 0 0 1 .447-.547m2.6 0a.5.5 0 0 1 .447.547l-.25 2.5a.5.5 0 1 1-.994-.1l.25-2.5a.5.5 0 0 1 .547-.447"/><path fill="currentColor" fillRule="evenodd" d="M10.746 3a.5.5 0 0 0-.5-.5H8.704a.5.5 0 0 1-.457-.33l-.014-.04-.048-.146c-.036-.107-.07-.215-.12-.311a1.25 1.25 0 0 0-.913-.657C7.045.999 6.932 1 6.818 1H5.174c-.114 0-.227-.001-.334.016a1.25 1.25 0 0 0-.912.657c-.05.096-.085.204-.12.311l-.05.147-.013.039a.5.5 0 0 1-.457.33H1.746a.5.5 0 0 0 0 1h8.5a.5.5 0 0 0 .5-.5m-3.51-.7.048.146q.01.03.02.054H4.688l.019-.054.048-.145c.046-.14.054-.157.058-.166a.25.25 0 0 1 .183-.132A2 2 0 0 1 5.174 2h1.644c.149 0 .167.001.177.003a.25.25 0 0 1 .183.132c.004.009.012.027.058.166" clipRule="evenodd"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fill="currentColor" d="M13.661 3.5a.5.5 0 1 1 0 1H2.328a.5.5 0 0 1 0-1zM12.59 5.165a.5.5 0 0 1 .466.532l-.307 4.6c-.058.871-.104 1.573-.214 2.123-.112.563-.303 1.034-.697 1.403-.394.37-.877.528-1.446.603-.556.072-1.26.071-2.133.071h-.516c-.873 0-1.577.002-2.133-.071-.57-.075-1.052-.234-1.446-.603s-.585-.84-.697-1.403c-.11-.55-.156-1.252-.214-2.123l-.307-4.6.004-.101a.5.5 0 0 1 .978-.065l.016.1.307 4.6c.06.898.103 1.523.196 1.994.091.456.218.697.4.868.183.17.432.281.893.342.476.062 1.103.062 2.003.062h.516c.9 0 1.527 0 2.003-.062.46-.06.71-.172.892-.342s.31-.412.4-.868c.094-.47.137-1.096.197-1.995l.307-4.6a.5.5 0 0 1 .532-.465"/><path fill="currentColor" d="M6.278 6.839a.5.5 0 0 1 .528.348l.02.1.333 3.332a.5.5 0 0 1-.995.1l-.333-3.333v-.102a.5.5 0 0 1 .447-.445m3.433 0a.5.5 0 0 1 .448.547l-.334 3.333a.5.5 0 1 1-.994-.1l.333-3.333a.5.5 0 0 1 .547-.447M9.09 1.5c.157 0 .293-.002.42.019a1.5 1.5 0 0 1 1.094.789c.059.114.1.242.15.391l.064.195.02.056c.117.323.42.541.763.55h.06v1h-.086a1.83 1.83 0 0 1-1.678-1.21l-.027-.081-.064-.193a2 2 0 0 0-.09-.246.5.5 0 0 0-.364-.264A2 2 0 0 0 9.09 2.5H6.898c-.192 0-.232.001-.261.006a.5.5 0 0 0-.365.264 2 2 0 0 0-.088.246l-.065.193q-.015.048-.028.081A1.83 1.83 0 0 1 4.328 4.5v-1h.06a.83.83 0 0 0 .762-.55l.02-.056.064-.195c.05-.149.091-.277.15-.391.22-.421.627-.715 1.095-.79.127-.02.262-.018.42-.018z"/>`,
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

const DeleteOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

DeleteOutlinedIcon.displayName = "DeleteOutlinedIcon";

export default DeleteOutlinedIcon;
