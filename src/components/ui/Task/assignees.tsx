import {
  Button,
  Menu,
  Text,
  TextInput,
  Avatar,
  Skeleton,
  Checkbox,
  Group,
  Tooltip,
} from "@mantine/core";
import { Users } from "tabler-icons-react";
import { useEffect, useState } from "react";

import { useData } from "lib/useData";
import { Member, TaskById } from "modules/app/datatypes";
import { useActions } from "lib/useActions";
import { priorityName } from "./priority";
import { statusName } from "./status";
import { ErrorNotification, SuccessNotification } from "lib/notifications";

export const AssigneesIcon = (member: Member | undefined) => {
  return member?.photoUrl ? (
    <Avatar src={member.photoUrl} size="sm" radius="xl" />
  ) : (
    <Users size={16} />
  );
};

export const AssigneesPhoto = (member: Member | undefined) => {
  return (
    <Group spacing={5}>
      {member?.photoUrl ? (
        <Avatar src={member.photoUrl} size="sm" radius="xl" />
      ) : (
        <Avatar size="sm" radius="xl" />
      )}
      {member?.name}
    </Group>
  );
};

export const AssigneesName = (member: Member | undefined) => {
  return member ? member?.name : "Member";
};

export const assigneesId = (task: TaskById | undefined) => {
  return task?.assignees.map(a => a.id);
};

type GenericAssigneesMenuProps = {
  children: React.ReactNode;
  selectedAssignees?: string[];
  setSelectedAssignees?: (selectedAssignees: string[]) => void;
  task?: TaskById;
};

export const GenericAssigneesMenu = ({
  children,
  selectedAssignees,
  setSelectedAssignees,
  task,
}: GenericAssigneesMenuProps) => {
  const { membersData, isLoadingMembers } = useData({});
  const { fetchUpdateTask } = useActions();
  const [assignees, setAssignees] = useState<string[] | null>(null);

  const labelValue = selectedAssignees
    ? selectedAssignees
    : assignees
    ? assignees
    : assigneesId(task);
  const onChangeLabel = selectedAssignees ? setSelectedAssignees : setAssignees;

  const onUpdateTaskAssignees = async (assignees: string[]) => {
    const res = await fetchUpdateTask({
      taskId: task?.id,
      assignees: assignees,
      labels: task?.labels,
      leadId: task?.leader?.id,
      priority: priorityName(task?.priority),
      status: statusName(task?.status),
      title: task?.title,
      description: task?.description,
      dueDate: task?.dueDate,
      projectId: task?.project?.id,
    });

    if (res.data) {
      SuccessNotification("Assigness updated", res.data.updateTask.title);
    }
    if (res.error) {
      ErrorNotification();
    }
  };

  useEffect(() => {
    if (assignees) {
      onUpdateTaskAssignees(assignees);
    }
  }, [assignees]);

  return (
    <Menu shadow="md" width={250} closeOnItemClick={false} position="bottom-start">
      <Menu.Target>
        <Tooltip label="Assignees" position="bottom">
          {children}
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown>
        <TextInput placeholder="Change assigness" variant="filled"></TextInput>
        <Menu.Divider />
        {isLoadingMembers ? (
          <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
        ) : (
          <Checkbox.Group spacing={0} value={labelValue} onChange={onChangeLabel}>
            {membersData?.members.map(m => {
              return (
                <Menu.Item key={m.id}>
                  <Checkbox
                    size="xs"
                    value={m.id}
                    label={AssigneesPhoto(m)}
                    styles={{
                      body: {
                        alignItems: "center",
                      },
                      label: {
                        paddingLeft: 5,
                      },
                    }}
                  />
                </Menu.Item>
              );
            })}
          </Checkbox.Group>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

type AssigneesSelectorProps = {
  selectedAssignees: string[];
  setSelectedAssignees: (selectedLabels: string[]) => void;
};

export const AssigneesSelector = ({
  selectedAssignees,
  setSelectedAssignees,
}: AssigneesSelectorProps) => {
  return (
    <GenericAssigneesMenu
      selectedAssignees={selectedAssignees}
      setSelectedAssignees={setSelectedAssignees}
    >
      {selectedAssignees.length ? (
        <Button compact variant="light" color={"gray"} leftIcon={<Users size={16} />}>
          <Text size={"xs"}>{selectedAssignees.length} Assignees</Text>
        </Button>
      ) : (
        <Button compact variant="light" color={"gray"} leftIcon={<Users size={16} />}>
          <Text size={"xs"}>Assignees</Text>
        </Button>
      )}
    </GenericAssigneesMenu>
  );
};
