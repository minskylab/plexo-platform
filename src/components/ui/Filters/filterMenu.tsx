import {
  Box,
  Button,
  NavLink,
  Popover,
  createStyles,
  Text,
  Badge,
  Group,
  Anchor,
} from "@mantine/core";
import { AntennaBars5, CircleDashed, Filter, User, UserCircle } from "tabler-icons-react";

import { usePlexoContext } from "context/PlexoContext";
import { TeamCheckboxGroup, TeamIcon } from "../Project/team";
import { AssigneesIcon, MembersCheckboxGroup } from "../Task/assignees";
import { LabelCheckboxGroup, LabelIcon } from "../Task/labels";
import { PriorityCheckboxGroup } from "../Task/priority";
import { ProjectIcon, ProjectsCheckboxGroup } from "../Task/project";
import { StatusCheckboxGroup } from "../Task/status";

const useStyles = createStyles(theme => ({
  navlink: {
    borderRadius: 4,
    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1],
    },
  },
  navlinkChildren: {
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: theme.colorScheme === "dark" ? "#1a1b1e8f" : theme.colors.gray[0],
  },
  filterBtn: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : "#fff",
  },
}));

const FilterMenu = () => {
  const { classes, theme } = useStyles();
  const {
    statusFilters,
    setStatusFilters,
    assigneeFilters,
    setAssigneeFilters,
    leaderFilters,
    setLeaderFilters,
    creatorFilters,
    setCreatorFilters,
    priorityFilters,
    setPriorityFilters,
    labelsFilters,
    setLabelsFilters,
    projectFilters,
    setProjectFilters,
    teamFilters,
    setTeamFilters,
    total,
  } = usePlexoContext();

  const handleClearFilters = () => {
    setStatusFilters([]);
    setAssigneeFilters([]);
    setLeaderFilters([]);
    setCreatorFilters([]);
    setPriorityFilters([]);
    setLabelsFilters([]);
    setProjectFilters([]);
    setTeamFilters([]);
  };

  return (
    <Popover
      position="bottom-start"
      shadow="md"
      styles={{
        dropdown: {
          padding: 4,
        },
      }}
    >
      <Popover.Target>
        <Button
          compact
          variant="light"
          color={"gray"}
          leftIcon={<Filter size={16} color={theme.colors.brand[6]} />}
          rightIcon={
            total != 0 && (
              <Badge size="sm" variant="light">
                {total}
              </Badge>
            )
          }
          className={classes.filterBtn}
        >
          Filters
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Group py={8} px={12} position={"apart"}>
          <Text weight={600}>Filters</Text>
          <Anchor size={"sm"} onClick={handleClearFilters}>
            Clear
          </Anchor>
        </Group>
        <Box miw={240}>
          <NavLink
            label={
              <Group>
                <Text>Status</Text>
                {statusFilters.length && (
                  <Badge size="sm" variant="light">
                    {statusFilters.length}
                  </Badge>
                )}
              </Group>
            }
            icon={<CircleDashed size={16} />}
            classNames={{ root: classes.navlink, children: classes.navlinkChildren }}
          >
            <StatusCheckboxGroup
              statusFilters={statusFilters}
              setStatusFilters={setStatusFilters}
            />
          </NavLink>

          <NavLink
            label={
              <Group>
                <Text>Assignee</Text>
                {assigneeFilters.length && (
                  <Badge size="sm" variant="light">
                    {assigneeFilters.length}
                  </Badge>
                )}
              </Group>
            }
            icon={<AssigneesIcon />}
            classNames={{ root: classes.navlink, children: classes.navlinkChildren }}
          >
            <MembersCheckboxGroup
              selectedMembers={assigneeFilters}
              setSelectedMembers={setAssigneeFilters}
              inputPlaceholder="Assignee"
            />
          </NavLink>

          <NavLink
            label={
              <Group>
                <Text>Leader</Text>
                {leaderFilters.length && (
                  <Badge size="sm" variant="light">
                    {leaderFilters.length}
                  </Badge>
                )}
              </Group>
            }
            icon={<UserCircle size={16} />}
            classNames={{ root: classes.navlink, children: classes.navlinkChildren }}
          >
            <MembersCheckboxGroup
              selectedMembers={leaderFilters}
              setSelectedMembers={setLeaderFilters}
              inputPlaceholder="Leader"
            />
          </NavLink>

          <NavLink
            label={
              <Group>
                <Text>Creator</Text>
                {creatorFilters.length && (
                  <Badge size="sm" variant="light">
                    {creatorFilters.length}
                  </Badge>
                )}
              </Group>
            }
            icon={<User size={16} />}
            classNames={{ root: classes.navlink, children: classes.navlinkChildren }}
          >
            <MembersCheckboxGroup
              selectedMembers={creatorFilters}
              setSelectedMembers={setCreatorFilters}
              inputPlaceholder="Creator"
            />
          </NavLink>

          <NavLink
            label={
              <Group>
                <Text>Priority</Text>
                {priorityFilters.length && (
                  <Badge size="sm" variant="light">
                    {priorityFilters.length}
                  </Badge>
                )}
              </Group>
            }
            icon={<AntennaBars5 size={16} />}
            classNames={{ root: classes.navlink, children: classes.navlinkChildren }}
          >
            <PriorityCheckboxGroup
              priorityFilters={priorityFilters}
              setPriorityFilters={setPriorityFilters}
            />
          </NavLink>

          <NavLink
            label={
              <Group>
                <Text>Labels</Text>
                {labelsFilters.length && (
                  <Badge size="sm" variant="light">
                    {labelsFilters.length}
                  </Badge>
                )}
              </Group>
            }
            icon={<LabelIcon />}
            classNames={{ root: classes.navlink, children: classes.navlinkChildren }}
          >
            <LabelCheckboxGroup labelsFilters={labelsFilters} setLabelsFilters={setLabelsFilters} />
          </NavLink>

          <NavLink
            label={
              <Group>
                <Text>Project</Text>
                {projectFilters.length && (
                  <Badge size="sm" variant="light">
                    {projectFilters.length}
                  </Badge>
                )}
              </Group>
            }
            icon={<ProjectIcon />}
            classNames={{ root: classes.navlink, children: classes.navlinkChildren }}
          >
            <ProjectsCheckboxGroup
              projectFilters={projectFilters}
              setProjectFilters={setProjectFilters}
            />
          </NavLink>

          <NavLink
            label={
              <Group>
                <Text>Team</Text>
                {teamFilters.length && (
                  <Badge size="sm" variant="light">
                    {teamFilters.length}
                  </Badge>
                )}
              </Group>
            }
            icon={<TeamIcon />}
            classNames={{ root: classes.navlink, children: classes.navlinkChildren }}
          >
            <TeamCheckboxGroup teamFilters={teamFilters} setTeamFilters={setTeamFilters} />
          </NavLink>
        </Box>
      </Popover.Dropdown>
    </Popover>
  );
};

export default FilterMenu;
