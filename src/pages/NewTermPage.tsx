import { useState } from "react";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { DictsPane } from "#language/components/DictsPane/DictsPane";
import { TermForm } from "#term/components/TermForm/TermForm";
import { TermPageLayout } from "./TermPage/TermPageLayout";
import { query } from "#language/api/query";

export function NewTermPage() {
  const [newTerm, setNewTerm] = useState("");
  const { langId } = useSearch({ from: "/terms/create-new" });
  const { data: language } = useQuery(query.detailSkippable(langId));
  const { textDirectionMap } = useRouteContext({ from: "__root__" });
  const textDirection = langId ? textDirectionMap[langId] : "ltr";

  const dictTabs = newTerm && language && (
    <DictsPane
      key={`${newTerm}${language.id}`}
      dictionaries={language.dictionaries.filter(
        (dict) => dict.usedFor === "terms"
      )}
      termText={newTerm}
    />
  );

  return (
    <TermPageLayout
      showAll={!!language}
      dictTabs={dictTabs}
      termForm={<TermForm onSetTermText={setNewTerm} languageId={langId} />}
      textDirection={textDirection}
    />
  );
}
