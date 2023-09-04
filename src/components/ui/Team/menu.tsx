import { Menu, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { Trash } from "tabler-icons-react";
import router from "next/router";

import { useActions } from "lib/hooks/useActions";
import { TeamById } from "lib/types";
import { ErrorNotification, SuccessNotification } from "lib/notifications";

type TeamMenuProps = {
  children: React.ReactNode;
  team: TeamById | undefined;
};

export const TeamMenu = ({ children, team }: TeamMenuProps) => {
  const { fetchDeleteTeam } = useActions();

  const onDeleteProject = async () => {
    const res = await fetchDeleteTeam({
      teamId: team?.id,
    });

    if (res.data) {
      router.push("/tasks");
      SuccessNotification("Project deleted", res.data.deleteTeam.name);
    }
    if (res.error) {
      ErrorNotification();
    }
  };

  const openDeleteModal = () =>
    openConfirmModal({
      title: "Delete your team",
      centered: true,
      children: <Text size="sm">Are you sure you want to delete your team?</Text>,
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
