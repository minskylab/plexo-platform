import { Button, Menu, Text, TextInput, Avatar, Skeleton, Checkbox, Group } from "@mantine/core";
import { Users } from "tabler-icons-react";
import { useState } from "react";

import { useData } from "lib/useData";
import { Member } from "modules/app/datatypes";

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
  selectedMembers: string[];
  setSelectedMembers: (selectedMembers: string[]) => void;
};

export const GenericMemberMenu = ({
  children,
  selectedMembers,
  setSelectedMembers,
}: GenericMembersMenuProps) => {
  const { membersData, isLoadingMembers } = useData();

  return (
    <Menu shadow="md" closeOnItemClick={false}>
      <Menu.Target>{children}</Menu.Target>

      <Menu.Dropdown>
        <TextInput placeholder="Change project members" variant="filled"></TextInput>
        <Menu.Divider />
        {isLoadingMembers ? (
          <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
        ) : (
          <Checkbox.Group value={selectedMembers} onChange={setSelectedMembers}>
            {membersData?.members.map(m => {
              return (
                <Menu.Item key={m.id}>
                  <Group spacing={10}>
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
                  </Group>
                </Menu.Item>
              );
            })}
          </Checkbox.Group>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export const MemberSelector = () => {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  return (
    <GenericMemberMenu selectedMembers={selectedMembers} setSelectedMembers={setSelectedMembers}>
      {selectedMembers.length ? (
        <Button compact variant="light" color={"gray"} leftIcon={<Users size={16} />}>
          <Text size={"xs"}>{selectedMembers.length} Members</Text>
        </Button>
      ) : (
        <Button compact variant="light" color={"gray"} leftIcon={<Users size={16} />}>
          <Text size={"xs"}>Members</Text>
        </Button>
      )}
    </GenericMemberMenu>
  );
};
