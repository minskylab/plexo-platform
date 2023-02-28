import {
  Button,
  Kbd,
  Menu,
  Text,
  TextInput,
  Tooltip,
  useMantineTheme,
  MantineTheme,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { TaskStatus } from "integration/graphql";
import { useActions } from "lib/useActions";
import {
  AntennaBars1,
  Circle,
  CircleCheck,
  CircleDot,
  CircleX,
  CircleDotted,
  ChartPie2,
  X,
  Check,
} from "tabler-icons-react";

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
    /* case "in-review":
      return <DotsCircleHorizontal size={size} color={theme.colors.green[6]} />; */
    case "DONE":
      return <CircleCheck size={size} color={theme.colors.indigo[6]} />;
    case "CANCELED":
      return <CircleX size={size} color={theme.colors.red[6]} />;
  }

  /* return <AntennaBars1 />; */
};

const statusLabel = (status?: TaskStatus) => {
  switch (status) {
    case "NONE":
      return "None";
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

export const statusName = (status: TaskStatus) => {
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

type GenericStatusMenuProps = {
  children: React.ReactNode;
  onSelect?: (priority: TaskStatus) => void;
  taskId?: string;
};

export const GenericStatusMenu = ({ children, onSelect, taskId }: GenericStatusMenuProps) => {
  const theme = useMantineTheme();
  const { fetchUpdateTask } = useActions();

  const onUpdateTaskStatus = async (status: TaskStatus) => {
    const res = await fetchUpdateTask({
      taskId: taskId,
      status: statusName(status),
    });

    if (res.data) {
      showNotification({
        autoClose: 5000,
        title: "Status updated",
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
  };

  return (
    <Menu shadow="md" width={180}>
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
          icon={<CircleDot size={18} color={theme.colors.gray[6]} />}
          onClick={() => {
            onSelect && onSelect(TaskStatus.None);
            taskId && onUpdateTaskStatus(TaskStatus.None);
          }}
        >
          None
        </Menu.Item>
        <Menu.Item
          icon={<CircleDotted size={18} color={theme.colors.gray[6]} />}
          onClick={() => {
            onSelect && onSelect(TaskStatus.Backlog);
            taskId && onUpdateTaskStatus(TaskStatus.Backlog);
          }}
        >
          Backlog
        </Menu.Item>
        <Menu.Item
          icon={<Circle size={18} />}
          onClick={() => {
            onSelect && onSelect(TaskStatus.ToDo);
            taskId && onUpdateTaskStatus(TaskStatus.ToDo);
          }}
        >
          Todo
        </Menu.Item>
        <Menu.Item
          icon={<ChartPie2 size={18} color={theme.colors.yellow[6]} />}
          onClick={() => {
            onSelect && onSelect(TaskStatus.InProgress);
            taskId && onUpdateTaskStatus(TaskStatus.InProgress);
          }}
        >
          In Progress
        </Menu.Item>
        {/*  <Menu.Item
          icon={
            <DotsCircleHorizontal
              size={18}
              color={theme.colors.green[6]}
              onClick={() => onSelect && onSelect("in-review")}
            />
          }
        >
          In Review
        </Menu.Item> */}
        <Menu.Item
          icon={<CircleCheck size={18} color={theme.colors.indigo[6]} />}
          onClick={() => {
            onSelect && onSelect(TaskStatus.Done);
            taskId && onUpdateTaskStatus(TaskStatus.Done);
          }}
        >
          Done
        </Menu.Item>
        <Menu.Item
          icon={<CircleX size={18} color={theme.colors.red[6]} />}
          onClick={() => {
            onSelect && onSelect(TaskStatus.Canceled);
            taskId && onUpdateTaskStatus(TaskStatus.Canceled);
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
