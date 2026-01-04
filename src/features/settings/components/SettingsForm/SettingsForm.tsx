import { useSuspenseQuery } from "@tanstack/react-query";
import { Button, Group, Stack } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  IconDatabase,
  IconTorii,
  IconNotes,
  IconSpeakerphone,
} from "@tabler/icons-react";
import { Checkbox } from "#common/Checkbox/Checkbox";
import { TextInput } from "#common/TextInput/TextInput";
import { NumberInput } from "#common/NumberInput/NumberInput";
import { Select } from "#common/Select/Select";
import { FormButtons } from "#common/FormButtons/FormButtons";
import { MeCabInfo } from "./MeCabInfo";
import { FormFieldset } from "./FormFieldset";
import { query } from "#settings/api/query";

export function SettingsForm() {
  const { t } = useTranslation("form", { keyPrefix: "settings" });
  const { data: settings } = useSuspenseQuery(query.settingsForm());
  const { control, watch } = useForm({ defaultValues: settings });
  const isBackupEnabled = watch("isBackupEnabled", true);
  return (
    <form>
      <Stack gap={10}>
        <FormFieldset legend={t("backupLabel")}>
          <Stack gap={5}>
            <Checkbox
              name="isBackupEnabled"
              control={control}
              label={t("backupEnabledLabel")}
            />
            <TextInput
              name="backupDirectory"
              control={control}
              label={t("backupDirLabel")}
              leftSection={<IconDatabase />}
              disabled={!isBackupEnabled}
            />
            <Checkbox
              name="shouldAutoBackup"
              control={control}
              label={t("backupAutoLabel")}
              disabled={!isBackupEnabled}
            />
            <Checkbox
              name="shouldBackupWarn"
              control={control}
              label={t("backupWarnLabel")}
              disabled={!isBackupEnabled}
            />
            <Checkbox
              name="backupCount"
              control={control}
              label={t("backupCountLabel")}
              disabled={!isBackupEnabled}
            />
          </Stack>
        </FormFieldset>
        <FormFieldset legend={t("behaviourLabel")}>
          <Stack gap={5} align="flex-start">
            <Checkbox
              name="openDictionaryPopupInNewTab"
              control={control}
              label={t("openInNewTabLabel")}
            />
            <Checkbox
              name="stopAudioOnTermSelection"
              control={control}
              label={t("stopAudioLabel")}
            />
            {/* <Checkbox
              name="focusActiveSentence"
              control={control}
              label={t("focusActiveSentenceLabel")}
            /> */}
            <NumberInput
              name="statsCalculationSampleSize"
              control={control}
              label={t("statsSampleSizeLabel")}
              leftSection={<IconNotes />}
            />
          </Stack>
        </FormFieldset>
        <FormFieldset legend={t("popupsLabel")}>
          <Stack gap={5} align="flex-start">
            <Checkbox
              name="termPopupPromoteParentTranslation"
              control={control}
              label={t("promoteParentLabel")}
            />
            <Checkbox
              name="termPopupShowComponents"
              control={control}
              label={t("showComponentTermsLabel")}
            />
          </Stack>
        </FormFieldset>
        <FormFieldset legend={t("japaneseLabel")}>
          <Stack gap={5}>
            <Group gap={5} align="flex-end" wrap="nowrap">
              <TextInput
                name="mecabPath"
                control={control}
                label={t("mecabPathLabel")}
                leftSection={<IconTorii />}
                rightSection={<MeCabInfo />}
                flex={1}
              />
              <Button>{t("testMecabConfigLabel")}</Button>
            </Group>
            <Select
              name="japaneseScript"
              control={control}
              label="Script"
              withCheckIcon={false}
              searchable={false}
              allowDeselect={false}
              leftSection={<IconSpeakerphone />}
              styles={{ root: { alignSelf: "flex-start" } }}
              data={[
                { label: t("katakana"), value: "katakana" },
                { label: t("hiragana"), value: "hiragana" },
                { label: t("romaji"), value: "romaji" },
              ]}
            />
          </Stack>
        </FormFieldset>
      </Stack>

      <FormButtons />
    </form>
  );
}
