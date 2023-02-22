import {
  ActionIcon,
  Avatar,
  Badge,
  Group,
  Paper,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Task } from "modules/app/datatypes";
import { useState } from "react";

import { GenericPriorityMenu, PriorityIcon } from "../Task/priority";
import { GenericStatusMenu, StatusIcon } from "../Task/status";

type DndTaskListElementProps = {
  task: Task;
  active?: boolean;
  checked?: boolean;
};

export const DndTaskListElement = ({
  task,
  active = false,
  checked = false,
}: DndTaskListElementProps) => {
  const smallDate = new Date(task.createdAt).toDateString().split(" ").slice(1, 3).join(" ");
  const theme = useMantineTheme();

  // console.log(task.assigneeId);
  return (
    <Paper px={6} py={4} mt={1} withBorder={active} style={{ marginTop: 10 }}>
      <Stack spacing={3}>
        <Group position="apart">
          <Text size={"sm"} color={"dimmed"}>
            MIN-169
          </Text>
          <Avatar size="sm" radius="xl">
            {/* {task.assigneeId} */}
          </Avatar>
        </Group>
        <Text size={"sm"}>{task.title}</Text>
        <Group spacing={8}>
          <GenericPriorityMenu taskId={task.id}>
            <ActionIcon variant="light" radius={"sm"}>
              {PriorityIcon(task.priority)}
            </ActionIcon>
          </GenericPriorityMenu>
          <GenericStatusMenu taskId={task.id}>
            <ActionIcon variant="light" radius={"sm"}>
              {StatusIcon(theme, task.status)}
            </ActionIcon>
          </GenericStatusMenu>
          <Badge>MINSKY{/* {task.projectId} */}</Badge>
        </Group>
      </Stack>
    </Paper>
  );
};
