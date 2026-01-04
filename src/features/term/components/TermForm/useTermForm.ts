import { useForm } from "react-hook-form";
import { modals } from "@mantine/modals";
import { mutation } from "#term/api/mutation";
import { deleteTermConfirm } from "#resources/modals";
import type { TermForm } from "#term/api/types";

const initialValues: TermForm = {
  id: null,
  originalText: "",
  text: "",
  parents: [],
  pronunciation: "",
  notes: "",
  status: 1,
  shouldSyncStatus: false,
  tags: [],
  translation: "",
  imageSource: "",
};

export function useTermForm(
  editMode: boolean,
  prefilledMode: boolean,
  term?: TermForm,
  onSubmitSuccess?: () => void
) {
  const methods = useForm<TermForm>({ defaultValues: term ?? initialValues });

  const createTermMutation = mutation.useCreateTerm();
  const editTermMutation = mutation.useEditTerm();
  const deleteTermMutation = mutation.useDeleteTerm();

  function handleSubmit(data: TermForm) {
    if (editMode) {
      editTerm(data);
    } else {
      createTerm(data);
    }
  }

  function createTerm(data: TermForm) {
    createTermMutation.mutate(data, {
      onSuccess: () => {
        if (prefilledMode) {
          methods.reset();
        }
        onSubmitSuccess?.();
      },
    });
  }

  function editTerm(data: TermForm) {
    editTermMutation.mutate(data, {
      onSuccess: () => {
        onSubmitSuccess?.();
      },
    });
  }

  function handleDeleteTerm() {
    modals.openConfirmModal(
      deleteTermConfirm(term!.text, () =>
        deleteTermMutation.mutate(term!.id!, {
          onSuccess: () => {
            onSubmitSuccess?.();
          },
        })
      )
    );
  }

  return {
    methods,
    createTermMutation,
    editTermMutation,
    deleteTermMutation,
    handleDeleteTerm,
    onSubmit: methods.handleSubmit(handleSubmit),
  };
}
