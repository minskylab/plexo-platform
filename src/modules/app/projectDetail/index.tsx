import {
  Group,
  Stack,
  useMantineTheme,
  Text,
  Divider,
  ActionIcon,
  Button,
  Avatar,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useEffect, useState } from "react";
import { Affiliate, Dots, Users } from "tabler-icons-react";

import { GenericLeadProjectMenu, LeadName } from "components/ui/Project/lead";
import { GenericMemberMenu } from "components/ui/Project/members";
import { GenericTeamMenu } from "components/ui/Project/team";
import { ProjectById } from "../datatypes";

type ProjectDetailProps = {
  project: ProjectById | undefined;
  isLoading: boolean;
};

const ProjectDetailContent = ({ project, isLoading }: ProjectDetailProps) => {
  const theme = useMantineTheme();
  const [dueDate, setDueDate] = useState<Date | null>(null);

  useEffect(() => {
    if (project?.dueDate) {
      setDueDate(new Date(project?.dueDate));
    }
  }, [project?.dueDate]);

  const handleDateChange = (date: Date | null) => {
    setDueDate(date);
  };

  return (
    <Stack h={"100vh"}>
      <Group
        h={80}
        px={20}
        sx={{
          borderBottom: `1px solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
          }`,
        }}
      >
        <Text>Project</Text>
      </Group>
      <Stack w={860} h={"100%"} m="auto">
        <Group position="apart">
          <Text size={"sm"} color={"dimmed"}>
            {project?.prefix ? project.prefix : "PR-001"}
          </Text>
          <ActionIcon radius={"sm"} size={"xs"}>
            <Dots size={18} />
          </ActionIcon>
        </Group>
        <Divider />
        <TextInput
          value={project?.name ? project?.name : ""}
          onChange={() => {}}
          placeholder="Project Title"
          size="lg"
          styles={theme => ({
            input: {
              fontSize: 22,
              backgroundColor: "transparent",
              borderColor: "transparent",
              "&:focus-within": {
                borderColor: theme.colors.orange[7],
              },
            },
          })}
        />
        <Textarea
          value={project?.description ? project?.description : ""}
          /* onChange={e => setDescription(e.target.value)} */
          placeholder="Add description..."
          size="sm"
          autosize
          minRows={2}
          styles={theme => ({
            input: {
              backgroundColor: "transparent",
              borderColor: "transparent",
              "&:focus-within": {
                borderColor: theme.colors.orange[7],
              },
            },
          })}
        />
        <Text size={"sm"} color={"dimmed"}>
          Properties
        </Text>
        <Group>
          <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
            Lead
          </Text>
          <GenericLeadProjectMenu project={project}>
            <Button
              compact
              variant="light"
              color={"gray"}
              leftIcon={<Avatar size="sm" radius="xl"></Avatar>}
            >
              <Text size={"xs"}>{LeadName(project?.leader?.name)}</Text>
            </Button>
          </GenericLeadProjectMenu>
        </Group>
        <Group>
          <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
            Members
          </Text>
          <GenericMemberMenu project={project}>
            <Button compact variant="light" color={"gray"} leftIcon={<Users size={16} />}>
              {project?.members.length ? (
                <Text size={"xs"}>{project?.members.length} Members</Text>
              ) : (
                <Text size={"xs"}>Members</Text>
              )}
            </Button>
          </GenericMemberMenu>
        </Group>
        <Group>
          <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
            Teams
          </Text>
          <GenericTeamMenu>
            <Button compact variant="light" color={"gray"} leftIcon={<Affiliate size={16} />}>
              {project?.teams.length ? (
                <Text size={"xs"}>{project?.teams.length} Teams</Text>
              ) : (
                <Text size={"xs"}>Teams</Text>
              )}
            </Button>
          </GenericTeamMenu>
        </Group>
        <Group>
          <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
            Due Date
          </Text>
          <DatePicker
            size="xs"
            placeholder="Set due date"
            value={dueDate}
            onChange={handleDateChange}
            styles={{
              input: {
                padding: "0px 8px",
                borderRadius: 4,
                backgroundColor: "transparent",
              },
            }}
          />
        </Group>
        <Group>
          <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
            Start Date
          </Text>
          <DatePicker
            size="xs"
            placeholder="Set start date"
            value={dueDate}
            onChange={handleDateChange}
            styles={{
              input: {
                padding: "0px 8px",
                borderRadius: 4,
                backgroundColor: "transparent",
              },
            }}
          />
        </Group>
      </Stack>
    </Stack>
  );
};

export default ProjectDetailContent;
