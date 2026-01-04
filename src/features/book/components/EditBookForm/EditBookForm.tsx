import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { InputClearButton, Text, Tooltip } from "@mantine/core";
import { useForm } from "react-hook-form";
import {
  IconHeading,
  IconHeadphones,
  IconLink,
  IconTags,
} from "@tabler/icons-react";
import { FileInput } from "#common/FileInput/FileInput";
import { TextInput } from "#common/TextInput/TextInput";
import { TagsInput } from "#common/TagsInput/TagsInput";
import { FormButtons } from "#common/FormButtons/FormButtons";
import { mutation } from "#book/api/mutation";
import type { EditAction, EditBookForm } from "#book/api/types";
import type { TextDirection } from "#resources/types";
import { query } from "#settings/api/query";

interface EditBookFormProps {
  book: EditBookForm;
  textDirection: TextDirection;
  onAction: () => void;
}

export function EditBookForm({
  book,
  onAction,
  textDirection,
}: EditBookFormProps) {
  const { data: globalData } = useSuspenseQuery(query.globalData());
  const { id, ...defaultValues } = book;
  const { mutate } = mutation.useEditBook();
  const [existingAudioName, setExistingAudioName] = useState(book.audioName);

  const {
    control,
    setValue,
    watch,
    handleSubmit: handleFormSubmit,
  } = useForm<typeof defaultValues>({ defaultValues });

  const hasAudioFile = !!watch("audioFile");

  function handleClearAudio() {
    setExistingAudioName(null);
    setValue("audioFile", null);
  }

  function handleSubmit(data: EditAction) {
    mutate({ id: book.id, data: data });
    onAction();
  }

  return (
    <form
      onSubmit={handleFormSubmit((data) =>
        handleSubmit({
          ...data,
          action: "edit",
        })
      )}>
      <TextInput
        name="title"
        control={control}
        label="Title"
        wrapperProps={{ dir: textDirection }}
        required
        withAsterisk
        leftSection={<IconHeading />}
      />

      <FileInput
        name="audioFile"
        control={control}
        label="Audio file"
        description=".mp3, .m4a, .wav, .ogg, .opus"
        accept="audio/mpeg, audio/ogg, audio/mp4, audio/wav"
        leftSection={<IconHeadphones />}
        placeholder={
          existingAudioName && (
            <Text component="span" size="sm" lineClamp={1}>
              {existingAudioName}
            </Text>
          )
        }
        styles={{ placeholder: { color: "unset" } }}
        rightSection={
          (existingAudioName || hasAudioFile) && (
            <Tooltip label="Remove audio">
              <InputClearButton onClick={handleClearAudio} />
            </Tooltip>
          )
        }
      />

      <TextInput
        name="source"
        control={control}
        label="Source URL"
        leftSection={<IconLink />}
      />

      <TagsInput
        name="tags"
        control={control}
        label="Tags"
        data={globalData.bookTags}
        leftSection={<IconTags />}
      />

      <FormButtons discardCallback={onAction} />
    </form>
  );
}
