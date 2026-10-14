import * as React from "react";
import type { IconProps, IconComponent } from "./types";

/**
 * FunctionOutlinedIcon icon component.
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
      __html: `<path fill="currentColor" d="M6.644 7.05c.285 0 .522-.004.743.063.182.056.352.147.499.268.178.147.306.346.464.583l.15.225.15-.225c.158-.237.286-.436.464-.583.148-.121.318-.212.5-.268.221-.067.458-.062.742-.062h.144v.9h-.144c-.34 0-.418.004-.481.024a.6.6 0 0 0-.19.101c-.05.042-.097.104-.286.387L9.04 9l.36.538c.189.284.236.345.287.387a.6.6 0 0 0 .189.101c.063.02.14.024.48.024h.144v.9h-.144c-.284 0-.52.005-.742-.062a1.5 1.5 0 0 1-.5-.268c-.178-.147-.306-.346-.464-.583l-.15-.226-.15.226c-.158.237-.286.436-.464.583a1.5 1.5 0 0 1-.5.268c-.221.067-.458.062-.742.062H6.5v-.9h.144c.34 0 .418-.005.481-.024a.6.6 0 0 0 .19-.101c.05-.042.097-.104.286-.387L7.959 9l-.358-.538c-.19-.283-.236-.345-.287-.387a.6.6 0 0 0-.189-.101c-.063-.02-.14-.024-.481-.024H6.5v-.9zM8.05 2.41a.708.708 0 0 0-1.382-.22l-.604 1.86H7v.901H5.772L4.187 9.84a1.608 1.608 0 0 1-3.137-.496V8.5h.9v.842a.708.708 0 0 0 1.382.219l1.495-4.61H4V4.05h1.12l.692-2.138a1.608 1.608 0 0 1 3.138.496V3h-.9z"/>`,
    },
    viewBox: "0 0 12 12",
  },

  medium: {
    content: {
      __html: `<path fill="currentColor" d="M8.858 9.501c.387 0 .684-.005.961.08.23.07.446.184.632.337.224.184.385.434.599.756l.283.426.284-.426c.214-.322.375-.572.599-.756.186-.153.401-.268.632-.338.277-.084.574-.079.96-.079H14v1h-.191c-.449 0-.57.005-.671.036a.8.8 0 0 0-.286.153c-.082.068-.154.165-.403.539l-.515.772.515.773c.249.374.32.47.403.538q.128.105.287.154c.101.03.222.035.67.035H14v1h-.191c-.387 0-.684.005-.961-.08a1.8 1.8 0 0 1-.631-.337c-.224-.184-.386-.434-.6-.755l-.284-.427-.283.427c-.214.321-.376.571-.6.755-.186.153-.4.268-.63.338-.278.084-.575.079-.962.079h-.191v-1h.191c.448 0 .569-.004.67-.035a.8.8 0 0 0 .287-.154c.082-.068.154-.164.403-.538l.514-.773-.514-.772c-.249-.374-.32-.471-.403-.539a.8.8 0 0 0-.286-.153c-.101-.03-.222-.036-.67-.036h-.192v-1zm1.976-6.29a1.045 1.045 0 0 0-2.038-.321L7.949 5.5h1.384v1H7.625l-2.137 6.587a2.044 2.044 0 0 1-3.988-.631v-1.122h1v1.122a1.044 1.044 0 0 0 2.037.322L6.573 6.5h-1.24v-1h1.564l.948-2.919a2.045 2.045 0 0 1 3.989.63V4h-1z"/>`,
    },
    viewBox: "0 0 16 16",
  },

  large: {
    content: {
      __html: `<path fill="currentColor" d="M11.073 11.95c.488 0 .846-.006 1.18.095.279.085.538.224.763.41.269.22.464.521.734.927l.417.625.417-.625c.27-.406.464-.707.733-.928a2.2 2.2 0 0 1 .764-.41c.334-.1.692-.095 1.18-.095h.239v1.1h-.24c-.555 0-.72.006-.86.049q-.212.065-.383.206c-.114.093-.21.226-.518.688l-.672 1.006.673 1.009c.308.462.403.595.517.688s.244.164.384.206c.14.043.304.048.86.048h.239v1.1h-.24c-.487 0-.846.006-1.179-.095a2.2 2.2 0 0 1-.763-.408c-.269-.221-.464-.523-.734-.929l-.418-.627-.417.627c-.27.406-.464.708-.733.929a2.2 2.2 0 0 1-.764.408c-.333.101-.692.096-1.179.096h-.24v-1.1h.24c.556 0 .72-.006.86-.049a1.1 1.1 0 0 0 .384-.206c.113-.093.209-.226.517-.688l.67-1.008-.67-1.007c-.308-.462-.403-.595-.517-.688a1.1 1.1 0 0 0-.384-.206c-.14-.043-.304-.048-.86-.048h-.24v-1.1zm2.544-7.936a1.381 1.381 0 0 0-2.693-.426l-1.09 3.361h1.833v1.1h-2.19l-2.688 8.286a2.48 2.48 0 0 1-4.839-.766v-1.403h1.1v1.403a1.38 1.38 0 0 0 2.693.426L8.32 8.05H6.667v-1.1h2.01l1.2-3.702a2.48 2.48 0 0 1 4.84.766V5h-1.1z"/>`,
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

const FunctionOutlinedIcon: IconComponent = React.forwardRef<
  SVGSVGElement,
  IconProps
>((props, ref) => {
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
    flexShrink: 0,
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
});

FunctionOutlinedIcon.displayName = "FunctionOutlinedIcon";

export default FunctionOutlinedIcon;
