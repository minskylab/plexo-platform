import {
  ActionIcon,
  Avatar,
  Group,
  Stack,
  TextInput,
  useMantineTheme,
  Text,
  Button,
} from "@mantine/core";
import { Plus, X } from "tabler-icons-react";

import { GenericLeadTaskMenu } from "./lead";
import { GenericStatusMenu, StatusIcon } from "./status";
import { TaskStatus } from "integration/graphql";
import { Member } from "lib/types";
import { useState } from "react";

type SubTask = {
  title: string;
  status: TaskStatus;
  lead: Member | null;
};

const NewSubTasks = () => {
  const theme = useMantineTheme();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.Backlog);
  const [lead, setLead] = useState<Member | null>(null);
  const [subtasks, setSubtasks] = useState<SubTask[]>([]);

  const handleAddSubtask = () => {
    setSubtasks([
      ...subtasks,
      {
        title: title,
        status: status,
        lead: lead,
      },
    ]);

    //Reset values
    setTitle("");
    setStatus(TaskStatus.Backlog);
    setLead(null);
  };

  const tasks = subtasks.map(task => {
    return (
      <Group key={task.title} spacing={0} sx={{ borderRadius: 4, backgroundColor: "#343a4033" }}>
        <GenericStatusMenu>
          <ActionIcon variant="transparent" radius={"sm"}>
            {StatusIcon(theme, task.status)}
          </ActionIcon>
        </GenericStatusMenu>
        <GenericLeadTaskMenu selectedLead={task.lead}>
          <ActionIcon variant="transparent">
            <Avatar size="sm" radius="xl" />
          </ActionIcon>
        </GenericLeadTaskMenu>
        <Text size={"sm"} sx={{ flex: 1 }}>
          {task.title}
        </Text>
        <ActionIcon
          size={"sm"}
          onClick={() => setSubtasks(subtasks.filter(r => r.title !== task.title))}
        >
          <X size={16} />
        </ActionIcon>
      </Group>
    );
  });

  return (
    <Stack
      spacing={0}
      p={10}
      sx={{
        borderTopWidth: 1,
        borderTopStyle: "solid",
        borderTopColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2],
      }}
    >
      <Text pb={10} size={"xs"}>
        Sub-tasks
      </Text>
      <Group spacing={0}>
        <GenericStatusMenu onSelect={s => setStatus(s)}>
          <ActionIcon variant="transparent" radius={"sm"}>
            {StatusIcon(theme, status)}
          </ActionIcon>
        </GenericStatusMenu>
        <GenericLeadTaskMenu onSelect={member => setLead(member)} selectedLead={lead}>
          <ActionIcon variant="transparent">
            <Avatar size="sm" radius="xl" />
          </ActionIcon>
        </GenericLeadTaskMenu>
        <TextInput
          placeholder="Task Title"
          variant="unstyled"
          autoFocus
          value={title}
          onChange={e => setTitle(e.target.value)}
          styles={{
            root: {
              flex: 1,
            },
          }}
        />
        <Button
          compact
          disabled={title.length ? false : true}
          variant="light"
          color={"gray"}
          leftIcon={<Plus size={16} />}
          onClick={handleAddSubtask}
        >
          <Text size={"xs"}>Add subtask</Text>
        </Button>
      </Group>
      <Stack spacing={1}>{tasks.length ? tasks : null}</Stack>
    </Stack>
  );
};

export default NewSubTasks;
