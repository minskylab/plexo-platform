import { Button, Menu, Text, TextInput, Skeleton, Checkbox, Tooltip } from "@mantine/core";
import { LayoutGrid } from "tabler-icons-react";

import { useData } from "lib/hooks/useData";
import { Project, TeamById } from "lib/types";
import { useActions } from "lib/hooks/useActions";
import { useState, useEffect } from "react";
import { ErrorNotification, SuccessNotification } from "lib/notifications";

type Payload = {
  id: string;
};

export const ProjectName = (name: string | undefined) => {
  return name ? name : "Project";
};

export const projectsId = (projects: Payload[] | undefined) => {
  return projects?.map(a => a.id);
};

type GenericProjectsMenuProps = {
  children: React.ReactNode;
  selectedProjects?: string[];
  setSelectedProjects?: (projects: string[]) => void;
  team?: TeamById;
};

export const GenericProjectsMenu = ({
  children,
  selectedProjects,
  setSelectedProjects,
  team,
}: GenericProjectsMenuProps) => {
  const { fetchUpdateTeam } = useActions();
  const { projectsData, isLoadingProjects } = useData({});

  const [projects, setProjects] = useState<string[] | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [projectOptions, setProjectOptions] = useState<Project[]>([]);

  useEffect(() => {
    if (projectsData?.projects) {
      searchValue == ""
        ? setProjectOptions(projectsData?.projects)
        : setProjectOptions(
            projectsData?.projects.filter((item: Project) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
          );
    }
  }, [projectsData,searchValue]);

  const labelValue = selectedProjects
    ? selectedProjects
    : projects
    ? projects
    : projectsId(team?.projects);
  const onChangeLabel = selectedProjects ? setSelectedProjects : setProjects;

  const onUpdateTeamProjects = async (projects: string[]) => {
    const res = await fetchUpdateTeam({
      teamId: team?.id,
      projects: projects,
    });

    if (res.data) {
      SuccessNotification("Projects updated", res.data.updateTeam.name);
    }
    if (res.error) {
      ErrorNotification();
    }
  };

  useEffect(() => {
    if (projects) {
      projects && onUpdateTeamProjects(projects);
    }
  }, [projects]);

  return (
    <Menu shadow="md" closeOnItemClick={false} position="bottom-start" withinPortal>
      <Menu.Target>
        <Tooltip label="Project members" position="bottom">
          {children}
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown>
        <TextInput
          placeholder="Change project members"
          variant="filled"
          value={searchValue}
          onChange={event => setSearchValue(event.currentTarget.value)}
        ></TextInput>
        <Menu.Divider />
        {isLoadingProjects ? (
          <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
        ) : (
          <Checkbox.Group mt={10} value={labelValue} onChange={onChangeLabel}>
            {projectOptions.map((p: Project) => {
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
    <GenericProjectsMenu selectedProjects={projects} setSelectedProjects={setProjects}>
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
