import { type ChangeEvent, type FocusEvent, type KeyboardEvent } from "react";
import {
  PillsInput,
  Pill,
  Combobox,
  useCombobox,
  Text,
  ScrollArea,
  type PillsInputProps,
} from "@mantine/core";

interface TagsField extends Omit<PillsInputProps, "onChange"> {
  data: string[];
  value: string[];
  placeholder?: string;
  onChange: (value: string[]) => void;
  onOptionSubmit: (option: string) => void;
  searchValue: string;
  onSearchChange: (search: string) => void;
  onTagClick?: (tag: string) => void;
  limit: number;
  maxDropdownHeight: number;
}

export function TagsField({
  data,
  value,
  placeholder,
  onChange,
  onOptionSubmit,
  searchValue,
  onSearchChange,
  onTagClick,
  limit,
  maxDropdownHeight,
  ...pillsInputProps
}: TagsField) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  function handleValueAdd(val: string) {
    if (val && val !== " " && !value.includes(val)) {
      onChange([...value, val]);
    }
  }

  function handleValueRemove(val: string) {
    const newValues = value.filter((v) => v !== val);
    onChange(newValues);
  }

  function handleKeydown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && searchValue.length === 0) {
      event.preventDefault();
      handleValueRemove(value[value.length - 1]);
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (combobox.getSelectedOptionIndex() === -1) {
        handleValueAdd(event.currentTarget.value);
        combobox.closeDropdown();
      } else {
        // handleValueAdd(event.currentTarget.value);
      }
      onSearchChange("");
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const val = event.currentTarget.value;
    if (val) {
      combobox.openDropdown();
    } else {
      combobox.closeDropdown();
    }
    onSearchChange(val);
    combobox.updateSelectedOptionIndex();
  }

  function handleTagClick(item: string) {
    return () => onTagClick?.(item);
  }

  function handleTagRemove(val: string) {
    return () => handleValueRemove(val);
  }

  function handleOptionSubmit(val: string) {
    onOptionSubmit(val);
    onSearchChange("");
    combobox.closeDropdown();
  }

  function handleOnBlur(event: FocusEvent<HTMLInputElement>) {
    handleValueAdd(event.currentTarget.value);
    onSearchChange("");
    combobox.closeDropdown();
  }

  return (
    <Combobox offset={0} store={combobox} onOptionSubmit={handleOptionSubmit}>
      <Combobox.DropdownTarget>
        <PillsInput {...pillsInputProps}>
          <Pill.Group gap={4}>
            {value.map((item) => (
              <Pill
                key={item}
                style={{ cursor: "pointer" }}
                withRemoveButton
                onClick={handleTagClick(item)}
                onRemove={handleTagRemove(item)}>
                {item}
              </Pill>
            ))}
            <Combobox.EventsTarget>
              <PillsInput.Field
                value={decodeURIComponent(searchValue)}
                placeholder={placeholder}
                onChange={handleInputChange}
                onKeyDown={handleKeydown}
                onBlur={handleOnBlur}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown tabIndex={0} hidden={data.length < 0}>
        <Combobox.Options>
          <ScrollArea.Autosize mah={maxDropdownHeight} type="scroll">
            {data.map((item) => {
              const option = JSON.parse(item);
              return (
                <Combobox.Option
                  value={item}
                  key={option.option}
                  active={value.includes(option.option)}>
                  <span>{option.option}</span>
                </Combobox.Option>
              );
            })}
          </ScrollArea.Autosize>
        </Combobox.Options>
        <Combobox.Footer hidden={data.length < limit}>
          <Text c="dimmed" size="xs" fs="italic">
            (more items available, please refine your search.)
          </Text>
        </Combobox.Footer>
      </Combobox.Dropdown>
    </Combobox>
  );
}
