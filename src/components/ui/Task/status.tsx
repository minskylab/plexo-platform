import {
  Button,
  Kbd,
  Menu,
  Text,
  TextInput,
  Tooltip,
  useMantineTheme,
  MantineTheme,
  Checkbox,
  createStyles,
  Group,
} from "@mantine/core";
import { TaskStatus } from "integration/graphql";
import { useActions } from "lib/useActions";
import { TaskById } from "modules/app/datatypes";
import {
  Circle,
  CircleCheck,
  CircleDot,
  CircleX,
  CircleDotted,
  ChartPie2,
} from "tabler-icons-react";

import { priorityName } from "./priority";
import { assigneesId } from "components/ui/Task/assignees";
import { ErrorNotification, SuccessNotification } from "lib/notifications";
import { usePlexoContext } from "context/PlexoContext";

const useStyles = createStyles(theme => ({
  checkbox: {
    width: "100%",
  },
}));

export const StatusIcon = (
  theme: MantineTheme,
  status?: TaskStatus,
  size: string | number | undefined = 18
) => {
  switch (status) {
    case "NONE":
      return <CircleDot size={size} color={theme.colors.gray[6]} />;
    case "BACKLOG":
      return <CircleDotted size={size} color={theme.colors.gray[6]} />;
    case "TO_DO":
      return <Circle size={size} />;
    case "IN_PROGRESS":
      return <ChartPie2 size={size} color={theme.colors.yellow[6]} />;
    case "DONE":
      return <CircleCheck size={size} color={theme.colors.indigo[6]} />;
    case "CANCELED":
      return <CircleX size={size} color={theme.colors.red[6]} />;
    default:
      return <></>;
  }
};

export const statusLabel = (status?: TaskStatus) => {
  switch (status) {
    case "NONE":
      return "Status";
    case "BACKLOG":
      return "Backlog";
    case "TO_DO":
      return "Todo";
    case "IN_PROGRESS":
      return "In Progress";
    /* case "in-review":
      return "In Review"; */
    case "DONE":
      return "Done";
    case "CANCELED":
      return "Canceled";
  }

  return "No Status";
};

export const statusName = (status: TaskStatus | undefined) => {
  switch (status) {
    case "NONE":
      return "None";
    case "BACKLOG":
      return "Backlog";
    case "TO_DO":
      return "ToDo";
    case "IN_PROGRESS":
      return "InProgress";
    /* case "in-review":
      return "In Review"; */
    case "DONE":
      return "Done";
    case "CANCELED":
      return "Canceled";
  }
};

type StatusCheckboxProps = {
  statusFilters: string[];
  setStatusFilters: (statusFilters: string[]) => void;
};

export const StatusCheckboxGroup = ({ statusFilters, setStatusFilters }: StatusCheckboxProps) => {
  const { classes, theme } = useStyles();

  return (
    <Checkbox.Group
      orientation="vertical"
      spacing={0}
      value={statusFilters}
      onChange={setStatusFilters}
    >
      <Checkbox
        size="xs"
        pb={10}
        value={TaskStatus.None}
        label={
          <Group spacing={5}>
            {StatusIcon(theme, TaskStatus.None)}
            None
          </Group>
        }
        classNames={{
          body: classes.checkbox,
          labelWrapper: classes.checkbox,
        }}
      />
      <Checkbox
        size="xs"
        pb={10}
        value={TaskStatus.Backlog}
        label={
          <Group spacing={5}>
            {StatusIcon(theme, TaskStatus.Backlog)}
            {statusLabel(TaskStatus.Backlog)}
          </Group>
        }
        classNames={{
          body: classes.checkbox,
          labelWrapper: classes.checkbox,
        }}
      />
      <Checkbox
        size="xs"
        pb={10}
        value={TaskStatus.ToDo}
        label={
          <Group spacing={5}>
            {StatusIcon(theme, TaskStatus.ToDo)}
            {statusLabel(TaskStatus.ToDo)}
          </Group>
        }
        classNames={{
          body: classes.checkbox,
          labelWrapper: classes.checkbox,
        }}
      />
      <Checkbox
        size="xs"
        pb={10}
        value={TaskStatus.InProgress}
        label={
          <Group spacing={5}>
            {StatusIcon(theme, TaskStatus.InProgress)}
            {statusLabel(TaskStatus.InProgress)}
          </Group>
        }
        classNames={{
          body: classes.checkbox,
          labelWrapper: classes.checkbox,
        }}
      />
      <Checkbox
        size="xs"
        pb={10}
        value={TaskStatus.Done}
        label={
          <Group spacing={5}>
            {StatusIcon(theme, TaskStatus.Done)}
            {statusLabel(TaskStatus.Done)}
          </Group>
        }
        classNames={{
          body: classes.checkbox,
          labelWrapper: classes.checkbox,
        }}
      />
      <Checkbox
        size="xs"
        pb={10}
        value={TaskStatus.Canceled}
        label={
          <Group spacing={5}>
            {StatusIcon(theme, TaskStatus.Canceled)}
            {statusLabel(TaskStatus.Canceled)}
          </Group>
        }
        classNames={{
          body: classes.checkbox,
          labelWrapper: classes.checkbox,
        }}
      />
    </Checkbox.Group>
  );
};

