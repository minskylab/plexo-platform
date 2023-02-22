import {
  ActionIcon,
  Avatar,
  Badge,
  Checkbox,
  createStyles,
  Group,
  Paper,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";

import { Task } from "modules/app/datatypes";
import { GenericPriorityMenu, PriorityIcon } from "./priority";
import { GenericStatusMenu, StatusIcon } from "./status";
import { DotsVertical } from "tabler-icons-react";
import { TaskMenu } from "./menu";
import { GenericLeadTaskMenu } from "./lead";

type TaskListElementProps = {
  task: Task;
  active?: boolean;
  checked?: boolean;
};

const useStyles = createStyles(theme => ({
  MIN: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
  date: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
  badge: {
    [theme.fn.smallerThan(375)]: {
      width: "65px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    [theme.fn.smallerThan(330)]: {
      width: "40px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  task: {
    [theme.fn.smallerThan(375)]: {
      width: "65px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    [theme.fn.smallerThan(330)]: {
      width: "40px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
}));

export const TaskListElement = ({
  task,
  active = false,
  checked = false,
}: TaskListElementProps) => {
  const theme = useMantineTheme();
  const smallDate = new Date(task.createdAt).toDateString().split(" ").slice(1, 3).join(" ");
  const [controlledChecked, setChecked] = useState(checked);
  const { classes } = useStyles();

  return (
    <Paper px={6} py={4} mt={1} withBorder={active}>
      <Group position="apart">
        <Group position="left" spacing={8}>
          <Checkbox
            checked={controlledChecked}
            onChange={event => setChecked(event.currentTarget.checked)}
            size="xs"
            sx={{
              opacity: controlledChecked ? 1 : 0,
              ":hover": {
                opacity: 1,
              },
            }}
          />
          <GenericPriorityMenu taskId={task.id}>
            <ActionIcon variant="transparent" radius={"sm"}>
              {PriorityIcon(task.priority)}
            </ActionIcon>
          </GenericPriorityMenu>
          <GenericStatusMenu taskId={task.id}>
            <ActionIcon variant="transparent" radius={"sm"}>
              {StatusIcon(theme, task.status)}
            </ActionIcon>
          </GenericStatusMenu>
          <Text lineClamp={1} className={classes.MIN} size={"sm"} color={"dimmed"}>
            MIN-169
          </Text>
          <Text className={classes.task} lineClamp={1} size={"sm"}>
            {task.title}
          </Text>
        </Group>

        <Group position="right" spacing={8}>
          {task.project && <Badge className={classes.badge}>{task.project?.name}</Badge>}
          <Text lineClamp={1} className={classes.date} size={"sm"} color={"dimmed"}>
            {smallDate}
          </Text>
          <GenericLeadTaskMenu task={task}>
            <ActionIcon variant="transparent">
              <Avatar size="sm" radius="xl">
                {/* {task.leadId} */}
              </Avatar>
            </ActionIcon>
          </GenericLeadTaskMenu>

          <TaskMenu task={task}>
            <ActionIcon radius={"sm"} size={"xs"}>
              <DotsVertical size={18} />
            </ActionIcon>
          </TaskMenu>
        </Group>
      </Group>
    </Paper>
  );
};
