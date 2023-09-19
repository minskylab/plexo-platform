import {
  ActionIcon,
  Group,
  Stack,
  Text,
  TextInput,
  Textarea,
  Divider,
  CopyButton,
  Tooltip,
  Box,
  Button,
  createStyles,
  MediaQuery,
  Card,
  Paper,
  useMantineTheme,
  Avatar,
  Center,
} from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { DateInput } from "@mantine/dates";
import { IconSparkles } from "@tabler/icons-react";
import { Copy, Dots, LayoutSidebar, ChevronLeft, Plus, X } from "tabler-icons-react";
import { useState, useEffect } from "react";
import { useQuery } from "urql";
import Link from "next/link";

import { LeadSelectorByTask } from "components/ui/Task/lead";
import { PriorityIcon, PrioritySelectorByTask, priorityName } from "components/ui/Task/priority";
import { ProjectSelectorByTask } from "components/ui/Task/project";
import {
  StatusIcon,
  StatusSelectorByTask,
  statusLabel,
  statusName,
} from "components/ui/Task/status";
import { LabelsSelectorBytask } from "components/ui/Task/labels";
import { assigneesId, AssigneesSelectorByTask } from "components/ui/Task/assignees";
import { TaskMenu } from "components/ui/Task/menu";
import { Task, TaskById, TaskSuggestion } from "lib/types";
import { useActions } from "lib/hooks/useActions";
import { usePlexoContext } from "context/PlexoContext";
import { AlertNotification, ErrorNotification, SuccessNotification } from "lib/notifications";
import { TaskListElement } from "components/ui/Task/task";
import { validateDate } from "lib/utils";
import { SubdivideTaskDocument } from "integration/graphql";

type TaskDetailProps = {
  task: TaskById | undefined;
  isLoading: boolean;
};

const useStyles = createStyles(theme => ({
  propsSection: {
    [theme.fn.smallerThan("lg")]: {
      display: "none",
    },
  },
  propsBar: {
    display: "none",
    [theme.fn.smallerThan("lg")]: {
      display: "flex",
    },
  },
}));

const SubTasks = ({ task }: { task: TaskById | undefined }) => {
  const theme = useMantineTheme();
  const { setNewTaskOpened, setTaskId } = usePlexoContext();
  const [tasksSuggestion, setTaskSuggestion] = useState<TaskSuggestion[]>([]);

  const [{ data: subdivideTaskData, fetching: isLoadingSubdivide }, fetchTaskSubdivide] = useQuery({
    pause: true,
    query: SubdivideTaskDocument,
    variables: {
      taskId: task?.id,
      count: 2,
    },
  });

  const applyAiTaskSubdivide = async () => {
    fetchTaskSubdivide();
  };

  const onClearSuggestions = () => {
    setTaskSuggestion([]);
  };

  const onDeleteTaskSuggestion = (task: TaskSuggestion) => {
    setTaskSuggestion(tasksSuggestion.filter(t => t.title !== task.title));
  };

  useEffect(() => {
    if (subdivideTaskData) {
      setTaskSuggestion(subdivideTaskData.subdivideTask);
    }
  }, [subdivideTaskData]);

  return (
    <>
      <Group position="apart">
        <Text lineClamp={1} size={"sm"} color={"dimmed"}>
          Subtasks
        </Text>
        <Group spacing={5}>
          <Tooltip label={"Add sub-task"} position="top">
            <ActionIcon
              onClick={() => {
                setTaskId(task?.id);
                setNewTaskOpened(true);
              }}
            >
              <Plus size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={"Auto divide"} position="top">
            <ActionIcon
              variant="light"
              color="brand"
              loading={isLoadingSubdivide}
              onClick={applyAiTaskSubdivide}
            >
              <IconSparkles size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
      <Divider />
      {task?.subtasks.length ? (
        <Stack spacing={2}>
          {task?.subtasks
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            .map((t: Task) => (
              <TaskListElement key={t.id} task={t} />
            ))}
        </Stack>
      ) : null}

      {tasksSuggestion.length ? (
        <Card
          sx={{
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[1],
          }}
        >
          <Stack>
            <Group spacing={"xs"}>
              <Avatar
                color="brand"
                variant="outline"
                size={"xs"}
                styles={{
                  placeholder: {
                    border: "none",
                  },
                }}
              >
                <IconSparkles size={16} />
              </Avatar>

              <Text lineClamp={1} size={"sm"}>
                Suggestions
              </Text>
            </Group>
            <Stack spacing={3}>
              {tasksSuggestion.map(task => {
                return (
                  <Paper key={task.title} px={6} py={4}>
                    <Group spacing={8} sx={{ borderRadius: 4 }}>
                      <Tooltip label={priorityName(task.priority)} position="bottom">
                        <Center w={28} h={28}>
                          {PriorityIcon(task.priority)}
                        </Center>
                      </Tooltip>
                      <Tooltip label={statusLabel(task.status)} position="bottom">
                        <Center w={28} h={28}>
                          {StatusIcon(theme, task.status)}
                        </Center>
                      </Tooltip>

                      <Text size={"sm"} sx={{ flexGrow: 1 }}>
                        {task.title}
                      </Text>
                      <ActionIcon size={"sm"} onClick={() => onDeleteTaskSuggestion(task)}>
                        <X size={16} />
                      </ActionIcon>
                    </Group>
                  </Paper>
                );
              })}
            </Stack>
            <Group position="right">
              <Button compact variant="default" onClick={onClearSuggestions}>
                Cancel
              </Button>

              <Button compact variant="filled" disabled>
                Add subtasks
              </Button>
            </Group>
          </Stack>
        </Card>
      ) : null}
    </>
  );
};

