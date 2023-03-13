import {
  Button,
  Kbd,
  Menu,
  Text,
  TextInput,
  Skeleton,
  Tooltip,
  Checkbox,
  Group,
  createStyles,
} from "@mantine/core";
import { LayoutGrid } from "tabler-icons-react";

import { Project, TaskById } from "modules/app/datatypes";
import { useData } from "lib/useData";
import { useActions } from "lib/useActions";
import { statusName } from "./status";
import { priorityName } from "./priority";
import { assigneesId } from "./assignees";
import { ErrorNotification, SuccessNotification } from "lib/notifications";

const useStyles = createStyles(theme => ({
  checkbox: {
    width: "100%",
  },
}));

export const ProjectIcon = (project?: Project | null) => {
  //insert project icon
  return <LayoutGrid size={16} />;
};

export const ProjectName = (name: string | undefined) => {
  return name ? name : "Project";
};

export const ProjectsCheckboxGroup = () => {
  const { classes } = useStyles();
  const { projectsData } = useData({});

  return (
    <Checkbox.Group
      orientation="vertical"
      spacing={0}
      /* value={labelValue}
            onChange={onChangeLabel} */
    >
      {projectsData?.projects.map(p => {
        return (
          <Checkbox
            key={p.id}
            size="xs"
            pb={10}
            value={p.id}
            label={
              <Group spacing={5}>
                {ProjectIcon(p)}
                {ProjectName(p.name)}
              </Group>
            }
            classNames={{
              body: classes.checkbox,
              labelWrapper: classes.checkbox,
            }}
          />
        );
      })}
    </Checkbox.Group>
  );
};

type GenericProjectsMenuProps = {
  children: React.ReactNode;
  onSelect?: (project: Project | null) => void;
  task?: TaskById | undefined;
};

export const GenericProjectsMenu = ({ children, onSelect, task }: GenericProjectsMenuProps) => {
  const { projectsData, isLoadingProjects } = useData({});
  const { fetchUpdateTask } = useActions();

  const onUpdateTaskProject = async (projectId: string | null) => {
    const res = await fetchUpdateTask({
      taskId: task?.id,
      projectId: projectId,
      priority: priorityName(task?.priority),
      status: statusName(task?.status),
      title: task?.title,
      description: task?.description,
      dueDate: task?.dueDate,
      leadId: task?.leader?.id,
      labels: task?.labels,
      assignees: assigneesId(task),
    });

    if (res.data) {
      SuccessNotification("Project updated", res.data.updateTask.title);
    }
    if (res.error) {
      ErrorNotification();
    }
  };

  return (
    <Menu shadow="md" width={180} position="bottom-start">
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
            task && onUpdateTaskProject(null);
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
                  task && onUpdateTaskProject(p.id);
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
