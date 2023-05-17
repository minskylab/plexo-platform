import { Modal, useMantineTheme, TextInput, Divider, Text, NavLink } from "@mantine/core";
import { Dna } from "tabler-icons-react";

import { useData } from "lib/hooks/useData";

type JoinTeamProps = {
  joinTeamOpened: boolean;
  setJoinTeamOpened: (JoinTeamOpened: boolean) => void;
};

const JoinTeam = ({ joinTeamOpened, setJoinTeamOpened }: JoinTeamProps) => {
  const theme = useMantineTheme();
  const { teamsData, isLoadingTeams } = useData({});

  const teams = teamsData?.teams.map(t => {
    return (
      <NavLink
        key={t.id}
        label={t.name}
        icon={<Dna size={16} color={theme.colors.red[4]} />}
        onClick={() => setJoinTeamOpened(false)}
      />
    );
  });

  return (
    <Modal
      withCloseButton={false}
      opened={joinTeamOpened}
      onClose={() => setJoinTeamOpened(false)}
      shadow="md"
      size={"lg"}
      overlayOpacity={0.5}
      transition={"slide-up"}
      overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
    >
      <TextInput placeholder="Join a team..." variant="unstyled" size="md"></TextInput>
      <Divider />
      <Text py={5} size={"xs"} color="gray">
        Teams
      </Text>
      {teams}
    </Modal>
  );
};

export default JoinTeam;
