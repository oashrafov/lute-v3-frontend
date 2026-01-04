import { useSuspenseQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { mutation } from "#book/api/mutation";
import { query } from "#book/api/query";
import { CreateBookFormSchema } from "#book/api/schemas";

export function useCreateBookForm(onSubmitSuccess: () => void) {
  const createBookMutation = mutation.useCreateBook();
  const { data: formValues } = useSuspenseQuery(query.form());

  const methods = useForm<
    z.input<typeof CreateBookFormSchema>,
    unknown,
    z.output<typeof CreateBookFormSchema>
  >({
    defaultValues: formValues,
    resolver: zodResolver(CreateBookFormSchema),
    mode: "onBlur",
  });

  function handleResetForm() {
    onSubmitSuccess();
    methods.reset();
  }

  return {
    methods,
    createBookMutation,
    onSubmit: methods.handleSubmit((data) =>
      createBookMutation.mutate(data, { onSuccess: handleResetForm })
    ),
  };
}
