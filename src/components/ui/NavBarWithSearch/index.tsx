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
} from "@mantine/core";
import { IconBulb, IconCheckbox, IconSearch, IconSelector } from "@tabler/icons";
import { useState } from "react";
import { Affiliate, Edit, LayoutGrid, Plus } from "tabler-icons-react";
import NewProject from "../Project/newProject";
import JoinTeam from "../Team/joinTeam";
import { UserButton } from "../UserButton";
import ProjectsList from "./projects";
import TeamsList from "./teams";

const useStyles = createStyles(theme => ({
  navbar: {
    paddingTop: 0,
  },

  section: {
    // marginLeft: -theme.spacing.md,
    // marginRight: -theme.spacing.md,
    // marginBottom: theme.spacing.md,

    "&:not(:last-of-type)": {
      borderBottom: `1px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: theme.spacing.md - theme.spacing.xs,
    paddingRight: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
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
    width: 20,
    height: 20,
    pointerEvents: "none",
  },

  collections: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: theme.spacing.md + 2,
    paddingRight: theme.spacing.md,
    marginBottom: 5,
  },

  collectionLink: {
    display: "block",
    padding: `8px ${theme.spacing.xs}px`,
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
  { icon: IconBulb, label: "Activity", notifications: 3 },
  { icon: IconCheckbox, label: "Tasks" },
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
  const [joinTeamOpened, setJoinTeamOpened] = useState(false);

  const mainLinks = links.map(link => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
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
      <JoinTeam joinTeamOpened={joinTeamOpened} setJoinTeamOpened={setJoinTeamOpened} />
      <Navbar
        width={{ sm: 300 }}
        className={classes.navbar}
        hiddenBreakpoint="sm"
        hidden={!openedNav}
      >
        <Navbar.Section className={classes.section} mb="sm">
          <UserButton
            image="https://uploads.linear.app/4389bd24-0b3b-438e-84be-56d33b0a8c76/ec023124-ed27-491a-a2d0-e2ca9370b620/256x256/a8a546b8-5668-43ce-be0e-ce4915f747dc"
            name="Minsky"
            email="Bregy Malpartida"
            icon={<IconSelector size={14} stroke={1.5} />}
          />
        </Navbar.Section>

        <Navbar.Section className={classes.section} mb="sm">
          <TextInput
            mx={16}
            placeholder="Search"
            // size="xs"
            icon={<IconSearch size={12} stroke={1.5} />}
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
          <ActionIcon
            onClick={() =>
              section === "teams" ? setJoinTeamOpened(true) : setNewProjectOpened(true)
            }
          >
            <Plus size={18} />
          </ActionIcon>
        </Group>
        {section === "teams" ? <TeamsList /> : <ProjectsList />}
      </Navbar>
    </>
  );
}
