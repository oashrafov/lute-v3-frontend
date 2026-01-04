import { useState, type KeyboardEvent, type RefObject } from "react";
import { useRouteContext } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Controller } from "react-hook-form";
import { Group, rem, Collapse, InputClearButton } from "@mantine/core";
import { ParentTagsField } from "./components/ParentTagsField/ParentTagsField";
import { TranslationField } from "./components/TranslationField/TranslationField";
import { TermField } from "./components/TermField/TermField";
import { TermTagsField } from "./components/TermTagsField/TermTagsField";
import { NotesField } from "./components/NotesField/NotesField";
import { SyncStatusCheckbox } from "./components/SyncStatusCheckbox/SyncStatusCheckbox";
import { PronunciationField } from "./components/PronunciationField/PronunciationField";
import { LoadDictsButton } from "./components/LoadDictsButton";
import { ToLowerCaseButton } from "./components/ToLowerCaseButton";
import { PronunciationButton } from "./components/PronunciationButton";
import { NotesButton } from "./components/NotesButton";
import { TermImagePopover } from "../TermImagePopover/TermImagePopover";
import { FormButtons } from "#common/FormButtons/FormButtons";
import { StatusRadio } from "../StatusRadio/StatusRadio";
import { useTermForm } from "./useTermForm";
import { query } from "#term/api/query";
import type { TermForm } from "#term/api/types";
import classes from "./TermForm.module.css";

interface TermFormProps {
  term?: TermForm;
  translationFieldRef?: RefObject<HTMLTextAreaElement>;
  onSetTermText?: (text: string) => void;
  onSubmitSuccess?: () => void;
  showPronunciation?: boolean;
  showNotes?: boolean;
  languageId?: number;
}

export function TermForm({
  term,
  showPronunciation = true,
  showNotes = true,
  translationFieldRef,
  onSetTermText,
  onSubmitSuccess,
  languageId,
}: TermFormProps) {
  const { textDirectionMap } = useRouteContext({ from: "__root__" });
  const textDirection = languageId ? textDirectionMap[languageId] : "ltr";

  const { data: tags } = useSuspenseQuery(query.tagSuggestions());
  const editMode = !!(term && term.id !== null);
  const prefilledMode = !!(term && term.id === null && term.originalText);

  const {
    methods: { control, getValues, setValue, watch },
    onSubmit,
    handleDeleteTerm,
  } = useTermForm(editMode, prefilledMode, term, onSubmitSuccess);

  const hasText = !!watch("originalText");
  const numOfParents = watch("parents", []).length;
  const termImage = getValues().imageSource;

  const [notesOpened, setNotesOpened] = useState(showNotes);
  const [pronunciationOpened, setPronunciationOpened] =
    useState(showPronunciation);

  function handleParentSubmit(val: string) {
    const obj = JSON.parse(val);

    const parents = [...getValues().parents, obj.value];
    const hasSingleParent = parents.length === 1;

    if (hasSingleParent) {
      setValue("status", obj.status);
    }
    setValue("shouldSyncStatus", hasSingleParent);
    setValue("parents", parents);
  }

  function handleParentClick(parent: string) {
    console.log(parent);
    // setActiveTerm(
    //   {
    //     data: parent,
    //     langId: language.id,
    //     type: "multi",
    //     textitems: [],
    //   },
    //   false
    // );
  }

  function handleClearTags() {
    setValue("tags", []);
  }

  function handleKeydown(e: KeyboardEvent) {
    const target = e.target as HTMLInputElement | HTMLFormElement;

    if (e.key === "Enter" && target.type !== "submit") {
      if (target.type !== "textarea") {
        e.preventDefault();
      }
      if (e.ctrlKey) {
        if (target instanceof HTMLFormElement) {
          target.requestSubmit();
        }
      }
    }
  }

  function handleToLowerCase() {
    setValue("text", getValues().text.toLowerCase());
  }

  return (
    <form onSubmit={onSubmit} onKeyDown={handleKeydown}>
      <div className={`${classes.termBox} ${classes.fieldBox}`}>
        <TermField
          control={control}
          readOnly={editMode}
          variant={editMode ? "filled" : "default"}
          wrapperProps={{ dir: textDirection }}
          rightSection={
            <ToLowerCaseButton
              disabled={!hasText}
              onClick={handleToLowerCase}
            />
          }
        />
        {!prefilledMode && !editMode && (
          <LoadDictsButton
            disabled={!hasText}
            onClick={() => onSetTermText?.(getValues().originalText)}
          />
        )}
        {editMode && (
          <>
            <PronunciationButton
              onClick={() => setPronunciationOpened((v) => !v)}
              variant={pronunciationOpened ? "light" : "subtle"}
            />
            <NotesButton
              onClick={() => setNotesOpened((v) => !v)}
              variant={notesOpened ? "light" : "subtle"}
            />
          </>
        )}
      </div>
      <ParentTagsField
        control={control}
        termText={getValues().originalText}
        onOptionSubmit={handleParentSubmit}
        onTagClick={handleParentClick}
        languageId={languageId}
      />
      <Collapse in={pronunciationOpened}>
        <PronunciationField control={control} />
      </Collapse>
      <div className={`${classes.translationBox} ${classes.fieldBox}`}>
        <TranslationField
          control={control}
          wrapperProps={{ dir: textDirection }}
          inputRef={translationFieldRef}
        />
        {termImage && <TermImagePopover imageName={termImage} />}
      </div>
      <Collapse in={notesOpened}>
        <NotesField control={control} disabled />
      </Collapse>
      <Group dir="ltr" gap="md" style={{ rowGap: rem(7) }} mb={5}>
        <Controller
          name="status"
          control={control}
          render={({ field: { value, ref, ...field } }) => (
            <StatusRadio {...field} value={String(value)} />
          )}
        />
        <SyncStatusCheckbox control={control} disabled={numOfParents !== 1} />
      </Group>
      <TermTagsField
        control={control}
        data={tags || []}
        rightSection={<InputClearButton onClick={handleClearTags} />}
      />

      <FormButtons
        okDisabled={!hasText}
        discardLabel={editMode ? "Delete" : undefined}
        discardCallback={handleDeleteTerm}
      />
    </form>
  );
}
