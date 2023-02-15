import { Button, Kbd, Menu, Text, TextInput, Avatar, Skeleton } from "@mantine/core";
import { useState } from "react";
import { useQuery } from "urql";

import { MembersDocument } from "../../../integration/graphql";
import { MemberType } from "./types";

export const AssigneePhoto = (member: MemberType | undefined) => {
  return member?.photoUrl ? (
    <Avatar src={member.photoUrl} size="sm" radius="xl" />
  ) : (
    <Avatar size="sm" radius="xl" />
  );
};

export const AssigneeName = (member: MemberType | undefined) => {
  return member ? member?.name : "Assignee";
};

type GenericMembersMenuProps = {
  children: React.ReactNode;
  onSelect?: (member: MemberType | undefined) => void;
};

export const GenericAssigneeMenu = ({ children, onSelect }: GenericMembersMenuProps) => {
  const [{ data: membersData, fetching: isFetchingMembersData }] = useQuery({
    query: MembersDocument,
  });
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
        {isFetchingMembersData ? (
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
                onClick={() => onSelect && onSelect(m)}
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

type AssigneeSelectorProps = {
  initialAssignee?: MemberType;
};

export const AssigneeSelector = ({ initialAssignee }: AssigneeSelectorProps) => {
  const [assignee, setAssignee] = useState<MemberType | undefined>(initialAssignee);

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
