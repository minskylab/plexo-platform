import { ActionIcon, Divider, Group, Stack, Text, TextInput, useMantineTheme } from "@mantine/core";
import { Dots } from "tabler-icons-react";

import { TeamById } from "lib/types";

type TeamDetailProps = {
  team: TeamById | undefined;
  isLoading: boolean;
};

const TeamDetailPageContent = ({ team, isLoading }: TeamDetailProps) => {
  const theme = useMantineTheme();

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
        <Text>Team</Text>
      </Group>
      <Stack w={860} h={"100%"} m="auto">
        <Group position="apart">
          <Text size={"sm"} color={"dimmed"}>
            {team?.prefix ? team.prefix : "TM-001"}
          </Text>
          <ActionIcon radius={"sm"} size={"xs"}>
            <Dots size={18} />
          </ActionIcon>
        </Group>
        <Divider />
        <TextInput
          value={team?.name ? team?.name : ""}
          onChange={() => {}}
          placeholder="Team Title"
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
      </Stack>
    </Stack>
  );
};

export default TeamDetailPageContent;
