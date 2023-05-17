import {
  Group,
  Modal,
  useMantineTheme,
  Text,
  Box,
  TextInput,
  Textarea,
  Button,
  Popover,
  Tooltip,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import { AlertCircle, CalendarTime, Check, X } from "tabler-icons-react";
import { useState } from "react";

import { useActions } from "lib/hooks/useActions";
import { DateLabel } from "lib/utils";
import { Member } from "lib/types";
import { TeamSelector } from "./team";
import { LeadProjectSelector } from "./lead";
import { MemberSelector } from "./members";

type NewProjectProps = {
  newProjectOpened: boolean;
  setNewProjectOpened: (newProjectOpened: boolean) => void;
};

const NewProject = ({ newProjectOpened, setNewProjectOpened }: NewProjectProps) => {
  const theme = useMantineTheme();

  const [name, setName] = useState("");
  const [prefix, setPrefix] = useState("");
  const [description, setDescription] = useState("");
  const [lead, setLead] = useState<Member | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [members, setMembers] = useState<string[]>([]);
  const [teams, setTeams] = useState<string[]>([]);

  const { createProject, fetchCreateProject } = useActions();

  const onCreateProject = async () => {
    if (!name.length) {
      showNotification({
        id: "nameRequired",
        autoClose: 5000,
        title: "Name required",
        message: "Please enter a name before submitting",
        color: "yellow",
        icon: <AlertCircle size={18} />,
      });
    } else {
      const res = await fetchCreateProject({
        name: name,
        prefix: prefix,
        ownerId: "52fbe576-843d-47a5-a84c-79ce00d18265", //Bregy
        description: description.length ? description : null,
        leadId: lead?.id,
        dueDate: dueDate,
        startDate: startDate,
        members: members,
        teams: teams,
      });

      if (res.data) {
        setNewProjectOpened(false);
        resetInitialValues();
        showNotification({
          autoClose: 5000,
          title: "Project created",
          message: res.data.createProject.name,
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
    setName("");
    setPrefix("");
    setDescription("");
    setLead(null);
    setDueDate(null);
    setStartDate(null);
    setMembers([]);
    setTeams([]);
  };

  return (
    <Modal
      overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.5}
      transition={"slide-up"}
      size={"lg"}
      opened={newProjectOpened}
      onClose={() => {
        setNewProjectOpened(false);
        resetInitialValues();
      }}
      shadow="md"
      title={
        <Group spacing={8}>
          <Text size={"sm"}>New Project</Text>
        </Group>
      }
    >
      <Box>
        <TextInput
          placeholder="Project name"
          variant="unstyled"
          size="md"
          autoFocus
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Textarea
          placeholder="Description (optional)"
          variant="unstyled"
          size="sm"
          value={description}
          onChange={e => setDescription(e.target.value)}
          autosize
          minRows={2}
        />
      </Box>
      <Group spacing={6} mb={"md"}>
        <LeadProjectSelector lead={lead} setLead={setLead} />
        <MemberSelector members={members} setMembers={setMembers} />
        <TeamSelector teams={teams} setTeams={setTeams} />
        <Popover position="bottom" shadow="md">
          <Popover.Target>
            <Tooltip label="Change start date" position="bottom">
              <Button compact variant="light" color={"gray"} leftIcon={<CalendarTime size={16} />}>
                <Text size={"xs"}>{DateLabel(startDate, "Start date")}</Text>
              </Button>
            </Tooltip>
          </Popover.Target>
          <Popover.Dropdown>
            <Calendar value={startDate} onChange={setStartDate} />
          </Popover.Dropdown>
        </Popover>

        <Popover position="bottom" shadow="md">
          <Popover.Target>
            <Tooltip label="Change due date" position="bottom">
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
        <Button compact variant="default" onClick={() => setNewProjectOpened(false)}>
          Cancel
        </Button>
        <Button
          compact
          variant="filled"
          loading={createProject.fetching}
          onClick={() => {
            onCreateProject();
          }}
        >
          Create project
        </Button>
      </Group>
    </Modal>
  );
};

export default NewProject;
