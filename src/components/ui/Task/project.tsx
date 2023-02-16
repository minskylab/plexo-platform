import { Button, Kbd, Menu, Text, TextInput, Skeleton } from "@mantine/core";
import { useState } from "react";
import { LayoutGrid } from "tabler-icons-react";

import { ProjectsType } from "./types";
import { useData } from "lib/useData";

export const ProjectIcon = (project: ProjectsType | undefined) => {
  //insert project icon
  return <LayoutGrid size={16} />;
};

export const ProjectName = (project: ProjectsType | undefined) => {
  return project ? project?.name : "Project";
};

type GenericProjectsMenuProps = {
  children: React.ReactNode;
  onSelect?: (project: ProjectsType | undefined) => void;
};

export const GenericProjectsMenu = ({ children, onSelect }: GenericProjectsMenuProps) => {
  const { projectsData, isLoadingProjects } = useData();

  return (
    <Menu shadow="md" width={180}>
      <Menu.Target>
        {/* <ActionIcon variant="light" radius={"sm"}>
                {PriorityIcon(task.priority)}
              </ActionIcon> */}
        {children}
      </Menu.Target>

      <Menu.Dropdown>
        <TextInput
          placeholder="Add to project..."
          variant="filled"
          rightSection={<Kbd px={8}>P</Kbd>}
        ></TextInput>
        <Menu.Divider />
        <Menu.Item icon={<LayoutGrid size={16} />} onClick={() => onSelect && onSelect(undefined)}>
          No project
        </Menu.Item>
        {isLoadingProjects ? (
          <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
        ) : (
          projectsData?.projects.map(p => {
            return (
              <Menu.Item
                key={p.id}
                icon={
                  //insert project icon
                  <LayoutGrid size={16} />
                }
                onClick={() => onSelect && onSelect(p)}
              >
                {p.name}
              </Menu.Item>
            );
          })
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

type ProjectSelectorProps = {
  initialProject?: ProjectsType;
};

export const ProjectSelector = ({ initialProject }: ProjectSelectorProps) => {
  const [project, setProject] = useState<ProjectsType | undefined>(initialProject);

  return (
    <GenericProjectsMenu onSelect={project => setProject(project)}>
      <Button compact variant="light" color={"gray"} leftIcon={ProjectIcon(project)}>
        <Text size={"xs"}>{ProjectName(project)}</Text>
      </Button>
    </GenericProjectsMenu>
  );
};
