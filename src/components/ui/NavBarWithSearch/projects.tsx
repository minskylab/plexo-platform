import { Navbar, NavLink, useMantineTheme } from "@mantine/core";
import { Rocket } from "tabler-icons-react";
import router from "next/router";

import { useData } from "lib/hooks/useData";

const ProjectsList = () => {
  const theme = useMantineTheme();
  const { projectsData, isLoadingProjects } = useData({});

  const projects = projectsData?.projects.map((p, index) => {
    return (
      <NavLink
        key={index}
        label={p.name}
        icon={<Rocket size={16} color={theme.colors.brand[4]} />}
        onClick={() => router.push(`/projects/${p.id}`)}
      ></NavLink>
    );
  });

  return <Navbar.Section>{projects}</Navbar.Section>;
};

export default ProjectsList;
