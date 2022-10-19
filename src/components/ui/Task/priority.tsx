import { Button, Kbd, Menu, Text, TextInput } from "@mantine/core";
import { TaskPriority } from "modules/app/datatypes";
import { useState } from "react";
import {
  AntennaBars1,
  AntennaBars2,
  AntennaBars3,
  AntennaBars4,
  AntennaBars5,
  IconProps,
} from "tabler-icons-react";

export const PriorityIcon = (
  priority: TaskPriority | undefined,
  size?: string | number | undefined
) => {
  switch (priority) {
    case "low":
      return <AntennaBars2 size={size} />;
    case "medium":
      return <AntennaBars3 size={size} />;
    case "high":
      return <AntennaBars4 size={size} />;
    case "urgent":
      return <AntennaBars5 size={size} />;
  }

  return <AntennaBars1 size={size} />;
};

export const priorityName = (priority: TaskPriority | undefined) => {
  switch (priority) {
    case "low":
      return "Low";
    case "medium":
      return "Medium";
    case "high":
      return "High";
    case "urgent":
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
          onClick={() => onSelect && onSelect(undefined)}
        >
          No Priority
        </Menu.Item>
        <Menu.Item icon={<AntennaBars2 size={18} />} onClick={() => onSelect && onSelect("low")}>
          Low
        </Menu.Item>
        <Menu.Item icon={<AntennaBars3 size={18} />} onClick={() => onSelect && onSelect("medium")}>
          Medium
        </Menu.Item>
        <Menu.Item icon={<AntennaBars4 size={18} />} onClick={() => onSelect && onSelect("high")}>
          High
        </Menu.Item>
        <Menu.Item icon={<AntennaBars5 size={18} />} onClick={() => onSelect && onSelect("urgent")}>
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
