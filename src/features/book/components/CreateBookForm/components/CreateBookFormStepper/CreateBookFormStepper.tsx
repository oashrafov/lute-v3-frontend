import { Stepper, type StepperProps } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { IconLanguage, IconBook2, IconFileSettings } from "@tabler/icons-react";
import { Step1 } from "./steps/Step1";
import { Step2 } from "./steps/Step2";
import { Step3 } from "./steps/Step3";
import { StepCompleted } from "./steps/StepCompleted";
import classes from "./CreateBookFormStepper.module.css";

export function CreateBookFormStepper(props: Omit<StepperProps, "children">) {
  const { t } = useTranslation("form", { keyPrefix: "newBook" });
  return (
    <Stepper
      allowNextStepsSelect={false}
      styles={{ content: { paddingTop: 32 } }}
      classNames={{ stepLabel: classes.label, stepIcon: classes.icon }}
      {...props}>
      <Stepper.Step label={t("step1Label")} icon={<IconLanguage />}>
        <Step1 />
      </Stepper.Step>
      <Stepper.Step label={t("step2Label")} icon={<IconBook2 />}>
        <Step2 />
      </Stepper.Step>
      <Stepper.Step label={t("step3Label")} icon={<IconFileSettings />}>
        <Step3 />
      </Stepper.Step>
      <Stepper.Completed>
        <StepCompleted />
      </Stepper.Completed>
    </Stepper>
  );
}
