import {
  ActionIcon,
  Box,
  CopyButton,
  Divider,
  Group,
  MediaQuery,
  Skeleton,
  Stack,
  Text,
  Tooltip,
  createStyles,
} from "@mantine/core";
import { Copy, Dots, LayoutSidebar } from "tabler-icons-react";

import { TeamById } from "lib/types";
import { usePlexoContext } from "context/PlexoContext";
import { TeamMenu } from "components/ui/Team/menu";
import { MemberSelectorByTeam } from "components/ui/Project/members";
import { ProjectsSelectorByTeam } from "components/ui/Team/projects";
import { TitleForm } from "./Form";

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
            {isLoading ? (
              <Stack spacing={10}>
                <Skeleton height={30} />
                <Skeleton height={20} />
              </Stack>
            ) : (
              <Stack spacing={10}>
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
                <Group spacing={5} className={classes.propsBar}>
                  <MemberSelectorByTeam team={team} />
                  <ProjectsSelectorByTeam team={team} />
                </Group>
              </Stack>
            )}

            <Divider />
            <TitleForm team={team} isLoading={isLoading} />
          </Stack>
        </Box>
        <Divider orientation="vertical" className={classes.propsSection} />

        <Stack miw={320} maw={400} className={classes.propsSection}>
          {isLoading ? (
            <Skeleton height={25} width={40} />
          ) : (
            <CopyButton value={team?.id} timeout={2000}>
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
              Members
            </Text>
            {isLoading ? <Skeleton height={25} width={40} /> : <MemberSelectorByTeam team={team} />}
          </Group>
          <Group>
            <Text w={90} lineClamp={1} size={"sm"} color={"dimmed"}>
              Projects
            </Text>
            {isLoading ? (
              <Skeleton height={25} width={40} />
            ) : (
              <ProjectsSelectorByTeam team={team} />
            )}
          </Group>
        </Stack>
      </Group>
    </Stack>
  );
};

export default TeamDetailPageContent;
