import {
  ActionIcon,
  Container,
  Group,
  Stack,
  Text,
  createStyles,
  Input,
  TextInput,
  Textarea,
  Divider,
  CopyButton,
  Tooltip,
  Box,
  Flex,
  Paper,
  Avatar,
  Badge,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons";
import { LabelColor } from "components/ui/Task/label";
import { GenericLeadTaskMenu } from "components/ui/Task/lead";
import { GenericPriorityMenu, PriorityIcon } from "components/ui/Task/priority";
import { GenericStatusMenu, StatusIcon } from "components/ui/Task/status";
import Link from "next/link";
import { Copy } from "tabler-icons-react";
import { TaskById } from "../datatypes";

type TaskDetailProps = {
  task: TaskById | undefined;
  isLoading: boolean;
};

const useStyles = createStyles(theme => ({
  MIN: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
}));

const TaskDetailContent = ({ task, isLoading }: TaskDetailProps) => {
  const { classes, theme } = useStyles();
  console.log(task);
  return (
    <Stack h={"100%"} sx={{ flexGrow: 1 }}>
      <Group
        h={73}
        px={20}
        sx={{
          borderBottom: `1px solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
          }`,
        }}
      >
        <Link href="/tasks" passHref>
          <ActionIcon variant="subtle">
            <IconChevronLeft size={20} />
          </ActionIcon>
        </Link>
      </Group>
      <Group px={20} sx={{ alignItems: "baseline" }}>
        <Box sx={{ flexGrow: 2 }}>
          <Stack maw={860} m="auto">
            <Text lineClamp={1} className={classes.MIN} size={"sm"} color={"dimmed"}>
              MIN-169
            </Text>
            <Divider />
            <TextInput
              defaultValue={task?.title}
              placeholder="Task Title"
              size="lg"
              /* value={title}
              onChange={e => setTitle(e.target.value)} */
              styles={theme => ({
                input: {
                  fontSize: 22,
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  "&:focus-within": {
                    borderColor: theme.colors.orange[7],
                  },
                },
              })}
            />
            <Textarea
              placeholder="Add description..."
              size="sm"
              /* value={description}
              onChange={e => setDescription(e.target.value)} */
              styles={theme => ({
                input: {
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  "&:focus-within": {
                    borderColor: theme.colors.orange[7],
                  },
                },
              })}
            />
            <Paper shadow="xs" p="md">
              <Text fw={500} c="dimmed">
                Suggestion:
              </Text>
              <Text c="dimmed">
                Use it to create cards, dropdowns, modals and other components that require
                background with shadow
              </Text>
            </Paper>
          </Stack>
        </Box>
        <Divider orientation="vertical" />
        <Stack miw={320} maw={400} sx={{ flexGrow: 1 }}>
          <CopyButton value="https://mantine.dev" timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? "Copied" : "Copy"} position="top">
                <ActionIcon onClick={copy}>
                  <Copy size={16} />
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
          <Divider />
          <Group>
            <Text w={90} lineClamp={1} className={classes.MIN} size={"sm"} color={"dimmed"}>
              Status
            </Text>
            <GenericStatusMenu taskId={task?.id}>
              <ActionIcon variant="transparent" radius={"sm"}>
                {StatusIcon(theme, task?.status)}
              </ActionIcon>
            </GenericStatusMenu>
          </Group>
          <Group>
            <Text w={90} lineClamp={1} className={classes.MIN} size={"sm"} color={"dimmed"}>
              Priority
            </Text>
            <GenericPriorityMenu taskId={task?.id}>
              <ActionIcon variant="transparent" radius={"sm"}>
                {PriorityIcon(task?.priority)}
              </ActionIcon>
            </GenericPriorityMenu>
          </Group>
          <Group>
            <Text w={90} lineClamp={1} className={classes.MIN} size={"sm"} color={"dimmed"}>
              Lead
            </Text>
            {/* <GenericLeadTaskMenu task={task}>
              <ActionIcon variant="transparent">
                <Avatar size="sm" radius="xl"></Avatar>
              </ActionIcon>
            </GenericLeadTaskMenu> */}
          </Group>
          <Group>
            <Text w={90} lineClamp={1} className={classes.MIN} size={"sm"} color={"dimmed"}>
              Assignee
            </Text>
            <GenericStatusMenu taskId={task?.id}>
              <ActionIcon variant="transparent" radius={"sm"}>
                {StatusIcon(theme, task?.status)}
              </ActionIcon>
            </GenericStatusMenu>
          </Group>
          <Group>
            <Text w={90} lineClamp={1} className={classes.MIN} size={"sm"} color={"dimmed"}>
              Labels
            </Text>
            {task?.labels.length &&
              task?.labels.sort().map((l, index) => {
                return (
                  <Badge
                    key={index}
                    variant={"dot"}
                    leftSection={LabelColor(l, theme)}
                    styles={{
                      root: {
                        "&:before": {
                          display: "none",
                        },
                      },
                      inner: {
                        fontWeight: 500,
                        color:
                          theme.colorScheme === "dark"
                            ? theme.colors.dark[0]
                            : theme.colors.gray[7],
                      },
                    }}
                  >
                    {l}
                  </Badge>
                );
              })}
          </Group>
          <Group>
            <Text w={90} lineClamp={1} className={classes.MIN} size={"sm"} color={"dimmed"}>
              Project
            </Text>
            <Badge /* className={classes.badge} */>{task?.project?.name}</Badge>
          </Group>
          <Group>
            <Text w={90} lineClamp={1} className={classes.MIN} size={"sm"} color={"dimmed"}>
              Due Date
            </Text>
            {/* <GenericStatusMenu taskId={task?.id}>
              <ActionIcon variant="transparent" radius={"sm"}>
                {StatusIcon(theme, task?.status)}
              </ActionIcon>
            </GenericStatusMenu> */}
          </Group>
        </Stack>
      </Group>
    </Stack>
  );
};

export default TaskDetailContent;
