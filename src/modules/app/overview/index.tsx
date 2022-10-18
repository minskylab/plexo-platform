import { AppShell, Header, Text } from "@mantine/core";
import { NavbarSearch } from "components/ui/NavBarWithSearch";
import { TaskListElement } from "components/ui/Task";
import { Task } from "../datatypes";

export const OverviewContent = () => {
  const task: Task = {
    code: "123",
    title: "123",
    priority: "low",
    status: "in-progress",
    project: {
      name: "123",
    },
  };

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
      <TaskListElement task={task} />
    </AppShell>
  );
};
