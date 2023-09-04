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
  ScrollArea,
} from "@mantine/core";
import { Users } from "tabler-icons-react";

import { useData } from "lib/hooks/useData";
import { Member, ProjectById, TeamById } from "lib/types";
import { useEffect, useState } from "react";
import { ErrorNotification, SuccessNotification } from "lib/notifications";
import { useActions } from "lib/hooks/useActions";

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

type Payload = {
  id: string;
};

export const membersId = (members: Payload[] | undefined) => {
  return members?.map(a => a.id);
};

type GenericMembersMenuProps = {
  children: React.ReactNode;
  selectedMembers?: string[];
  setSelectedMembers?: (selectedMembers: string[]) => void;
  project?: ProjectById;
  team?: TeamById;
};

export const GenericMemberMenu = ({
  children,
  selectedMembers,
  setSelectedMembers,
  project,
  team,
}: GenericMembersMenuProps) => {
  const { fetchUpdateProject, fetchUpdateTeam } = useActions();
  const { membersData, isLoadingMembers } = useData({});

  const [members, setMembers] = useState<string[] | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [membersOptions, setMembersOptions] = useState<Member[]>([]);

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
  }, [membersData,searchValue]);

  const labelValue = selectedMembers
    ? selectedMembers
    : members
    ? members
    : membersId(project ? project.members : team?.members);
  const onChangeLabel = selectedMembers ? setSelectedMembers : setMembers;

  const onUpdateProjectMembers = async (members: string[]) => {
    const res = await fetchUpdateProject({
      projectId: project?.id,
      members: members,
    });

    if (res.data) {
      SuccessNotification("Members updated", res.data.updateProject.name);
    }
    if (res.error) {
      ErrorNotification();
    }
  };

  const onUpdateTeamMembers = async (members: string[]) => {
    const res = await fetchUpdateTeam({
      teamId: team?.id,
      members: members,
    });

    if (res.data) {
      SuccessNotification("Members updated", res.data.updateTeam.name);
    }
    if (res.error) {
      ErrorNotification();
    }
  };

  useEffect(() => {
    if (members) {
      project && onUpdateProjectMembers(members);
      team && onUpdateTeamMembers(members);
    }
  }, [members]);

  return (
    <Menu shadow="md" closeOnItemClick={false} position="bottom-start" withinPortal>
      <Menu.Target>
        <Tooltip label="Project members" position="bottom">
          {children}
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown>
        <TextInput
          placeholder="Change members"
          variant="filled"
          value={searchValue}
          onChange={event => setSearchValue(event.currentTarget.value)}
        ></TextInput>
        <Menu.Divider />
        <ScrollArea h={250}>
          {isLoadingMembers ? (
            <Skeleton height={36} radius="sm" />
          ) : (
            <Checkbox.Group mt={10} value={labelValue} onChange={onChangeLabel}>
              {membersOptions.map((m: Member) => {
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
        </ScrollArea>
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
