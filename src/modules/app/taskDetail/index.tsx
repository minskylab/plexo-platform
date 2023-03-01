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
  Paper,
  Avatar,
  Button,
  useMantineTheme,
  createStyles,
  MediaQuery,
} from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { AlertCircle, Check, Copy, Dots, LayoutSidebar, X } from "tabler-icons-react";
import { IconChevronLeft } from "@tabler/icons";
import Link from "next/link";
import { useState, useEffect } from "react";

import { GenericLabelMenu, LabelColor, LabelName } from "components/ui/Task/label";
import { GenericLeadTaskMenu, LeadTaskName } from "components/ui/Task/lead";
import { GenericPriorityMenu, PriorityIcon, priorityLabel } from "components/ui/Task/priority";
import { GenericProjectsMenu, ProjectIcon, ProjectName } from "components/ui/Task/project";
import { GenericStatusMenu, StatusIcon, statusLabel } from "components/ui/Task/status";
import { TaskMenu } from "components/ui/Task/menu";
import { useActions } from "lib/useActions";
import { TaskById } from "../datatypes";
import { usePlexoContext } from "context/PlexoContext";

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

const TaskDetailContent = ({ task, isLoading }: TaskDetailProps) => {
  const { classes, theme } = useStyles();
  const { setNavBarOpened } = usePlexoContext();
  const { fetchUpdateTask } = useActions();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onUpdateTaskTitle = async (title: string) => {
    if (title == task?.title) {
      //No hay cambios
      return;
    } else {
      if (!title.length) {
        showNotification({
          id: "titleUpdateFailed",
          autoClose: 5000,
          title: "Update Failed",
          message: "Please enter a title before submitting",
          color: "yellow",
          icon: <AlertCircle size={18} />,
        });
        task?.title && setTitle(task.title);
      } else {
        const res = await fetchUpdateTask({
          taskId: task?.id,
          title: title,
        });

        if (res.data) {
          showNotification({
            autoClose: 5000,
            title: "Title updated",
            message: res.data.updateTask.title,
            color: "blue",
            icon: <Check size={18} />,
          });
        }
        if (res.error) {
          showNotification({
            autoClose: 5000,
            title: "Error!",
            message: "Try again",
            color: "red",
            icon: <X size={18} />,
          });
        }
      }
    }
  };

  const onUpdateTaskDescription = async (description: string) => {
    const desc = description == "" ? null : description;
    const taskDesc = task?.description == "" ? null : task?.description; //no seria necesario si se pudiera guardar nulos en la BD

    if (desc == taskDesc) {
      //No hay cambios
      return;
    } else {
      const res = await fetchUpdateTask({
        taskId: task?.id,
        description: description,
      });

      if (res.data) {
        showNotification({
          autoClose: 5000,
          title: "Description updated",
          message: res.data.updateTask.title,
          color: "blue",
          icon: <Check size={18} />,
        });
      }
      if (res.error) {
        showNotification({
          autoClose: 5000,
          title: "Error!",
          message: "Try again",
          color: "red",
          icon: <X size={18} />,
        });
      }
    }
  };

  const refTitle = useClickOutside(() => onUpdateTaskTitle(title));
  const refDescription = useClickOutside(() => onUpdateTaskDescription(description));

  useEffect(() => {
    if (task?.title) {
      setTitle(task?.title);
    }
  }, [task?.title]);

  useEffect(() => {
    if (task?.description) {
      setDescription(task?.description);
    }
  }, [task?.description]);

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
            <IconChevronLeft size={20} />
          </ActionIcon>
        </Link>
      </Group>
      <Group px={20} sx={{ alignItems: "baseline" }}>
        <Box sx={{ flex: 1 }}>
          <Stack maw={860} m="auto">
            <Stack spacing={10}>
              <Group position="apart">
                <Text lineClamp={1} size={"sm"} color={"dimmed"}>
                  MIN-169
                </Text>
                <TaskMenu task={task}>
                  <ActionIcon radius={"sm"} size={"xs"}>
                    <Dots size={18} />
                  </ActionIcon>
                </TaskMenu>
              </Group>
              <Group spacing={5} className={classes.propsBar}>
                <GenericStatusMenu taskId={task?.id}>
                  <Button
                    compact
                    variant="light"
                    color={"gray"}
                    leftIcon={StatusIcon(theme, task?.status)}
                  >
                    <Text size={"xs"}>{statusLabel(task?.status)}</Text>
                  </Button>
                </GenericStatusMenu>
                <GenericPriorityMenu taskId={task?.id}>
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
                    <Text size={"xs"}>{LeadTaskName(task?.leader?.name)}</Text>
                  </Button>
                </GenericLeadTaskMenu>
                {/* <GenericLabelMenu task={task}>
                  <Button
                    compact
                    variant="light"
                    color={"gray"}
                    leftIcon={LabelColor(task?.labels, theme)}
                  >
                    <Text size={"xs"}>{LabelName(task?.labels)}</Text>
                  </Button>
                </GenericLabelMenu> */}
                <GenericProjectsMenu taskId={task?.id}>
                  <Button compact variant="light" color={"gray"} leftIcon={ProjectIcon()}>
                    <Text size={"xs"}>{ProjectName(task?.project?.name)}</Text>
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
                    borderColor: theme.colors.orange[7],
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
                    borderColor: theme.colors.orange[7],
                  },
                },
              })}
            />
            <Divider />
            <Paper shadow="xs" p="md">
              <Text fw={500} c="dimmed">
                Suggestion:
              </Text>
              <Text c="dimmed">
                Use it to create cards, dropdowns, modals and other components that require
                background with shadow
              </Text>
            </Paper>
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
            <GenericStatusMenu taskId={task?.id}>
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
            <GenericPriorityMenu taskId={task?.id}>
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
                <Text size={"xs"}>{LeadTaskName(task?.leader?.name)}</Text>
              </Button>
            </GenericLeadTaskMenu>
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Assignee
            </Text>
            {/* <GenericStatusMenu taskId={task?.id}>
              <ActionIcon variant="transparent" radius={"sm"}>
                {StatusIcon(theme, task?.status)}
              </ActionIcon>
            </GenericStatusMenu> */}
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Labels
            </Text>
            <GenericLabelMenu task={task}>
              <Button
                compact
                variant="light"
                color={"gray"}
                leftIcon={LabelColor(task?.labels, theme)}
              >
                <Text size={"xs"}>{LabelName(task?.labels)}</Text>
              </Button>
            </GenericLabelMenu>
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Project
            </Text>
            <GenericProjectsMenu taskId={task?.id}>
              <Button compact variant="light" color={"gray"} leftIcon={ProjectIcon()}>
                <Text size={"xs"}>{ProjectName(task?.project?.name)}</Text>
              </Button>
            </GenericProjectsMenu>
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Due Date
            </Text>
            {/* <GenericStatusMenu taskId={task?.id}>
              <ActionIcon variant="transparent" radius={"sm"}>
                {StatusIcon(theme, task?.status)}
              </ActionIcon>
            </GenericStatusMenu> */}
          </Group>
        </Stack>
      </Group>
    </Stack>
  );
};

export default TaskDetailContent;
