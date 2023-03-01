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
import { showNotification } from "@mantine/notifications";
import { AlertCircle, Check, X } from "tabler-icons-react";
import { useState } from "react";

import { TaskStatus, TaskPriority } from "integration/graphql";
import { Member, Project } from "modules/app/datatypes";
import { LeadTaskSelector } from "./lead";
import { LabelSelector } from "./label";
import { priorityName, PrioritySelector } from "./priority";
import { ProjectSelector } from "./project";
import { statusName, StatusSelector } from "./status";
import { LabelType } from "./types";
import { useActions } from "lib/useActions";

type NewTaskProps = {
  newTaskOpened: boolean;
  setNewTaskOpened: (newTaskOpened: boolean) => void;
  createMore: boolean;
  setCreateMore: (createMore: boolean) => void;
};

const NewTask = ({ newTaskOpened, setNewTaskOpened, createMore, setCreateMore }: NewTaskProps) => {
  const theme = useMantineTheme();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.Backlog);
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.None);
  const [lead, setLead] = useState<Member | null>(null);
  const [selectedLabels, setSelectedLabels] = useState<LabelType[]>([]);
  const [project, setProject] = useState<Project | null>(null);

  const { createTask, fetchCreateTask } = useActions();

  const onCreateTask = async () => {
    if (!title.length) {
      showNotification({
        id: "titleRequired",
        autoClose: 5000,
        title: "Title required",
        message: "Please enter a title before submitting",
        color: "yellow",
        icon: <AlertCircle size={18} />,
      });
    } else {
      const res = await fetchCreateTask({
        title: title,
        ownerId: "52fbe576-843d-47a5-a84c-79ce00d18265", //Bregy
        description: description.length ? description : null,
        status: statusName(status),
        priority: priorityName(priority),
        leadId: lead?.id, //revisar
        labels: selectedLabels,
        projectId: project?.id,
      });

      if (res.data) {
        setNewTaskOpened(false); //Close modal
        resetInitialValues(); //Reset values
        showNotification({
          autoClose: 5000,
          title: "Task created",
          message: res.data.createTask.title,
          color: "blue",
          icon: <Check size={18} />,
        });
      }
      if (res.error) {
        showNotification({
          autoClose: 5000,
          title: "Error!",
          message: "Try again",
          color: "red",
          icon: <X size={18} />,
        });
      }
    }
  };

  const resetInitialValues = () => {
    setTitle("");
    setDescription("");
    setStatus(TaskStatus.Backlog);
    setPriority(TaskPriority.None);
    setLead(null);
    setSelectedLabels([]);
    setProject(null);
  };

  return (
    <Modal
      centered
      overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.5}
      transition={"slide-up"}
      size={"lg"}
      opened={newTaskOpened}
      onClose={() => {
        setNewTaskOpened(false);
        resetInitialValues();
      }}
      shadow="md"
      title={
        <Group spacing={8}>
          <Text size={"sm"}>New Task</Text>
        </Group>
      }
    >
      <Box>
        <TextInput
          placeholder="Task Title"
          variant="unstyled"
          size="lg"
          autoFocus
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Add description..."
          variant="unstyled"
          size="sm"
          value={description}
          onChange={e => setDescription(e.target.value)}
          autosize
          minRows={2}
        />
      </Box>
      <Group spacing={6} mb={"md"}>
        <StatusSelector status={status} setStatus={setStatus} />
        <PrioritySelector priority={priority} setPriority={setPriority} />
        <LeadTaskSelector lead={lead} setLead={setLead} />
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

        <Button
          compact
          variant="filled"
          loading={createTask.fetching}
          onClick={() => {
            onCreateTask();
          }}
        >
          Create Task
        </Button>
      </Group>
    </Modal>
  );
};

export default NewTask;
