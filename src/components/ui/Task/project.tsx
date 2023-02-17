import { Button, Kbd, Menu, Text, TextInput, Skeleton, Tooltip } from "@mantine/core";
import { LayoutGrid } from "tabler-icons-react";

import { Project } from "modules/app/datatypes";
import { useData } from "lib/useData";

export const ProjectIcon = (project: Project | undefined) => {
  //insert project icon
  return <LayoutGrid size={16} />;
};

export const ProjectName = (project: Project | undefined) => {
  return project ? project?.name : "Project";
};

type GenericProjectsMenuProps = {
  children: React.ReactNode;
  onSelect?: (project: Project | undefined) => void;
};

export const GenericProjectsMenu = ({ children, onSelect }: GenericProjectsMenuProps) => {
  const { projectsData, isLoadingProjects } = useData();

  return (
    <Menu shadow="md" width={180}>
      <Tooltip label="Add to project" position="bottom">
        {children}
      </Tooltip>

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
  project: Project | undefined;
  setProject: (project: Project | undefined) => void;
};

export const ProjectSelector = ({ project, setProject }: ProjectSelectorProps) => {
  return (
    <GenericProjectsMenu onSelect={project => setProject(project)}>
      <Button compact variant="light" color={"gray"} leftIcon={ProjectIcon(project)}>
        <Text size={"xs"}>{ProjectName(project)}</Text>
      </Button>
    </GenericProjectsMenu>
  );
};
