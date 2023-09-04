import {
  ActionIcon,
  Box,
  Button,
  CopyButton,
  Divider,
  Group,
  MediaQuery,
  Stack,
  Text,
  TextInput,
  Tooltip,
  createStyles,
} from "@mantine/core";
import { Copy, Dots, LayoutGrid, LayoutSidebar, Users } from "tabler-icons-react";

import { TeamById } from "lib/types";
import { usePlexoContext } from "context/PlexoContext";
import { TeamMenu } from "components/ui/Team/menu";
import { useState, useEffect } from "react";
import { useClickOutside } from "@mantine/hooks";
import { AlertNotification, ErrorNotification, SuccessNotification } from "lib/notifications";
import { useActions } from "lib/hooks/useActions";
import { GenericMemberMenu } from "components/ui/Project/members";
import { GenericProjectsMenu } from "components/ui/Team/projects";

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

type TeamDetailProps = {
  team: TeamById | undefined;
  isLoading: boolean;
};

const TeamDetailPageContent = ({ team, isLoading }: TeamDetailProps) => {
  const { classes, theme } = useStyles();
  const { setNavBarOpened } = usePlexoContext();
  const { fetchUpdateTeam } = useActions();

  const [title, setTitle] = useState<string>("");

  const onUpdateTeamTitle = async (title: string) => {
    if (!title.length) {
      AlertNotification(
        "titleUpdateFailed",
        "Update Failed",
        "Please enter a title before submitting"
      );
      team?.name && setTitle(team?.name);
    }

    if (title.length) {
      const res = await fetchUpdateTeam({
        teamId: team?.id,
        name: title,
      });

      if (res.data) {
        SuccessNotification("Title updated", res.data.updateTeam.name);
      }
      if (res.error) {
        ErrorNotification();
      }
    }
  };

  const refTitle = useClickOutside(() => {
    if (isLoading) {
      return null;
    }
    if (title !== team?.name) {
      onUpdateTeamTitle(title);
    }
  });

  useEffect(() => {
    team?.name && setTitle(team?.name);
  }, [team]);

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
        <Text>Team</Text>
      </Group>
      <Group px={20} sx={{ alignItems: "baseline" }}>
        <Box sx={{ flex: 1 }}>
          <Stack maw={860} m="auto">
            <Group position="apart">
              <Text size={"sm"} color={"dimmed"}>
                {team?.prefix ? team.prefix : "TM-001"}
              </Text>
              <TeamMenu team={team}>
                <ActionIcon radius={"sm"} size={"xs"}>
                  <Dots size={18} />
                </ActionIcon>
              </TeamMenu>
            </Group>
            <Divider />
            <TextInput
              ref={refTitle}
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Team Title"
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
          </Stack>
        </Box>
        <Divider orientation="vertical" className={classes.propsSection} />

        <Stack miw={320} maw={400} className={classes.propsSection}>
          <CopyButton value={team?.id} timeout={2000}>
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
              Members
            </Text>
            <GenericMemberMenu team={team}>
              <Button compact variant="light" color={"gray"} leftIcon={<Users size={16} />}>
                {team?.members.length ? (
                  <Text size={"xs"}>{team?.members.length} Members</Text>
                ) : (
                  <Text size={"xs"}>Members</Text>
                )}
              </Button>
            </GenericMemberMenu>
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Projects
            </Text>
            <GenericProjectsMenu team={team}>
              <Button compact variant="light" color={"gray"} leftIcon={<LayoutGrid size={16} />}>
                {team?.projects.length ? (
                  <Text size={"xs"}>{team.projects.length} Projects</Text>
                ) : (
                  <Text size={"xs"}>Projects</Text>
                )}
              </Button>
            </GenericProjectsMenu>
          </Group>
        </Stack>
      </Group>
    </Stack>
  );
};

export default TeamDetailPageContent;
