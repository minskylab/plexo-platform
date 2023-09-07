import {
  Group,
  Stack,
  Text,
  Divider,
  ActionIcon,
  Button,
  Avatar,
  Textarea,
  TextInput,
  MediaQuery,
  Box,
  createStyles,
  CopyButton,
  Tooltip,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useClickOutside } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Affiliate, Copy, Dots, LayoutSidebar, Users } from "tabler-icons-react";

import { GenericLeadProjectMenu, LeadName } from "components/ui/Project/lead";
import { GenericMemberMenu } from "components/ui/Project/members";
import { GenericTeamMenu } from "components/ui/Project/team";
import { ProjectMenu } from "components/ui/Project/menu";
import { usePlexoContext } from "context/PlexoContext";
import { ProjectById } from "lib/types";
import { useActions } from "lib/hooks/useActions";
import { AlertNotification, ErrorNotification, SuccessNotification } from "lib/notifications";
import { validateDate } from "lib/utils";

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

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
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

  const onUpdateProjectTitle = async (title: string) => {
    if (!title.length) {
      AlertNotification(
        "titleUpdateFailed",
        "Update Failed",
        "Please enter a title before submitting"
      );
      project?.name && setTitle(project?.name);
    }

    if (title.length) {
      const res = await fetchUpdateProject({
        projectId: project?.id,
        name: title,
      });

      if (res.data) {
        SuccessNotification("Title updated", res.data.updateProject.name);
      }
      if (res.error) {
        ErrorNotification();
      }
    }
  };

  const onUpdateProjectDescription = async (desc: string) => {
    const res = await fetchUpdateProject({
      projectId: project?.id,
      description: desc,
    });

    if (res.data) {
      SuccessNotification("Description updated", res.data.updateProject.name);
    }
    if (res.error) {
      ErrorNotification();
    }
  };

  const refTitle = useClickOutside(() => {
    if (isLoading) {
      return null;
    }
    if (title !== project?.name) {
      onUpdateProjectTitle(title);
    }
  });

  const refDescription = useClickOutside(() => {
    if (isLoading) {
      return null;
    }

    if ((!project?.description || project?.description == "") && description == "") {
      return null;
    }

    if (project?.description !== description) {
      onUpdateProjectDescription(description);
    }
  });

  useEffect(() => {
    if (project) {
      setTitle(project.name);
      setDescription(project.description ? project.description : "");
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
                <GenericLeadProjectMenu project={project}>
                  <Button
                    compact
                    variant="light"
                    color={"gray"}
                    leftIcon={<Avatar size="sm" radius="xl"></Avatar>}
                  >
                    <Text size={"xs"}>{LeadName(project?.leader)}</Text>
                  </Button>
                </GenericLeadProjectMenu>
                <GenericMemberMenu project={project}>
                  <Button compact variant="light" color={"gray"} leftIcon={<Users size={16} />}>
                    {project?.members.length ? (
                      <Text size={"xs"}>{project?.members.length} Members</Text>
                    ) : (
                      <Text size={"xs"}>Members</Text>
                    )}
                  </Button>
                </GenericMemberMenu>
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
            </Stack>

            <Divider />
            <TextInput
              ref={refTitle}
              value={title}
              onChange={e => setTitle(e.target.value)}
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
              ref={refDescription}
              value={description}
              onChange={e => setDescription(e.target.value)}
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
          </Stack>
        </Box>
        <Divider orientation="vertical" className={classes.propsSection} />
        <Stack miw={320} maw={400} className={classes.propsSection}>
          <CopyButton value={project?.id} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? "Copied" : "Copy project ID"} position="top">
                <ActionIcon onClick={copy}>
                  <Copy size={16} />
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
          <Divider />
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
                <Text size={"xs"}>{LeadName(project?.leader)}</Text>
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
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Due Date
            </Text>

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
          </Group>
        </Stack>
      </Group>
    </Stack>
  );
};

export default ProjectDetailContent;
