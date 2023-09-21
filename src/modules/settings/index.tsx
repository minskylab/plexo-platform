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
  Switch,
  useMantineColorScheme,
  Select,
} from "@mantine/core";
import { IconBuilding, IconMicroscope, IconUsers } from "@tabler/icons-react";
import { Edit, LayoutSidebar, Moon, Sun } from "tabler-icons-react";

import { usePlexoContext } from "context/PlexoContext";

const NewMemberModal = ({ opened, close }: { opened: boolean; close: () => void }) => {
  const [registerNewMemberResult, registerNewMember] = useMutation(RegisterDocument);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: val => (val.length <= 6 ? "Password should include at least 6 characters" : null),
    },
  });

  const onCreateMember = async (values: typeof form.values) => {
    const res = await registerNewMember({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    if (res.data) {
      SuccessNotification("Member created", values.name);
      close();
    }
    if (res.error) {
      ErrorNotification();
    }
  };

  return (
    <Modal opened={opened} onClose={close} title="Register New Member">
      <form onSubmit={form.onSubmit(onCreateMember)}>
        <Stack>
          <TextInput
            label="Name"
            placeholder="you@plexo.app"
            required
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            placeholder="you@plexo.app"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            {...form.getInputProps("password")}
          />

          <Group position="right" mt="md">
            <Button type="submit" loading={registerNewMemberResult.fetching}>
              Register
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

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

  const { theme } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { setNavBarOpened, membersData, isLoadingMembers } = usePlexoContext();

  const membersParsedData =
    membersData?.map(member => ({
      id: member.id as string,
      name: member.name,
      email: member.email,
      role: member.role,
      avatar: member.photoUrl ?? "",
      job: member.role.toString(),
      createdAt: member.createdAt,
    })) ?? [];

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <NewMemberModal opened={opened} close={close} />
      <Stack>
        <Group
          h={73}
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

          <Switch
            onLabel={<Sun color={theme.white} size={18} />}
            offLabel={<Moon color={theme.colors.gray[6]} size={18} />}
            checked={colorScheme === "dark"}
            onChange={() => toggleColorScheme()}
            size="md"
          />
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
import { useMutation, useQuery } from "urql";
import { MembersDocument, RegisterDocument, UpdateMemberDocument } from "integration/graphql";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { ErrorNotification, SuccessNotification } from "lib/notifications";

const useStyles = createStyles(theme => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

interface MemberProps {
  avatar: string;
  name: string;
  role: string;
  email: string;
  job: string;
  id: string;
  createdAt: string;
}

interface TableSelectionProps {
  data: MemberProps[];
}

const getRole = (role: string) => {
  switch (role) {
    case "MEMBER":
      return "Member";
    case "ADMIN":
      return "Admin";
    default:
      return "Read_only";
  }
};

const UpdateMemberModal = ({
  opened,
  close,
  member,
}: {
  opened: boolean;
  close: () => void;
  member: MemberProps | null;
}) => {
  const [updateMemberResult, updateMember] = useMutation(UpdateMemberDocument);

  const form = useForm({
    initialValues: {
      name: member?.name || "",
      email: member?.email || "",
      role: member?.role || "",
    },
    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const onUpdateMember = async (values: typeof form.values) => {
    const res = await updateMember({
      memberId: member?.id,
      name: values.name,
      email: values.email,
      role: getRole(values.role),
    });
    if (res.data) {
      SuccessNotification("Member updated", values.name);
      close();
    }
    if (res.error) {
      ErrorNotification();
    }
  };

  return (
    <Modal opened={opened} onClose={close} title="Update Member">
      <form onSubmit={form.onSubmit(onUpdateMember)}>
        <Stack>
          <TextInput label="Name" placeholder="you@plexo.app" {...form.getInputProps("name")} />
          <TextInput label="Email" placeholder="you@plexo.app" {...form.getInputProps("email")} />
          <Select
            withinPortal
            label="Role"
            data={[
              { value: "ADMIN", label: "Admin" },
              { value: "MEMBER", label: "Member" },
              { value: "READ_ONLY", label: "Read only" },
            ]}
            {...form.getInputProps("role")}
          />

          <Group position="right" mt="md">
            <Button type="submit" loading={updateMemberResult.fetching}>
              Update
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

const EditMemberAction = ({ member }: { member: MemberProps }) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <ActionIcon>
        <Edit size={18} onClick={open} />
      </ActionIcon>
      <UpdateMemberModal opened={opened} close={close} member={member} />
    </>
  );
};

export function TableSelection({ data }: TableSelectionProps) {
  const { classes, cx } = useStyles();

  const [selection, setSelection] = useState(["1"]);

  const toggleRow = (id: string) =>
    setSelection(current =>
      current.includes(id) ? current.filter(item => item !== id) : [...current, id]
    );
  const toggleAll = () =>
    setSelection(current => (current.length === data.length ? [] : data.map(item => item.id)));

  const rows = data
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map(item => {
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
          <td>
            <EditMemberAction member={item} />
          </td>
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
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
