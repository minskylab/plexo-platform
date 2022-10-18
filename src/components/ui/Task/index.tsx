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
      return <CircleDashed />;
    case "todo":
      return <Circle />;
    case "in-progress":
      return <CircleHalf />;
    case "in-review":
      return <DotsCircleHorizontal />;
    case "done":
      return <CircleCheck />;
    case "canceled":
      return <CircleX />;
  }

  return <AntennaBars1 />;
};

export const TaskListElement = ({ task }: TaskListElementProps) => {
  return (
    <div>
      {PriorityIcon(task.priority)}
      {task.code} {task.title}
      {StatusIcon(task.status)}
    </div>
  );
};
