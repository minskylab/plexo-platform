import {
  Group,
  Modal,
  useMantineTheme,
  Text,
  Box,
  TextInput,
  Textarea,
  Button,
  Popover,
  Tooltip,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";
import { useState } from "react";
import { CalendarTime } from "tabler-icons-react";

import { TeamSelector } from "../Task/team";
import { LeadSelector } from "./lead";
import { MemberSelector } from "./members";

type NewProjectProps = {
  newProjectOpened: boolean;
  setNewProjectOpened: (newProjectOpened: boolean) => void;
};

const DateLabel = (date: Date | null, label: string) => {
  return date ? dayjs(date).format("DD MMM") : label;
};

const NewProject = ({ newProjectOpened, setNewProjectOpened }: NewProjectProps) => {
  const theme = useMantineTheme();
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <Modal
      overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.5}
      transition={"slide-up"}
      size={"lg"}
      opened={newProjectOpened}
      onClose={() => setNewProjectOpened(false)}
      shadow="md"
      title={
        <Group spacing={8}>
          <TeamSelector initialTeam={undefined} />
          <Text size={"sm"}>New Project</Text>
        </Group>
      }
    >
      <Box>
        <TextInput placeholder="Project name" variant="unstyled" size="md" autoFocus />
        <Textarea placeholder="Description (optional)" variant="unstyled" size="sm" />
      </Box>
      <Group spacing={6} mb={"md"}>
        <LeadSelector initialLead={undefined} />
        <MemberSelector />

        <Popover position="bottom" shadow="md">
          <Popover.Target>
            <Tooltip label="Change start date" position="bottom">
              <Button compact variant="light" color={"gray"} leftIcon={<CalendarTime size={16} />}>
                <Text size={"xs"}>{DateLabel(startDate, "Start date")}</Text>
              </Button>
            </Tooltip>
          </Popover.Target>
          <Popover.Dropdown>
            <Calendar value={startDate} onChange={setStartDate} />
          </Popover.Dropdown>
        </Popover>

        <Popover position="bottom" shadow="md">
          <Popover.Target>
            <Tooltip label="Change target date" position="bottom">
              <Button compact variant="light" color={"gray"} leftIcon={<CalendarTime size={16} />}>
                <Text size={"xs"}>{DateLabel(targetDate, "Target date")}</Text>
              </Button>
            </Tooltip>
          </Popover.Target>
          <Popover.Dropdown>
            <Calendar value={targetDate} onChange={setTargetDate} />
          </Popover.Dropdown>
        </Popover>
      </Group>
      <Group
        pt={"md"}
        position="right"
        sx={{
          borderTopWidth: 1,
          borderTopStyle: "solid",
          borderTopColor:
            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2],
        }}
      >
        <Button compact variant="default" onClick={() => setNewProjectOpened(false)}>
          Cancel
        </Button>
        <Button compact variant="filled">
          Create project
        </Button>
      </Group>
    </Modal>
  );
};

export default NewProject;
