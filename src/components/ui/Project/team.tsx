import {
  Button,
  Kbd,
  Menu,
  Text,
  TextInput,
  Skeleton,
  Tooltip,
  Checkbox,
  createStyles,
  Group,
  ScrollArea,
  Divider,
} from "@mantine/core";
import { Affiliate } from "tabler-icons-react";
import { useEffect, useState } from "react";

import { Team } from "lib/types";
import { useData } from "lib/hooks/useData";

const useStyles = createStyles(theme => ({
  checkbox: {
    width: "100%",
  },
}));

export const TeamIcon = (/* team: Team | undefined */) => {
  return <Affiliate size={16} />;
};

export const TeamName = (team: Team | undefined) => {
  //change to team prefix
  return team ? team.name : "NT"; //(No Team)
};

type TeamCheckboxProps = {
  teamFilters: string[];
  setTeamFilters: (teamFilters: string[]) => void;
};

export const TeamCheckboxGroup = ({ teamFilters, setTeamFilters }: TeamCheckboxProps) => {
  const { classes } = useStyles();
  const { teamsData } = useData({});
  const [searchValue, setSearchValue] = useState("");
  const [teamOptions, setTeamOptions] = useState<Team[]>([]);

  useEffect(() => {
    if (teamsData?.teams) {
      setTeamOptions(
        teamsData?.teams.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
      );
    }
  }, [searchValue]);

  return (
    <>
      <TextInput
        placeholder="Team"
        variant="unstyled"
        value={searchValue}
        onChange={event => setSearchValue(event.currentTarget.value)}
      />
      <Divider />
      <ScrollArea h={250}>
        <Checkbox.Group
          orientation="vertical"
          spacing={0}
          value={teamFilters}
          onChange={setTeamFilters}
        >
          {teamOptions.map(t => {
            return (
              <Checkbox
                key={t.id}
                size="xs"
                pb={10}
                value={t.id}
                label={
                  <Group spacing={5}>
                    {TeamIcon()}
                    {TeamName(t)}
                  </Group>
                }
                classNames={{
                  body: classes.checkbox,
                  labelWrapper: classes.checkbox,
                }}
              />
            );
          })}
        </Checkbox.Group>
      </ScrollArea>
    </>
  );
};

type GenericTeamsMenuProps = {
  children: React.ReactNode;
  teams?: string[];
  setTeams?: (teams: string[]) => void;
};

export const GenericTeamMenu = ({ children, teams, setTeams }: GenericTeamsMenuProps) => {
  const { teamsData, isLoadingTeams } = useData({});
  const [searchValue, setSearchValue] = useState("");

  return (
    <Menu shadow="md" closeOnItemClick={false} position="bottom-start">
      <Menu.Target>
        <Tooltip label="Teams" position="bottom">
          {children}
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown>
        <TextInput
          placeholder="Set team..."
          variant="filled"
          value={searchValue}
          onChange={event => setSearchValue(event.currentTarget.value)}
          rightSection={<Kbd px={8}>T</Kbd>}
        ></TextInput>
        <Menu.Divider />
        {isLoadingTeams ? (
          <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
        ) : (
          <Checkbox.Group spacing={0} value={teams} onChange={setTeams} orientation="vertical">
            {teamsData?.teams.map(t => {
              return (
                <Menu.Item key={t.id}>
                  <Checkbox
                    size="xs"
                    value={t.id}
                    label={TeamName(t)}
                    styles={{
                      body: {
                        alignItems: "center",
                      },
                      label: {
                        paddingLeft: 10,
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

type TeamSelectorProps = {
  teams: string[];
  setTeams: (teams: string[]) => void;
};

export const TeamSelector = ({ teams, setTeams }: TeamSelectorProps) => {
  return (
    <GenericTeamMenu teams={teams} setTeams={setTeams}>
      <Button compact variant="light" color={"gray"} leftIcon={<Affiliate size={16} />}>
        {teams.length ? (
          <Text size={"xs"}>{teams.length} Teams</Text>
        ) : (
          <Text size={"xs"}>Teams</Text>
        )}
      </Button>
    </GenericTeamMenu>
  );
};
