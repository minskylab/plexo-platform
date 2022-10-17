import { HelloWorld } from "components/ui/HelloWorld";
import { ListUsers } from "modules/users/ListUsers";
import { Center, Stack } from "@mantine/core";

const HomePageContent = () => {
  return (
    <Center style={{ height: "100vh" }}>
      <Stack>
        <HelloWorld />
        <ListUsers />
      </Stack>
    </Center>
  );
};

export { HomePageContent };
