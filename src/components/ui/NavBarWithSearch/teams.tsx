import { Navbar, NavLink, Skeleton, Stack, useMantineTheme } from "@mantine/core";
import { Dna } from "tabler-icons-react";
import router from "next/router";

import { useData } from "lib/hooks/useData";
import { Team } from "lib/types";

const TeamsList = () => {
  const theme = useMantineTheme();
  const { teamsData, isLoadingTeams } = useData({});

  const teams = teamsData?.teams
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
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

  return (
    <Navbar.Section>
      {isLoadingTeams ? (
        <Stack>
          <Skeleton height={20} />
          <Skeleton height={20} />
          <Skeleton height={20} />
        </Stack>
      ) : (
        teams
      )}
    </Navbar.Section>
  );
};

export default TeamsList;
