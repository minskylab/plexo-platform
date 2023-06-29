import { Navbar, NavLink, useMantineTheme } from "@mantine/core";
import { Dna } from "tabler-icons-react";
import router from "next/router";

import { useData } from "lib/hooks/useData";
import { Team } from "lib/types";

const TeamsList = () => {
  const theme = useMantineTheme();
  const { teamsData, isLoadingTeams } = useData({});

  const teams = teamsData?.teams.map((t: Team, index: number) => {
    return (
      <NavLink
        key={index}
        label={t.name}
        icon={<Dna size={16} color={theme.colors.brand[6]} />}
        onClick={() => router.push(`/teams/${t.id}`)}
      ></NavLink>
    );
  });

  return <Navbar.Section>{teams}</Navbar.Section>;
};

export default TeamsList;
