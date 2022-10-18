import { useTheme } from "@emotion/react";
import { AppShell, Group, Header, Space, Text, Title, useMantineTheme } from "@mantine/core";
import { NavbarSearch } from "components/ui/NavBarWithSearch";
import { TaskListElement } from "components/ui/Task";
import { CircleHalf } from "tabler-icons-react";
import { Task } from "../datatypes";

export const OverviewContent = () => {
  const task: Task = {
    code: "MIN-169",
    title: "Definir e implementar Splash Screen e Icono del app Vax Canina",
    priority: "low",
    status: "in-progress",
    // assigned: {
    //   name: "BM",
    // },
    createdAt: new Date(),
    project: {
      name: "Minsky",
    },
  };

  const theme = useMantineTheme();

  return (
    <AppShell
      padding="md"
      // navbar={<Navbar width={{ base: 300 }} height={500} p="xs">{/* Navbar content */}</Navbar>}
      navbar={<NavbarSearch />}
      //   header={
      //     <Header height={60} p="xs">
      //       {/* Header content */}
      //     </Header>
      //   }
      styles={theme => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <Group spacing={6} my={8}>
        <CircleHalf size={18} color={theme.colors.yellow[6]} />
        <Title order={6}>In Progress</Title>
        <Text color="dimmed" size="xs">
          6
        </Text>
      </Group>
      {/* <Header height={60}> Issues</Header> */}
      <TaskListElement task={task} />
      {/* <Space h={1} /> */}
      <TaskListElement task={task} />
      {/* <Space h={1} /> */}
      <TaskListElement task={task} selected />
      {/* <Space h={1} /> */}
      <TaskListElement task={task} />
      {/* <Space h={1} /> */}
      <TaskListElement task={task} />
      {/* <Space h={1} /> */}
      <TaskListElement task={task} />
    </AppShell>
  );
};
