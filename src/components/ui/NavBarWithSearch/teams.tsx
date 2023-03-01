import { Navbar, NavLink, useMantineTheme } from "@mantine/core";
import { useData } from "lib/useData";
import { Book, Dice, Dna, Dna2, Rocket } from "tabler-icons-react";

const TeamsList = () => {
  const theme = useMantineTheme();
  const { teamsData, isLoadingTeams } = useData({});

  const teams = teamsData?.teams.map((p, index) => {
    return (
      <NavLink
        key={index}
        label={p.name}
        icon={<Dna size={16} color={theme.colors.red[4]} />}
      ></NavLink>
    );
  });

  return (
    <Navbar.Section>
      {teams}
      {/* <NavLink label="Research" icon={<Rocket size={16} color={theme.colors.blue[4]} />}></NavLink>

      <NavLink
        label="Management"
        icon={<Book size={16} color={theme.colors.gray[5]} />}
        defaultOpened
        opened={true}
      >
        <NavLink icon={<Dice size={16} color={theme.colors.gray[6]} />} label="Main Team" />
      </NavLink>

      <NavLink
        label="Development"
        icon={<Dna2 size={16} color={theme.colors.orange[4]} />}
        defaultOpened
        opened={true}
      ></NavLink> */}
    </Navbar.Section>
  );
};

export default TeamsList;
