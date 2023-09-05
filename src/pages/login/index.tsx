import {
  Button,
  Center,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { BrandGithub } from "tabler-icons-react";

import PlexoLogo from "components/resources/PlexoLogo";
import { useForm } from "@mantine/form";

const LoginPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: val => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: val => (val.length <= 6 ? "Password should include at least 6 characters" : null),
    },
  });

  return (
    <Center style={{ height: "100vh" }}>
      <Stack w={420} miw={200} align={"center"} m={20}>
        <PlexoLogo typographyColor={colorScheme === "light" ? theme.colors.gray[9] : undefined} />
        <Paper w={"100%"} radius="md" p="xl" withBorder>
          <Stack>
            <form onSubmit={form.onSubmit(values => console.log(values))}>
              <Stack>
                <TextInput
                  withAsterisk
                  label="Email"
                  placeholder="hello@plexo.app"
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  withAsterisk
                  label="Password"
                  placeholder="Your password"
                  {...form.getInputProps("password")}
                />
                <Button type="submit">Login </Button>
              </Stack>
            </form>

            <Divider label="Or, use social login" labelPosition="center" />
            <Group position="center">
              <Button
                component="a"
                href={process.env.NEXT_PUBLIC_URL_AUTH || "/auth/github"}
                leftIcon={<BrandGithub />}
                color="dark"
              >
                Login with Github
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </Center>
  );
};

export default LoginPage;
