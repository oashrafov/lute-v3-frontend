import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { CloseButton, Divider, Group, Stack, Table, Text } from "@mantine/core";
import { Select } from "#common/Select/Select";
import { ThemeSelect } from "#common/ThemeSelect/ThemeSelect";
import { ColorInput } from "#common/ColorInput/ColorInput";
import { FormButtons } from "#common/FormButtons/FormButtons";
import { getWords } from "#helpers/text";
import {
  setTextColor,
  setLocalStorageItem,
  getFromLocalStorage,
} from "#helpers/general";
import {
  handleStatusHighlightChange,
  handleGeneralHighlightChange,
  handleFlashHighlight,
  type StatusHighlight,
} from "./helpers/utils";
import { useBookContext } from "#book/hooks/useBookContext";
import {
  DEFAULT_HIGHLIGHT_TYPE,
  STATUS_LABEL,
  TEXTITEM_CLASS,
  TEXTITEM_DATASET,
} from "#resources/constants";
import type { HighlightType, Status, WordElement } from "#resources/types";

const generalHighlightsLabels = [
  [TEXTITEM_CLASS.marked, "Selected"],
  [TEXTITEM_CLASS.hovered, "Hovered"],
  [TEXTITEM_CLASS.selected, "Multi selection"],
  [TEXTITEM_CLASS.flashing, "Flashing highlight"],
] as const;

const statusHighlights = Object.entries(STATUS_LABEL).map(
  ([id, label]): StatusHighlight => {
    const color = getComputedStyle(document.documentElement).getPropertyValue(
      `--lute-color-highlight-status${id}`
    );
    return {
      key: `status${id}`,
      color: color,
      label: `${label} (${id})`,
      type: DEFAULT_HIGHLIGHT_TYPE[Number(id) as Status],
    };
  }
);

const generalHighlights = generalHighlightsLabels.map(([id, label]) => {
  const color = getComputedStyle(document.documentElement).getPropertyValue(
    `--lute-color-highlight-${id}`
  );
  return {
    key: id,
    color: color,
    label: label,
  };
});

interface FormValues {
  status: typeof statusHighlights;
  general: typeof generalHighlights;
  font: string;
  typeAll: HighlightType | "";
  bgColor: `#${string}`;
}

