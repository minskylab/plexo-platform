import {
  Group,
  Text,
  Title,
  Container,
  SegmentedControl,
  Center,
  Skeleton,
  SimpleGrid,
  ScrollArea,
  Stack,
  createStyles,
  MediaQuery,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { LayoutColumns, LayoutRows, LayoutSidebar } from "tabler-icons-react";
import { getCookie, setCookie } from "cookies-next";
import { useQuery } from "urql";

import { TasksDocument, TaskStatus } from "../../../integration/graphql";
import { TaskCardElement, TaskListElement } from "components/ui/Task/task";
import { StatusIcon, statusName } from "components/ui/Task/status";
import { usePlexoContext } from "context/PlexoContext";
import { Task } from "../datatypes";

const useStyles = createStyles(theme => ({
  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
    [theme.fn.smallerThan("xs")]: {
      marginRight: -10,
    },
  },
  "text-view-buttons": {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  "text-header-buttons": {
    [theme.fn.smallerThan("sm")]: {
      fontSize: "90%",
    },
    [theme.fn.smallerThan("xs")]: {
      fontSize: "70%",
      marginRight: -15,
      marginLeft: -5,
    },
  },
  "icon-header-buttons": {
    [theme.fn.smallerThan("sm")]: {
      width: "90%",
      height: "90%",
    },
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
  "segmented-control": {
    [theme.fn.smallerThan("xs")]: {
      marginLeft: -5,
    },
  },
}));

const DndTaskBoard = ({ statusData }: { statusData: Task[] }) => {
  const [state, handlers] = useListState([...statusData]);

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        handlers.reorder({ from: source.index, to: destination?.index || 0 });
      }}
    >
      <Droppable droppableId="task-list" direction="vertical">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {state.map((t: Task, index: number) => (
              <Draggable key={t.id} draggableId={t.id} index={index}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCardElement key={t.id} task={{ ...t, status: t.status }} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const DndTaskList = ({ statusData }: { statusData: Task[] }) => {
  const [state, handlers] = useListState([...statusData]);

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        handlers.reorder({ from: source.index, to: destination?.index || 0 });
      }}
    >
      <Droppable droppableId="task-list" direction="vertical">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {state.map((t: Task, index: number) => (
              <Draggable key={t.id} draggableId={t.id} index={index}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskListElement key={t.id} task={{ ...t, status: t.status }} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

type StatusCounterProps = {
  status: TaskStatus;
  taskData: Task[] | undefined;
};

type TaskProps = {
  status: string;
};

type OverviewProps = {
  taskData: Task[] | undefined;
  fetching: boolean;
};

const StatusCounter = ({ status, taskData }: StatusCounterProps) => {
  const theme = useMantineTheme();
  return (
    <Group spacing={6} my={10}>
      {StatusIcon(theme, status)}
      <Title order={6}>{statusName(status)}</Title>
      <Text color="dimmed" size="xs">
        {taskData?.filter(task => task.status == status).length}
      </Text>
    </Group>
  );
};

const OverviewBoard = ({ taskData, fetching }: OverviewProps) => {
  const TaskCard = ({ status }: TaskProps) => {
    const data = taskData ? taskData?.filter((t: { status: string }) => t.status == status) : [];

    return <DndTaskBoard statusData={data} />;
  };

  return (
    <ScrollArea type="hover" style={{ height: "calc(100vh - 90px)" }}>
      <SimpleGrid cols={6} spacing={325}>
        <Stack spacing={0} sx={{ minWidth: 312, marginLeft: 20 }}>
          <StatusCounter taskData={taskData} status={TaskStatus.None} />
          <ScrollArea style={{ height: 812 }} offsetScrollbars>
            {fetching ? (
              <Skeleton height={36} radius="sm" />
            ) : (
              <TaskCard status={TaskStatus.None} />
            )}
          </ScrollArea>
        </Stack>
        <Stack spacing={0} sx={{ minWidth: 312, marginLeft: 20 }}>
          <StatusCounter taskData={taskData} status={TaskStatus.InProgress} />
          <ScrollArea style={{ height: 812 }} offsetScrollbars>
            {fetching ? (
              <Skeleton height={36} radius="sm" />
            ) : (
              <TaskCard status={TaskStatus.InProgress} />
            )}
          </ScrollArea>
        </Stack>
        <Stack spacing={0} sx={{ minWidth: 312, marginLeft: 20 }}>
          <StatusCounter taskData={taskData} status={TaskStatus.ToDo} />
          <ScrollArea style={{ height: 812 }} offsetScrollbars>
            {fetching ? (
              <Skeleton height={36} radius="sm" />
            ) : (
              <TaskCard status={TaskStatus.ToDo} />
            )}
          </ScrollArea>
        </Stack>
        <Stack spacing={0} sx={{ minWidth: 312, marginLeft: 20 }}>
          <StatusCounter taskData={taskData} status={TaskStatus.Backlog} />
          <ScrollArea style={{ height: 812 }} offsetScrollbars>
            {fetching ? (
              <Skeleton height={36} radius="sm" />
            ) : (
              <TaskCard status={TaskStatus.Backlog} />
            )}
          </ScrollArea>
        </Stack>
        <Stack spacing={0} sx={{ minWidth: 312, marginLeft: 20 }}>
          <StatusCounter taskData={taskData} status={TaskStatus.Done} />
          <ScrollArea style={{ height: 812 }} offsetScrollbars>
            {fetching ? (
              <Skeleton height={36} radius="sm" />
            ) : (
              <TaskCard status={TaskStatus.Done} />
            )}
          </ScrollArea>
        </Stack>
        <Stack spacing={0} sx={{ minWidth: 312, marginLeft: 20 }}>
          <StatusCounter taskData={taskData} status={TaskStatus.Canceled} />
          <ScrollArea style={{ height: 812 }} offsetScrollbars>
            {fetching ? (
              <Skeleton height={36} radius="sm" />
            ) : (
              <TaskCard status={TaskStatus.Canceled} />
            )}
          </ScrollArea>
        </Stack>
      </SimpleGrid>
    </ScrollArea>
  );
};

const OverviewList = ({ taskData, fetching }: OverviewProps) => {
  const TaskList = ({ status }: TaskProps) => {
    const data = taskData ? taskData?.filter((t: { status: string }) => t.status == status) : [];

    return <DndTaskList statusData={data} />;
  };
  /* console.log(window.innerHeight); */
  return (
    <ScrollArea type="hover" style={{ height: "calc(100vh - 90px)" }}>
      <Container>
        <StatusCounter taskData={taskData} status={TaskStatus.None} />
        {fetching ? <Skeleton height={36} radius="sm" /> : <TaskList status={"NONE"} />}
        <StatusCounter taskData={taskData} status={TaskStatus.InProgress} />
        {fetching ? <Skeleton height={36} radius="sm" /> : <TaskList status={"IN_PROGRESS"} />}
        <StatusCounter taskData={taskData} status={TaskStatus.ToDo} />
        {fetching ? <Skeleton height={36} radius="sm" /> : <TaskList status={"TO_DO"} />}
        <StatusCounter taskData={taskData} status={TaskStatus.Backlog} />
        {fetching ? <Skeleton height={36} radius="sm" /> : <TaskList status={"BACKLOG"} />}
        <StatusCounter taskData={taskData} status={TaskStatus.Done} />
        {fetching ? <Skeleton height={36} radius="sm" /> : <TaskList status={"DONE"} />}
        <StatusCounter taskData={taskData} status={TaskStatus.Canceled} />
        {fetching ? <Skeleton height={36} radius="sm" /> : <TaskList status={"CANCELED"} />}
      </Container>
    </ScrollArea>
  );
};

export const OverviewContent = () => {
  const { classes, theme } = useStyles();
  const [viewMode, setViewMode] = useState<"list" | "columns">("list");
  const { setNavBarOpened } = usePlexoContext();

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

  return (
    <Stack>
      <Group
        h={73}
        position="apart"
        sx={{
          padding: theme.spacing.md,
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          "&:not(:last-of-type)": {
            borderBottom: `1px solid ${
              theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
          },
        }}
      >
        <Group spacing="md">
          <MediaQuery largerThan="md" styles={{ display: "none" }}>
            <ActionIcon onClick={() => setNavBarOpened(true)}>
              <LayoutSidebar size={16} />
            </ActionIcon>
          </MediaQuery>
        </Group>
        <Group>
          <SegmentedControl
            className={classes["segmented-control"]}
            size={"xs"}
            value={viewMode}
            onChange={value => setViewMode(value as "list" | "columns")}
            transitionTimingFunction="ease"
            data={[
              {
                label: (
                  <Center>
                    <LayoutRows size={16} />
                    <Text className={classes["text-view-buttons"]} ml={6} size={"xs"}>
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
                    <Text className={classes["text-view-buttons"]} size={"xs"} ml={6}>
                      Board
                    </Text>
                  </Center>
                ),
                value: "columns",
              },
            ]}
          />
        </Group>
      </Group>

      {viewMode === "list" ? (
        <OverviewList taskData={tasksData?.tasks} fetching={isFetchingTasksData} />
      ) : (
        <OverviewBoard taskData={tasksData?.tasks} fetching={isFetchingTasksData} />
      )}
    </Stack>
  );
};
