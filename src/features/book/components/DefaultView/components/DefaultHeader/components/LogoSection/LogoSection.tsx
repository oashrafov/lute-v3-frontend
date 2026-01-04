import { useRouterState } from "@tanstack/react-router";
import { Center, Loader } from "@mantine/core";
import { NavLogo } from "#common/NavLogo/NavLogo";
import classes from "./LogoSection.module.css";

export function LogoSection() {
  const state = useRouterState();
  return (
    <Center className={classes.container}>
      {state.status === "pending" && <Loader size="sm" />}
      {state.status === "idle" && <NavLogo />}
    </Center>
  );
}