type GenericStatusMenuProps = {
  children: React.ReactNode;
  onSelect?: (priority: TaskStatus) => void;
  task?: TaskById | undefined;
};

export const GenericStatusMenu = ({ children, onSelect, task }: GenericStatusMenuProps) => {
  const theme = useMantineTheme();
  const { fetchUpdateTask } = useActions();

  const onUpdateTaskStatus = async (status: TaskStatus) => {
    const res = await fetchUpdateTask({
      taskId: task?.id,
      status: statusName(status),
      title: task?.title,
      description: task?.description,
      priority: priorityName(task?.priority),
      dueDate: task?.dueDate,
      projectId: task?.project?.id,
      leadId: task?.leader?.id,
      labels: task?.labels,
      assignees: assigneesId(task),
    });

    if (res.data) {
      SuccessNotification("Status updated", res.data.updateTask.title);
    }
    if (res.error) {
      ErrorNotification();
    }
  };

  return (
    <Menu shadow="md" width={180} position="bottom-start">
      <Menu.Target>
        <Tooltip label="Change status" position="bottom">
          {children}
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown>
        <TextInput
          placeholder="Change Status..."
          variant="filled"
          rightSection={<Kbd px={8}>S</Kbd>}
        />
        <Menu.Divider />
        <Menu.Item
          icon={StatusIcon(theme, TaskStatus.None)}
          onClick={() => {
            onSelect && onSelect(TaskStatus.None);
            task && onUpdateTaskStatus(TaskStatus.None);
          }}
        >
          None
        </Menu.Item>
        <Menu.Item
          icon={StatusIcon(theme, TaskStatus.Backlog)}
          onClick={() => {
            onSelect && onSelect(TaskStatus.Backlog);
            task && onUpdateTaskStatus(TaskStatus.Backlog);
          }}
        >
          Backlog
        </Menu.Item>
        <Menu.Item
          icon={StatusIcon(theme, TaskStatus.ToDo)}
          onClick={() => {
            onSelect && onSelect(TaskStatus.ToDo);
            task && onUpdateTaskStatus(TaskStatus.ToDo);
          }}
        >
          Todo
        </Menu.Item>
        <Menu.Item
          icon={StatusIcon(theme, TaskStatus.InProgress)}
          onClick={() => {
            onSelect && onSelect(TaskStatus.InProgress);
            task && onUpdateTaskStatus(TaskStatus.InProgress);
          }}
        >
          In Progress
        </Menu.Item>
        <Menu.Item
          icon={StatusIcon(theme, TaskStatus.Done)}
          onClick={() => {
            onSelect && onSelect(TaskStatus.Done);
            task && onUpdateTaskStatus(TaskStatus.Done);
          }}
        >
          Done
        </Menu.Item>
        <Menu.Item
          icon={StatusIcon(theme, TaskStatus.Canceled)}
          onClick={() => {
            onSelect && onSelect(TaskStatus.Canceled);
            task && onUpdateTaskStatus(TaskStatus.Canceled);
          }}
        >
          Canceled
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

type StatusSelectorProps = {
  status: TaskStatus;
  setStatus: (status: TaskStatus) => void;
};

export const StatusSelector = ({ status, setStatus }: StatusSelectorProps) => {
  const theme = useMantineTheme();

  return (
    <GenericStatusMenu onSelect={priority => setStatus(priority)}>
      <Button compact variant="light" color={"gray"} leftIcon={StatusIcon(theme, status, 18)}>
        <Text size={"xs"}>{statusLabel(status)}</Text>
      </Button>
    </GenericStatusMenu>
  );
};
