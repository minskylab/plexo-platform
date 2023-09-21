import {
  Button,
  Menu,
  Text,
  TextInput,
  Skeleton,
  Checkbox,
  Tooltip,
  Divider,
  ScrollArea,
} from "@mantine/core";
import { Users } from "tabler-icons-react";
import { useEffect, useState } from "react";
import { useQuery } from "urql";

import { Member, Task, TaskById } from "lib/types";
import { useActions } from "lib/hooks/useActions";
import { priorityName } from "./priority";
import { statusName } from "./status";
import { ErrorNotification, SuccessNotification } from "lib/notifications";
import { MemberInfo } from "components/ui/Project/members";
import { MembersDocument } from "integration/graphql";

export const AssigneesIcon = () => {
  return <Users size={16} />;
};

export const assigneesId = (task: TaskById | Task | undefined) => {
  return task?.assignees.map(a => a.id);
};

export const AssigneeName = (assignees: number | undefined) => {
  return assignees && assignees >= 1 ? `${assignees} Assignees` : "Assignees";
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
  const [searchValue, setSearchValue] = useState("");
  const [membersOptions, setMembersOptions] = useState<Member[]>([]);

  const [{ data: membersData, fetching: isLoadingMembers }] = useQuery({
    query: MembersDocument,
  });

  useEffect(() => {
    if (membersData?.members) {
      setMembersOptions(
        membersData?.members.filter((item: Member) =>
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
      <ScrollArea.Autosize mah={250}>
        <Checkbox.Group mt={10} value={selectedMembers} onChange={setSelectedMembers}>
          {membersOptions.map(m => {
            return (
              <Checkbox
                key={m.id}
                size="xs"
                pb={15}
                value={m.id}
                label={MemberInfo(m)}
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
      </ScrollArea.Autosize>
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
  const { fetchUpdateTask } = useActions();
  const [assignees, setAssignees] = useState<string[] | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [membersOptions, setMembersOptions] = useState<Member[]>([]);

  const [{ data: membersData, fetching: isLoadingMembers }] = useQuery({
    query: MembersDocument,
  });

  useEffect(() => {
    if (membersData?.members) {
      searchValue == ""
        ? setMembersOptions(membersData?.members)
        : setMembersOptions(
            membersData?.members.filter((item: Member) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
          );
    }
  }, [membersData, searchValue]);

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
    <Menu shadow="md" closeOnItemClick={false} position="bottom-start" withinPortal>
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
        <ScrollArea.Autosize mah={250}>
          {isLoadingMembers ? (
            <Skeleton height={36} radius="sm" />
          ) : (
            <Checkbox.Group mt={10} value={labelValue} onChange={onChangeLabel}>
              {membersOptions.map(m => {
                return (
                  <Menu.Item key={m.id}>
                    <Checkbox
                      size="xs"
                      value={m.id}
                      label={MemberInfo(m)}
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
        </ScrollArea.Autosize>
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
      <Button compact variant="light" color={"gray"} leftIcon={<AssigneesIcon />}>
        <Text size={"xs"}>{AssigneeName(selectedAssignees.length)}</Text>
      </Button>
    </GenericAssigneesMenu>
  );
};

type AssigneesSelectorByTaskProps = {
  task: TaskById | undefined;
};

export const AssigneesSelectorByTask = ({ task }: AssigneesSelectorByTaskProps) => {
  return (
    <GenericAssigneesMenu task={task}>
      <Button compact variant="light" color={"gray"} leftIcon={<AssigneesIcon />}>
        <Text size={"xs"}>{AssigneeName(task?.assignees.length)}</Text>
      </Button>
    </GenericAssigneesMenu>
  );
};
