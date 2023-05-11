import {
  Button,
  Checkbox,
  createStyles,
  Divider,
  Group,
  Kbd,
  Menu,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  AntennaBars1,
  AntennaBars2,
  AntennaBars3,
  AntennaBars4,
  AntennaBars5,
} from "tabler-icons-react";

import { TaskPriority } from "integration/graphql";
import { useActions } from "lib/hooks/useActions";
import { TaskById } from "lib/types";
import { statusName } from "./status";
import { assigneesId } from "components/ui/Task/assignees";
import { ErrorNotification, SuccessNotification } from "lib/notifications";

const useStyles = createStyles(theme => ({
  checkbox: {
    width: "100%",
  },
}));

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

type PriorityCheckboxProps = {
  priorityFilters: string[];
  setPriorityFilters: (priorityFilters: string[]) => void;
};

export const PriorityCheckboxGroup = ({
  priorityFilters,
  setPriorityFilters,
}: PriorityCheckboxProps) => {
  const { classes } = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [statusOptions, setStatusOptions] = useState<TaskPriority[]>([]);

  useEffect(() => {
    setStatusOptions(
      Object.values(TaskPriority).filter(item => item.includes(searchValue.toUpperCase()))
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
        value={priorityFilters}
        onChange={setPriorityFilters}
      >
        {statusOptions.map(priority => {
          return (
            <Checkbox
              key={priority}
              size="xs"
              pb={10}
              value={priority}
              label={
                <Group spacing={5}>
                  {PriorityIcon(priority)}
                  {priorityLabel(priority)}
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

type GenericPriorityMenuProps = {
  children: React.ReactNode;
  onSelect?: (priority: TaskPriority) => void;
  task?: TaskById | undefined;
};

export const GenericPriorityMenu = ({ children, onSelect, task }: GenericPriorityMenuProps) => {
  const { fetchUpdateTask } = useActions();
  const [searchValue, setSearchValue] = useState("");
  const [statusOptions, setStatusOptions] = useState<TaskPriority[]>([]);

  useEffect(() => {
    setStatusOptions(
      Object.values(TaskPriority).filter(item => item.includes(searchValue.toUpperCase()))
    );
  }, [searchValue]);

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
          value={searchValue}
          onChange={event => setSearchValue(event.currentTarget.value)}
          placeholder="Change Priority..."
          variant="filled"
          rightSection={<Kbd px={8}>P</Kbd>}
        ></TextInput>
        <Menu.Divider />
        {statusOptions.map(priority => {
          return (
            <Menu.Item
              key={priority}
              icon={PriorityIcon(priority)}
              onClick={() => {
                onSelect && onSelect(priority);
                task && onUpdateTaskPriority(priority);
              }}
            >
              {priorityLabel(priority)}
            </Menu.Item>
          );
        })}
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
