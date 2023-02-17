import { Button, Kbd, MantineTheme, Menu, Text, TextInput, useMantineTheme } from "@mantine/core";
import { TaskStatus } from "integration/graphql";
/* import { TaskStatus } from "modules/app/datatypes"; */
import { useState } from "react";
import {
  AntennaBars1,
  Circle,
  CircleCheck,
  CircleDashed,
  CircleHalf,
  DotsCircleHorizontal,
  CircleDot,
  CircleX,
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
      return <CircleDashed size={size} color={theme.colors.gray[6]} />;
    case "TO_DO":
      return <Circle size={size} />;
    case "IN_PROGRESS":
      return <CircleHalf size={size} color={theme.colors.yellow[6]} />;
    /* case "in-review":
      return <DotsCircleHorizontal size={size} color={theme.colors.green[6]} />; */
    case "DONE":
      return <CircleCheck size={size} color={theme.colors.indigo[6]} />;
    case "CANCELED":
      return <CircleX size={size} color={theme.colors.red[6]} />;
  }

  return <AntennaBars1 />;
};

export const statusName = (status?: TaskStatus) => {
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

type GenericStatusMenuProps = {
  children: React.ReactNode;
  onSelect?: (priority: TaskStatus | undefined) => void;
};

export const GenericStatusMenu = ({ children, onSelect }: GenericStatusMenuProps) => {
  const theme = useMantineTheme();

  return (
    <Menu shadow="md" width={180}>
      <Menu.Target>{children}</Menu.Target>

      <Menu.Dropdown>
        <TextInput
          placeholder="Change Status..."
          variant="filled"
          rightSection={<Kbd px={8}>S</Kbd>}
        />
        <Menu.Divider />
        <Menu.Item
          icon={<CircleDot size={18} color={theme.colors.gray[6]} />}
          onClick={() => onSelect && onSelect(TaskStatus.None)}
        >
          None
        </Menu.Item>
        <Menu.Item
          icon={<CircleDashed size={18} color={theme.colors.gray[6]} />}
          onClick={() => onSelect && onSelect(TaskStatus.Backlog)}
        >
          Backlog
        </Menu.Item>
        <Menu.Item
          icon={<Circle size={18} />}
          onClick={() => onSelect && onSelect(TaskStatus.ToDo)}
        >
          Todo
        </Menu.Item>
        <Menu.Item
          icon={<CircleHalf size={18} color={theme.colors.yellow[6]} />}
          onClick={() => onSelect && onSelect(TaskStatus.InProgress)}
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
          onClick={() => onSelect && onSelect(TaskStatus.Done)}
        >
          Done
        </Menu.Item>
        <Menu.Item
          icon={<CircleX size={18} color={theme.colors.red[6]} />}
          onClick={() => onSelect && onSelect(TaskStatus.Canceled)}
        >
          Canceled
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

type StatusSelectorProps = {
  initialStatus?: TaskStatus;
};

export const StatusSelector = ({ initialStatus }: StatusSelectorProps) => {
  const [status, setStatus] = useState<TaskStatus | undefined>(initialStatus);
  const theme = useMantineTheme();

  return (
    <GenericStatusMenu onSelect={priority => setStatus(priority)}>
      <Button compact variant="light" color={"gray"} leftIcon={StatusIcon(theme, status, 18)}>
        <Text size={"xs"}>{statusName(status)}</Text>
      </Button>
    </GenericStatusMenu>
  );
};
