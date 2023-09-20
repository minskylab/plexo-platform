import {
  Group,
  Stack,
  Text,
  Divider,
  ActionIcon,
  MediaQuery,
  Box,
  createStyles,
  CopyButton,
  Tooltip,
  Skeleton,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import { Copy, Dots, LayoutSidebar } from "tabler-icons-react";

import { LeadSelectorByProject } from "components/ui/Project/lead";
import { MemberSelectorByProject } from "components/ui/Project/members";
import { TeamSelectorByProject } from "components/ui/Project/team";
import { ProjectMenu } from "components/ui/Project/menu";
import { usePlexoContext } from "context/PlexoContext";
import { ProjectById } from "lib/types";
import { useActions } from "lib/hooks/useActions";
import { ErrorNotification, SuccessNotification } from "lib/notifications";
import { validateDate } from "lib/utils";
import { TitleForm } from "./Form";

type ProjectDetailProps = {
  project: ProjectById | undefined;
  isLoading: boolean;
};

const useStyles = createStyles(theme => ({
  propsSection: {
    [theme.fn.smallerThan("lg")]: {
      display: "none",
    },
  },
  propsBar: {
    display: "none",
    [theme.fn.smallerThan("lg")]: {
      display: "flex",
    },
  },
}));

const ProjectDetailContent = ({ project, isLoading }: ProjectDetailProps) => {
  const { classes, theme } = useStyles();
  const { fetchUpdateProject } = useActions();
  const { setNavBarOpened } = usePlexoContext();

  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);

  const onUpdateProjectDueDate = async (date: Date | null) => {
    const res = await fetchUpdateProject({
      projectId: project?.id,
      dueDate: date === null ? new Date(0) : date,
    });
    if (res.data) {
      SuccessNotification("Due date updated", res.data.updateProject.name);
    }
    if (res.error) {
      ErrorNotification();
    }
  };

  const onUpdateProjectStartDate = async (date: Date | null) => {
    const res = await fetchUpdateProject({
      projectId: project?.id,
      startDate: date === null ? new Date(0) : date,
    });
    if (res.data) {
      SuccessNotification("Start date updated", res.data.updateProject.name);
    }
    if (res.error) {
      ErrorNotification();
    }
  };

  useEffect(() => {
    if (project) {
      setDueDate(validateDate(project.dueDate));
      setStartDate(validateDate(project.startDate));
    }
  }, [project]);

  const handleDueDateChange = (date: Date | null) => {
    setDueDate(date);
    onUpdateProjectDueDate(date);
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    onUpdateProjectStartDate(date);
  };

  return (
    <Stack h={"100vh"}>
      <Group
        h={73}
        px={20}
        sx={{
          borderBottom: `1px solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
          }`,
        }}
      >
        <MediaQuery largerThan="md" styles={{ display: "none" }}>
          <ActionIcon onClick={() => setNavBarOpened(true)}>
            <LayoutSidebar size={16} />
          </ActionIcon>
        </MediaQuery>
        <Text>Project</Text>
      </Group>
      <Group px={20} sx={{ alignItems: "baseline" }}>
        <Box sx={{ flex: 1 }}>
          <Stack maw={860} m="auto">
            {isLoading ? (
              <Stack spacing={10}>
                <Skeleton height={30} />
                <Skeleton height={20} />
              </Stack>
            ) : (
              <Stack spacing={10}>
                <Group position="apart">
                  <Text size={"sm"} color={"dimmed"}>
                    {project?.prefix ? project.prefix : "PR-001"}
                  </Text>
                  <ProjectMenu project={project}>
                    <ActionIcon radius={"sm"} size={"xs"}>
                      <Dots size={18} />
                    </ActionIcon>
                  </ProjectMenu>
                </Group>
                <Group spacing={5} className={classes.propsBar}>
                  <LeadSelectorByProject project={project} />
                  <MemberSelectorByProject project={project} />
                  <TeamSelectorByProject project={project} />
                </Group>
              </Stack>
            )}

            <Divider />
            <TitleForm project={project} isLoading={isLoading} />
          </Stack>
        </Box>
        <Divider orientation="vertical" className={classes.propsSection} />
        <Stack miw={320} maw={400} className={classes.propsSection}>
          {isLoading ? (
            <Skeleton height={25} width={40} />
          ) : (
            <CopyButton value={project?.id} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip label={copied ? "Copied" : "Copy project ID"} position="top">
                  <ActionIcon onClick={copy}>
                    <Copy size={16} />
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          )}
          <Divider />
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Lead
            </Text>
            {isLoading ? (
              <Skeleton height={25} width={40} />
            ) : (
              <LeadSelectorByProject project={project} />
            )}
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Members
            </Text>
            {isLoading ? (
              <Skeleton height={25} width={40} />
            ) : (
              <MemberSelectorByProject project={project} />
            )}
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Teams
            </Text>
            {isLoading ? (
              <Skeleton height={25} width={40} />
            ) : (
              <TeamSelectorByProject project={project} />
            )}
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Start Date
            </Text>
            {isLoading ? (
              <Skeleton height={25} width={40} />
            ) : (
              <Tooltip label="Start Date" position="bottom">
                <DateInput
                  clearable
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
              </Tooltip>
            )}
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Due Date
            </Text>

            {isLoading ? (
              <Skeleton height={25} width={40} />
            ) : (
              <Tooltip label="Due Date" position="bottom">
                <DateInput
                  clearable
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
              </Tooltip>
            )}
          </Group>
        </Stack>
      </Group>
    </Stack>
  );
};

export default ProjectDetailContent;
