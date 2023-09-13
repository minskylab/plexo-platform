import {
  ActionIcon,
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
import { DateLabel } from "lib/utils";
import { TaskMenu } from "./menu";
import { GenericLeadTaskMenu } from "./lead";
import { GenericStatusMenu, StatusIcon } from "./status";
import { GenericPriorityMenu, PriorityIcon } from "./priority";
import { MemberPhoto } from "../MemberPhoto";

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
  badgeLabel: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  badgeProject: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
  text: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
}));

export const TaskListElement = ({ task, active = false, checked = false }: TaskProps) => {
  const theme = useMantineTheme();
  const [controlledChecked, setChecked] = useState(checked);
  const { classes } = useStyles();

  return (
    <Paper px={6} py={4} mt={1} withBorder={active}>
      <Group spacing={0}>
        <Group position="left" spacing={8} sx={{ flex: 1 }}>
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
            {`PLE-${task.count}`}
          </Text>
          <Text
            size={"sm"}
            lineClamp={1}
            onClick={() => router.push(`/tasks/${task.id}`)}
            className={classes.text}
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
                  className={classes.badgeLabel}
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

          {task.project && <Badge className={classes.badgeProject}>{task.project?.name}</Badge>}
          <Text lineClamp={1} className={classes.date} size={"sm"} color={"dimmed"}>
            {DateLabel(task.createdAt)}
          </Text>
          <GenericLeadTaskMenu task={task}>
            <ActionIcon variant="transparent">{MemberPhoto(task.leader?.photoUrl)}</ActionIcon>
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

  return (
    <Paper px={6} py={4} mt={1} withBorder={active} style={{ marginTop: 10 }}>
      <Stack spacing={3}>
        <Group position="apart">
          <Text size={"sm"} color={"dimmed"}>
            {`PLE-${task.count}`}
          </Text>
          <GenericLeadTaskMenu task={task}>
            <ActionIcon variant="transparent">{MemberPhoto(task.leader?.photoUrl)}</ActionIcon>
          </GenericLeadTaskMenu>
        </Group>
        <Text size={"sm"} onClick={() => router.push(`/tasks/${task.id}`)}>
          {task.title}
        </Text>
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
          {task.project && <Badge>{task.project?.name}</Badge>}
        </Group>
      </Stack>
    </Paper>
  );
};
