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
import { Member, Project } from "modules/app/datatypes";
import { useState } from "react";
import { AssigneeSelector } from "./assignee";
import { LabelSelector } from "./label";
import { PrioritySelector } from "./priority";
import { ProjectSelector } from "./project";
import { StatusSelector } from "./status";
import { TeamSelector } from "./team";
import { LabelType } from "./types";

type NewTaskProps = {
  newTaskOpened: boolean;
  setNewTaskOpened: (newTaskOpened: boolean) => void;
  createMore: boolean;
  setCreateMore: (createMore: boolean) => void;
};

const NewTask = ({ newTaskOpened, setNewTaskOpened, createMore, setCreateMore }: NewTaskProps) => {
  const theme = useMantineTheme();

  const [status, setStatus] = useState<TaskStatus | undefined>(TaskStatus.Backlog);
  const [priority, setPriority] = useState<TaskPriority | undefined>(TaskPriority.None);
  const [assignee, setAssignee] = useState<Member | undefined>(undefined);
  const [selectedLabels, setSelectedLabels] = useState<LabelType[]>([]);
  const [project, setProject] = useState<Project | undefined>(undefined);

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
          {/* <TeamSelector initialTeam={undefined} /> */}
          <Text size={"sm"}>New Task</Text>
        </Group>
      }
    >
      <Box>
        <TextInput placeholder="Task Title" variant="unstyled" size="lg" autoFocus />
        <Textarea placeholder="Add description..." variant="unstyled" size="sm" />
      </Box>
      <Group spacing={6} mb={"md"}>
        <StatusSelector status={status} setStatus={setStatus} />
        <PrioritySelector priority={priority} setPriority={setPriority} />
        <AssigneeSelector assignee={assignee} setAssignee={setAssignee} />
        <LabelSelector selectedLabels={selectedLabels} setSelectedLabels={setSelectedLabels} />
        <ProjectSelector project={project} setProject={setProject} />
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
