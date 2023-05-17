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
} from "@mantine/core";
import { TaskStatus } from "integration/graphql";
import { useActions } from "lib/hooks/useActions";
import { TaskById } from "lib/types";
import {
  Circle,
  CircleCheck,
  CircleDot,
  CircleX,
  CircleDotted,
  ChartPie2,
} from "tabler-icons-react";
import { use, useState, useEffect } from "react";

import { priorityName } from "./priority";
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

type StatusCheckboxProps = {
  statusFilters: string[];
  setStatusFilters: (statusFilters: string[]) => void;
};

export const StatusCheckboxGroup = ({ statusFilters, setStatusFilters }: StatusCheckboxProps) => {
  const { classes, theme } = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [statusOptions, setStatusOptions] = useState<TaskStatus[]>([]);

  useEffect(() => {
    setStatusOptions(
      Object.values(TaskStatus).filter(item => item.includes(searchValue.toUpperCase()))
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
      <Checkbox.Group
        orientation="vertical"
        spacing={0}
        value={statusFilters}
        onChange={setStatusFilters}
      >
        {statusOptions.map(status => {
          return (
            <Checkbox
              key={status}
              size="xs"
              pb={10}
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
  task?: TaskById | undefined;
};

export const GenericStatusMenu = ({ children, onSelect, task }: GenericStatusMenuProps) => {
  const theme = useMantineTheme();
  const { fetchUpdateTask } = useActions();
  const [searchValue, setSearchValue] = useState("");
  const [statusOptions, setStatusOptions] = useState<TaskStatus[]>([]);

  useEffect(() => {
    setStatusOptions(
      Object.values(TaskStatus).filter(item => item.includes(searchValue.toUpperCase()))
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
