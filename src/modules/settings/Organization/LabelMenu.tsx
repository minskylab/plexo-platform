import { Menu, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { Edit, Trash } from "tabler-icons-react";

import { useActions } from "lib/hooks/useActions";
import { Label } from "lib/types";
import { ErrorNotification, SuccessNotification } from "lib/notifications";
import { UpdateLabel } from "modules/settings/Organization/UpdateLabel";

type LabelMenuProps = {
  children: React.ReactNode;
  label: Label | undefined;
};

export const LabelMenu = ({ children, label }: LabelMenuProps) => {
  const { fetchDeleteLabel } = useActions();
  const [opened, { open, close }] = useDisclosure(false);

  const onDeleteLabel = async () => {
    const res = await fetchDeleteLabel({
      labelId: label?.id,
    });

    if (res.data) {
      SuccessNotification("Label deleted", res.data.deleteLabel.name);
    }
    if (res.error) {
      ErrorNotification();
    }
  };

  const openDeleteModal = () =>
    openConfirmModal({
      title: "Delete Label",
      centered: true,
      children: <Text size="sm">Are you sure you want to delete this Label?</Text>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      onConfirm: () => onDeleteLabel(),
    });

  return (
    <>
      <UpdateLabel label={label} opened={opened} close={close} />
      <Menu shadow="md" width={180} position="left-start">
        <Menu.Target>{children}</Menu.Target>

        <Menu.Dropdown>
          <Menu.Item py={7} icon={<Edit size={16} />} onClick={open}>
            Edit
          </Menu.Item>
          <Menu.Item py={7} icon={<Trash size={16} />} onClick={openDeleteModal}>
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};
