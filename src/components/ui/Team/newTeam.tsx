import { Group, Modal, useMantineTheme, Text, TextInput, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { Check, X } from "tabler-icons-react";

import { useActions } from "lib/hooks/useActions";
import { useData } from "lib/hooks/useData";
import { MemberSelector } from "../Project/members";
import { ProjectsSelector } from "./projects";

type NewTeamProps = {
  newTeamOpened: boolean;
  setNewTeamOpened: (newTeamOpened: boolean) => void;
};

const NewTeam = ({ newTeamOpened, setNewTeamOpened }: NewTeamProps) => {
  const theme = useMantineTheme();
  const { teamsData } = useData({});

  const [name, setName] = useState("");
  const [visibility, setVisibility] = useState("");
  const [prefix, setPrefix] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [projects, setProjects] = useState<string[]>([]);
  const [teamExists, setTeamExists] = useState(false);

  const { createTeam, fetchCreateTeam } = useActions();

  const onCreateTeam = async () => {
    const res = await fetchCreateTeam({
      name: name,
      prefix: name,
      ownerId: "52fbe576-843d-47a5-a84c-79ce00d18265", //Bregy
      members: members,
      projects: projects,
    });

    if (res.data) {
      setNewTeamOpened(false);
      resetInitialValues();
      showNotification({
        autoClose: 5000,
        title: "Team created",
        message: res.data.createTeam.name,
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
  };

  const resetInitialValues = () => {
    setName("");
    setVisibility("");
    setPrefix("");
    setMembers([]);
    setProjects([]);
    setTeamExists(false);
  };

  const handleTeamName = (value: string) => {
    setName(value);
    const evalName =
      teamsData?.teams.some(t => t.name.toLowerCase() == value.toLowerCase()) || false;
    setTeamExists(evalName);
  };

  return (
    <Modal
      overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.5}
      transition={"slide-up"}
      size={"lg"}
      opened={newTeamOpened}
      onClose={() => {
        setNewTeamOpened(false);
        resetInitialValues();
      }}
      shadow="md"
      title={<Text size={"sm"}>New Team</Text>}
    >
      <TextInput
        placeholder="Team name"
        variant="unstyled"
        size="md"
        autoFocus
        error={teamExists ? "Team already exists" : false}
        value={name}
        onChange={e => handleTeamName(e.target.value)}
        sx={{
          marginBottom: 16,
        }}
      />
      <Group spacing={6} mb={"md"}>
        <MemberSelector members={members} setMembers={setMembers} />
        <ProjectsSelector projects={projects} setProjects={setProjects} />
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
        <Button compact variant="default" onClick={() => setNewTeamOpened(false)}>
          Cancel
        </Button>
        <Button
          compact
          disabled={!name.length || teamExists}
          variant="filled"
          loading={createTeam.fetching}
          onClick={() => {
            onCreateTeam();
          }}
        >
          Create Team
        </Button>
      </Group>
    </Modal>
  );
};

export default NewTeam;
