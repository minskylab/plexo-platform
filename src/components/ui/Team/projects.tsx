import { Button, Menu, Text, TextInput, Skeleton, Checkbox, Tooltip } from "@mantine/core";
import { LayoutGrid } from "tabler-icons-react";

import { useData } from "lib/hooks/useData";

export const ProjectName = (name: string | undefined) => {
  return name ? name : "Project";
};

type GenericProjectsMenuProps = {
  children: React.ReactNode;
  projects?: string[];
  setProjects?: (projects: string[]) => void;
};

export const GenericProjectsMenu = ({
  children,
  projects,
  setProjects,
}: GenericProjectsMenuProps) => {
  const { projectsData, isLoadingProjects } = useData({});

  return (
    <Menu shadow="md" closeOnItemClick={false} position="bottom-start">
      <Menu.Target>
        <Tooltip label="Project members" position="bottom">
          {children}
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown>
        <TextInput placeholder="Change project members" variant="filled"></TextInput>
        <Menu.Divider />
        {isLoadingProjects ? (
          <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
        ) : (
          <Checkbox.Group
            spacing={0}
            value={projects}
            onChange={setProjects}
            orientation="vertical"
          >
            {projectsData?.projects.map(p => {
              return (
                <Menu.Item key={p.id}>
                  <Checkbox
                    size="xs"
                    value={p.id}
                    label={ProjectName(p.name)}
                    styles={{
                      body: {
                        alignItems: "center",
                      },
                      label: {
                        paddingLeft: 10,
                      },
                    }}
                  />
                </Menu.Item>
              );
            })}
          </Checkbox.Group>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

type ProjectsSelectorProps = {
  projects: string[];
  setProjects: (projects: string[]) => void;
};

export const ProjectsSelector = ({ projects, setProjects }: ProjectsSelectorProps) => {
  return (
    <GenericProjectsMenu projects={projects} setProjects={setProjects}>
      <Button compact variant="light" color={"gray"} leftIcon={<LayoutGrid size={16} />}>
        {projects.length ? (
          <Text size={"xs"}>{projects.length} Projects</Text>
        ) : (
          <Text size={"xs"}>Projects</Text>
        )}
      </Button>
    </GenericProjectsMenu>
  );
};
