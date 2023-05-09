import { Navbar, NavLink, useMantineTheme } from "@mantine/core";
import { useData } from "lib/useData";
import router from "next/router";
import { Dna } from "tabler-icons-react";

const TeamsList = () => {
  const theme = useMantineTheme();
  const { teamsData, isLoadingTeams } = useData({});

  const teams = teamsData?.teams.map((p, index) => {
    return (
      <NavLink
        key={index}
        label={p.name}
        icon={<Dna size={16} color={theme.colors.brand[6]} />}
        onClick={() => router.push(`/teams/${p.id}`)}
      ></NavLink>
    );
  });

  return <Navbar.Section>{teams}</Navbar.Section>;
};

export default TeamsList;
