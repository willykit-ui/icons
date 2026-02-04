import * as React from "react";
import type { IconProps } from "./types";

/**
 * EyeClosedOutlinedIcon icon component.
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
      __html: `<path d="M2.346 1.896a.5.5 0 0 1 .707 0l7.5 7.5a.5.5 0 1 1-.707.707l-.96-.96c-.755.463-1.71.783-2.895.763-2-.033-3.325-.96-4.138-1.874A6.3 6.3 0 0 1 .795 6.375l-.049-.122-.014-.035-.003-.011-.001-.004H.727V6.2l-.054-.155.049-.157v-.002l.002-.002.002-.006.005-.02.024-.066a6.3 6.3 0 0 1 .476-.984A5.9 5.9 0 0 1 2.802 3.06l-.457-.458a.5.5 0 0 1 0-.707M3.52 3.777a4.9 4.9 0 0 0-1.43 1.544 5 5 0 0 0-.323.633l-.032.076q.05.116.142.293c.15.284.384.664.723 1.044.671.755 1.747 1.512 3.408 1.54.874.013 1.579-.192 2.146-.495L7.047 7.305c-.29.223-.654.356-1.048.356-.926 0-1.7-.734-1.7-1.668 0-.4.145-.768.383-1.054zM5.999 2.05c2.035 0 3.365.966 4.173 1.922a6.4 6.4 0 0 1 1.039 1.735l.047.127.013.037.004.015.001.002-.477.15.474.158V6.2l-.003.007a1 1 0 0 1-.038.1 6.3 6.3 0 0 1-.598 1.13.5.5 0 0 1-.831-.554c.189-.284.322-.54.407-.725q.032-.071.054-.127a5.4 5.4 0 0 0-.856-1.415c-.667-.788-1.737-1.566-3.41-1.566q-.285 0-.546.03a.5.5 0 0 1-.107-.995q.314-.035.653-.035m5.325 3.993-.05.152-.475-.157.477-.15zM5.3 5.993c0 .356.3.668.7.668a.7.7 0 0 0 .324-.08l-.927-.928a.64.64 0 0 0-.097.34" fill="currentColor"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M3.246 2.646a.5.5 0 0 1 .707 0l10 10a.5.5 0 1 1-.707.707l-1.372-1.37-.006.005c-.997.636-2.275 1.08-3.877 1.054-2.611-.043-4.335-1.251-5.396-2.443A8.3 8.3 0 0 1 1.47 8.975a7 7 0 0 1-.32-.697l-.017-.045-.005-.012v-.005l-.002-.001v-.001l-.053-.156.049-.157V7.9l.002-.002.001-.007.008-.025.03-.085a6 6 0 0 1 .119-.299c.106-.25.27-.594.503-.984.445-.746 1.152-1.67 2.208-2.396l-.747-.748a.5.5 0 0 1 0-.707m1.426 2.202c-.964.63-1.616 1.47-2.029 2.162a7 7 0 0 0-.51 1.035h.001c.046.11.12.27.221.463.204.388.525.906.987 1.426.92 1.033 2.394 2.07 4.665 2.108 1.298.021 2.325-.313 3.138-.79l-1.74-1.738-.017.02A2.12 2.12 0 0 1 8 10.048c-1.147 0-2.1-.908-2.101-2.057 0-.525.202-1.004.53-1.366q.021-.023.046-.042L4.71 4.817q-.017.017-.037.03M8 2.9c2.652 0 4.382 1.256 5.435 2.502.524.62.881 1.238 1.108 1.701a7 7 0 0 1 .311.731l.016.047.005.013V7.9h.002l-.478.15.475.159h-.001l-.004.013-.01.028q-.012.036-.037.1a6 6 0 0 1-.149.35c-.133.29-.34.687-.633 1.125a.5.5 0 1 1-.83-.555c.258-.386.438-.737.554-.989q.063-.143.1-.237l-.003-.012a7.4 7.4 0 0 0-1.19-1.984C11.761 4.969 10.291 3.9 8 3.9q-.39 0-.748.04a.5.5 0 0 1-.107-.995Q7.557 2.9 8 2.9m6.924 5.156-.05.152-.475-.157.478-.15zM6.9 7.99c0 .571.48 1.057 1.1 1.057.268 0 .51-.092.699-.242l-1.52-1.52-.009.01c-.17.188-.27.43-.27.695" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M4.11 3.362a.55.55 0 0 1 .777 0l12.5 12.5a.55.55 0 1 1-.777.778l-1.76-1.761q-.027.024-.056.044c-1.234.787-2.817 1.338-4.804 1.306-3.239-.053-5.376-1.551-6.69-3.03a10.3 10.3 0 0 1-1.396-2.015 9 9 0 0 1-.417-.916l-.006-.017-.001-.005h-.001v-.002l.52-.18-.525-.165.004-.012.01-.03q.012-.038.037-.105.048-.135.146-.37c.132-.309.335-.737.623-1.22.564-.945 1.464-2.117 2.814-3.024L4.11 4.14a.55.55 0 0 1 0-.778m1.78 2.559a.6.6 0 0 1-.092.076c-1.218.797-2.04 1.857-2.56 2.728-.26.433-.44.816-.556 1.087q-.06.146-.098.245l.013.03c.059.139.15.34.278.584a9.2 9.2 0 0 0 1.245 1.798c1.159 1.303 3.022 2.612 5.886 2.659 1.681.027 3.008-.414 4.048-1.043l-2.299-2.299a1 1 0 0 1-.07.075 2.57 2.57 0 0 1-1.687.624c-1.395 0-2.55-1.103-2.55-2.496 0-.637.244-1.217.642-1.656a.6.6 0 0 1 .117-.096zM10 3.7c3.288 0 5.431 1.556 6.737 3.102.65.769 1.094 1.536 1.376 2.111a9 9 0 0 1 .403.961l.006.017.001.005V9.9l-.523.165.521.174v.002l-.001.003q0 .005-.004.01l-.013.035q-.015.045-.046.123a8 8 0 0 1-.183.433c-.166.36-.422.854-.785 1.397a.55.55 0 0 1-.914-.611 9 9 0 0 0 .699-1.246 7 7 0 0 0 .139-.327l-.016-.043a9.3 9.3 0 0 0-1.5-2.501C14.746 6.152 12.889 4.8 9.999 4.8q-.492 0-.94.05a.55.55 0 0 1-.12-1.094 10 10 0 0 1 1.06-.056m-8 6.363-.521.18-.059-.172.055-.172zm16.578.005-.057.168-.521-.173.524-.164zM8.548 9.99c0 .757.635 1.397 1.45 1.397.375 0 .713-.136.968-.357l.019-.014-2.022-2.022a1 1 0 0 1-.057.08 1.36 1.36 0 0 0-.358.916" fill="currentColor"/>`,
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

const EyeClosedOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

EyeClosedOutlinedIcon.displayName = "EyeClosedOutlinedIcon";

export default EyeClosedOutlinedIcon;
