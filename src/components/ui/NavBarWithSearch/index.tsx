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
  Tooltip,
  Kbd,
  Button,
  NavLink,
  useMantineTheme,
  SegmentedControl,
  Center,
} from "@mantine/core";
import {
  IconBulb,
  IconUser,
  IconCheckbox,
  IconSearch,
  IconPlus,
  IconSelector,
} from "@tabler/icons";
import Link from "next/link";
import {
  Affiliate,
  Book,
  Dice,
  Dna,
  Dna2,
  Edit,
  Eye,
  Fingerprint,
  Gauge,
  LayoutColumns,
  LayoutGrid,
  LayoutRows,
  NewSection,
  Note,
  Plus,
  Rocket,
  Square,
} from "tabler-icons-react";
import { UserButton } from "../UserButton";
// import { UserButton } from "../UserButton/UserButton";

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
};

export function NavbarSearch({ onNewTask }: NavBarWithSearchProps) {
  const { classes } = useStyles();

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

  const theme = useMantineTheme();

  return (
    <Navbar width={{ sm: 300 }} className={classes.navbar}>
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
              value: "list",
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
              value: "columns",
            },
          ]}
        />
        <ActionIcon>
          <Plus size={18} />
        </ActionIcon>
      </Group>
      <Navbar.Section>
        {/* <div className={classes.collections}>{collectionLinks}</div> */}
        <NavLink label="Research" icon={<Rocket size={16} color={theme.colors.blue[4]} />}>
          {/* <NavLink label="First child link" />
          <NavLink label="Second child link" /> */}
        </NavLink>

        <NavLink
          label="Management"
          icon={<Book size={16} color={theme.colors.gray[5]} />}
          //   childrenOffset={28}
          defaultOpened
          opened={true}
        >
          <NavLink icon={<Dice size={16} color={theme.colors.gray[6]} />} label="Main Team" />
          {/* <NavLink label="Second child link" />
          <NavLink label="Third child link" /> */}
        </NavLink>

        <NavLink
          label="Development"
          icon={<Dna2 size={16} color={theme.colors.orange[4]} />}
          defaultOpened
          opened={true}
          //   childrenOffset={28}
        >
          <NavLink icon={<Dna size={16} color={theme.colors.red[4]} />} label="Minsky Phi" active />
          <NavLink icon={<Dna size={16} color={theme.colors.violet[4]} />} label="Minsky Alpha" />
        </NavLink>
      </Navbar.Section>
    </Navbar>
  );
}
