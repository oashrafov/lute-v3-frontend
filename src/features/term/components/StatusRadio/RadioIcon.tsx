import { Text } from "@mantine/core";

interface RadioIcon {
  label: string | JSX.Element;
}

export function RadioIcon({ label, ...props }: RadioIcon) {
  return (
    <Text
      {...props}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      lh={1}
      fw={500}>
      {label}
    </Text>
  );
}
