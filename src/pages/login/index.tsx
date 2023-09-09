import { Button, Center, Stack } from "@mantine/core";
import { BrandGithub } from "tabler-icons-react";

const LoginPage = () => {
  return (
    <Center style={{ height: "100vh" }}>
      <Stack>
        <Button
          onClick={() => {
            console.log("clic");
          }}
        >
          Login
        </Button>
        <Button
          component="a"
          href={process.env.NEXT_PUBLIC_URL_AUTH || "/auth/github"}
          leftIcon={<BrandGithub />}
          color="dark"
        >
          Login
        </Button>
      </Stack>
    </Center>
  );
};

export default LoginPage;
