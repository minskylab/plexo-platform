import { Button, Kbd, Menu, Text, TextInput, Avatar, Skeleton, Tooltip } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";

import { Member, Task } from "modules/app/datatypes";
import { useData } from "lib/useData";
import { useTaskActions } from "lib/useTaskActions";

export const LeadTaskPhoto = (member: Member | null) => {
  return member?.photoUrl ? (
    <Avatar src={member.photoUrl} size="sm" radius="xl" />
  ) : (
    <Avatar size="sm" radius="xl" />
  );
};

export const LeadTaskName = (member: Member | null) => {
  return member ? member?.name : "Lead";
};

type GenericLeadMenuProps = {
  children: React.ReactNode;
  onSelect?: (member: Member | null) => void;
  task?: Task;
};

export const GenericLeadTaskMenu = ({ children, onSelect, task }: GenericLeadMenuProps) => {
  const { membersData, isLoadingMembers, memberData } = useData(task?.leadId);
  const { fetchUpdateTask } = useTaskActions();
  const memberName = memberData?.memberById.name;

  const onUpdateTaskLead = async (leadId: string | null) => {
    const res = await fetchUpdateTask({
      taskId: task?.id,
      leadId: leadId,
    });

    if (res.data) {
      showNotification({
        autoClose: 5000,
        title: "Lead updated",
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
        <Tooltip label={memberName ? `Lead by ${memberName}` : "Lead by"} position="bottom">
          {children}
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown>
        <TextInput
          placeholder="Lead by..."
          variant="filled"
          rightSection={<Kbd px={8}>A</Kbd>}
        ></TextInput>
        <Menu.Divider />
        <Menu.Item
          icon={<Avatar size="sm" radius="xl" />}
          onClick={() => {
            onSelect && onSelect(null);
            task && onUpdateTaskLead(null);
          }}
        >
          Unassigned
        </Menu.Item>
        {isLoadingMembers ? (
          <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
        ) : (
          membersData?.members.map(m => {
            return (
              <Menu.Item
                key={m.id}
                icon={
                  m?.photoUrl ? (
                    <Avatar src={m.photoUrl} size="sm" radius="xl" />
                  ) : (
                    <Avatar size="sm" radius="xl" />
                  )
                }
                onClick={() => {
                  onSelect && onSelect(m);
                  task && onUpdateTaskLead(m.id);
                }}
              >
                {m.name}
              </Menu.Item>
            );
          })
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

type LeadTaskSelectorProps = {
  lead: Member | null;
  setLead: (lead: Member | null) => void;
};

export const LeadTaskSelector = ({ lead, setLead }: LeadTaskSelectorProps) => {
  return (
    <GenericLeadTaskMenu onSelect={member => setLead(member)}>
      {typeof lead === "undefined" ? (
        <Button compact variant="light" color={"gray"}>
          {LeadTaskPhoto(lead)}
        </Button>
      ) : (
        <Button compact variant="light" color={"gray"} leftIcon={LeadTaskPhoto(lead)}>
          <Text size={"xs"}>{LeadTaskName(lead)}</Text>
        </Button>
      )}
    </GenericLeadTaskMenu>
  );
};