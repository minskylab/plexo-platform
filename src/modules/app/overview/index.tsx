import {
  AppShell,
  Group,
  Text,
  Title,
  useMantineTheme,
  Container,
  SegmentedControl,
  Box,
  Center,
  Button,
  Menu,
  TextInput,
  Modal,
  Textarea,
  Switch,
  Skeleton,
  SimpleGrid,
  ScrollArea,
  Stack,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  Archive,
  BoxModel,
  BoxMultiple,
  ChartPie2,
  Circle,
  CircleCheck,
  CircleDashed,
  CircleDotted,
  CircleHalf,
  CircleX,
  Dna,
  DotsCircleHorizontal,
  LayoutColumns,
  LayoutRows,
  MoodNeutral,
} from "tabler-icons-react";
import { useQuery, useSubscription } from "urql";

import { TaskPriority, TasksDocument, TaskStatus } from "../../../integration/graphql";
import { NavbarSearch } from "components/ui/NavBarWithSearch";
import { TaskListElement } from "components/ui/Task";
import { PrioritySelector } from "components/ui/Task/priority";
import { StatusSelector } from "components/ui/Task/status";
import { getCookie, setCookie } from "cookies-next";
import { DndTaskListElement } from "components/ui/CardTask";
import { AssigneeSelector } from "components/ui/Task/assignee";
import { ProjectSelector } from "components/ui/Task/project";
import { TeamSelector } from "components/ui/Task/team";
import { LabelSelector } from "components/ui/Task/label";
import { LabelType } from "components/ui/Task/labelType";

