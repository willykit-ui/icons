import * as React from "react";
import type { SVGProps } from "react";

const HistoryFilled = (
  props: SVGProps<SVGSVGElement> & { size?: string | number; color?: string },
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    {...(props.size
      ? { width: props.size, height: props.size }
      : { width: "1em", height: "1em" })}
    viewBox="0 0 16 16"
    {...props}
    fill={props.color ?? "currentColor"}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 5.334v2.667l1.667 1.666"
    />
    <path
      fill="currentColor"
      d="m3.736 3.736-.353-.353zm-.844.844-.5.003a.5.5 0 0 0 .497.497zm1.694.509a.5.5 0 1 0 .005-1zM3.383 2.88a.5.5 0 1 0-1 .005zm-.832 4.31a.5.5 0 1 0-.99-.136zm10.024-3.765C10.028.878 5.912.853 3.383 3.383l.707.707c2.132-2.133 5.615-2.12 7.778.042zm-9.15 9.15c2.547 2.547 6.663 2.572 9.192.043l-.707-.708c-2.132 2.133-5.615 2.12-7.778-.042zm9.192.043c2.53-2.53 2.505-6.646-.042-9.193l-.707.707c2.163 2.163 2.175 5.646.042 7.778zM3.383 3.383l-.845.844.707.707.845-.844zM2.889 5.08l1.697.009.005-1-1.697-.009zm.503-.502L3.383 2.88l-1 .005.009 1.697zM1.56 7.054a6.54 6.54 0 0 0 1.865 5.52l.707-.706a5.54 5.54 0 0 1-1.58-4.678z"
    />
  </svg>
);

export default HistoryFilled;
