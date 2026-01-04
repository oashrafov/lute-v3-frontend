import { ScrollArea } from "@mantine/core";
import { useFormContext, type FieldArrayWithId } from "react-hook-form";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { RemoveDictionaryButton } from "./DictionaryBar/components/RemoveDictionaryButton";
import { DraggableContainer } from "./DraggableContainer";
import { DictionaryBar } from "./DictionaryBar/DictionaryBar";
import { MIN_LANGUAGE_DICTS } from "#resources/constants";
import type { LanguageForm } from "#language/api/types";

interface DictionaryBars {
  dictionaries: FieldArrayWithId<LanguageForm>[];
  onRemove: (index: number) => void;
}

export function DictionaryBars({ dictionaries, onRemove }: DictionaryBars) {
  const { control, setValue } = useFormContext<LanguageForm>();
  const numOfDicts = dictionaries.length;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }
    const oldIndex = dictionaries.findIndex(
      (dict, index) => `${dict.url}${index}` === active.id
    );
    const newIndex = dictionaries.findIndex(
      (dict, index) => `${dict.url}${index}` === over.id
    );
    const reordered = arrayMove(dictionaries, oldIndex, newIndex);
    setValue("dictionaries", reordered);
  }

  function handleRemoveDict(index: number) {
    return () => {
      if (numOfDicts > MIN_LANGUAGE_DICTS) {
        onRemove(index);
      }
    };
  }

  return (
    <ScrollArea.Autosize mah={300} offsetScrollbars="y" flex={1}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}>
        <SortableContext
          items={dictionaries.map((dict, index) => `${dict.url}${index}`)}
          strategy={verticalListSortingStrategy}>
          {dictionaries.map((dict, index) => (
            <DraggableContainer
              key={`${dict.url}${index}`}
              id={`${dict.url}${index}`}>
              <DictionaryBar
                control={control}
                dict={dict}
                name={`dictionaries.${index}`}
                editable={numOfDicts > MIN_LANGUAGE_DICTS}
              />
              <RemoveDictionaryButton
                disabled={numOfDicts <= MIN_LANGUAGE_DICTS}
                onClick={handleRemoveDict(index)}
              />
            </DraggableContainer>
          ))}
        </SortableContext>
      </DndContext>
    </ScrollArea.Autosize>
  );
}
