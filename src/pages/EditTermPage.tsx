import { getRouteApi } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { DictsPane } from "#language/components/DictsPane/DictsPane";
import { TermForm } from "#term/components/TermForm/TermForm";
import { query as termQuery } from "#term/api/query";
import { TermPageLayout } from "./TermPage/TermPageLayout";
import { query } from "#language/api/query";

const route = getRouteApi("/terms/$termId");

export function EditTermPage() {
  const { t } = useTranslation("page", { keyPrefix: "newEditTerm" });
  const { termId: id } = route.useParams();
  const { textDirection } = route.useRouteContext();
  const { data: term } = useSuspenseQuery(termQuery.detail({ id }));
  const { data: language } = useSuspenseQuery(query.detail(term.languageId));

  const show = !!id && language && term;
  const dictTabs = show && language && (
    <DictsPane
      key={term.text}
      dictionaries={language.dictionaries.filter(
        (dict) => dict.usedFor === "terms"
      )}
      termText={term.text}
    />
  );
  const termForm = show && <TermForm term={term} />;

  return (
    <TermPageLayout
      title={t("titleEdit")}
      showAll={!!show}
      dictTabs={dictTabs}
      termForm={termForm}
      showLanguageCards={false}
      textDirection={textDirection}
    />
  );
}
