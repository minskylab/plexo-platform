import {
  Button,
  Menu,
  Text,
  TextInput,
  Skeleton,
  Checkbox,
  Group,
  Tooltip,
  ScrollArea,
  Center,
} from "@mantine/core";
import { Users } from "tabler-icons-react";

import { Member, ProjectById, TeamById } from "lib/types";
import { useEffect, useState } from "react";
import { ErrorNotification, SuccessNotification } from "lib/notifications";
import { useActions } from "lib/hooks/useActions";
import { MemberPhoto } from "../MemberPhoto";
import { usePlexoContext } from "context/PlexoContext";

export const MembersIcon = () => {
  return <Users size={16} />;
};

export const MembersLabel = (members: number | undefined) => {
  return members && members >= 1 ? `${members} Members` : "Members";
};

export const MemberInfo = (member: Member | undefined) => {
  return (
    <Group spacing={5}>
      <Center w={26} h={26}>
        {MemberPhoto(member?.photoUrl)}
      </Center>
      {member?.name}
    </Group>
  );
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
  const { membersData, isLoadingMembers } = usePlexoContext();

  const [members, setMembers] = useState<string[] | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [membersOptions, setMembersOptions] = useState<Member[]>([]);

  useEffect(() => {
    if (membersData) {
      searchValue == ""
        ? setMembersOptions(membersData)
        : setMembersOptions(
            membersData?.filter((item: Member) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
          );
    }
  }, [membersData, searchValue]);

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
        <ScrollArea.Autosize mah={250}>
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

type MemberSelectorProps = {
  members: string[];
  setMembers: (members: string[]) => void;
};

export const MemberSelector = ({ members, setMembers }: MemberSelectorProps) => {
  return (
    <GenericMemberMenu selectedMembers={members} setSelectedMembers={setMembers}>
      <Button compact variant="light" color={"gray"} leftIcon={<MembersIcon />}>
        <Text size={"xs"}> {MembersLabel(members.length)}</Text>
      </Button>
    </GenericMemberMenu>
  );
};

type MemberSelectorByProjectProps = {
  project: ProjectById | undefined;
};

export const MemberSelectorByProject = ({ project }: MemberSelectorByProjectProps) => {
  return (
    <GenericMemberMenu project={project}>
      <Button compact variant="light" color={"gray"} leftIcon={<MembersIcon />}>
        <Text size={"xs"}> {MembersLabel(project?.members.length)}</Text>
      </Button>
    </GenericMemberMenu>
  );
};

type MemberSelectorByTeamProps = {
  team: TeamById | undefined;
};

export const MemberSelectorByTeam = ({ team }: MemberSelectorByTeamProps) => {
  return (
    <GenericMemberMenu team={team}>
      <Button compact variant="light" color={"gray"} leftIcon={<MembersIcon />}>
        <Text size={"xs"}>{MembersLabel(team?.members.length)}</Text>
      </Button>
    </GenericMemberMenu>
  );
};
