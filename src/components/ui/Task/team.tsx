import { Button, Kbd, Menu, Text, TextInput, Skeleton, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useQuery } from "urql";
import { Dna } from "tabler-icons-react";

import { TeamsDocument } from "../../../integration/graphql";
import { TeamsType } from "./types";

export const TeamIcon = (team: TeamsType | undefined) => {
  const theme = useMantineTheme();
  //insert teamicon
  return <Dna size={16} color={theme.colors.red[4]} />;
};

export const TeamName = (team: TeamsType | undefined) => {
  //change to team prefix
  return team ? team.name : "NT"; //(No Team)
};

type GenericTeamsMenuProps = {
  children: React.ReactNode;
  onSelect?: (team: TeamsType | undefined) => void;
};

export const GenericTeamMenu = ({ children, onSelect }: GenericTeamsMenuProps) => {
  const [{ data: teamsData, fetching: isFetchingTeamsData }] = useQuery({
    query: TeamsDocument,
  });

  const theme = useMantineTheme();

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
          placeholder="Set team..."
          variant="filled"
          rightSection={<Kbd px={8}>T</Kbd>}
        ></TextInput>
        <Menu.Divider />
        {isFetchingTeamsData ? (
          <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
        ) : (
          teamsData?.teams.map(t => {
            return (
              <Menu.Item
                key={t.id}
                icon={<Dna size={16} color={theme.colors.red[4]} />}
                onClick={() => onSelect && onSelect(t)}
              >
                {t.name}
              </Menu.Item>
            );
          })
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

type TeamSelectorProps = {
  initialTeam?: TeamsType;
};

export const TeamSelector = ({ initialTeam }: TeamSelectorProps) => {
  const [team, setTeam] = useState<TeamsType | undefined>(initialTeam);

  return (
    <GenericTeamMenu onSelect={team => setTeam(team)}>
      <Button compact variant="light" color={"gray"} leftIcon={TeamIcon(team)}>
        <Text size={"xs"}>{TeamName(team)}</Text>
      </Button>
    </GenericTeamMenu>
  );
};
