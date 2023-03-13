import { Box, Button, NavLink, Popover, createStyles } from "@mantine/core";
import {
  Affiliate,
  AntennaBars5,
  CircleDashed,
  Filter,
  LayoutGrid,
  Tag,
  User,
  UserCircle,
  Users,
} from "tabler-icons-react";
import { TeamCheckboxGroup } from "../Project/team";
import { MembersCheckboxGroup } from "../Task/assignees";
import { LabelCheckboxGroup } from "../Task/label";
import { PriorityCheckboxGroup } from "../Task/priority";
import { ProjectsCheckboxGroup } from "../Task/project";
import { StatusCheckboxGroup } from "../Task/status";

const useStyles = createStyles(theme => ({
  navlink: {
    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1],
    },
  },
  navlinkChildren: {
    paddingLeft: 12,
    backgroundColor: theme.colorScheme === "dark" ? "#1a1b1e8f" : theme.colors.gray[0],
  },
}));

const FilterMenu = () => {
  const { classes, theme } = useStyles();

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
          leftIcon={<Filter size={16} color={theme.colors.red[4]} />}
        >
          Filters
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Box w={240}>
          <NavLink
            label="Status"
            icon={<CircleDashed size={16} />}
            classNames={{ root: classes.navlink, children: classes.navlinkChildren }}
          >
            <StatusCheckboxGroup />
          </NavLink>

          <NavLink
            label="Assignee"
            icon={<Users size={16} />}
            classNames={{ root: classes.navlink, children: classes.navlinkChildren }}
          >
            <MembersCheckboxGroup />
          </NavLink>

          <NavLink
            label="Leader"
            icon={<UserCircle size={16} />}
            classNames={{ root: classes.navlink, children: classes.navlinkChildren }}
          >
            <MembersCheckboxGroup />
          </NavLink>

          <NavLink
            label="Creator"
            icon={<User size={16} />}
            classNames={{ root: classes.navlink, children: classes.navlinkChildren }}
          >
            <MembersCheckboxGroup />
          </NavLink>

          <NavLink
            label="Priority"
            icon={<AntennaBars5 size={16} />}
            classNames={{ root: classes.navlink, children: classes.navlinkChildren }}
          >
            <PriorityCheckboxGroup />
          </NavLink>

          <NavLink
            label="Labels"
            icon={<Tag size={16} />}
            classNames={{ root: classes.navlink, children: classes.navlinkChildren }}
          >
            <LabelCheckboxGroup />
          </NavLink>

          <NavLink
            label="Project"
            icon={<LayoutGrid size={16} />}
            classNames={{ root: classes.navlink, children: classes.navlinkChildren }}
          >
            <ProjectsCheckboxGroup />
          </NavLink>

          <NavLink
            label="Team"
            icon={<Affiliate size={16} />}
            classNames={{ root: classes.navlink, children: classes.navlinkChildren }}
          >
            <TeamCheckboxGroup />
          </NavLink>
        </Box>
      </Popover.Dropdown>
    </Popover>
  );
};

export default FilterMenu;
