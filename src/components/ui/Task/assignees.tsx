import { Button, Menu, Text, TextInput, Skeleton, Checkbox, Tooltip, Divider } from "@mantine/core";
import { Users } from "tabler-icons-react";
import { useEffect, useState } from "react";

import { useData } from "lib/hooks/useData";
import { Member, TaskById } from "lib/types";
import { useActions } from "lib/hooks/useActions";
import { priorityName } from "./priority";
import { statusName } from "./status";
import { ErrorNotification, SuccessNotification } from "lib/notifications";
import { MemberPhoto } from "components/ui/Project/members";

export const assigneesId = (task: TaskById | undefined) => {
  return task?.assignees.map(a => a.id);
};

type MembersCheckboxProps = {
  selectedMembers: string[];
  setSelectedMembers: (selectedMembers: string[]) => void;
  inputPlaceholder: string;
};

export const MembersCheckboxGroup = ({
  selectedMembers,
  setSelectedMembers,
  inputPlaceholder,
}: MembersCheckboxProps) => {
  const { membersData } = useData({});
  const [searchValue, setSearchValue] = useState("");
  const [membersOptions, setMembersOptions] = useState<Member[]>([]);

  useEffect(() => {
    if (membersData?.members) {
      setMembersOptions(
        membersData?.members.filter(item =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [searchValue]);

  return (
    <>
      <TextInput
        placeholder={inputPlaceholder}
        variant="unstyled"
        value={searchValue}
        onChange={event => setSearchValue(event.currentTarget.value)}
      />
      <Divider />
      <Checkbox.Group
        orientation="vertical"
        spacing={0}
        value={selectedMembers}
        onChange={setSelectedMembers}
      >
        {membersOptions.map(m => {
          return (
            <Checkbox
              key={m.id}
              size="xs"
              pb={10}
              value={m.id}
              label={MemberPhoto(m)}
              styles={{
                body: {
                  alignItems: "center",
                },
                label: {
                  paddingLeft: 5,
                },
              }}
            />
          );
        })}
      </Checkbox.Group>
    </>
  );
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
  const [searchValue, setSearchValue] = useState("");
  const [membersOptions, setMembersOptions] = useState<Member[]>([]);

  useEffect(() => {
    if (membersData?.members) {
      setMembersOptions(
        membersData?.members.filter(item =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [searchValue]);

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
    <Menu shadow="md" closeOnItemClick={false} position="bottom-start">
      <Menu.Target>
        <Tooltip label="Assignees" position="bottom">
          {children}
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown>
        <TextInput
          placeholder="Change assigness"
          variant="filled"
          value={searchValue}
          onChange={event => setSearchValue(event.currentTarget.value)}
        ></TextInput>
        <Menu.Divider />
        {isLoadingMembers ? (
          <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
        ) : (
          <Checkbox.Group
            spacing={0}
            value={labelValue}
            onChange={onChangeLabel}
            orientation="vertical"
          >
            {membersOptions.map(m => {
              return (
                <Menu.Item key={m.id}>
                  <Checkbox
                    size="xs"
                    value={m.id}
                    label={MemberPhoto(m)}
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
      <Button compact variant="light" color={"gray"} leftIcon={<Users size={16} />}>
        {selectedAssignees.length ? (
          <Text size={"xs"}>{selectedAssignees.length} Assignees</Text>
        ) : (
          <Text size={"xs"}>Assignees</Text>
        )}
      </Button>
    </GenericAssigneesMenu>
  );
};
