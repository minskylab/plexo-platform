import { Navbar, NavLink, Skeleton, Stack, useMantineTheme } from "@mantine/core";
import { Rocket } from "tabler-icons-react";
import router from "next/router";

import { useData } from "lib/hooks/useData";
import { Project } from "lib/types";

const ProjectsList = () => {
  const theme = useMantineTheme();
  const { projectsData, isLoadingProjects } = useData({});

  const projects = projectsData?.projects
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map((p: Project, index: number) => {
      return (
        <NavLink
          key={index}
          label={p.name}
          icon={<Rocket size={16} color={theme.colors.brand[4]} />}
          onClick={() => router.push(`/projects/${p.id}`)}
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
      {isLoadingProjects ? (
        <Stack spacing={5}>
          <Skeleton height={38} />
          <Skeleton height={38} />
        </Stack>
      ) : (
        projects
      )}
    </Navbar.Section>
  );
};

export default ProjectsList;
