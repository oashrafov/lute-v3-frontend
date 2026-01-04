import { useEffect } from "react";
import { useSearch } from "@tanstack/react-router";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import type { UseFormReset } from "react-hook-form";
import type { LanguageForm } from "#language/api/types";
import { query } from "#language/api/query";

export function usePopulateForm(reset: UseFormReset<LanguageForm>) {
  const { langName, langId } = useSearch({ strict: false });
  const { data: initialValues } = useSuspenseQuery(query.form());
  const {
    data: preset,
    isSuccess: presetIsSuccess,
    isLoading: presetIsLoading,
  } = useQuery(query.presetDetail(langName));
  const {
    data: lang,
    isSuccess: langIsSuccess,
    isLoading: langIsLoading,
  } = useQuery(query.detailSkippable(langId));

  const values = preset || lang;
  const isSuccess = presetIsSuccess || langIsSuccess;
  const isLoading = presetIsLoading || langIsLoading;

  useEffect(() => {
    if (isSuccess && values) {
      reset(values);
    }
  }, [values, isSuccess, reset]);

  useEffect(() => {
    if (!langId) {
      reset(initialValues);
    }
  }, [langId, reset, initialValues]);

  useEffect(() => {
    if (!langName) {
      reset(initialValues);
    }
  }, [langName, reset, initialValues]);

  return { isSuccess, isLoading };
}
