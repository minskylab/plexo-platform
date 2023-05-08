import {
  ActionIcon,
  Avatar,
  Badge,
  Checkbox,
  ColorSwatch,
  createStyles,
  Group,
  Paper,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { DotsVertical } from "tabler-icons-react";
import router from "next/router";

import { Task } from "lib/types";
import { GenericPriorityMenu, PriorityIcon } from "./priority";
import { GenericStatusMenu, StatusIcon } from "./status";
import { TaskMenu } from "./menu";
import { GenericLeadTaskMenu } from "./lead";
import { DateLabel } from "lib/utils";

type TaskProps = {
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
  mobileElement: {
    [theme.fn.smallerThan("xs")]: {
      width: "40px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
}));

export const TaskListElement = ({ task, active = false, checked = false }: TaskProps) => {
  const theme = useMantineTheme();
  const [controlledChecked, setChecked] = useState(checked);
  const { classes } = useStyles();

  return (
    <Paper px={6} py={4} mt={1} withBorder={active}>
      <Group spacing={0}>
        <Group position="left" spacing={8} sx={{ flexGrow: 1 }}>
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
          <GenericPriorityMenu task={task}>
            <ActionIcon variant="transparent" radius={"sm"}>
              {PriorityIcon(task.priority)}
            </ActionIcon>
          </GenericPriorityMenu>
          <GenericStatusMenu task={task}>
            <ActionIcon variant="transparent" radius={"sm"}>
              {StatusIcon(theme, task.status)}
            </ActionIcon>
          </GenericStatusMenu>
          <Text lineClamp={1} className={classes.MIN} size={"sm"} color={"dimmed"}>
            MIN-169
          </Text>
          <Text
            onClick={() => router.push(`/tasks/${task.id}`)}
            lineClamp={1}
            size={"sm"}
            className={classes.mobileElement}
            sx={{ flexGrow: 1 }}
          >
            {task.title}
          </Text>
        </Group>

        <Group position="right" spacing={8}>
          {task.labels.length &&
            task.labels.sort().map((l, index) => {
              return (
                <Badge
                  key={index}
                  variant={"dot"}
                  leftSection={<ColorSwatch color={l.color as string} size={10} />}
                  className={classes.mobileElement}
                  styles={{
                    root: {
                      "&:before": {
                        display: "none",
                      },
                    },
                    inner: {
                      fontWeight: 500,
                      color:
                        theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
                    },
                  }}
                >
                  {l.name}
                </Badge>
              );
            })}

          {task.project && <Badge className={classes.mobileElement}>{task.project?.name}</Badge>}
          <Text lineClamp={1} className={classes.date} size={"sm"} color={"dimmed"}>
            {DateLabel(task.createdAt)}
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

export const TaskCardElement = ({ task, active = false }: TaskProps) => {
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
          {task.project && <Badge className={classes.mobileElement}>{task.project?.name}</Badge>}
        </Group>
      </Stack>
    </Paper>
  );
};