function ThemeForm() {
  const { themeForm } = useBookContext();

  const { control, setValue, getValues, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      status: statusHighlights,
      general: generalHighlights,
      font: "arial",
      typeAll: "",
      bgColor: "#000000",
    },
  });
  const { fields: statusFields } = useFieldArray({ control, name: "status" });
  const { fields: generalFields } = useFieldArray({ control, name: "general" });

  useEffect(() => {
    const highlightType = getFromLocalStorage("Lute.highlightType", {});
    const types = highlightType[document.documentElement.dataset.theme!];
    if (types) {
      setValue(
        "status",
        statusHighlights.map((status) => ({
          ...status,
          type: types[status.key],
        }))
      );
    }
  }, [setValue]);

  function handleTypeChange(type: HighlightType, highlight: StatusHighlight) {
    const statusId = highlight.key.split(TEXTITEM_DATASET.status)[1];
    document
      .querySelectorAll<WordElement>(
        `[data-${TEXTITEM_DATASET.status}="${statusId}"]`
      )
      .forEach((word) => (word.dataset.highlightType = type));

    setTextColor(highlight.key, highlight.color);
    setValue("typeAll", "");
  }

  function handleAllTypeChange(type: HighlightType) {
    getWords().forEach((word) => (word.dataset.highlightType = type));
    getValues().status.forEach((_, index) =>
      setValue(`status.${index}.type`, type)
    );

    setValue("typeAll", type);
  }

  return (
    <Stack gap={0} style={{ flexWrap: "nowrap" }}>
      <Group justify="space-between">
        <Text component="h2" fw={600}>
          Theme Customizer
        </Text>
        <CloseButton onClick={themeForm.close} />
      </Group>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Group wrap="nowrap" mb={10}>
          <ThemeSelect label="Theme" flex={1} />
          <Select
            name="font"
            control={control}
            size="xs"
            flex={1}
            label="Text font"
            data={[
              { label: "Arial", value: "arial" },
              { label: "Roboto", value: "roboto" },
              { label: "Montserrat", value: "montserrat" },
            ]}
          />
          <ColorInput
            name="bgColor"
            control={control}
            label="Body color"
            size="xs"
            flex={1}
            popoverProps={{ position: "bottom" }}
            styles={{
              root: { minWidth: "200px", width: "min-content" },
            }}
            fixOnBlur
            onChange={(color) =>
              document.documentElement.style.setProperty(
                "--lute-color-read",
                color
              )
            }
          />
        </Group>
        <Divider label="Status Highlights" mb={10} />
        <Stack gap={10}>
          <Table
            withTableBorder
            verticalSpacing={5}
            horizontalSpacing={30}
            striped
            highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th fw={500}>Name</Table.Th>
                <Table.Th fw={500}>Color</Table.Th>
                <Table.Th fw={500}>Highlight</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {statusFields.map((highlight, index) => (
                <Table.Tr key={highlight.label}>
                  <Table.Td style={{ minWidth: "170px", paddingRight: 0 }}>
                    {highlight.label}
                  </Table.Td>
                  <Table.Td>
                    <ColorInput
                      name={`status.${index}.color`}
                      control={control}
                      format="hex"
                      popoverProps={{ position: "bottom" }}
                      fixOnBlur
                      size="xs"
                      onChange={(color) =>
                        handleStatusHighlightChange(highlight, color)
                      }
                    />
                  </Table.Td>
                  <Table.Td>
                    <Select
                      name={`status.${index}.type`}
                      control={control}
                      size="xs"
                      allowDeselect={false}
                      data={[
                        { label: "Background", value: "bg" },
                        { label: "Text", value: "text" },
                        { label: "Underline: solid", value: "solid" },
                        { label: "Underline: dashed", value: "dashed" },
                        { label: "None", value: "none" },
                      ]}
                      onChange={(val) => {
                        if (val) {
                          handleTypeChange(val as HighlightType, highlight);
                        }
                      }}
                    />
                  </Table.Td>
                </Table.Tr>
              ))}
              <Table.Tr>
                <Table.Td>All</Table.Td>
                <Table.Td></Table.Td>
                <Table.Td>
                  <Select
                    name="typeAll"
                    control={control}
                    size="xs"
                    allowDeselect={false}
                    data={[
                      { label: "-", value: "" },
                      { label: "Background", value: "bg" },
                      { label: "Text", value: "text" },
                      { label: "Underline: solid", value: "solid" },
                      { label: "Underline: dashed", value: "dashed" },
                    ]}
                    onChange={(val) => {
                      if (val) {
                        handleAllTypeChange(val as HighlightType);
                      }
                    }}
                  />
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>

          <Divider label="General Text Highlights" />

          <Table
            withTableBorder
            verticalSpacing={5}
            horizontalSpacing={30}
            striped
            highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th fw={500}>Name</Table.Th>
                <Table.Th fw={500}>Color</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {generalFields.map((highlight, index) => (
                <Table.Tr key={highlight.label}>
                  <Table.Td style={{ minWidth: "170px", paddingRight: 0 }}>
                    {highlight.label}
                  </Table.Td>
                  <Table.Td>
                    <ColorInput
                      name={`general.${index}.color`}
                      control={control}
                      format="hex"
                      size="xs"
                      popoverProps={{ position: "bottom" }}
                      fixOnBlur
                      onChange={(color) =>
                        handleGeneralHighlightChange(highlight.key, color)
                      }
                      onChangeEnd={() => {
                        if (highlight.key === "flash") {
                          handleFlashHighlight();
                        }
                      }}
                    />
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Stack>

        <FormButtons />
      </form>
    </Stack>
  );
}

function onSubmit(data: FormValues) {
  downloadCSS("theme", generateThemeCSS(data, "light"));
  const highlightType = getFromLocalStorage("Lute.highlightType", {});
  const newType = {
    ...highlightType,
    [document.documentElement.dataset.theme!]: Object.fromEntries(
      data.status.map((status) => [status.key, status.type])
    ),
  };
  setLocalStorageItem("Lute.highlightType", newType);
}

function generateThemeCSS(data: FormValues, scheme: "light" | "dark") {
  return `[data-scheme="${scheme}"][data-theme="night"] {
${[data.status, data.general]
  .map((item) =>
    item
      .map(
        (status) => `  --lute-color-highlight-${status.key}: ${status.color}`
      )
      .join(";\n")
  )
  .join(";\n\n")
  .concat(";")}
}`;
}

function downloadCSS(fileName: string, content: string) {
  const blob = new Blob([content], { type: "text/css" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.css`;

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default ThemeForm;
