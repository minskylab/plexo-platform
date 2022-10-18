import { ActionIcon, Avatar, Badge, Group, Paper, Text } from "@mantine/core";
import { Task, TaskPriority, TaskStatus } from "modules/app/datatypes";
import React from "react";
import {
  AntennaBars1,
  AntennaBars2,
  AntennaBars3,
  AntennaBars4,
  AntennaBars5,
  AntennaBarsOff,
  Circle,
  CircleCheck,
  CircleDashed,
  CircleHalf,
  CircleX,
  DotsCircleHorizontal,
  Icon,
} from "tabler-icons-react";

type TaskListElementProps = {
  task: Task;
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

const StatusIcon = (status?: TaskStatus) => {
  switch (status) {
    case "backlog":
      return <CircleDashed size={18} />;
    case "todo":
      return <Circle size={18} />;
    case "in-progress":
      return <CircleHalf size={18} />;
    case "in-review":
      return <DotsCircleHorizontal size={18} />;
    case "done":
      return <CircleCheck size={18} />;
    case "canceled":
      return <CircleX size={18} />;
  }

  return <AntennaBars1 />;
};

export const TaskListElement = ({ task }: TaskListElementProps) => {
  return (
    <Paper px={6} py={4}>
      <Group position="apart">
        <Group position="left" spacing={8}>
          <ActionIcon variant="light" radius={"sm"}>
            {PriorityIcon(task.priority)}
          </ActionIcon>
          <ActionIcon variant="light" radius={"sm"}>
            {StatusIcon(task.status)}
          </ActionIcon>
          <Text size={"sm"} color={"dimmed"}>
            {task.code}
          </Text>
        </Group>
        <Text size={"sm"}>{task.title}</Text>
        <Group position="right">
          <Badge>{task.project.name}</Badge>
          <Text size={"sm"} color={"dimmed"}>
            {task.createdAt?.toDateString()}
          </Text>
          <Avatar size="sm" radius="xl">
            {task.assigned?.name}
          </Avatar>
        </Group>
      </Group>
    </Paper>
  );
};
