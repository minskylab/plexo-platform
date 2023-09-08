import {
  Button,
  Center,
  Divider,
  Paper,
  Stack,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { BrandGithub } from "tabler-icons-react";

import PlexoLogo from "components/resources/PlexoLogo";

const LoginPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Center style={{ height: "100vh" }}>
      <Stack w={420} miw={200} align={"center"} m={20}>
        <PlexoLogo typographyColor={colorScheme === "light" ? theme.colors.gray[9] : undefined} />
        <Paper w={"100%"} radius="md" p="xl" withBorder>
          <Stack>
            <Button onClick={() => console.log("click")}>Login</Button>
            <button onClick={() => console.log("click")}>Boton</button>
            <Divider label="Or, continue with" labelPosition="center" />

            <Button
              component="a"
              href={process.env.NEXT_PUBLIC_URL_AUTH || "/auth/github"}
              leftIcon={<BrandGithub />}
              color="dark"
            >
              Login with Github
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Center>
  );
};

export default LoginPage;
