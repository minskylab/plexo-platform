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
import { DateInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import { Affiliate, Dots, Users } from "tabler-icons-react";

import { GenericLeadProjectMenu, LeadName } from "components/ui/Project/lead";
import { GenericMemberMenu } from "components/ui/Project/members";
import { GenericTeamMenu } from "components/ui/Project/team";
import { ProjectById } from "lib/types";
import { useActions } from "lib/hooks/useActions";
import { ErrorNotification, SuccessNotification } from "lib/notifications";

type ProjectDetailProps = {
  project: ProjectById | undefined;
  isLoading: boolean;
};

const ProjectDetailContent = ({ project, isLoading }: ProjectDetailProps) => {
  const theme = useMantineTheme();
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const { fetchUpdateProject } = useActions();

  const onUpdateTaskDueDate = async (date: Date | null) => {
    const res = await fetchUpdateProject({
      projectId: project?.id,
      dueDate: date,
    });
    if (res.data) {
      SuccessNotification("Due date updated", res.data.updateProject.name);
    }
    if (res.error) {
      ErrorNotification();
    }
  };

  const onUpdateTaskStartDate = async (date: Date | null) => {
    const res = await fetchUpdateProject({
      projectId: project?.id,
      startDate: date,
    });
    if (res.data) {
      SuccessNotification("Start date updated", res.data.updateProject.name);
    }
    if (res.error) {
      ErrorNotification();
    }
  };

  useEffect(() => {
    project?.dueDate && setDueDate(new Date(project?.dueDate));
    project?.startDate && setStartDate(new Date(project?.startDate));
  }, [project]);

  const handleDueDateChange = (date: Date | null) => {
    setDueDate(date);
    onUpdateTaskDueDate(date);
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    onUpdateTaskStartDate(date);
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
                borderColor: theme.colors.brand[6],
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
                borderColor: theme.colors.brand[6],
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
          <GenericTeamMenu project={project}>
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
            Start Date
          </Text>
          <DateInput
            size="xs"
            placeholder="Set start date"
            value={startDate}
            onChange={handleStartDateChange}
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
            Due Date
          </Text>
          <DateInput
            size="xs"
            placeholder="Set due date"
            value={dueDate}
            onChange={handleDueDateChange}
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
