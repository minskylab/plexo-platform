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
import { GenericPriorityMenu, PriorityIcon } from "./priority";
import { GenericStatusMenu, StatusIcon } from "./status";

type TaskListElementProps = {
  task: Task;
  active?: boolean;
  checked?: boolean;
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
          <GenericPriorityMenu>
            <ActionIcon variant="light" radius={"sm"}>
              {PriorityIcon(task.priority)}
            </ActionIcon>
          </GenericPriorityMenu>
          <GenericStatusMenu>
            <ActionIcon variant="light" radius={"sm"}>
              {StatusIcon(theme, task.status)}
            </ActionIcon>
          </GenericStatusMenu>
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
