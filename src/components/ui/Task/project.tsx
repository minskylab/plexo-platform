import { Button, Kbd, Menu, Text, TextInput, Skeleton, Tooltip } from "@mantine/core";
import { Check, LayoutGrid, X } from "tabler-icons-react";

import { Project } from "modules/app/datatypes";
import { useData } from "lib/useData";
import { useActions } from "lib/useActions";
import { showNotification } from "@mantine/notifications";

export const ProjectIcon = (project?: Project | null) => {
  //insert project icon
  return <LayoutGrid size={16} />;
};

export const ProjectName = (name: string | undefined) => {
  return name ? name : "Project";
};

type GenericProjectsMenuProps = {
  children: React.ReactNode;
  onSelect?: (project: Project | null) => void;
  taskId?: string;
};

export const GenericProjectsMenu = ({ children, onSelect, taskId }: GenericProjectsMenuProps) => {
  const { projectsData, isLoadingProjects } = useData({});
  const { fetchUpdateTask } = useActions();

  const onUpdateTaskProject = async (projectId: string | null) => {
    const res = await fetchUpdateTask({
      taskId: taskId,
      projectId: projectId,
    });

    if (res.data) {
      showNotification({
        autoClose: 5000,
        title: "Status updated",
        message: res.data.updateTask.title,
        color: "blue",
        icon: <Check size={18} />,
      });
    }
    if (res.error) {
      showNotification({
        autoClose: 5000,
        title: "Error!",
        message: "Try again",
        color: "red",
        icon: <X size={18} />,
      });
    }
  };

  return (
    <Menu shadow="md" width={180}>
      <Menu.Target>
        <Tooltip label="Add to project" position="bottom">
          {children}
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown>
        <TextInput
          placeholder="Add to project..."
          variant="filled"
          rightSection={<Kbd px={8}>P</Kbd>}
        ></TextInput>
        <Menu.Divider />
        <Menu.Item
          icon={<LayoutGrid size={16} />}
          onClick={() => {
            onSelect && onSelect(null);
            taskId && onUpdateTaskProject(null);
          }}
        >
          No project
        </Menu.Item>
        {isLoadingProjects ? (
          <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
        ) : (
          projectsData?.projects.map(p => {
            return (
              <Menu.Item
                key={p.id}
                icon={ProjectIcon(p)}
                onClick={() => {
                  onSelect && onSelect(p);
                  taskId && onUpdateTaskProject(p.id);
                }}
              >
                {ProjectName(p.name)}
              </Menu.Item>
            );
          })
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

type ProjectSelectorProps = {
  project: Project | null;
  setProject: (project: Project | null) => void;
};

export const ProjectSelector = ({ project, setProject }: ProjectSelectorProps) => {
  return (
    <GenericProjectsMenu onSelect={project => setProject(project)}>
      <Button compact variant="light" color={"gray"} leftIcon={ProjectIcon(project)}>
        <Text size={"xs"}>{ProjectName(project?.name)}</Text>
      </Button>
    </GenericProjectsMenu>
  );
};
