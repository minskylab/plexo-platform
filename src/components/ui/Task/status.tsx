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
  Divider,
  ActionIcon,
} from "@mantine/core";
import { TaskStatus } from "integration/graphql";
import {
  Circle,
  CircleCheck,
  CircleDot,
  CircleX,
  CircleDotted,
  ChartPie2,
} from "tabler-icons-react";
import { useState, useEffect } from "react";

import { Task, TaskById } from "lib/types";
import { priorityName } from "./priority";
import { useActions } from "lib/hooks/useActions";
import { assigneesId } from "components/ui/Task/assignees";
import { ErrorNotification, SuccessNotification } from "lib/notifications";

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
      return <Circle size={size} color={theme.colors.gray[6]} />;
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
      return "None";
    case "BACKLOG":
      return "Backlog";
    case "TO_DO":
      return "Todo";
    case "IN_PROGRESS":
      return "In Progress";
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

const statusOrder = (a: TaskStatus, b: TaskStatus) => {
  const order = [
    TaskStatus.None,
    TaskStatus.Backlog,
    TaskStatus.ToDo,
    TaskStatus.InProgress,
    TaskStatus.Done,
    TaskStatus.Canceled,
  ];

  const indexA = order.indexOf(a);
  const indexB = order.indexOf(b);

  return indexA - indexB;
};

type StatusCheckboxProps = {
  statusFilters: string[];
  setStatusFilters: (statusFilters: string[]) => void;
};

export const StatusCheckboxGroup = ({ statusFilters, setStatusFilters }: StatusCheckboxProps) => {
  const { classes, theme } = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [statusOptions, setStatusOptions] = useState<TaskStatus[]>([]);

  useEffect(() => {
    const statusValues = Object.values(TaskStatus);
    setStatusOptions(
      statusValues.sort(statusOrder).filter(item => item.includes(searchValue.toUpperCase()))
    );
  }, [searchValue]);

  return (
    <>
      <TextInput
        placeholder="Status"
        variant="unstyled"
        value={searchValue}
        onChange={event => setSearchValue(event.currentTarget.value)}
      />
      <Divider />
      <Checkbox.Group mt={10} value={statusFilters} onChange={setStatusFilters}>
        {statusOptions.map(status => {
          return (
            <Checkbox
              key={status}
              size="xs"
              pb={15}
              value={status}
              label={
                <Group spacing={5}>
                  {StatusIcon(theme, status)}
                  {statusLabel(status)}
                </Group>
              }
              classNames={{
                body: classes.checkbox,
                labelWrapper: classes.checkbox,
              }}
            />
          );
        })}
      </Checkbox.Group>
    </>
  );
};

type GenericStatusMenuProps = {
  children: React.ReactNode;
  onSelect?: (priority: TaskStatus) => void;
  task?: TaskById | Task | undefined;
};

export const GenericStatusMenu = ({ children, onSelect, task }: GenericStatusMenuProps) => {
  const theme = useMantineTheme();
  const { fetchUpdateTask } = useActions();
  const [searchValue, setSearchValue] = useState("");
  const [statusOptions, setStatusOptions] = useState<TaskStatus[]>([]);

  useEffect(() => {
    const statusValues = Object.values(TaskStatus);
    setStatusOptions(
      statusValues.sort(statusOrder).filter(item => item.includes(searchValue.toUpperCase()))
    );
  }, [searchValue]);

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
    <Menu shadow="md" width={180} position="bottom-start" withinPortal>
      <Menu.Target>
        <Tooltip label="Change status" position="bottom">
          {children}
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown>
        <TextInput
          placeholder="Change Status..."
          variant="filled"
          value={searchValue}
          onChange={event => setSearchValue(event.currentTarget.value)}
          rightSection={<Kbd px={8}>S</Kbd>}
        />
        <Menu.Divider />
        {statusOptions.map(status => {
          return (
            <Menu.Item
              key={status}
              icon={StatusIcon(theme, status)}
              onClick={() => {
                onSelect && onSelect(status);
                task && onUpdateTaskStatus(status);
              }}
            >
              {statusLabel(status)}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
};

type StatusSelectorProps = {
  status: TaskStatus;
  setStatus: (status: TaskStatus) => void;
  type: "icon" | "button";
};

export const StatusSelector = ({ status, setStatus, type }: StatusSelectorProps) => {
  const theme = useMantineTheme();

  return (
    <GenericStatusMenu onSelect={s => setStatus(s)}>
      {type == "icon" ? (
        <ActionIcon variant="transparent" radius={"sm"}>
          {StatusIcon(theme, status)}
        </ActionIcon>
      ) : (
        <Button compact variant="light" color={"gray"} leftIcon={StatusIcon(theme, status, 18)}>
          <Text size={"xs"}>{statusLabel(status)}</Text>
        </Button>
      )}
    </GenericStatusMenu>
  );
};

type StatusSelectorByTaskProps = {
  task: TaskById | Task | undefined;
  type: "icon" | "button";
  iconVariant?: "light";
};

export const StatusSelectorByTask = ({ task, type, iconVariant }: StatusSelectorByTaskProps) => {
  const theme = useMantineTheme();

  return (
    <GenericStatusMenu task={task}>
      {type == "icon" ? (
        <ActionIcon variant={iconVariant ? iconVariant : "transparent"} radius={"sm"}>
          {StatusIcon(theme, task?.status)}
        </ActionIcon>
      ) : (
        <Button compact variant="light" color={"gray"} leftIcon={StatusIcon(theme, task?.status)}>
          <Text size={"xs"}>{statusLabel(task?.status)}</Text>
        </Button>
      )}
    </GenericStatusMenu>
  );
};


// export const ChangeTaskStatus = (status: TaskStatus, taskId: String, fetchUpdateTask: any) => {
//   const onUpdateTaskStatus = async (status: TaskStatus) => {
//     const res = await fetchUpdateTask({
//       taskId: taskId,
//       status: statusName(status),
//     });

//     if (res.data) {
//       SuccessNotification("Status updated", res.data.updateTask.title);
//     }
//     if (res.error) {
//       ErrorNotification();
//     }
//   };
//   onUpdateTaskStatus(status);
//   return <></>;
// };

