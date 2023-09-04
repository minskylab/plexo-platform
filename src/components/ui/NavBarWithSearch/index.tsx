import {
  createStyles,
  Navbar,
  TextInput,
  Code,
  UnstyledButton,
  Badge,
  Text,
  Group,
  ActionIcon,
  Button,
  SegmentedControl,
  Center,
  Tooltip,
  rem,
} from "@mantine/core";

import router from "next/router";
import { useState } from "react";
import { Affiliate, Edit, LayoutGrid, Plus, Bulb, Checkbox, Search } from "tabler-icons-react";

import NewProject from "../Project/newProject";
import NewTeam from "../Team/newTeam";
import { UserButton } from "../UserButton";
import ProjectsList from "./projects";
import TeamsList from "./teams";
import { useData } from "lib/hooks/useData";

const useStyles = createStyles(theme => ({
  navbar: {
    paddingTop: 0,
  },

  section: {
    // marginLeft: -theme.spacing.md,
    // marginRight: -theme.spacing.md,
    // marginBottom: theme.spacing.md,

    "&:not(:last-of-type)": {
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: rem(10),
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    padding: `${rem(8)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: rem(20),
    height: rem(20),
    pointerEvents: "none",
  },

  collections: {
    paddingLeft: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingRight: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
    paddingRight: theme.spacing.md,
    marginBottom: rem(5),
  },

  collectionLink: {
    display: "block",
    padding: `${rem(8)} ${theme.spacing.xs}`,
    textDecoration: "none",
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

const links = [
  { icon: Bulb, label: "Activity", notifications: 3 },
  { icon: Checkbox, label: "Tasks", link: "/tasks" },
  //   { icon: IconUser, label: "Contacts" },
];

type NavBarWithSearchProps = {
  onNewTask?: () => void;
  openedNav: boolean;
  setOpenedNav: (value: boolean) => void;
};

export function NavbarSearch({ onNewTask, openedNav, setOpenedNav }: NavBarWithSearchProps) {
  const { classes, theme } = useStyles();
  const [section, setSection] = useState<"teams" | "projects">("teams");
  const [newProjectOpened, setNewProjectOpened] = useState(false);
  const [newTeamOpened, setNewTeamOpened] = useState(false);
  const { userData, isLoadingUser } = useData({});

  const mainLinks = links.map(link => (
    <UnstyledButton
      key={link.label}
      className={classes.mainLink}
      onClick={() => link.link && router.push(link.link)}
    >
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} strokeWidth={1.5} />
        <Text size="sm">{link.label}</Text>
      </div>
      {link.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

  return (
    <>
      <NewProject newProjectOpened={newProjectOpened} setNewProjectOpened={setNewProjectOpened} />
      <NewTeam newTeamOpened={newTeamOpened} setNewTeamOpened={setNewTeamOpened} />
      <Navbar
        width={{ sm: 300 }}
        hiddenBreakpoint="md"
        hidden={!openedNav}
        className={classes.navbar}
      >
        <Navbar.Section className={classes.section} mb="sm">
          <UserButton user={userData?.me} isLoadingUser={isLoadingUser} />
        </Navbar.Section>

        <Navbar.Section className={classes.section} mb="sm">
          <TextInput
            mx={16}
            placeholder="Search"
            icon={<Search size={12} strokeWidth={1.5} />}
            rightSectionWidth={70}
            rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
            styles={{ rightSection: { pointerEvents: "none" } }}
            mb="sm"
          />

          <Group mx={16} mb="sm" grow>
            <Button leftIcon={<Edit strokeWidth={1.5} />} size="sm" onClick={onNewTask}>
              New Task
            </Button>
          </Group>
        </Navbar.Section>
        <Navbar.Section className={classes.section} mb="sm">
          <div className={classes.mainLinks}>{mainLinks}</div>
        </Navbar.Section>
        <Group position="apart" mx="sm" mb="sm">
          <SegmentedControl
            size={"xs"}
            value={section}
            onChange={value => setSection(value as "teams" | "projects")}
            transitionTimingFunction="ease"
            data={[
              {
                label: (
                  <Center>
                    <Affiliate size={16} />
                    <Text ml={6} size={"xs"}>
                      Teams
                    </Text>
                  </Center>
                ),
                value: "teams",
              },
              {
                label: (
                  <Center>
                    <LayoutGrid size={16} />
                    <Text ml={6} size={"xs"}>
                      Projects
                    </Text>
                  </Center>
                ),
                value: "projects",
              },
            ]}
          />
          <Tooltip label={section === "teams" ? "New team" : "New project"} position="top">
            <ActionIcon
              onClick={() =>
                section === "teams" ? setNewTeamOpened(true) : setNewProjectOpened(true)
              }
            >
              <Plus size={18} />
            </ActionIcon>
          </Tooltip>
        </Group>
        {section === "teams" ? <TeamsList /> : <ProjectsList />}
      </Navbar>
    </>
  );
}
