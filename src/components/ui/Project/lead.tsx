import { Button, Menu, Text, TextInput, Avatar, Skeleton, Tooltip } from "@mantine/core";
import { useState } from "react";

import { useData } from "lib/useData";
import { MemberType } from "../Task/types";

export const LeadPhoto = (member: MemberType | undefined) => {
  return member?.photoUrl ? (
    <Avatar src={member.photoUrl} size="sm" radius="xl" />
  ) : (
    <Avatar size="sm" radius="xl" />
  );
};

export const LeadName = (member: MemberType | undefined) => {
  return member ? member?.name : "Lead";
};

type GenericMembersMenuProps = {
  children: React.ReactNode;
  onSelect?: (member: MemberType | undefined) => void;
};

export const GenericLeadMenu = ({ children, onSelect }: GenericMembersMenuProps) => {
  const { membersData, isLoadingMembers } = useData();

  return (
    <Menu shadow="md">
      <Menu.Target>
        <Tooltip label="Set project lead" position="bottom">
          {children}
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown>
        <TextInput placeholder="Set project lead..." variant="filled"></TextInput>
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

type LeadSelectorProps = {
  initialLead?: MemberType;
};

export const LeadSelector = ({ initialLead }: LeadSelectorProps) => {
  const [Lead, setLead] = useState<MemberType | undefined>(initialLead);

  return (
    <GenericLeadMenu onSelect={member => setLead(member)}>
      {typeof Lead === "undefined" ? (
        <Button compact variant="light" color={"gray"}>
          {LeadPhoto(Lead)}
          <Text size={"xs"}>Lead</Text>
        </Button>
      ) : (
        <Button compact variant="light" color={"gray"} leftIcon={LeadPhoto(Lead)}>
          <Text size={"xs"}>{LeadName(Lead)}</Text>
        </Button>
      )}
    </GenericLeadMenu>
  );
};
