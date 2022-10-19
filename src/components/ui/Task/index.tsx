import {
  ActionIcon,
  Avatar,
  Badge,
  Checkbox,
  Code,
  Group,
  Kbd,
  MantineTheme,
  Menu,
  Paper,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { Task, TaskPriority, TaskStatus } from "modules/app/datatypes";
import React, { useState } from "react";
import {
  AntennaBars1,
  AntennaBars2,
  AntennaBars3,
  AntennaBars4,
  AntennaBars5,
  Circle,
  CircleCheck,
  CircleDashed,
  CircleHalf,
  CircleX,
  DotsCircleHorizontal,
} from "tabler-icons-react";

type TaskListElementProps = {
  task: Task;
  active?: boolean;
  checked?: boolean;
};

const PriorityIcon = (priority?: TaskPriority) => {
  switch (priority) {
    case "low":
      return <AntennaBars2 />;
    case "medium":
      return <AntennaBars3 />;
    case "high":
      return <AntennaBars4 />;
    case "urgent":
      return <AntennaBars5 />;
  }

  return <AntennaBars1 />;
};

const StatusIcon = (theme: MantineTheme, status?: TaskStatus) => {
  switch (status) {
    case "backlog":
      return <CircleDashed size={18} color={theme.colors.gray[6]} />;
    case "todo":
      return <Circle size={18} />;
    case "in-progress":
      return <CircleHalf size={18} color={theme.colors.yellow[6]} />;
    case "in-review":
      return <DotsCircleHorizontal size={18} color={theme.colors.green[6]} />;
    case "done":
      return <CircleCheck size={18} color={theme.colors.grape[6]} />;
    case "canceled":
      return <CircleX size={18} color={theme.colors.red[6]} />;
  }

  return <AntennaBars1 />;
};

export const TaskListElement = ({
  task,
  active = false,
  checked = false,
}: TaskListElementProps) => {
  const smallDate = task.createdAt?.toDateString().split(" ").slice(1, 3).join(" ");
  const [controlledChecked, setChecked] = useState(checked);
  const theme = useMantineTheme();

  return (
    <Paper
      px={6}
      py={4}
      mt={1}
      withBorder={active}
      sx={theme => ({
        backgroundColor: controlledChecked ? theme.colors.orange[5] + "10" : theme.colors.dark[7],

        ":hover": {
          backgroundColor: controlledChecked ? theme.colors.orange[5] + "10" : theme.colors.dark[6],
        },
      })}
    >
      <Group position="apart">
        <Group position="left" spacing={8}>
          <Checkbox
            checked={controlledChecked}
            onChange={event => setChecked(event.currentTarget.checked)}
            // size="xs"
            sx={{
              opacity: controlledChecked ? 1 : 0,
              ":hover": {
                opacity: 1,
              },
            }}
          />
          <Menu shadow="md" width={180}>
            <Menu.Target>
              <ActionIcon variant="light" radius={"sm"}>
                {PriorityIcon(task.priority)}
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              {/* <Menu.Label>Set Priority</Menu.Label> */}
              <TextInput
                placeholder="Change Priority..."
                variant="filled"
                rightSection={<Kbd px={8}>P</Kbd>}
              ></TextInput>
              <Menu.Divider />
              <Menu.Item icon={<AntennaBars1 size={18} />}>No Priority</Menu.Item>
              <Menu.Item icon={<AntennaBars2 size={18} />}>Low</Menu.Item>
              <Menu.Item icon={<AntennaBars3 size={18} />}>Medium</Menu.Item>
              <Menu.Item icon={<AntennaBars4 size={18} />}>High</Menu.Item>
              <Menu.Item icon={<AntennaBars5 size={18} />}>Urgent</Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <Menu shadow="md" width={180}>
            <Menu.Target>
              <ActionIcon variant="light" radius={"sm"}>
                {StatusIcon(theme, task.status)}
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              {/* <Menu.Label>Set Priority</Menu.Label> */}
              <TextInput
                placeholder="Change Status..."
                variant="filled"
                rightSection={<Kbd px={8}>S</Kbd>}
              ></TextInput>
              <Menu.Divider />
              <Menu.Item icon={<CircleDashed size={18} color={theme.colors.gray[6]} />}>
                Backlog
              </Menu.Item>
              <Menu.Item icon={<Circle size={18} />}>Todo</Menu.Item>
              <Menu.Item icon={<CircleHalf size={18} color={theme.colors.yellow[6]} />}>
                In Progress
              </Menu.Item>
              <Menu.Item icon={<DotsCircleHorizontal size={18} color={theme.colors.green[6]} />}>
                In Review
              </Menu.Item>
              <Menu.Item icon={<CircleCheck size={18} color={theme.colors.indigo[6]} />}>
                Done
              </Menu.Item>
              <Menu.Item icon={<CircleX size={18} color={theme.colors.red[6]} />}>
                Canceled
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <Text size={"sm"} color={"dimmed"}>
            {task.code}
          </Text>
          <Text size={"sm"}>{task.title}</Text>
        </Group>
        {/* <Group position="left"></Group> */}
        <Group position="right">
          <Badge>{task.project.name}</Badge>
          <Text size={"sm"} color={"dimmed"}>
            {smallDate}
          </Text>
          <Avatar size="sm" radius="xl">
            {task.assigned?.name}
          </Avatar>
        </Group>
      </Group>
    </Paper>
  );
};
