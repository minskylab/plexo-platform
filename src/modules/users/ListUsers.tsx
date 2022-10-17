import { useListUsersQuery } from "integration/graphql";
import { useEffect } from "react";
import { List } from "@mantine/core";
import useTranslation from "next-translate/useTranslation";

type ListUsersProps = {};

const ListUsers = ({}: ListUsersProps) => {
  const [{ data, fetching, error }] = useListUsersQuery();
  const { t, lang } = useTranslation("home");

  useEffect(() => {
    error && console.log(error.message);
  }, [error]);

  return (
    <>
      <List>
        {data?.users?.data?.map(user => (
          <List.Item key={user?.id}>{t("greeting")} {user?.name}</List.Item>
        ))}
      </List>
    </>
  );
};

export { ListUsers };
