import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Menu, Group, Divider, type GroupProps } from "@mantine/core";
import { modals } from "@mantine/modals";
import { appInfo } from "#resources/modals";
import { menu } from "#resources/menus";
import { DropdownMenu } from "./components/DropdownMenu";
import { LinkMenuItem } from "./components/LinkMenuItem";
import { query } from "#settings/api/query";
import classes from "./NavigationBar.module.css";

export function NavigationBar(props: GroupProps) {
  const { data: settings } = useSuspenseQuery(query.settingsForm());
  const createBackupMenu =
    settings.isBackupEnabled && settings.backupDirectory != "";

  return (
    <Group component="nav" gap={5} wrap="nowrap" ml="auto" {...props}>
      {[menu.home, menu.book, menu.languages].map((menu) => (
        <Link key={menu.label} to={menu.action} className={classes.link}>
          {menu.label}
        </Link>
      ))}

      <DropdownMenu label={menu.terms.label}>
        {menu.terms.children.map((child) => (
          <LinkMenuItem key={child.label} item={child} />
        ))}
      </DropdownMenu>

      <DropdownMenu label={menu.settings.label}>
        {menu.settings.children.map((child) => (
          <LinkMenuItem key={child.label} item={child} />
        ))}
      </DropdownMenu>

      {createBackupMenu && (
        <DropdownMenu label={menu.backup.label}>
          {settings?.backupLastDate && (
            <>
              <div className={classes.backup}>
                {settings.backupTimeSinceLast && (
                  <p>{`Last backup was ${settings.backupTimeSinceLast}`}</p>
                )}
                <p>{settings.backupLastDate}</p>
              </div>
              <Menu.Label>
                <Divider />
              </Menu.Label>
            </>
          )}
          <LinkMenuItem
            key={menu.backup.children[0].label}
            item={menu.backup.children[0]}
          />
          <Menu.Item
            component="a"
            href={menu.backup.children[1].action}
            target="_blank">
            {menu.backup.children[1].label}
          </Menu.Item>
        </DropdownMenu>
      )}

      <DropdownMenu label={menu.about.label}>
        <Menu.Item onClick={() => modals.openContextModal(appInfo)}>
          {menu.info.label}
        </Menu.Item>
        <Menu.Item
          renderRoot={(props) => <Link to={menu.stats.action} {...props} />}>
          {menu.stats.label}
        </Menu.Item>
        <Menu.Item component="a" href={menu.docs.action} target="_blank">
          {menu.docs.label}
        </Menu.Item>
        <Menu.Item component="a" href={menu.discord.action} target="_blank">
          {menu.discord.label}
        </Menu.Item>
      </DropdownMenu>
    </Group>
  );
}
