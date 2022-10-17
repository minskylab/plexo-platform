import { Box, Heading } from "@chakra-ui/react";

type HelloWorldProps = {
  name?: string;
};

const HelloWorld = ({ name = "World" }: HelloWorldProps) => {
  return (
    <Box textAlign={"center"}>
      <Heading>Hello {name}</Heading>
    </Box>
  );
};

export { HelloWorld };
