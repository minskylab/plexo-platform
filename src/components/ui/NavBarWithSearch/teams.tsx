import { Navbar, NavLink, useMantineTheme } from "@mantine/core";
import { Dna } from "tabler-icons-react";
import router from "next/router";

import { Team } from "lib/types";

type TeamsListProps = {
  data: Team[] | undefined;
  isLoading: boolean;
};

const TeamsList = ({ data, isLoading }: TeamsListProps) => {
  const theme = useMantineTheme();

  const teams = data
    ?.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map((t: Team, index: number) => {
      return (
        <NavLink
          key={index}
          label={t.name}
          icon={<Dna size={16} color={theme.colors.brand[6]} />}
          onClick={() => router.push(`/teams/${t.id}`)}
          styles={theme => ({
            root: {
              borderRadius: theme.radius.sm,
            },
          })}
        ></NavLink>
      );
    });

  return <Navbar.Section>{teams}</Navbar.Section>;
};

export default TeamsList;
