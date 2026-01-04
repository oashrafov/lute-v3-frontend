import { Select } from "@mantine/core";
import { usePlayerContext } from "../hooks/usePlayerContext";
import { AUDIO_SKIP_VALUES } from "#resources/constants";

const selectData = AUDIO_SKIP_VALUES.map((val) => ({
  value: String(val),
  label: `${val} sec`,
}));

export function SkipAmountSelect() {
  const { skipAmount, setSkipAmount } = usePlayerContext();
  return (
    <Select
      value={String(skipAmount)}
      onChange={(_value, option) => setSkipAmount(Number(option.value))}
      data={selectData}
      allowDeselect={false}
      styles={{ root: { width: "5rem" } }}
      comboboxProps={{ withinPortal: false }}
      checkIconPosition="right"
      size="xs"
    />
  );
}
