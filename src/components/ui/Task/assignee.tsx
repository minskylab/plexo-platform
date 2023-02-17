import { Button, Kbd, Menu, Text, TextInput, Avatar, Skeleton } from "@mantine/core";
import { Member } from "modules/app/datatypes";
import { useState } from "react";

import { useData } from "lib/useData";

export const AssigneePhoto = (member: Member | undefined) => {
  return member?.photoUrl ? (
    <Avatar src={member.photoUrl} size="sm" radius="xl" />
  ) : (
    <Avatar size="sm" radius="xl" />
  );
};

export const AssigneeName = (member: Member | undefined) => {
  return member ? member?.name : "Assignee";
};

type GenericMembersMenuProps = {
  children: React.ReactNode;
  onSelect?: (member: Member | undefined) => void;
};

export const GenericAssigneeMenu = ({ children, onSelect }: GenericMembersMenuProps) => {
  const { membersData, isLoadingMembers } = useData();

  return (
    <Menu shadow="md" width={180}>
      <Menu.Target>
        {/* <ActionIcon variant="light" radius={"sm"}>
                {PriorityIcon(task.priority)}
              </ActionIcon> */}
        {children}
      </Menu.Target>

      <Menu.Dropdown>
        <TextInput
          placeholder="Assign to..."
          variant="filled"
          rightSection={<Kbd px={8}>A</Kbd>}
        ></TextInput>
        <Menu.Divider />
        <Menu.Item
          icon={<Avatar size="sm" radius="xl" />}
          onClick={() => onSelect && onSelect(undefined)}
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
                icon={ AssigneePhoto(m)}
                onClick={() => onSelect && onSelect(m)}
              >
                {AssigneeName(m)}
              </Menu.Item>
            );
          })
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

type AssigneeSelectorProps = {
  initialAssignee?: Member;
};

export const AssigneeSelector = ({ initialAssignee }: AssigneeSelectorProps) => {
  const [assignee, setAssignee] = useState<Member | undefined>(initialAssignee);

  return (
    <GenericAssigneeMenu onSelect={member => setAssignee(member)}>
      {typeof assignee === "undefined" ? (
        <Button compact variant="light" color={"gray"}>
          {AssigneePhoto(assignee)}
        </Button>
      ) : (
        <Button compact variant="light" color={"gray"} leftIcon={AssigneePhoto(assignee)}>
          <Text size={"xs"}>{AssigneeName(assignee)}</Text>
        </Button>
      )}
    </GenericAssigneeMenu>
  );
};
