import { Box, Flex } from "@chakra-ui/react";
import { HelloWorld } from "components/ui/HelloWorld";
import { ListUsers } from "modules/users/ListUsers";

const HomePageContent = () => {
  return (
    <Flex h="100vh" alignItems={"center"}>
      <Flex justifyContent={"center"} w={"100%"}>
        <Box maxWidth={72}>
          <HelloWorld />
          <ListUsers />
        </Box>
      </Flex>
    </Flex>
  );
};

export { HomePageContent };
