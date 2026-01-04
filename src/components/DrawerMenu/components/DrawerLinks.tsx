import { Link } from "@tanstack/react-router";
import { UnstyledButton } from "@mantine/core";
import { modals } from "@mantine/modals";
import { MenuLink } from "./MenuLink";
import { appInfo } from "#resources/modals";
import { menu } from "#resources/menus";
import { CollapsingMenu } from "./CollapsingMenu";
import { MenuSection } from "./MenuSection";
import classes from "../DrawerMenu.module.css";

export function DrawerLinks() {
  return (
    <nav className={classes.nav}>
      <ul>
        {[menu.home, menu.book, menu.languages].map((menu) => (
          <UnstyledButton
            key={menu.label}
            className={classes.control}
            renderRoot={(props) => <Link to={menu.action} {...props} />}>
            <MenuSection label={menu.label} icon={menu.icon} />
          </UnstyledButton>
        ))}

        {[menu.terms, menu.backup, menu.settings].map((menu) => (
          <CollapsingMenu key={menu.label} section={menu}>
            {menu.children.map((link) => (
              <MenuLink key={link.action} item={link} />
            ))}
          </CollapsingMenu>
        ))}

        <CollapsingMenu section={menu.about}>
          <UnstyledButton
            className={classes.link}
            onClick={() => modals.openContextModal(appInfo)}>
            {menu.info.label}
          </UnstyledButton>
          <MenuLink item={menu.stats} />
          <a className={classes.link} href={menu.docs.action} target="_blank">
            {menu.docs.label}
          </a>
          <a
            className={classes.link}
            href={menu.discord.action}
            target="_blank">
            {menu.discord.label}
          </a>
        </CollapsingMenu>
      </ul>
    </nav>
  );
}
