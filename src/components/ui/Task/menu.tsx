import { Menu, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { Check, Trash, X } from "tabler-icons-react";

import { useActions } from "lib/hooks/useActions";
import { Task, TaskById } from "lib/types";

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
      showNotification({
        autoClose: 5000,
        title: "Task deleted",
        message: res.data.deleteTask.title,
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
        {/* <Menu.Item py={7}  icon={<ChartPie2 size={18} />}>Status</Menu.Item>
        <Menu.Item py={7}  icon={<AntennaBars5 size={18} />}>Priority</Menu.Item>
        <Menu.Item py={7}  icon={<UserCircle size={18} />}>Lead</Menu.Item>
        <Menu.Item py={7}  icon={<Tag size={18} />}>Labels</Menu.Item>
        <Menu.Item py={7}  icon={<LayoutGrid size={18} />}>Project</Menu.Item>
        <Menu.Divider /> */}
        <Menu.Item py={7} icon={<Trash size={16} />} onClick={openDeleteModal}>
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
