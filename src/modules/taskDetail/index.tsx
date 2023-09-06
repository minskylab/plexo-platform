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
  Avatar,
  Button,
  createStyles,
  MediaQuery,
} from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { DateInput } from "@mantine/dates";
import { useState, useEffect } from "react";
import { Copy, Dots, LayoutSidebar, Users, ChevronLeft } from "tabler-icons-react";
import Link from "next/link";

import { GenericLeadTaskMenu } from "components/ui/Task/lead";
import {
  GenericPriorityMenu,
  PriorityIcon,
  priorityLabel,
  priorityName,
} from "components/ui/Task/priority";
import { GenericProjectsMenu, ProjectIcon, ProjectName } from "components/ui/Task/project";
import { GenericStatusMenu, StatusIcon, statusLabel, statusName } from "components/ui/Task/status";
import { GenericLabelsMenu, LabelColor, LabelNameBtn } from "components/ui/Task/labels";
import { assigneesId, GenericAssigneesMenu } from "components/ui/Task/assignees";
import { LeadName } from "components/ui/Project/lead";
import { TaskMenu } from "components/ui/Task/menu";
import { Task, TaskById } from "lib/types";
import { useActions } from "lib/hooks/useActions";
import { usePlexoContext } from "context/PlexoContext";
import { AlertNotification, ErrorNotification, SuccessNotification } from "lib/notifications";
import { TaskListElement } from "components/ui/Task/task";

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
  if (!task || !task?.subtasks.length) {
    return <></>;
  }
  return (
    <>
      <Divider />
      <Text lineClamp={1} size={"sm"} color={"dimmed"}>
        Subtasks
      </Text>
      <Stack spacing={2}>
        {task?.subtasks.map((t: Task) => (
          <TaskListElement key={t.id} task={t} />
        ))}
      </Stack>
    </>
  );
};

const validateDate = (date: string) => {
  const taskDate = new Date(date);
  return taskDate.getTime() === 0 ? null : taskDate;
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

  const onUpdateTaskDescription = async (description: string) => {
    const res = await fetchUpdateTask({
      taskId: task?.id,
      description: description,
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
                <GenericStatusMenu task={task}>
                  <Button
                    compact
                    variant="light"
                    color={"gray"}
                    leftIcon={StatusIcon(theme, task?.status)}
                  >
                    <Text size={"xs"}>{statusLabel(task?.status)}</Text>
                  </Button>
                </GenericStatusMenu>
                <GenericPriorityMenu task={task}>
                  <Button
                    compact
                    variant="light"
                    color={"gray"}
                    leftIcon={PriorityIcon(task?.priority, 18)}
                  >
                    <Text size={"xs"}>{priorityLabel(task?.priority)}</Text>
                  </Button>
                </GenericPriorityMenu>
                <GenericLeadTaskMenu task={task}>
                  <Button
                    compact
                    variant="light"
                    color={"gray"}
                    leftIcon={<Avatar size="sm" radius="xl"></Avatar>}
                  >
                    <Text size={"xs"}>{LeadName(task?.leader)}</Text>
                  </Button>
                </GenericLeadTaskMenu>
                <GenericAssigneesMenu task={task}>
                  <Button compact variant="light" color={"gray"} leftIcon={<Users size={16} />}>
                    {task?.assignees.length ? (
                      <Text size={"xs"}>{task?.assignees.length} Assignees</Text>
                    ) : (
                      <Text size={"xs"}>Assignees</Text>
                    )}
                  </Button>
                </GenericAssigneesMenu>
                <GenericLabelsMenu task={task}>
                  <Button
                    compact
                    variant="light"
                    color={"gray"}
                    leftIcon={LabelColor(task ? task?.labels.map(l => l.id as string) : [])}
                  >
                    <Text size={"xs"}>
                      {LabelNameBtn(task ? task?.labels.map(l => l.id as string) : [])}
                    </Text>
                  </Button>
                </GenericLabelsMenu>
                <GenericProjectsMenu task={task}>
                  <Button compact variant="light" color={"gray"} leftIcon={ProjectIcon()}>
                    <Text size={"xs"}>{ProjectName(task?.project)}</Text>
                  </Button>
                </GenericProjectsMenu>
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
            <GenericStatusMenu task={task}>
              <Button
                compact
                variant="light"
                color={"gray"}
                leftIcon={StatusIcon(theme, task?.status)}
              >
                <Text size={"xs"}>{statusLabel(task?.status)}</Text>
              </Button>
            </GenericStatusMenu>
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Priority
            </Text>
            <GenericPriorityMenu task={task}>
              <Button
                compact
                variant="light"
                color={"gray"}
                leftIcon={PriorityIcon(task?.priority, 18)}
              >
                <Text size={"xs"}>{priorityLabel(task?.priority)}</Text>
              </Button>
            </GenericPriorityMenu>
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Lead
            </Text>
            <GenericLeadTaskMenu task={task}>
              <Button
                compact
                variant="light"
                color={"gray"}
                leftIcon={<Avatar size="sm" radius="xl"></Avatar>}
              >
                <Text size={"xs"}>{LeadName(task?.leader)}</Text>
              </Button>
            </GenericLeadTaskMenu>
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Assignee
            </Text>
            <GenericAssigneesMenu task={task}>
              <Button compact variant="light" color={"gray"} leftIcon={<Users size={16} />}>
                {task?.assignees.length ? (
                  <Text size={"xs"}>{task?.assignees.length} Assignees</Text>
                ) : (
                  <Text size={"xs"}>Assignees</Text>
                )}
              </Button>
            </GenericAssigneesMenu>
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Labels
            </Text>
            <GenericLabelsMenu task={task}>
              <Button
                compact
                variant="light"
                color={"gray"}
                leftIcon={LabelColor(task ? task?.labels.map(l => l.id as string) : [])}
              >
                <Text size={"xs"}>
                  {LabelNameBtn(task ? task?.labels.map(l => l.id as string) : [])}
                </Text>
              </Button>
            </GenericLabelsMenu>
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Project
            </Text>
            <GenericProjectsMenu task={task}>
              <Button compact variant="light" color={"gray"} leftIcon={ProjectIcon()}>
                <Text size={"xs"}>{ProjectName(task?.project)}</Text>
              </Button>
            </GenericProjectsMenu>
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
