import { Button, Kbd, Menu, Text, TextInput } from "@mantine/core";
import { TaskPriority } from "integration/graphql";
/* import { TaskPriority } from "modules/app/datatypes"; */
import { useState } from "react";
import {
  AntennaBars1,
  AntennaBars2,
  AntennaBars3,
  AntennaBars4,
  AntennaBars5,
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

  return <AntennaBars1 size={size} />;
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

  return "No Priority";
};

type GenericPriorityMenuProps = {
  children: React.ReactNode;
  onSelect?: (priority: TaskPriority | undefined) => void;
};

export const GenericPriorityMenu = ({ children, onSelect }: GenericPriorityMenuProps) => {
  return (
    <Menu shadow="md" width={180}>
      <Menu.Target>
        {/* <ActionIcon variant="light" radius={"sm"}>
                {PriorityIcon(task.priority)}
              </ActionIcon> */}
        {children}
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
          onClick={() => onSelect && onSelect(TaskPriority.None)}
        >
          No Priority
        </Menu.Item>
        <Menu.Item
          icon={<AntennaBars2 size={18} />}
          onClick={() => onSelect && onSelect(TaskPriority.Low)}
        >
          Low
        </Menu.Item>
        <Menu.Item
          icon={<AntennaBars3 size={18} />}
          onClick={() => onSelect && onSelect(TaskPriority.Medium)}
        >
          Medium
        </Menu.Item>
        <Menu.Item
          icon={<AntennaBars4 size={18} />}
          onClick={() => onSelect && onSelect(TaskPriority.High)}
        >
          High
        </Menu.Item>
        <Menu.Item
          icon={<AntennaBars5 size={18} />}
          onClick={() => onSelect && onSelect(TaskPriority.Urgent)}
        >
          Urgent
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

type PrioritySelectorProps = {
  initialPriority?: TaskPriority;
};

export const PrioritySelector = ({ initialPriority }: PrioritySelectorProps) => {
  const [priority, setPriority] = useState<TaskPriority | undefined>(initialPriority);

  return (
    <GenericPriorityMenu onSelect={priority => setPriority(priority)}>
      <Button compact variant="light" color={"gray"} leftIcon={PriorityIcon(priority, 18)}>
        <Text size={"xs"}>{priorityName(priority)}</Text>
      </Button>
    </GenericPriorityMenu>
  );
};
