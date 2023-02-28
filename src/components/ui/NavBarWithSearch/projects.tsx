import { Navbar, NavLink, useMantineTheme } from "@mantine/core";
import { Rocket } from "tabler-icons-react";

import { useData } from "lib/useData";

const ProjectsList = () => {
  const theme = useMantineTheme();
  const { projectsData, isLoadingProjects } = useData({});

  const projects = projectsData?.projects.map((p, index) => {
    return (
      <NavLink
        key={index}
        label={p.name}
        icon={<Rocket size={16} color={theme.colors.blue[4]} />}
      ></NavLink>
    );
  });

  return <Navbar.Section>{projects}</Navbar.Section>;
};

export default ProjectsList;
