import { Group } from "@mantine/core";
import { NewBookReviewInfo } from "../../NewBookReviewInfo/NewBookReviewInfo";

export function StepCompleted() {
  return (
    <Group w="60%" mx="auto">
      <NewBookReviewInfo />
    </Group>
  );
}
