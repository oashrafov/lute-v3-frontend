import { type FieldsetProps, Fieldset, rem } from "@mantine/core";

export function FormFieldset(props: FieldsetProps) {
  const { children, ...rest } = props;
  return (
    <Fieldset
      variant="filled"
      styles={{
        legend: { fontSize: rem(17), fontWeight: 500 },
      }}
      {...rest}>
      {children}
    </Fieldset>
  );
}
