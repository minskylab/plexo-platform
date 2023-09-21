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

import { ProjectById, Team } from "lib/types";
import { useActions } from "lib/hooks/useActions";
import { ErrorNotification, SuccessNotification } from "lib/notifications";
import { useQuery } from "urql";
import { TeamsDocument } from "integration/graphql";

const useStyles = createStyles(theme => ({
  checkbox: {
    width: "100%",
  },
}));

export const TeamLabel = (teams: number | undefined) => {
  return teams && teams >= 1 ? `${teams} Teams` : "Teams";
};

export const TeamIcon = () => {
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
  const [searchValue, setSearchValue] = useState("");
  const [teamOptions, setTeamOptions] = useState<Team[]>([]);

  const [{ data: teamsData }] = useQuery({
    query: TeamsDocument,
  });

  useEffect(() => {
    if (teamsData?.teams) {
      setTeamOptions(
        teamsData?.teams.filter((item: Team) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        )
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
      <ScrollArea.Autosize mah={250}>
        <Checkbox.Group mt={10} value={teamFilters} onChange={setTeamFilters}>
          {teamOptions.map(t => {
            return (
              <Checkbox
                key={t.id}
                size="xs"
                pb={15}
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
      </ScrollArea.Autosize>
    </>
  );
};

export const teamsId = (project: ProjectById | undefined) => {
  return project?.teams.map(t => t.id);
};

type GenericTeamsMenuProps = {
  children: React.ReactNode;
  selectedTeams?: string[];
  setSelectedTeams?: (teams: string[]) => void;
  project?: ProjectById;
};

export const GenericTeamMenu = ({
  children,
  selectedTeams,
  setSelectedTeams,
  project,
}: GenericTeamsMenuProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [teamsOptions, setTeamsOptions] = useState<Team[]>([]);
  const [teams, setTeams] = useState<string[] | null>(null);
  const { fetchUpdateProject } = useActions();

  const [{ data: teamsData, fetching: isLoadingTeams }] = useQuery({
    query: TeamsDocument,
  });

  useEffect(() => {
    if (teamsData?.teams) {
      searchValue == ""
        ? setTeamsOptions(teamsData?.teams)
        : setTeamsOptions(
            teamsData?.teams.filter((item: Team) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
          );
    }
  }, [searchValue]);

  const labelValue = selectedTeams ? selectedTeams : teams ? teams : teamsId(project);
  const onChangeLabel = selectedTeams ? setSelectedTeams : setTeams;

  const onUpdateProjectTeams = async (members: string[]) => {
    const res = await fetchUpdateProject({
      projectId: project?.id,
      teams: teams,
    });

    if (res.data) {
      SuccessNotification("Teams updated", res.data.updateProject.name);
    }
    if (res.error) {
      ErrorNotification();
    }
  };

  useEffect(() => {
    if (teams) {
      onUpdateProjectTeams(teams);
    }
  }, [teams]);

  return (
    <Menu shadow="md" closeOnItemClick={false} position="bottom-start" withinPortal>
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
          <Skeleton height={36} radius="sm" />
        ) : (
          <Checkbox.Group mt={10} value={labelValue} onChange={onChangeLabel}>
            {teamsOptions.map((t: Team) => {
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
    <GenericTeamMenu selectedTeams={teams} setSelectedTeams={setTeams}>
      <Button compact variant="light" color={"gray"} leftIcon={<TeamIcon />}>
        <Text size={"xs"}>{TeamLabel(teams.length)}</Text>
      </Button>
    </GenericTeamMenu>
  );
};

type TeamSelectorByProjectProps = {
  project: ProjectById | undefined;
};

export const TeamSelectorByProject = ({ project }: TeamSelectorByProjectProps) => {
  return (
    <GenericTeamMenu project={project}>
      <Button compact variant="light" color={"gray"} leftIcon={<TeamIcon />}>
        <Text size={"xs"}>{TeamLabel(project?.teams.length)}</Text>
      </Button>
    </GenericTeamMenu>
  );
};
