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

import { useData } from "lib/hooks/useData";
import { Member, ProjectById } from "lib/types";

export const MembersIcon = (member: Member | undefined) => {
  return member?.photoUrl ? (
    <Avatar src={member.photoUrl} size="sm" radius="xl" />
  ) : (
    <Users size={16} />
  );
};

export const MemberPhoto = (member: Member | undefined) => {
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

export const MemberName = (member: Member | undefined) => {
  return member ? member?.name : "Member";
};

type GenericMembersMenuProps = {
  children: React.ReactNode;
  selectedMembers?: string[];
  setSelectedMembers?: (selectedMembers: string[]) => void;
  project?: ProjectById;
};

export const GenericMemberMenu = ({
  children,
  selectedMembers,
  setSelectedMembers,
  project,
}: GenericMembersMenuProps) => {
  const { membersData, isLoadingMembers } = useData({});

  return (
    <Menu shadow="md" closeOnItemClick={false} position="bottom-start">
      <Menu.Target>
        <Tooltip label="Project members" position="bottom">
          {children}
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown>
        <TextInput placeholder="Change project members" variant="filled"></TextInput>
        <Menu.Divider />
        {isLoadingMembers ? (
          <Skeleton height={36} radius="sm" />
        ) : (
          <Checkbox.Group
            spacing={0}
            value={selectedMembers}
            onChange={setSelectedMembers}
            orientation="vertical"
          >
            {membersData?.members.map(m => {
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

type MemberSelectorProps = {
  members: string[];
  setMembers: (members: string[]) => void;
};

export const MemberSelector = ({ members, setMembers }: MemberSelectorProps) => {
  return (
    <GenericMemberMenu selectedMembers={members} setSelectedMembers={setMembers}>
      <Button compact variant="light" color={"gray"} leftIcon={<Users size={16} />}>
        {members.length ? (
          <Text size={"xs"}>{members.length} Members</Text>
        ) : (
          <Text size={"xs"}>Members</Text>
        )}
      </Button>
    </GenericMemberMenu>
  );
};
