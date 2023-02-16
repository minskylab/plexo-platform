import {
  Modal,
  Group,
  TextInput,
  Textarea,
  Button,
  Switch,
  Box,
  useMantineTheme,
  Text,
} from "@mantine/core";

import { TaskStatus, TaskPriority } from "integration/graphql";
import { AssigneeSelector } from "./assignee";
import { LabelSelector } from "./label";
import { PrioritySelector } from "./priority";
import { ProjectSelector } from "./project";
import { StatusSelector } from "./status";
import { TeamSelector } from "./team";

type NewTaskProps = {
  newTaskOpened: boolean;
  setNewTaskOpened: (newTaskOpened: boolean) => void;
  createMore: boolean;
  setCreateMore: (createMore: boolean) => void;
};

const NewTask = ({ newTaskOpened, setNewTaskOpened, createMore, setCreateMore }: NewTaskProps) => {
  const theme = useMantineTheme();
  return (
    <Modal
      centered
      overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.5}
      // overlayBlur={3}
      transition={"slide-up"}
      size={"lg"}
      opened={newTaskOpened}
      onClose={() => setNewTaskOpened(false)}
      shadow="md"
      title={
        <Group spacing={8}>
          <TeamSelector initialTeam={undefined} /> {/* change to current team*/}
          <Text size={"sm"}>New Task</Text>
        </Group>
      }
    >
      <Box>
        <TextInput placeholder="Task Title" variant="unstyled" size="lg" autoFocus />
        <Textarea placeholder="Add description..." variant="unstyled" size="sm" />
      </Box>
      <Group spacing={6} mb={"md"}>
        <StatusSelector initialStatus={TaskStatus.Backlog} />
        <PrioritySelector initialPriority={TaskPriority.None} />
        <AssigneeSelector initialAssignee={undefined} />
        <LabelSelector initialLabel={[]} />
        <ProjectSelector initialProject={undefined} />
      </Group>
      <Group
        pt={"md"}
        position="right"
        sx={{
          borderTopWidth: 1,
          borderTopStyle: "solid",
          borderTopColor:
            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2],
        }}
      >
        <Switch
          label="Create more"
          size="xs"
          checked={createMore}
          onChange={e => setCreateMore(e.currentTarget.checked)}
        />
        {/* {!createMore && "s"} */}
        <Button compact variant="filled">
          Create Task
        </Button>
      </Group>
    </Modal>
  );
};

export default NewTask;
