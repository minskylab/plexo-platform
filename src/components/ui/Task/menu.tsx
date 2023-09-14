import { Menu, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { Trash } from "tabler-icons-react";
import router from "next/router";

import { useActions } from "lib/hooks/useActions";
import { Task, TaskById } from "lib/types";
import { ErrorNotification, SuccessNotification } from "lib/notifications";

type TaskMenuProps = {
  children: React.ReactNode;
  task: Task | TaskById | undefined;
};

export const TaskMenu = ({ children, task }: TaskMenuProps) => {
  const { fetchDeleteTask } = useActions();

  const onDeleteTask = async () => {
    const res = await fetchDeleteTask({
      taskId: task?.id,
    });

    if (res.data) {
      router.push("/tasks");
      SuccessNotification("Task deleted", res.data.deleteTask.title);
    }
    if (res.error) {
      ErrorNotification();
    }
  };

  const openDeleteModal = () =>
    openConfirmModal({
      title: "Delete your task",
      centered: true,
      children: <Text size="sm">Are you sure you want to delete your task?</Text>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      onConfirm: () => onDeleteTask(),
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
