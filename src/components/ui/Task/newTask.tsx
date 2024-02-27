import {
  Modal,
  Group,
  TextInput,
  Textarea,
  Button,
  Switch,
  Text,
  Popover,
  Tooltip,
  ActionIcon,
  createStyles,
  Stack,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useToggle } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { CalendarTime, Check, Robot, Subtask, X } from "tabler-icons-react";
import { useState, useEffect } from "react";
import { useQuery } from "urql";

import { DateLabel } from "lib/utils";
import { useActions } from "lib/hooks/useActions";
import { LeadTaskSelector } from "./lead";
import { ProjectSelector } from "./project";
import { LabelsSelector } from "./labels";
import { AssigneesSelector } from "./assignees";
import { statusName, StatusSelector } from "./status";
import { Member, Project } from "lib/types";
import { priorityName, PrioritySelector } from "./priority";
import { TaskStatus, TaskPriority, SuggestNewTaskDocument } from "integration/graphql";
import NewSubTasks from "./newSubtasks";
import { usePlexoContext } from "context/PlexoContext";

type NewTaskProps = {
  newTaskOpened: boolean;
  setNewTaskOpened: (newTaskOpened: boolean) => void;
  createMore: boolean;
  setCreateMore: (createMore: boolean) => void;
};

export type SubTask = {
  title: string;
  status: TaskStatus;
  lead: Member | null;
};

const useStyles = createStyles(theme => ({
  input: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    "&:focus-within": {
      borderColor: theme.colors.brand[6],
    },
  },
}));

const parseSubtasks = (subtasks: SubTask[]) => {
  return subtasks.map(task => {
    return {
      title: task.title,
      leadId: task.lead?.id,
      status: statusName(task.status),
    };
  });
};

const NewTask = ({ newTaskOpened, setNewTaskOpened, createMore, setCreateMore }: NewTaskProps) => {
  const { classes, theme } = useStyles();
  const [showSubtasks, toggleSubtasks] = useToggle([false, true]);
  const { createTask, fetchCreateTask } = useActions();
  const { taskId, setTaskId } = usePlexoContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.Backlog);
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.None);
  const [lead, setLead] = useState<Member | null>(null);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [subtasks, setSubtasks] = useState<SubTask[]>([]);

  const [{ data: taskSuggestionData, fetching: isLoadingTaskSuggestion }, fetchTaskSuggestion] =
    useQuery({
      pause: true,
      query: SuggestNewTaskDocument,
      variables: {
        input: {
          title: title,
          description: description,
          dueDate: dueDate,
          status: status,
          priority: priority,
        },
      },
    });

  useEffect(() => {
    if (taskSuggestionData) {
      const res = taskSuggestionData;

      setTitle(res?.suggestNextTask.title || title);
      setDescription(res?.suggestNextTask.description || description);
      setStatus(res?.suggestNextTask.status || status);
      setPriority(res?.suggestNextTask.priority || priority);
      setDueDate(res?.suggestNextTask.dueDate || dueDate);
    }
  }, [taskSuggestionData]);

  const applyAiTaskSuggestion = async () => {
    fetchTaskSuggestion();
  };

  const onCreateTask = async () => {
    const res = await fetchCreateTask({
      input: {
        title: title,
        description: description.length ? description : null,
        status: statusName(status),
        priority: priorityName(priority),
        dueDate: dueDate,
        projectId: project?.id,
        leadId: lead?.id,
        labels: selectedLabels,
        assignees: selectedAssignees,
        subtasks: parseSubtasks(subtasks),
        parentId: taskId,
      },
    });

    if (res.data) {
      resetInitialValues(); //Reset values
      showNotification({
        autoClose: 5000,
        title: "Task created",
        message: res.data.createTask.title,
        color: "blue",
        icon: <Check size={18} />,
      });
      if (!createMore) {
        setNewTaskOpened(false); //Close modal
      }
    }
    if (res.error) {
      showNotification({
        autoClose: 5000,
        title: "Error!",
        message: "Try again",
        color: "red",
        icon: <X size={18} />,
      });
      if (!createMore) {
        setNewTaskOpened(false); //Close modal
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
    setSubtasks([]);
    toggleSubtasks(false);
    setTaskId(undefined);
  };

  return (
    <Modal
      closeOnEscape
      opened={newTaskOpened}
      onClose={() => {
        setNewTaskOpened(false);
        setCreateMore(false);
        resetInitialValues();
      }}
      title={
        <Group spacing={8}>
          <Tooltip label="AI Suggestion" position="bottom">
            <ActionIcon
              variant="light"
              color="brand"
              onClick={applyAiTaskSuggestion}
              loading={isLoadingTaskSuggestion}
            >
              <Robot size="1rem" />
            </ActionIcon>
          </Tooltip>
          <Text size={"sm"}>New Task</Text>
        </Group>
      }
      overlayProps={{
        color: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2],
        opacity: 0.5,
        transitionProps: {
          transition: "slide-up",
        },
      }}
      size={"xl"}
      shadow="md"
    >
      <Stack spacing={10}>
        <TextInput
          data-autofocus
          placeholder="Task Title"
          size="lg"
          value={title}
          onChange={e => setTitle(e.target.value)}
          classNames={{
            input: classes.input,
          }}
        />
        <Textarea
          autosize
          placeholder="Add description..."
          size="sm"
          minRows={2}
          value={description}
          onChange={e => setDescription(e.target.value)}
          classNames={{
            input: classes.input,
          }}
        />
        <Group spacing={6} mb={"md"}>
          <StatusSelector status={status} setStatus={setStatus} type="button" />
          <PrioritySelector priority={priority} setPriority={setPriority} />
          <LeadTaskSelector lead={lead} setLead={setLead} type="button" />
          <AssigneesSelector
            selectedAssignees={selectedAssignees}
            setSelectedAssignees={setSelectedAssignees}
          />
          <LabelsSelector selectedLabels={selectedLabels} setSelectedLabels={setSelectedLabels} />
          <ProjectSelector project={project} setProject={setProject} />
          <Popover position="bottom" shadow="md" withinPortal>
            <Popover.Target>
              <Tooltip label="Set due date" position="bottom">
                <Button
                  compact
                  variant="light"
                  color={"gray"}
                  leftIcon={<CalendarTime size={16} />}
                >
                  <Text size={"xs"}>{DateLabel(dueDate, "Due date")}</Text>
                </Button>
              </Tooltip>
            </Popover.Target>
            <Popover.Dropdown>
              <DatePicker value={dueDate} onChange={setDueDate} />
            </Popover.Dropdown>
          </Popover>
          <Button
            compact
            variant="light"
            color={"gray"}
            leftIcon={<Subtask size={16} />}
            onClick={() => toggleSubtasks()}
          >
            <Text size={"xs"}>Subtasks</Text>
          </Button>
        </Group>
      </Stack>

      {showSubtasks && <NewSubTasks subtasks={subtasks} setSubtasks={setSubtasks} />}
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
          disabled={title.length ? false : true}
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
