import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  Menu,
  Skeleton,
  Stack,
} from "@mantine/core";

import { Logout, Settings } from "tabler-icons-react";

import { User } from "lib/types";
import { useRouter } from "next/router";

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

  const router = useRouter();
  
  const logout = async ({ logoutURL }: { logoutURL: string | undefined }) => {
    try {
      const res = await fetch(logoutURL || "/api/auth/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers you need
        },
        credentials: "same-origin", // or "include" if you are doing cross-origin requests
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        //push login page
        router.replace("/login");
        console.error("Error data:", errorData.error);
        return {
          error: true,
          message: errorData.error,
        };
      } else {
        // Handle successful logout
        const jsonResult = await res.json();
        return {
          error: false,
          message: jsonResult,
        };
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = async () => {
    const result = await logout({ logoutURL:  process.env.NEXT_PUBLIC_URL_LOGOUT });
    if (result !== undefined &&!result.error ) {
      // Optionally navigate user to a different page after logout
      router.push("/");
    }
  };


  return (
    <Group position="center">
      <Menu position={"bottom-end"} offset={0}>
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
          <Menu.Item
            onClick={() => {
              router.push("/settings");
            }}
            icon={<Settings strokeWidth={1.5} size={14} />}
          >
            Settings
          </Menu.Item>
          <Menu.Item color="red" onClick={handleLogout} component="button" icon={<Logout size={14} />}>
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
