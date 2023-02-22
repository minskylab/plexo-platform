import { Button, Kbd, Menu, Text, TextInput, Tooltip } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { TaskPriority } from "integration/graphql";
import { useTaskActions } from "lib/useTaskActions";
import {
  AntennaBars1,
  AntennaBars2,
  AntennaBars3,
  AntennaBars4,
  AntennaBars5,
  Check,
  X,
} from "tabler-icons-react";

export const PriorityIcon = (
  priority: TaskPriority | undefined,
  size?: string | number | undefined
) => {
  switch (priority) {
    case "NONE":
      return <AntennaBars1 size={size} />;
    case "LOW":
      return <AntennaBars2 size={size} />;
    case "MEDIUM":
      return <AntennaBars3 size={size} />;
    case "HIGH":
      return <AntennaBars4 size={size} />;
    case "URGENT":
      return <AntennaBars5 size={size} />;
  }
};

export const priorityLabel = (priority: TaskPriority | undefined) => {
  switch (priority) {
    case "NONE":
      return "No Priority";
    case "LOW":
      return "Low";
    case "MEDIUM":
      return "Medium";
    case "HIGH":
      return "High";
    case "URGENT":
      return "Urgent";
  }
};

export const priorityName = (priority: TaskPriority) => {
  switch (priority) {
    case "NONE":
      return "None";
    case "LOW":
      return "Low";
    case "MEDIUM":
      return "Medium";
    case "HIGH":
      return "High";
    case "URGENT":
      return "Urgent";
  }
};

type GenericPriorityMenuProps = {
  children: React.ReactNode;
  onSelect?: (priority: TaskPriority) => void;
  taskId?: string;
};

export const GenericPriorityMenu = ({ children, onSelect, taskId }: GenericPriorityMenuProps) => {
  const { fetchUpdateTask } = useTaskActions();

  const onUpdateTaskPriority = async (priority: TaskPriority) => {
    const res = await fetchUpdateTask({
      taskId: taskId,
      priority: priorityName(priority),
    });

    if (res.data) {
      showNotification({
        autoClose: 5000,
        title: "Priority updated",
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
        <Tooltip label="Set priority" position="bottom">
          {children}
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown>
        <TextInput
          placeholder="Change Priority..."
          variant="filled"
          rightSection={<Kbd px={8}>P</Kbd>}
        ></TextInput>
        <Menu.Divider />
        <Menu.Item
          icon={<AntennaBars1 size={18} />}
          onClick={() => {
            onSelect && onSelect(TaskPriority.None);
            taskId && onUpdateTaskPriority(TaskPriority.None);
          }}
        >
          No Priority
        </Menu.Item>
        <Menu.Item
          icon={<AntennaBars2 size={18} />}
          onClick={() => {
            onSelect && onSelect(TaskPriority.Low);
            taskId && onUpdateTaskPriority(TaskPriority.Low);
          }}
        >
          Low
        </Menu.Item>
        <Menu.Item
          icon={<AntennaBars3 size={18} />}
          onClick={() => {
            onSelect && onSelect(TaskPriority.Medium);
            taskId && onUpdateTaskPriority(TaskPriority.Medium);
          }}
        >
          Medium
        </Menu.Item>
        <Menu.Item
          icon={<AntennaBars4 size={18} />}
          onClick={() => {
            onSelect && onSelect(TaskPriority.High);
            taskId && onUpdateTaskPriority(TaskPriority.High);
          }}
        >
          High
        </Menu.Item>
        <Menu.Item
          icon={<AntennaBars5 size={18} />}
          onClick={() => {
            onSelect && onSelect(TaskPriority.Urgent);
            taskId && onUpdateTaskPriority(TaskPriority.Urgent);
          }}
        >
          Urgent
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

type PrioritySelectorProps = {
  priority: TaskPriority;
  setPriority: (priority: TaskPriority) => void;
};

export const PrioritySelector = ({ priority, setPriority }: PrioritySelectorProps) => {
  return (
    <GenericPriorityMenu onSelect={priority => setPriority(priority)}>
      {priority == TaskPriority.None ? (
        <Button compact variant="light" color={"gray"}>
          {PriorityIcon(priority, 18)}
        </Button>
      ) : (
        <Button compact variant="light" color={"gray"} leftIcon={PriorityIcon(priority, 18)}>
          <Text size={"xs"}>{priorityLabel(priority)}</Text>
        </Button>
      )}
    </GenericPriorityMenu>
  );
};
