import type { IframeHTMLAttributes } from "react";

export function IFrame(props: IframeHTMLAttributes<HTMLIFrameElement>) {
  return (
    <iframe
      style={{ border: "none" }}
      width="100%"
      height="100%"
      loading="lazy"
      {...props}
    />
  );
}
