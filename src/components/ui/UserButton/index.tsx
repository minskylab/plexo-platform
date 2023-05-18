import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  Menu,
  useMantineColorScheme,
  Switch,
  useMantineTheme,
  Skeleton,
  Stack,
} from "@mantine/core";
import { useState } from "react";
import { Logout, Moon, Sun } from "tabler-icons-react";

import { User } from "lib/types";

const useStyles = createStyles(theme => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  user: User | undefined;
  isLoadingUser: boolean;
}

export function UserButton({ user, isLoadingUser }: UserButtonProps) {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <Group position="center">
      <Menu
        position={"bottom-end"}
        offset={0}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
      >
        <Menu.Target>
          <UnstyledButton className={classes.user}>
            {isLoadingUser ? (
              <Group>
                <Skeleton height={38} circle />

                <Stack spacing={0} sx={{ flex: 1 }}>
                  <Skeleton height={10} mt={6} width="100%" radius="xs" />
                  <Skeleton height={8} mt={6} width="100%" radius="xs" />
                </Stack>
              </Group>
            ) : (
              <Group>
                <Avatar color="brand" radius="xl">
                  {user?.name[0]}
                </Avatar>
                <Stack spacing={0}>
                  <Text size="sm" weight={500}>
                    {user?.name}
                  </Text>

                  <Text color="dimmed" size="xs">
                    {user?.email}
                  </Text>
                </Stack>
              </Group>
            )}
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item closeMenuOnClick={!userMenuOpened}>
            <Switch
              onLabel={
                <Group spacing={5}>
                  <Sun color={theme.white} size={18} />
                  <Text size="sm">Light</Text>
                </Group>
              }
              offLabel={
                <Group spacing="xs" grow>
                  <Text size="sm">Dark</Text>
                  <Moon color={theme.colors.gray[6]} size={18} />
                </Group>
              }
              checked={colorScheme === "dark"}
              onChange={() => toggleColorScheme()}
              size="md"
              styles={{ root: { width: 120, marginLeft: -4 } }}
            />
          </Menu.Item>
          <Menu.Item color="red" component="button" icon={<Logout size={14} />}>
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
