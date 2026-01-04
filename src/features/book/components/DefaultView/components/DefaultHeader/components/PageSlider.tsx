import { Slider, type SliderProps } from "@mantine/core";

export function PageSlider(props: SliderProps) {
  return (
    <Slider
      style={{ flex: 1 }}
      size="md"
      thumbSize={16}
      min={1}
      showLabelOnHover={false}
      {...props}
    />
  );
}
