import { useTheme } from "@emotion/react";
import {
  AppShell,
  Group,
  Header,
  Space,
  Text,
  Title,
  useMantineTheme,
  Container,
  SegmentedControl,
  Box,
  Center,
  UnstyledButton,
  Button,
  Menu,
  TextInput,
  Modal,
  Textarea,
  Switch,
} from "@mantine/core";
import { useFocusTrap } from "@mantine/hooks";
import { NavbarSearch } from "components/ui/NavBarWithSearch";
import { TaskListElement } from "components/ui/Task";
import { PrioritySelector } from "components/ui/Task/priority";
import { StatusSelector } from "components/ui/Task/status";
import { useState } from "react";
import {
  Archive,
  BoxModel,
  BoxMultiple,
  Circle,
  CircleDashed,
  CircleHalf,
  Columns,
  Dna,
  DotsCircleHorizontal,
  GridPattern,
  LayoutColumns,
  LayoutRows,
  List,
  Menu2,
} from "tabler-icons-react";
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
  const [newTaskOpened, setNewTaskOpened] = useState(false);

  // const focusTrapRef = useFocusTrap();

  return (
    <>
      <Modal
        centered
        overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.5}
        // overlayBlur={3}
        transition={"slide-up"}
        size={"lg"}
        opened={newTaskOpened}
        onClose={() => setNewTaskOpened(false)}
        shadow="md"
        title={
          <Group spacing={8}>
            <Button
              compact
              variant="light"
              color={"gray"}
              leftIcon={<Dna size={16} color={theme.colors.red[4]} />}
            >
              MIN
            </Button>
            <Text size={"sm"}>New Task</Text>
          </Group>
        }
      >
        <Box>
          <TextInput placeholder="Task Title" variant="unstyled" size="lg" autoFocus />
          <Textarea placeholder="Add description..." variant="unstyled" size="sm" />
        </Box>
        <Group spacing={6} mb={"md"}>
          <StatusSelector initialStatus="backlog" />
          <PrioritySelector initialPriority="low" />
        </Group>
        <Group
          pt={"md"}
          position="right"
          sx={{
            borderTopWidth: 1,
            borderTopStyle: "solid",
            borderTopColor:
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2],
          }}
        >
          <Switch label="Create more" size="xs" />
          <Button compact variant="filled">
            Create Issue
          </Button>
        </Group>
      </Modal>
      <AppShell
        padding={0}
        navbar={<NavbarSearch onNewTask={() => setNewTaskOpened(true)} />}
        styles={theme => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
      >
        <Group
          position="apart"
          sx={{
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
            marginBottom: theme.spacing.md,
            padding: theme.spacing.md,
            height: 73.5,
            "&:not(:last-of-type)": {
              borderBottom: `1px solid ${
                theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
              }`,
            },
          }}
        >
          <Group>
            <Button
              compact
              variant="light"
              color={"gray"}
              leftIcon={<Dna size={16} color={theme.colors.red[4]} />}
            >
              Minsky Phi
            </Button>
            <Menu shadow="md" width={120}>
              <Menu.Target>
                <Button
                  compact
                  variant="subtle"
                  color={"gray"}
                  // leftIcon={<Dna size={16} color={theme.colors.red[4]} />}
                >
                  Active Tasks
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                {/* <Menu.Label>Set Priority</Menu.Label> */}
                {/* <TextInput
                placeholder="Change Priority..."
                variant="filled"
                rightSection={<Kbd px={8}>P</Kbd>}
              ></TextInput>
              <Menu.Divider /> */}
                <Menu.Item icon={<BoxMultiple size={18} />}>Active</Menu.Item>
                <Menu.Item icon={<CircleDashed size={18} />}>Backlog</Menu.Item>
                <Menu.Item icon={<BoxModel size={18} />}>All</Menu.Item>
                <Menu.Item icon={<Archive size={18} />}>Archive</Menu.Item>
              </Menu.Dropdown>
            </Menu>
            {/* <Title order={5}>Active Tasks</Title> */}
          </Group>
          <Group>
            <SegmentedControl
              data={[
                {
                  label: (
                    <Center>
                      <LayoutRows size={16} />
                      <Text ml={6} size={"xs"}>
                        List
                      </Text>
                    </Center>
                  ),
                  value: "list",
                },
                {
                  label: (
                    <Center>
                      <LayoutColumns size={16} />
                      <Text size={"xs"} ml={6}>
                        Board
                      </Text>
                    </Center>
                  ),
                  value: "columns",
                },
                // { label: 'Vue', value: 'vue' },
                // { label: 'Svelte', value: 'svelte' },
              ]}
            />
          </Group>
        </Group>
        <Container>
          <Group spacing={6} mt={16} mb={8}>
            <DotsCircleHorizontal size={18} color={theme.colors.green[6]} />
            <Title order={6}>In Review</Title>
            <Text color="dimmed" size="xs">
              2
            </Text>
          </Group>
          <TaskListElement task={{ ...task, status: "in-review" }} />
          <TaskListElement task={{ ...task, status: "in-review" }} />
          <Group spacing={6} mt={16} mb={8}>
            <CircleHalf size={18} color={theme.colors.yellow[6]} />
            <Title order={6}>In Progress</Title>
            <Text color="dimmed" size="xs">
              6
            </Text>
          </Group>
          <TaskListElement task={task} />
          <TaskListElement task={task} />
          <TaskListElement task={task} active />
          <TaskListElement task={task} />
          <TaskListElement task={task} />
          <TaskListElement task={task} />
          <Group spacing={6} mt={16} mb={8}>
            <Circle size={18} />
            <Title order={6}>Todo</Title>
            <Text color="dimmed" size="xs">
              3
            </Text>
          </Group>
          <TaskListElement task={{ ...task, status: "todo" }} />
          <TaskListElement task={{ ...task, status: "todo" }} />
          <TaskListElement task={{ ...task, status: "todo" }} />
        </Container>
      </AppShell>
    </>
  );
};
