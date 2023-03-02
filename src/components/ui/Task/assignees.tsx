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
import { useState } from "react";

import { useData } from "lib/useData";
import { Member } from "modules/app/datatypes";

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

type GenericAssigneesMenuProps = {
  children: React.ReactNode;
  selectedAssignees: string[];
  setSelectedAssignees: (selectedAssignees: string[]) => void;
};

export const GenericAssigneesMenu = ({
  children,
  selectedAssignees,
  setSelectedAssignees,
}: GenericAssigneesMenuProps) => {
  const { membersData, isLoadingMembers } = useData({});

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
          <Checkbox.Group spacing={0} value={selectedAssignees} onChange={setSelectedAssignees}>
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
