import { Button, Center, Stack, Title } from "@mantine/core";
import { BrandGithub } from "tabler-icons-react";

const Login = () => {
  return (
    <Center style={{ height: "100vh" }}>
      <Stack align={"center"}>
        <Title>PLEXO</Title>
        <Button
          component="a"
          href="https://plexo-minsky.internal.minsky.cc/auth/github"
          color="dark"
          leftIcon={<BrandGithub />}
        >
          Login with Github
        </Button>
      </Stack>
    </Center>
  );
};

export default Login;
