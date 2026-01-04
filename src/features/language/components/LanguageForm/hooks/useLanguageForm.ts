import { useSuspenseQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LanguageFormSchema } from "#language/api/schemas";
import { query } from "#language/api/query";

export function useLanguageForm() {
  const { data } = useSuspenseQuery(query.form());
  const methods = useForm<
    z.input<typeof LanguageFormSchema>,
    unknown,
    z.output<typeof LanguageFormSchema>
  >({
    defaultValues: data,
    resolver: zodResolver(LanguageFormSchema),
  });

  return { methods };
}
