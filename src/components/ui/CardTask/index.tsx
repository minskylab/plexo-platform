import {
  ActionIcon,
  Avatar,
  Badge,
  createStyles,
  Group,
  Paper,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Task } from "modules/app/datatypes";
import { useState } from "react";
import { LabelColor } from "../Task/label";
import { GenericLeadTaskMenu } from "../Task/lead";

import { GenericPriorityMenu, PriorityIcon } from "../Task/priority";
import { GenericStatusMenu, StatusIcon } from "../Task/status";

const useStyles = createStyles(theme => ({
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
}));

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
  const { classes } = useStyles();
  const theme = useMantineTheme();

  // console.log(task.assigneeId);
  return (
    <Paper px={6} py={4} mt={1} withBorder={active} style={{ marginTop: 10 }}>
      <Stack spacing={3}>
        <Group position="apart">
          <Text size={"sm"} color={"dimmed"}>
            MIN-169
          </Text>
          <GenericLeadTaskMenu task={task}>
            <ActionIcon variant="transparent">
              <Avatar size="sm" radius="xl">
                {/* {task.leadId} */}
              </Avatar>
            </ActionIcon>
          </GenericLeadTaskMenu>
        </Group>
        <Text size={"sm"}>{task.title}</Text>
        <Group spacing={8}>
          <GenericPriorityMenu task={task}>
            <ActionIcon variant="light" radius={"sm"}>
              {PriorityIcon(task.priority)}
            </ActionIcon>
          </GenericPriorityMenu>
          <GenericStatusMenu task={task}>
            <ActionIcon variant="light" radius={"sm"}>
              {StatusIcon(theme, task.status)}
            </ActionIcon>
          </GenericStatusMenu>
          {task.project && <Badge className={classes.badge}>{task.project?.name}</Badge>}
        </Group>
      </Stack>
    </Paper>
  );
};
