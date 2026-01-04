import { Image, type ImageProps } from "@mantine/core";

interface Logo extends ImageProps {
  size?: ImageProps["w"];
}

export function Logo({ size = 48, ...props }: Logo) {
  return (
    <Image
      w={size}
      h={size}
      src="/images/logo.png"
      style={{ objectFit: "contain" }}
      {...props}
    />
  );
}
