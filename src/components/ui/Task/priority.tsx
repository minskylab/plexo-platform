import { Button, Kbd, Menu, Text, TextInput, Tooltip } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { TaskPriority } from "integration/graphql";
import { useActions } from "lib/useActions";
import { TaskById } from "modules/app/datatypes";
import {
  AntennaBars1,
  AntennaBars2,
  AntennaBars3,
  AntennaBars4,
  AntennaBars5,
  Check,
  X,
} from "tabler-icons-react";
import { statusName } from "./status";
import { assigneesId } from "components/ui/Task/assignees";
import { ErrorNotification, SuccessNotification } from "lib/notifications";

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
      return "Priority";
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

export const priorityName = (priority: TaskPriority | undefined) => {
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
  task?: TaskById | undefined;
};

export const GenericPriorityMenu = ({ children, onSelect, task }: GenericPriorityMenuProps) => {
  const { fetchUpdateTask } = useActions();

  const onUpdateTaskPriority = async (priority: TaskPriority) => {
    const res = await fetchUpdateTask({
      taskId: task?.id,
      priority: priorityName(priority),
      status: statusName(task?.status),
      title: task?.title,
      description: task?.description,
      dueDate: task?.dueDate,
      projectId: task?.project?.id,
      leadId: task?.leader?.id,
      labels: task?.labels,
      assignees: assigneesId(task),
    });

    if (res.data) {
      SuccessNotification("Priority updated", res.data.updateTask.title);
    }
    if (res.error) {
      ErrorNotification();
    }
  };
  return (
    <Menu shadow="md" width={180} position="bottom-start">
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
            task && onUpdateTaskPriority(TaskPriority.None);
          }}
        >
          No Priority
        </Menu.Item>
        <Menu.Item
          icon={<AntennaBars2 size={18} />}
          onClick={() => {
            onSelect && onSelect(TaskPriority.Low);
            task && onUpdateTaskPriority(TaskPriority.Low);
          }}
        >
          Low
        </Menu.Item>
        <Menu.Item
          icon={<AntennaBars3 size={18} />}
          onClick={() => {
            onSelect && onSelect(TaskPriority.Medium);
            task && onUpdateTaskPriority(TaskPriority.Medium);
          }}
        >
          Medium
        </Menu.Item>
        <Menu.Item
          icon={<AntennaBars4 size={18} />}
          onClick={() => {
            onSelect && onSelect(TaskPriority.High);
            task && onUpdateTaskPriority(TaskPriority.High);
          }}
        >
          High
        </Menu.Item>
        <Menu.Item
          icon={<AntennaBars5 size={18} />}
          onClick={() => {
            onSelect && onSelect(TaskPriority.Urgent);
            task && onUpdateTaskPriority(TaskPriority.Urgent);
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
      <Button compact variant="light" color={"gray"} leftIcon={PriorityIcon(priority, 18)}>
        <Text size={"xs"}>{priorityLabel(priority)}</Text>
      </Button>
    </GenericPriorityMenu>
  );
};
