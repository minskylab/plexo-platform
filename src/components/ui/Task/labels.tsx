import {
  Button,
  Checkbox,
  Kbd,
  Menu,
  TextInput,
  Tooltip,
  Text,
  Avatar,
  Box,
  Group,
  ColorSwatch,
  Divider,
  createStyles,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Tag } from "tabler-icons-react";

import { ErrorNotification, SuccessNotification } from "lib/notifications";
import { useActions } from "lib/hooks/useActions";
import { Label, TaskById } from "lib/types";
import { priorityName } from "./priority";
import { statusName } from "./status";
import { assigneesId } from "components/ui/Task/assignees";
import { useQuery } from "urql";
import { LabelsDocument } from "integration/graphql";

const useStyles = createStyles(theme => ({
  checkbox: {
    width: "100%",
  },
}));

export const LabelIcon = () => {
  return <Tag size={16} />;
};

type GenericLabelsMenuProps = {
  children: React.ReactNode;
  selectedLabels?: string[];
  setSelectedLabels?: (selectedLabels: string[]) => void;
  task?: TaskById;
};

export const LabelColor = (labels: string[]) => {
  const [{ data: labelsData }] = useQuery({
    query: LabelsDocument,
  });

  const colors: Label[] = labelsData
    ? labelsData?.labels.filter((label: Label) => labels.includes(label.id))
    : [];

  if (labels.length) {
    return (
      <Avatar.Group spacing="sm">
        {colors.map(c => {
          return (
            <Avatar
              key={c.id}
              sx={{
                height: 10,
                width: 18,
                minWidth: 10,
                backgroundColor: "transparent",
                border: "hidden",
              }}
              styles={{
                placeholder: {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Box w={10} h={10} sx={{ borderRadius: "50%", backgroundColor: `${c.color}` }}></Box>
            </Avatar>
          );
        })}
      </Avatar.Group>
    );
  }

  return (
    <Group>
      <LabelIcon />
    </Group>
  );
};

export const LabelNameBtn = (labels: string[]) => {
  const [{ data: labelsData }] = useQuery({
    query: LabelsDocument,
  });

  const data = labelsData
    ? labelsData?.labels.filter((label: Label) => labels.includes(label.id))
    : [];

  if (labels.length == 1) {
    const labelName = data.filter((label: Label) => labels.includes(label.id));
    return labelName[0].name;
  }

  if (labels.length > 1) {
    return `${labels.length} labels`;
  }

  return "Label";
};

type LabelCheckboxProps = {
  labelsFilters: string[];
  setLabelsFilters: (labelsFilters: string[]) => void;
};

export const LabelCheckboxGroup = ({ labelsFilters, setLabelsFilters }: LabelCheckboxProps) => {
  const { classes } = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [labelsOptions, setLabelsOptions] = useState<Label[]>([]);

  const [{ data: labelsData }] = useQuery({
    query: LabelsDocument,
  });

  useEffect(() => {
    if (labelsData?.labels) {
      setLabelsOptions(
        labelsData?.labels.filter((item: Label) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [searchValue]);

  return (
    <>
      <TextInput
        placeholder="Label"
        variant="unstyled"
        value={searchValue}
        onChange={event => setSearchValue(event.currentTarget.value)}
      />
      <Divider />
      <Checkbox.Group mt={10} value={labelsFilters} onChange={setLabelsFilters}>
        {labelsOptions.map(label => (
          <Checkbox
            key={label.id}
            size="xs"
            pb={15}
            value={label.id}
            label={
              <Group spacing={12}>
                <ColorSwatch color={label.color as string} size={10} />
                <Text>{label.name}</Text>
              </Group>
            }
            classNames={{
              body: classes.checkbox,
              labelWrapper: classes.checkbox,
            }}
          />
        ))}
      </Checkbox.Group>
    </>
  );
};

export const GenericLabelsMenu = ({
  children,
  selectedLabels,
  setSelectedLabels,
  task,
}: GenericLabelsMenuProps) => {
  const [labels, setLabels] = useState<string[] | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [labelsOptions, setLabelsOptions] = useState<Label[]>([]);
  const { fetchUpdateTask } = useActions();

  const [{ data: labelsData }] = useQuery({
    query: LabelsDocument,
  });

  useEffect(() => {
    if (labelsData?.labels) {
      setLabelsOptions(
        labelsData?.labels.filter((item: Label) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [labelsData, searchValue]);

  useEffect(() => {
    if (labels) {
      onUpdateTaskLabels(labels);
    }
  }, [labels]);

  const onUpdateTaskLabels = async (labels: string[]) => {
    const res = await fetchUpdateTask({
      taskId: task?.id,
      labels: labels, //TODO: verify if this is correct, and why does this work without a map to send only the id's / to send multiple labels
      leadId: task?.leader?.id,
      priority: priorityName(task?.priority),
      status: statusName(task?.status),
      title: task?.title,
      description: task?.description,
      dueDate: task?.dueDate,
      projectId: task?.project?.id,
      assignees: assigneesId(task),
    });

    if (res.data) {
      SuccessNotification("Labels updated", res.data.updateTask.title);
    }
    if (res.error) {
      ErrorNotification();
    }
  };

  const labelValue = selectedLabels
    ? selectedLabels
    : labels
    ? labels
    : task?.labels.map(l => l.id);
  const onChangeLabel = selectedLabels ? setSelectedLabels : setLabels;

  return (
    <Menu shadow="md" closeOnItemClick={false} position="bottom-start" withinPortal>
      <Menu.Target>
        <Tooltip label="Add labels" position="bottom">
          {children}
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown>
        <TextInput
          placeholder="Change labels..."
          variant="filled"
          value={searchValue}
          onChange={event => setSearchValue(event.currentTarget.value)}
          rightSection={<Kbd px={8}>L</Kbd>}
        ></TextInput>
        <Menu.Divider />
        <Checkbox.Group mt={10} value={labelValue} onChange={onChangeLabel}>
          {labelsOptions.map(label => (
            <Menu.Item key={label.id} p={0}>
              <Checkbox
                size="xs"
                value={label.id}
                label={
                  <Group spacing={12}>
                    <ColorSwatch color={label.color as string} size={10} />
                    <Text>{label.name}</Text>
                  </Group>
                }
                styles={{
                  body: {
                    width: "100%",
                    padding: 10,
                    alignItems: "center",
                  },
                  labelWrapper: {
                    width: "100%",
                  },
                }}
              />
            </Menu.Item>
          ))}
        </Checkbox.Group>
      </Menu.Dropdown>
    </Menu>
  );
};

type LabelsSelectorProps = {
  selectedLabels: string[];
  setSelectedLabels: (selectedLabels: string[]) => void;
};

export const LabelsSelector = ({ selectedLabels, setSelectedLabels }: LabelsSelectorProps) => {
  return (
    <GenericLabelsMenu selectedLabels={selectedLabels} setSelectedLabels={setSelectedLabels}>
      <Button compact variant="light" color={"gray"} leftIcon={LabelColor(selectedLabels)}>
        <Text size={"xs"}>{LabelNameBtn(selectedLabels)}</Text>
      </Button>
    </GenericLabelsMenu>
  );
};

export const LabelsSelectorBytask = ({ task }: { task: TaskById | undefined }) => {
  const labels = task ? task.labels.map(l => l.id as string) : [];

  return (
    <GenericLabelsMenu task={task}>
      <Button compact variant="light" color={"gray"} leftIcon={LabelColor(labels)}>
        <Text size={"xs"}>{LabelNameBtn(labels)}</Text>
      </Button>
    </GenericLabelsMenu>
  );
};
