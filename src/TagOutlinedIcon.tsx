import * as React from "react";
import type { IconProps } from "./types";

/**
 * TagOutlinedIcon icon component.
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
      __html: `<g clipPath="url(#a)"><path d="M10.55 6.131c0-.28-.106-.561-.412-.962-.313-.41-.792-.89-1.473-1.57l-.915-.916c-.392-.392-.665-.664-.9-.858-.228-.188-.395-.281-.565-.33-.171-.05-.363-.06-.656-.02-.302.04-.678.125-1.218.25l-.614.142c-.457.105-.767.177-1.002.257-.225.078-.343.152-.431.24s-.162.206-.24.431c-.08.235-.152.545-.257 1.002l-.142.614c-.125.54-.21.916-.25 1.218-.04.293-.03.485.02.656.049.17.142.337.33.565.194.235.466.508.858.9l.915.915c.681.681 1.16 1.16 1.571 1.473.4.306.683.412.962.412.28 0 .563-.106.963-.412.411-.313.89-.792 1.571-1.473.681-.68 1.16-1.16 1.473-1.57.306-.401.412-.684.412-.964m-1.608-.688a.45.45 0 0 1 .637.636l-3.49 3.49a.45.45 0 0 1-.636-.637zM3.277 3.414a1.45 1.45 0 1 1 2.05 2.052 1.45 1.45 0 0 1-2.05-2.052m1.414.637a.55.55 0 1 0-.777.777.55.55 0 0 0 .777-.777m6.76 2.08c0 .556-.23 1.029-.597 1.51-.359.47-.889.998-1.552 1.661S8.11 10.495 7.64 10.854c-.48.367-.953.597-1.509.597s-1.027-.23-1.508-.597c-.47-.359-.998-.889-1.662-1.552l-.915-.915c-.38-.38-.688-.687-.916-.964-.234-.283-.406-.56-.5-.89C.533 6.202.533 5.876.581 5.51c.047-.355.145-.779.266-1.303l.142-.614c.1-.439.185-.801.284-1.09.103-.3.234-.558.453-.777s.477-.35.776-.453c.29-.1.652-.183 1.091-.284l.614-.142c.524-.12.948-.219 1.303-.266.365-.048.691-.048 1.022.047.33.095.607.267.89.501.277.228.584.536.964.916l.915.915c.663.664 1.193 1.192 1.552 1.662.367.481.597.953.597 1.508" fill="currentColor"/></g><defs><clipPath id="a"><path d="M0 0h12v12H0z" fill="currentColor"/></clipPath></defs>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path d="M14.003 8.173c0-.39-.15-.774-.553-1.303-.411-.54-1.038-1.167-1.922-2.051l-1.19-1.19c-.509-.509-.866-.865-1.176-1.12-.301-.25-.53-.378-.766-.446-.237-.068-.498-.08-.886-.03-.398.053-.89.167-1.592.329l-.799.183c-.592.137-1 .232-1.31.339-.3.103-.467.204-.594.33s-.227.295-.33.594c-.107.31-.202.718-.339 1.31l-.183.8c-.162.7-.276 1.193-.329 1.591-.05.388-.038.649.03.886s.196.465.445.766c.256.31.612.667 1.121 1.176l1.19 1.19c.883.884 1.512 1.51 2.051 1.923.529.402.913.552 1.303.552s.774-.15 1.302-.553c.54-.411 1.168-1.038 2.052-1.922.883-.884 1.51-1.512 1.922-2.052.403-.528.553-.912.553-1.302m-2.116-.836a.5.5 0 0 1 .707.707L8.057 12.58a.5.5 0 1 1-.707-.707zM4.522 4.7a1.8 1.8 0 1 1 2.546 2.547A1.8 1.8 0 0 1 4.522 4.7m1.838.707A.8.8 0 1 0 5.229 6.54a.8.8 0 0 0 1.13-1.133m8.643 2.766c0 .696-.287 1.291-.758 1.908-.462.606-1.146 1.289-2.01 2.153s-1.547 1.548-2.153 2.01c-.617.471-1.212.758-1.908.758s-1.292-.287-1.91-.758c-.605-.462-1.288-1.146-2.151-2.01l-1.19-1.189c-.495-.495-.892-.892-1.185-1.247-.3-.363-.517-.713-.636-1.128s-.12-.825-.059-1.292c.06-.457.187-1.003.345-1.686l.185-.798c.132-.572.238-1.04.366-1.41.13-.383.297-.705.57-.977.271-.272.593-.438.976-.57.37-.127.838-.233 1.41-.365l.798-.185c.683-.158 1.23-.284 1.686-.345.467-.061.878-.06 1.292.059s.765.336 1.128.636c.355.293.752.69 1.247 1.185l1.189 1.19c.864.864 1.548 1.546 2.01 2.152.471.617.758 1.213.758 1.91" fill="currentColor"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path d="M17.455 10.213c0-.5-.194-.987-.694-1.642-.51-.67-1.285-1.446-2.372-2.533l-1.463-1.464c-.626-.625-1.07-1.066-1.454-1.383-.375-.31-.663-.474-.966-.56-.304-.088-.635-.102-1.118-.038-.494.065-1.103.205-1.964.404l-.983.227c-.728.168-1.233.285-1.619.418-.374.128-.592.256-.757.422s-.293.382-.422.757c-.132.386-.25.891-.418 1.619L3 7.422c-.2.862-.34 1.47-.405 1.965-.063.482-.05.814.038 1.117.087.303.25.592.56.967.317.384.758.828 1.384 1.453l1.464 1.464c1.086 1.086 1.863 1.86 2.532 2.371.656.5 1.143.694 1.643.694s.986-.194 1.642-.694c.669-.51 1.446-1.285 2.532-2.371s1.861-1.864 2.372-2.532c.5-.656.694-1.143.694-1.643m-2.624-.982a.55.55 0 1 1 .777.778l-5.583 5.583a.55.55 0 1 1-.777-.777zM5.765 5.986a2.15 2.15 0 1 1 3.04 3.041 2.15 2.15 0 0 1-3.04-3.041m2.263.778A1.05 1.05 0 1 0 6.543 8.25a1.05 1.05 0 0 0 1.485-1.486m10.526 3.45c0 .836-.343 1.555-.918 2.309-.566.74-1.405 1.578-2.47 2.642-1.064 1.065-1.9 1.904-2.642 2.469-.753.575-1.473.919-2.31.919-.836 0-1.555-.344-2.309-.919-.741-.565-1.578-1.404-2.643-2.469L3.8 13.701c-.611-.61-1.097-1.096-1.456-1.53-.365-.443-.626-.864-.77-1.363-.142-.499-.145-.995-.07-1.565.074-.558.23-1.227.423-2.069l.227-.982c.163-.706.294-1.276.45-1.729.159-.465.358-.852.684-1.178.325-.325.712-.525 1.178-.684.453-.156 1.023-.287 1.728-.45l.983-.226c.841-.194 1.51-.35 2.069-.423.57-.075 1.066-.073 1.564.07.499.144.92.404 1.364.77.434.358.919.844 1.53 1.455l1.464 1.464c1.064 1.064 1.903 1.901 2.469 2.643.574.753.918 1.472.918 2.31" fill="currentColor"/>`,
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

const TagOutlinedIcon = React.forwardRef<SVGSVGElement, IconProps>(
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

TagOutlinedIcon.displayName = "TagOutlinedIcon";

export default TagOutlinedIcon;