const TaskDetailPageContent = ({ task, isLoading }: TaskDetailProps) => {
  const { classes, theme } = useStyles();
  const { setNavBarOpened } = usePlexoContext();
  const { fetchUpdateTask } = useActions();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const onUpdateTaskTitle = async (title: string) => {
    if (!title.length) {
      AlertNotification(
        "titleUpdateFailed",
        "Update Failed",
        "Please enter a title before submitting"
      );
      task?.title && setTitle(task.title);
    } else {
      const res = await fetchUpdateTask({
        taskId: task?.id,
        title: title,
        description: task?.description,
        status: statusName(task?.status),
        priority: priorityName(task?.priority),
        dueDate: task?.dueDate,
        projectId: task?.project?.id,
        leadId: task?.leader?.id,
        assignees: assigneesId(task),
      });

      if (res.data) {
        SuccessNotification("Title updated", res.data.updateTask.title);
      }
      if (res.error) {
        ErrorNotification();
      }
    }
  };

  const onUpdateTaskDescription = async (desc: string) => {
    const res = await fetchUpdateTask({
      taskId: task?.id,
      description: desc,
      status: statusName(task?.status),
      priority: priorityName(task?.priority),
      title: task?.title,
      dueDate: task?.dueDate,
      projectId: task?.project?.id,
      leadId: task?.leader?.id,
      assignees: assigneesId(task),
    });

    if (res.data) {
      SuccessNotification("Description updated", res.data.updateTask.title);
    }
    if (res.error) {
      ErrorNotification();
    }
  };

  const onUpdateTaskDueDate = async (dueDate: Date | null) => {
    const res = await fetchUpdateTask({
      taskId: task?.id,
      status: statusName(task?.status),
      priority: priorityName(task?.priority),
      title: task?.title,
      description: task?.description,
      dueDate: dueDate === null ? new Date(0) : dueDate,
      projectId: task?.project?.id,
      leadId: task?.leader?.id,
      assignees: assigneesId(task),
    });

    if (res.data) {
      SuccessNotification("Due date updated", res.data.updateTask.title);
    }
    if (res.error) {
      ErrorNotification();
    }
  };

  const refTitle = useClickOutside(() => {
    if (isLoading) {
      return null;
    }

    if (title !== task?.title) {
      onUpdateTaskTitle(title);
    }
  });

  const refDescription = useClickOutside(() => {
    if (isLoading) {
      return null;
    }

    if ((!task?.description || task?.description == "") && description == "") {
      return null;
    }

    if (task?.description !== description) {
      onUpdateTaskDescription(description);
    }
  });

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description ? task.description : "");
      setDueDate(validateDate(task.dueDate));
    }
  }, [task]);

  const handleDateChange = (date: Date | null) => {
    setDueDate(date);
    onUpdateTaskDueDate(date);
  };

  return (
    <Stack h={"100vh"}>
      <Group
        h={73}
        px={20}
        sx={{
          borderBottom: `1px solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
          }`,
        }}
      >
        <MediaQuery largerThan="md" styles={{ display: "none" }}>
          <ActionIcon onClick={() => setNavBarOpened(true)}>
            <LayoutSidebar size={16} />
          </ActionIcon>
        </MediaQuery>
        <Link href="/tasks" passHref>
          <ActionIcon variant="subtle">
            <ChevronLeft size={20} />
          </ActionIcon>
        </Link>
      </Group>
      <Group px={20} sx={{ alignItems: "baseline" }}>
        <Box sx={{ flex: 1 }}>
          <Stack maw={860} m="auto">
            <Stack spacing={10}>
              <Group position="apart">
                <Text lineClamp={1} size={"sm"} color={"dimmed"}>
                  {`PLE-${task?.count}`}
                </Text>
                <TaskMenu task={task}>
                  <ActionIcon radius={"sm"} size={"xs"}>
                    <Dots size={18} />
                  </ActionIcon>
                </TaskMenu>
              </Group>
              <Group spacing={5} className={classes.propsBar}>
                <StatusSelectorByTask task={task} type="button" />
                <PrioritySelectorByTask task={task} type="button" />
                <LeadSelectorByTask task={task} type="button" />
                <AssigneesSelectorByTask task={task} />
                <LabelsSelectorBytask task={task} />
                <ProjectSelectorByTask task={task} />
              </Group>
            </Stack>
            <Divider />
            <TextInput
              ref={refTitle}
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Task Title"
              size="lg"
              styles={theme => ({
                input: {
                  fontSize: 22,
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  "&:focus-within": {
                    borderColor: theme.colors.brand[6],
                  },
                },
              })}
            />

            <Textarea
              ref={refDescription}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Add description..."
              size="sm"
              autosize
              minRows={2}
              styles={theme => ({
                input: {
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  "&:focus-within": {
                    borderColor: theme.colors.brand[6],
                  },
                },
              })}
            />
            <SubTasks task={task} />
          </Stack>
        </Box>
        <Divider orientation="vertical" className={classes.propsSection} />
        <Stack miw={320} maw={400} className={classes.propsSection}>
          <CopyButton value={task?.id} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? "Copied" : "Copy task ID"} position="top">
                <ActionIcon onClick={copy}>
                  <Copy size={16} />
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
          <Divider />
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Status
            </Text>
            <StatusSelectorByTask task={task} type={"button"} />
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Priority
            </Text>
            <PrioritySelectorByTask task={task} type="button" />
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Lead
            </Text>
            <LeadSelectorByTask task={task} type="button" />
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Assignee
            </Text>
            <AssigneesSelectorByTask task={task} />
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Labels
            </Text>
            <LabelsSelectorBytask task={task} />
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Project
            </Text>
            <ProjectSelectorByTask task={task} />
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Due Date
            </Text>
            <DateInput
              size="xs"
              placeholder="Set due date"
              value={dueDate}
              onChange={handleDateChange}
              clearable
              styles={{
                input: {
                  padding: "0px 8px",
                  borderRadius: 4,
                  backgroundColor: "transparent",
                },
              }}
            />
          </Group>
        </Stack>
      </Group>
    </Stack>
  );
};

export default TaskDetailPageContent;
