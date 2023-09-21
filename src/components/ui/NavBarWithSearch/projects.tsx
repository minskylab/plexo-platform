import { Navbar, NavLink, useMantineTheme } from "@mantine/core";
import { Rocket } from "tabler-icons-react";
import router from "next/router";

import { Project } from "lib/types";

type ProjectListProps = {
  data: Project[] | undefined;
  isLoading: boolean;
};

const ProjectsList = ({ data, isLoading }: ProjectListProps) => {
  const theme = useMantineTheme();

  const projects = data
    ?.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
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

  return <Navbar.Section>{projects}</Navbar.Section>;
};

export default ProjectsList;
