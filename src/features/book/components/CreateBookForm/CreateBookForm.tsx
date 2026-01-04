import { getRouteApi } from "@tanstack/react-router";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Group } from "@mantine/core";
import { BookCreatedModal } from "./components/BookCreatedModal";
import { useCreateBookForm } from "./useCreateBookForm";
import { CreateBookFormStepper } from "./components/CreateBookFormStepper/CreateBookFormStepper";
import type { CreateBookForm } from "#book/api/types";

const route = getRouteApi("/create-book");

const fieldsByStep: Array<keyof CreateBookForm>[] = [
  ["languageId"],
  ["title", "text"],
  ["audioFile", "wordsPerPage", "splitBy", "source", "tags"],
];

export function CreateBookForm() {
  const { t } = useTranslation("form", { keyPrefix: "newBook" });
  const { step } = route.useSearch();
  const navigate = route.useNavigate();

  function setStep(step: number) {
    navigate({ search: (prev) => ({ ...prev, step }) });
  }

  function setStepInDirection(delta: 1 | -1) {
    const newStep = step + delta;
    if (newStep <= 3 && newStep >= 0) {
      setStep(newStep);
    }
  }

  const {
    methods,
    onSubmit,
    createBookMutation: { isSuccess, isPending, data, reset: resetMutation },
  } = useCreateBookForm(() => setStep(0));
  const currentFields = fieldsByStep[step];

  async function goToNextStep() {
    const valid = await methods.trigger(currentFields);
    if (valid) {
      setStepInDirection(1);
    }
  }

  function goToPrevStep() {
    setStepInDirection(-1);
    methods.clearErrors(currentFields);
  }

  return (
    <>
      <form id="create-book-form" onSubmit={onSubmit}>
        <FormProvider {...methods}>
          <CreateBookFormStepper active={step} onStepClick={setStep} />
        </FormProvider>
      </form>

      <Group justify="center" mt="xl" gap={5}>
        {step <= 3 && step > 0 && (
          <Button variant="default" onClick={goToPrevStep} disabled={isSuccess}>
            {t("backButtonLabel")}
          </Button>
        )}
        {step === 3 && (
          <Button
            form="create-book-form"
            type="submit"
            color="green"
            loading={isPending}
            disabled={isSuccess}>
            Create
          </Button>
        )}
        {step < 3 && (
          <Button
            onClick={goToNextStep}
            color={step === 2 ? "orange.6" : undefined}>
            {t(step === 2 ? "reviewButtonLabel" : "nextStepButtonLabel")}
          </Button>
        )}
      </Group>

      <BookCreatedModal
        opened={isSuccess}
        book={data}
        onClose={resetMutation}
      />
    </>
  );
}
