import { Box, List, ListIcon, ListItem, Skeleton, Stack, Text, useToast } from "@chakra-ui/react";
import { useListUsersQuery } from "integration/graphql";
import { CheckIcon } from "@chakra-ui/icons";
import { useEffect } from "react";

type ListUsersProps = {};

const ListUsers = ({}: ListUsersProps) => {
  const [{ data, fetching, error }] = useListUsersQuery();
  const toast = useToast();

  useEffect(() => {
    error &&
      toast({
        title: "GraphQL Query Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
  }, [toast, error]);

  return (
    <Box>
      <Text textAlign={"center"} my={3} color={"gray.500"}>
        And
      </Text>
      <Box>
        {fetching && (
          <Stack>
            <Skeleton height="1.25rem" isLoaded={!fetching} />
            <Skeleton height="1.25rem" isLoaded={!fetching} />
            <Skeleton height="1.25rem" isLoaded={!fetching} />
            <Skeleton height="1.25rem" isLoaded={!fetching} />
            <Skeleton height="1.25rem" isLoaded={!fetching} />
          </Stack>
        )}
        <List spacing={3}>
          {data?.users?.data?.map(user => (
            <ListItem key={user?.id}>
              <ListIcon as={CheckIcon} color="green.500" />
              <b>Hello</b> {user?.name}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export { ListUsers };