export const OverviewContent = () => {
  /*  const task: Task = {
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
  }; */

  const theme = useMantineTheme();
  const [newTaskOpened, setNewTaskOpened] = useState(false);
  const [createMore, setCreateMore] = useState(false);

  const [viewMode, setViewMode] = useState<"list" | "columns">("list");

  useEffect(() => {
    setViewMode(getCookie("viewMode") === "columns" ? "columns" : "list");
  }, []);

  useEffect(() => {
    setCookie("viewMode", viewMode, {
      maxAge: 30 * 24 * 60 * 60,
    });
  }, [viewMode]);

  const [{ data: tasksData, fetching: isFetchingTasksData }] = useQuery({
    query: TasksDocument,
  });

  /*  const [{ data: tasks }] = useSubscription({
    query: TasksSubscriptionDocument,
  }); */
  // const focusTrapRef = useFocusTrap();
  // console.log(tasksData);
  // console.log(tasksData?.tasks.filter(task => task.status == "TO_DO"));

  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });
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
            {/* <Button
              compact
              variant="light"
              color={"gray"}
              leftIcon={<Dna size={16} color={theme.colors.red[4]} />}
            >
              MIN
            </Button> */}
            <TeamSelector initialTeam={undefined} /> {/* change to current team*/}
            <Text size={"sm"}>New Task</Text>
          </Group>
        }
      >
        <Box>
          <TextInput placeholder="Task Title" variant="unstyled" size="lg" autoFocus />
          <Textarea placeholder="Add description..." variant="unstyled" size="sm" />
        </Box>
        <Group spacing={6} mb={"md"}>
          <StatusSelector initialStatus={TaskStatus.Backlog} />
          <PrioritySelector initialPriority={TaskPriority.None} />
          <AssigneeSelector initialAssignee={undefined} />
          <LabelSelector initialLabel={[]}/>
          <ProjectSelector initialProject={undefined} />
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
          <Switch
            label="Create more"
            size="xs"
            checked={createMore}
            onChange={e => setCreateMore(e.currentTarget.checked)}
          />
          {/* {!createMore && "s"} */}
          <Button compact variant="filled">
            Create Task
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
              value={viewMode}
              onChange={value => setViewMode(value as "list" | "columns")}
              transitionTimingFunction="ease"
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
        {viewMode === "list" ? (
          <Container>
            <Group spacing={6} mt={16} mb={8}>
              <MoodNeutral size={18} color={theme.colors.indigo[6]} />
              <Title order={6}>None</Title>
              <Text color="dimmed" size="xs">
                {tasksData?.tasks.filter(task => task.status == "NONE").length}
              </Text>
            </Group>
            {isFetchingTasksData ? (
              <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
            ) : (
              tasksData?.tasks
                .filter(t => t.status == "NONE")
                .map(t => {
                  return <TaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />;
                })
            )}
            <Group spacing={6} mt={16} mb={8}>
              <ChartPie2 size={18} color={theme.colors.yellow[6]} />
              <Title order={6}>In Progress</Title>
              <Text color="dimmed" size="xs">
                {tasksData?.tasks.filter(task => task.status == "IN_PROGRESS").length}
              </Text>
            </Group>
            {isFetchingTasksData ? (
              <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
            ) : (
              tasksData?.tasks
                .filter(t => t.status == "IN_PROGRESS")
                .map(t => {
                  return <TaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />;
                })
            )}
            <Group spacing={6} mt={16} mb={8}>
              <Circle size={18} />
              <Title order={6}>Todo</Title>
              <Text color="dimmed" size="xs">
                {tasksData?.tasks.filter(task => task.status == "TO_DO").length}
              </Text>
            </Group>
            {/* <TaskListElement task={{ ...task, status: "todo" }} /> */}
            {isFetchingTasksData ? (
              <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
            ) : (
              tasksData?.tasks
                .filter(t => t.status == "TO_DO")
                .map(t => {
                  return <TaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />;
                })
            )}
            <Group spacing={6} mt={16} mb={8}>
              <CircleDotted size={18} />
              <Title order={6}>Backlog</Title>
              <Text color="dimmed" size="xs">
                {tasksData?.tasks.filter(task => task.status == "BACKLOG").length}
              </Text>
            </Group>
            {isFetchingTasksData ? (
              <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
            ) : (
              tasksData?.tasks
                .filter(t => t.status == "BACKLOG")
                .map(t => {
                  return <TaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />;
                })
            )}
            <Group spacing={6} mt={16} mb={8}>
              <CircleCheck size={18} color={theme.colors.green[6]} />
              <Title order={6}>Done</Title>
              <Text color="dimmed" size="xs">
                {tasksData?.tasks.filter(task => task.status == "DONE").length}
              </Text>
            </Group>
            {isFetchingTasksData ? (
              <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
            ) : (
              tasksData?.tasks
                .filter(t => t.status == "DONE")
                .map(t => {
                  return <TaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />;
                })
            )}
            <Group spacing={6} mt={16} mb={8}>
              <CircleX size={18} color={theme.colors.red[6]} />
              <Title order={6}>Canceled</Title>
              <Text color="dimmed" size="xs">
                {tasksData?.tasks.filter(task => task.status == "CANCELED").length}
              </Text>
            </Group>
            {isFetchingTasksData ? (
              <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
            ) : (
              tasksData?.tasks
                .filter(t => t.status == "CANCELED")
                .map(t => {
                  return <TaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />;
                })
            )}
          </Container>
        ) : (
          // <Container fluid sx={{ marginLeft: 20 }}>
          //   <SimpleGrid cols={6}>
          //     <Stack>
          //       <Group>
          //         <MoodNeutral size={18} color={theme.colors.indigo[6]} />
          //         <Title order={6}>None</Title>
          //         <Text color="dimmed" size="xs">
          //           {tasksData?.tasks.filter(task => task.status == "NONE").length}
          //         </Text>
          //       </Group>
          //       <ScrollArea style={{ height: 812 }} offsetScrollbars>
          //         {isFetchingTasksData ? (
          //           <Skeleton
          //             height={36}
          //             radius="sm"
          //             sx={{ "&::after": { background: "#e8ebed" } }}
          //           />
          //         ) : (
          //           tasksData?.tasks
          //             .filter(t => t.status == "NONE")
          //             .map(t => {
          //               return (
          //                 // <DndTaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />
          //                 <DndTaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />
          //               );
          //             })
          //         )}
          //       </ScrollArea>
          //     </Stack>
          //     <Stack>
          //       <Group>
          //         <ChartPie2 size={18} color={theme.colors.yellow[6]} />
          //         <Title order={6}>In Progress</Title>
          //         <Text color="dimmed" size="xs">
          //           {tasksData?.tasks.filter(task => task.status == "IN_PROGRESS").length}
          //         </Text>
          //       </Group>
          //       <ScrollArea style={{ height: 800 }}>
          //         {isFetchingTasksData ? (
          //           <Skeleton
          //             height={36}
          //             radius="sm"
          //             sx={{ "&::after": { background: "#e8ebed" } }}
          //           />
          //         ) : (
          //           tasksData?.tasks
          //             .filter(t => t.status == "IN_PROGRESS")
          //             .map(t => {
          //               return (
          //                 <DndTaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />
          //               );
          //             })
          //         )}
          //       </ScrollArea>
          //     </Stack>
          //     <Stack>
          //       <Group>
          //         <Circle size={18} />
          //         <Title order={6}>Todo</Title>
          //         <Text color="dimmed" size="xs">
          //           {tasksData?.tasks.filter(task => task.status == "TO_DO").length}
          //         </Text>
          //       </Group>
          //       <ScrollArea style={{ height: 800 }}>
          //         {isFetchingTasksData ? (
          //           <Skeleton
          //             height={36}
          //             radius="sm"
          //             sx={{ "&::after": { background: "#e8ebed" } }}
          //           />
          //         ) : (
          //           tasksData?.tasks
          //             .filter(t => t.status == "TO_DO")
          //             .map(t => {
          //               return (
          //                 <DndTaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />
          //               );
          //             })
          //         )}
          //       </ScrollArea>
          //     </Stack>
          //     <Stack>
          //       <Group>
          //         <CircleDotted size={18} />
          //         <Title order={6}>Backlog</Title>
          //         <Text color="dimmed" size="xs">
          //           {tasksData?.tasks.filter(task => task.status == "BACKLOG").length}
          //         </Text>
          //       </Group>
          //       <ScrollArea style={{ height: 800 }}>
          //         {isFetchingTasksData ? (
          //           <Skeleton
          //             height={36}
          //             radius="sm"
          //             sx={{ "&::after": { background: "#e8ebed" } }}
          //           />
          //         ) : (
          //           tasksData?.tasks
          //             .filter(t => t.status == "BACKLOG")
          //             .map(t => {
          //               return (
          //                 <DndTaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />
          //               );
          //             })
          //         )}
          //       </ScrollArea>
          //     </Stack>
          //     <Stack>
          //       <Group>
          //         <CircleCheck size={18} color={theme.colors.green[6]} />
          //         <Title order={6}>Done</Title>
          //         <Text color="dimmed" size="xs">
          //           {tasksData?.tasks.filter(task => task.status == "DONE").length}
          //         </Text>
          //       </Group>
          //       <ScrollArea>
          //         {isFetchingTasksData ? (
          //           <Skeleton
          //             height={36}
          //             radius="sm"
          //             sx={{ "&::after": { background: "#e8ebed" } }}
          //           />
          //         ) : (
          //           tasksData?.tasks
          //             .filter(t => t.status == "DONE")
          //             .map(t => {
          //               return (
          //                 <DndTaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />
          //               );
          //             })
          //         )}
          //       </ScrollArea>
          //     </Stack>
          //     <Stack>
          //       <Group>
          //         <CircleX size={18} color={theme.colors.red[6]} />
          //         <Title order={6}>Canceled</Title>
          //         <Text color="dimmed" size="xs">
          //           {tasksData?.tasks.filter(task => task.status == "CANCELED").length}
          //         </Text>
          //       </Group>
          //       <ScrollArea style={{ height: 800 }}>
          //         {isFetchingTasksData ? (
          //           <Skeleton
          //             height={36}
          //             radius="sm"
          //             sx={{ "&::after": { background: "#e8ebed" } }}
          //           />
          //         ) : (
          //           tasksData?.tasks
          //             .filter(t => t.status == "CANCELED")
          //             .map(t => {
          //               return (
          //                 <DndTaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />
          //               );
          //             })
          //         )}
          //       </ScrollArea>
          //     </Stack>
          //   </SimpleGrid>
          // </Container>
          <ScrollArea
            type="auto"
            offsetScrollbars
            style={{ height: innerHeight - 90 }}
            onScrollPositionChange={onScrollPositionChange}
          >
            <SimpleGrid cols={6} spacing={325}>
              <Stack sx={{ minWidth: 312, marginLeft: 20 }}>
                <Group>
                  <MoodNeutral size={18} color={theme.colors.indigo[6]} />
                  <Title order={6}>None</Title>
                  <Text color="dimmed" size="xs">
                    {tasksData?.tasks.filter(task => task.status == "NONE").length}
                  </Text>
                </Group>
                <ScrollArea style={{ height: 812 }} offsetScrollbars>
                  {isFetchingTasksData ? (
                    <Skeleton
                      height={36}
                      radius="sm"
                      sx={{ "&::after": { background: "#e8ebed" } }}
                    />
                  ) : (
                    tasksData?.tasks
                      .filter(t => t.status == "NONE")
                      .map(t => {
                        return (
                          // <DndTaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />
                          <DndTaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />
                        );
                      })
                  )}
                </ScrollArea>
              </Stack>
              <Stack sx={{ minWidth: 312, marginLeft: 20 }}>
                <Group>
                  <ChartPie2 size={18} color={theme.colors.yellow[6]} />
                  <Title order={6}>In Progress</Title>
                  <Text color="dimmed" size="xs">
                    {tasksData?.tasks.filter(task => task.status == "IN_PROGRESS").length}
                  </Text>
                </Group>
                <ScrollArea style={{ height: 812 }} offsetScrollbars>
                  {isFetchingTasksData ? (
                    <Skeleton
                      height={36}
                      radius="sm"
                      sx={{ "&::after": { background: "#e8ebed" } }}
                    />
                  ) : (
                    tasksData?.tasks
                      .filter(t => t.status == "IN_PROGRESS")
                      .map(t => {
                        return (
                          <DndTaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />
                        );
                      })
                  )}
                </ScrollArea>
              </Stack>
              <Stack sx={{ minWidth: 312, marginLeft: 20 }}>
                <Group>
                  <Circle size={18} />
                  <Title order={6}>Todo</Title>
                  <Text color="dimmed" size="xs">
                    {tasksData?.tasks.filter(task => task.status == "TO_DO").length}
                  </Text>
                </Group>
                <ScrollArea style={{ height: 812 }} offsetScrollbars>
                  {isFetchingTasksData ? (
                    <Skeleton
                      height={36}
                      radius="sm"
                      sx={{ "&::after": { background: "#e8ebed" } }}
                    />
                  ) : (
                    tasksData?.tasks
                      .filter(t => t.status == "TO_DO")
                      .map(t => {
                        return (
                          <DndTaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />
                        );
                      })
                  )}
                </ScrollArea>
              </Stack>
              <Stack sx={{ minWidth: 312, marginLeft: 20 }}>
                <Group>
                  <CircleDotted size={18} />
                  <Title order={6}>Backlog</Title>
                  <Text color="dimmed" size="xs">
                    {tasksData?.tasks.filter(task => task.status == "BACKLOG").length}
                  </Text>
                </Group>
                <ScrollArea style={{ height: 812 }} offsetScrollbars>
                  {isFetchingTasksData ? (
                    <Skeleton
                      height={36}
                      radius="sm"
                      sx={{ "&::after": { background: "#e8ebed" } }}
                    />
                  ) : (
                    tasksData?.tasks
                      .filter(t => t.status == "BACKLOG")
                      .map(t => {
                        return (
                          <DndTaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />
                        );
                      })
                  )}
                </ScrollArea>
              </Stack>
              <Stack sx={{ minWidth: 312, marginLeft: 20 }}>
                <Group>
                  <CircleCheck size={18} color={theme.colors.green[6]} />
                  <Title order={6}>Done</Title>
                  <Text color="dimmed" size="xs">
                    {tasksData?.tasks.filter(task => task.status == "DONE").length}
                  </Text>
                </Group>
                <ScrollArea style={{ height: 812 }} offsetScrollbars>
                  {isFetchingTasksData ? (
                    <Skeleton
                      height={36}
                      radius="sm"
                      sx={{ "&::after": { background: "#e8ebed" } }}
                    />
                  ) : (
                    tasksData?.tasks
                      .filter(t => t.status == "DONE")
                      .map(t => {
                        return (
                          <DndTaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />
                        );
                      })
                  )}
                </ScrollArea>
              </Stack>
              <Stack sx={{ minWidth: 312, marginLeft: 20 }}>
                <Group>
                  <CircleX size={18} color={theme.colors.red[6]} />
                  <Title order={6}>Canceled</Title>
                  <Text color="dimmed" size="xs">
                    {tasksData?.tasks.filter(task => task.status == "CANCELED").length}
                  </Text>
                </Group>
                <ScrollArea style={{ height: 812 }} offsetScrollbars>
                  {isFetchingTasksData ? (
                    <Skeleton
                      height={36}
                      radius="sm"
                      sx={{ "&::after": { background: "#e8ebed" } }}
                    />
                  ) : (
                    tasksData?.tasks
                      .filter(t => t.status == "CANCELED")
                      .map(t => {
                        return (
                          <DndTaskListElement key={t.id} task={{ ...t, status: TaskStatus.None }} />
                        );
                      })
                  )}
                </ScrollArea>
              </Stack>
            </SimpleGrid>
          </ScrollArea>
        )}
      </AppShell>
    </>
  );
};
