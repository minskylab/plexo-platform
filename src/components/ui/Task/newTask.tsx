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
  Popover,
  Tooltip,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import { AlertCircle, CalendarTime, Check, X } from "tabler-icons-react";
import { useState } from "react";

import { DateLabel } from "lib/utils";
import { useActions } from "lib/hooks/useActions";
import { LeadTaskSelector } from "./lead";
import { ProjectSelector } from "./project";
import { LabelsSelector } from "./labels";
import { AssigneesSelector } from "./assignees";
import { statusName, StatusSelector } from "./status";
import { Member, Project } from "lib/types";
import { priorityName, PrioritySelector } from "./priority";
import { TaskStatus, TaskPriority } from "integration/graphql";

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
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);

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
        description: description.length ? description : null,
        status: statusName(status),
        priority: priorityName(priority),
        dueDate: dueDate,
        projectId: project?.id,
        leadId: lead?.id, //revisar
        labels: selectedLabels,
        assigness: selectedAssignees,
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
    setSelectedAssignees([]);
    setDueDate(null);
  };

  return (
    <Modal
      overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.5}
      transition={"slide-up"}
      size={"xl"}
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
        <AssigneesSelector
          selectedAssignees={selectedAssignees}
          setSelectedAssignees={setSelectedAssignees}
        />
        <LabelsSelector selectedLabels={selectedLabels} setSelectedLabels={setSelectedLabels} />
        <ProjectSelector project={project} setProject={setProject} />
        <Popover position="bottom" shadow="md">
          <Popover.Target>
            <Tooltip label="Set due date" position="bottom">
              <Button compact variant="light" color={"gray"} leftIcon={<CalendarTime size={16} />}>
                <Text size={"xs"}>{DateLabel(dueDate, "Due date")}</Text>
              </Button>
            </Tooltip>
          </Popover.Target>
          <Popover.Dropdown>
            <Calendar value={dueDate} onChange={setDueDate} />
          </Popover.Dropdown>
        </Popover>
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
