import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  Menu,
  ActionIcon,
  useMantineColorScheme,
  Select,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";
import { useState } from "react";
import { Logout, Moon, Sun } from "tabler-icons-react";

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
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

export function UserButton({ image, name, email, icon, ...others }: UserButtonProps) {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    // <UnstyledButton className={classes.user} {...others}>
    //   <Group>
    //     <Avatar src={image} radius="xl" />

    //     <div style={{ flex: 1 }}>
    //       <Text size="sm" weight={500}>
    //         {name}
    //       </Text>

    //       <Text color="dimmed" size="xs">
    //         {email}
    //       </Text>
    //     </div>

    //     {icon || <IconChevronRight size={14} stroke={1.5} />}
    //   </Group>
    // </UnstyledButton>
    <Group position="center">
      <Menu
        position={"bottom-end"}
        offset={0}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
      >
        <Menu.Target>
          <UnstyledButton
            className={classes.user}
            {...others}
            sx={theme => ({
              display: "block",
            })}
          >
            <Group>
              <Avatar src={image} radius="xl" />

              <div style={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  {name}
                </Text>

                <Text color="dimmed" size="xs">
                  {email}
                </Text>
              </div>

              {icon || <IconChevronRight size={14} stroke={1.5} />}
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item closeMenuOnClick={!userMenuOpened}>
            <Select
              data={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
              icon={colorScheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              defaultValue={colorScheme}
              onChange={() => {
                toggleColorScheme();
              }}
              styles={{
                root: { width: 120, marginLeft: -10},
                rightSection: { pointerEvents: "none", display: "none" },
              }}
              variant="unstyled"
            ></Select>
          </Menu.Item>
          <Menu.Item
            component="button"
            icon={<Logout size={14} />}
          >
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
