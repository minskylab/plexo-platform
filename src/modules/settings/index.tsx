import {
  Group,
  Stack,
  createStyles,
  MediaQuery,
  ActionIcon,
  Button,
  Tabs,
  TextInput,
  Container,
  Modal,
  PasswordInput,
} from "@mantine/core";
import {
  IconBuilding,
  IconMessageCircle,
  IconMicroscope,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import { IconPhoto } from "@tabler/icons-react";
import { usePlexoContext } from "context/PlexoContext";
import { LayoutSidebar } from "tabler-icons-react";

export const SettingsPageContent = () => {
  const useStyles = createStyles(theme => ({
    burger: {
      [theme.fn.largerThan("sm")]: {
        display: "none",
      },
      [theme.fn.smallerThan("xs")]: {
        marginRight: -10,
      },
    },
    "text-view-buttons": {
      [theme.fn.smallerThan("sm")]: {
        display: "none",
      },
    },
    "text-header-buttons": {
      [theme.fn.smallerThan("sm")]: {
        fontSize: "90%",
      },
      [theme.fn.smallerThan("xs")]: {
        fontSize: "70%",
        marginRight: -15,
        marginLeft: -5,
      },
    },
    "icon-header-buttons": {
      [theme.fn.smallerThan("sm")]: {
        width: "90%",
        height: "90%",
      },
      [theme.fn.smallerThan("xs")]: {
        display: "none",
      },
    },
    "segmented-control": {
      [theme.fn.smallerThan("xs")]: {
        marginLeft: -5,
      },
    },
  }));

  const { classes, theme } = useStyles();
  const { setNavBarOpened } = usePlexoContext();

  const [{ data: membersData, fetching: isFetchingTasksData }] = useQuery({
    query: MembersDocument,
  });

  const membersParsedData =
    membersData?.members.map(member => ({
      id: member.id as string,
      name: member.name,
      avatar: member.photoUrl ?? "",
      job: member.role.toString(),
      email: member.email,
    })) ?? [];

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Register New Member" centered>
        <Stack>
          <TextInput label="Name" placeholder="you@plexo.app" required />
          <TextInput label="Email" placeholder="you@plexo.app" required />
          <PasswordInput label="Password" placeholder="Your password" required />
        </Stack>
        <Group position="right" mt="md">
          <Button>Register</Button>
        </Group>
      </Modal>
      <Stack>
        <Group
          h={73.5}
          position="apart"
          sx={{
            padding: theme.spacing.md,
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
            "&:not(:last-of-type)": {
              borderBottom: `1px solid ${
                theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
              }`,
            },
          }}
        >
          <Group>
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <ActionIcon onClick={() => setNavBarOpened(true)}>
                <LayoutSidebar size={16} />
              </ActionIcon>
            </MediaQuery>
            Settings
          </Group>

          <Group></Group>
        </Group>

        <Stack
          spacing="sm"
          sx={theme => ({
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          })}
          px={theme.spacing.md}
        >
          <Tabs defaultValue="organization">
            <Tabs.List>
              <Tabs.Tab value="organization" icon={<IconBuilding size="0.8rem" />}>
                Organization
              </Tabs.Tab>
              <Tabs.Tab value="members" icon={<IconUsers size="0.8rem" />}>
                Members
              </Tabs.Tab>
              <Tabs.Tab value="experimental" icon={<IconMicroscope size="0.8rem" />}>
                Experimental
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="organization" pt="xs">
              <Container>
                <Stack spacing="sm">
                  <TextInput label="Organization Name" defaultValue={"Plexo"} />
                </Stack>
              </Container>
            </Tabs.Panel>

            <Tabs.Panel value="members" pt="xs">
              <Stack>
                <Group position="right">
                  <Button onClick={open}>Create Member</Button>
                </Group>
                <TableSelection data={membersParsedData}></TableSelection>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="experimental" pt="xs">
              Experimental features
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Stack>
    </>
  );
};

import { useState } from "react";
import { Table, Checkbox, ScrollArea, Avatar, Text, rem } from "@mantine/core";
import { useQuery } from "urql";
import { MembersDocument, TasksDocument } from "integration/graphql";
import { useDisclosure } from "@mantine/hooks";

const useStyles = createStyles(theme => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

interface TableSelectionProps {
  data: { avatar: string; name: string; email: string; job: string; id: string }[];
}

export function TableSelection({ data }: TableSelectionProps) {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState(["1"]);
  const toggleRow = (id: string) =>
    setSelection(current =>
      current.includes(id) ? current.filter(item => item !== id) : [...current, id]
    );
  const toggleAll = () =>
    setSelection(current => (current.length === data.length ? [] : data.map(item => item.id)));

  const rows = data.map(item => {
    const selected = selection.includes(item.id);
    return (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
            transitionDuration={0}
          />
        </td>
        <td>
          <Group spacing="sm">
            <Avatar size={26} src={item.avatar} radius={26} />
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td>{item.email}</td>
        <td>{item.job}</td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: rem(40) }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={selection.length > 0 && selection.length !== data.length}
                transitionDuration={0}
              />
            </th>
            <th>User</th>
            <th>Email</th>
            <th>Job</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
