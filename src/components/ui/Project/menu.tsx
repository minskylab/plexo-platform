import { Menu, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { Trash } from "tabler-icons-react";
import router from "next/router";

import { useActions } from "lib/hooks/useActions";
import { ProjectById } from "lib/types";
import { ErrorNotification, SuccessNotification } from "lib/notifications";

type ProjectMenuProps = {
  children: React.ReactNode;
  project: ProjectById | undefined;
};

export const ProjectMenu = ({ children, project }: ProjectMenuProps) => {
  const { fetchDeleteProject } = useActions();

  const onDeleteProject = async () => {
    const res = await fetchDeleteProject({
      projectId: project?.id,
    });

    if (res.data) {
      SuccessNotification("Project deleted", res.data.deleteProject.name);
      router.push("/tasks");
    }
    if (res.error) {
      ErrorNotification();
    }
  };

  const openDeleteModal = () =>
    openConfirmModal({
      title: "Delete your project",
      centered: true,
      children: <Text size="sm">Are you sure you want to delete your project?</Text>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      onConfirm: () => onDeleteProject(),
    });

  return (
    <Menu shadow="md" width={180} position="left-start">
      <Menu.Target>{children}</Menu.Target>

      <Menu.Dropdown>
        <Menu.Item py={7} icon={<Trash size={16} />} onClick={openDeleteModal}>
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
