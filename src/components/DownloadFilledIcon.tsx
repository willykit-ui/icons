import * as React from "react";
import type { SVGProps } from "react";

const DownloadFilledIcon = (
  props: SVGProps<SVGSVGElement> & { size?: string | number; color?: string },
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    {...(props.size
      ? { width: props.size, height: props.size }
      : { width: "24", height: "24" })}
    viewBox="0 0 16 16"
    {...props}
    fill={props.color ?? "currentColor"}
    strokeWidth="2"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 3v7m0 0 2.5-2.356M8 10 5.5 7.644"
    />
    <path stroke="currentColor" strokeLinecap="round" d="M3 12.5h10" />
  </svg>
);

export default DownloadFilledIcon;
