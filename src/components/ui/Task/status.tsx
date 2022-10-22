import { Button, Kbd, MantineTheme, Menu, Text, TextInput, useMantineTheme } from "@mantine/core";
import { TaskStatus } from "modules/app/datatypes";
import { useState } from "react";
import {
  AntennaBars1,
  Circle,
  CircleCheck,
  CircleDashed,
  CircleHalf,
  CircleX,
  DotsCircleHorizontal,
} from "tabler-icons-react";

export const StatusIcon = (
  theme: MantineTheme,
  status?: TaskStatus,
  size: string | number | undefined = 18
) => {
  switch (status) {
    case "backlog":
      return <CircleDashed size={size} color={theme.colors.gray[6]} />;
    case "todo":
      return <Circle size={size} />;
    case "in-progress":
      return <CircleHalf size={size} color={theme.colors.yellow[6]} />;
    case "in-review":
      return <DotsCircleHorizontal size={size} color={theme.colors.green[6]} />;
    case "done":
      return <CircleCheck size={size} color={theme.colors.indigo[6]} />;
    case "canceled":
      return <CircleX size={size} color={theme.colors.red[6]} />;
  }

  return <AntennaBars1 />;
};

const statusName = (status?: TaskStatus) => {
  switch (status) {
    case "backlog":
      return "Backlog";
    case "todo":
      return "Todo";
    case "in-progress":
      return "In Progress";
    case "in-review":
      return "In Review";
    case "done":
      return "Done";
    case "canceled":
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
          icon={<CircleDashed size={18} color={theme.colors.gray[6]} />}
          onClick={() => onSelect && onSelect("backlog")}
        >
          Backlog
        </Menu.Item>
        <Menu.Item icon={<Circle size={18} />} onClick={() => onSelect && onSelect("todo")}>
          Todo
        </Menu.Item>
        <Menu.Item
          icon={<CircleHalf size={18} color={theme.colors.yellow[6]} />}
          onClick={() => onSelect && onSelect("in-progress")}
        >
          In Progress
        </Menu.Item>
        <Menu.Item
          icon={
            <DotsCircleHorizontal
              size={18}
              color={theme.colors.green[6]}
              onClick={() => onSelect && onSelect("in-review")}
            />
          }
        >
          In Review
        </Menu.Item>
        <Menu.Item
          icon={<CircleCheck size={18} color={theme.colors.indigo[6]} />}
          onClick={() => onSelect && onSelect("done")}
        >
          Done
        </Menu.Item>
        <Menu.Item
          icon={<CircleX size={18} color={theme.colors.red[6]} />}
          onClick={() => onSelect && onSelect("canceled")}
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
