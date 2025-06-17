import * as React from "react";
import type { SVGProps } from "react";

const AccumOutlinedIcon = (
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
      stroke="CurrentColor"
      d="M1 6c0-1.886 0-2.828.586-3.414S3.114 2 5 2h.75c1.886 0 2.828 0 3.414.586S9.75 4.114 9.75 6s0 2.828-.586 3.414S7.636 10 5.75 10H5c-1.886 0-2.828 0-3.414-.586S1 7.886 1 6Zm9-1c.471 0 .707 0 .854.146C11 5.293 11 5.53 11 6s0 .707-.146.854C10.707 7 10.47 7 10 7z"
    />
    <path
      stroke="CurrentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.75 4.5 4.5 6h1.75L5 7.5"
    />
  </svg>
);

export default AccumOutlinedIcon;
