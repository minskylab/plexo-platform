import {
  Button,
  Kbd,
  Menu,
  Text,
  TextInput,
  ColorSwatch,
  useMantineTheme,
  MantineTheme,
  Checkbox,
  Group,
  Tooltip,
  createStyles,
  Divider,
} from "@mantine/core";
import { useActions } from "lib/useActions";
import { TaskById } from "modules/app/datatypes";
import { Tag } from "tabler-icons-react";

import { LabelType } from "./types";
import { useState, useEffect } from "react";
import { priorityName } from "./priority";
import { statusName } from "./status";
import { assigneesId } from "components/ui/Task/assignees";
import { ErrorNotification, SuccessNotification } from "lib/notifications";
import { usePlexoContext } from "context/PlexoContext";

const useStyles = createStyles(theme => ({
  checkbox: {
    width: "100%",
  },
}));

export const LabelColor = (labels: string[] | string | undefined, theme: MantineTheme) => {
  if (labels) {
    if (Array.isArray(labels)) {
      if (labels.length == 1) {
        switch (labels[0]) {
          case "Bug":
            return <ColorSwatch color={theme.colors.red[7]} size={10} />;
          case "Feature":
            return <ColorSwatch color={theme.colors.violet[3]} size={10} />;
          case "Improvement":
            return <ColorSwatch color={theme.colors.blue[6]} size={10} />;
          case "Migrated":
            return <ColorSwatch color={theme.colors.blue[4]} size={10} />;
        }
      } else if (labels.length > 1) {
        return (
          <Group spacing={0}>
            {labels.map(label => {
              return LabelColor(label, theme);
            })}
          </Group>
        );
      } else {
        return <Tag size={16} />;
      }
    } else {
      switch (labels) {
        case "Bug":
          return <ColorSwatch key={labels} color={theme.colors.red[7]} size={10} />;
        case "Feature":
          return <ColorSwatch key={labels} color={theme.colors.violet[3]} size={10} />;
        case "Improvement":
          return <ColorSwatch key={labels} color={theme.colors.blue[6]} size={10} />;
        case "Migrated":
          return <ColorSwatch key={labels} color={theme.colors.blue[4]} size={10} />;
      }
    }
  }
  if (typeof labels == "undefined") {
    return <Tag size={16} />;
  }
};

export const LabelName = (labels: string[] | string | undefined) => {
  if (labels) {
    if (Array.isArray(labels)) {
      if (labels.length == 1) {
        return labels[0];
      } else if (labels.length > 1) {
        return labels.length + " labels";
      } else {
        return "Label";
      }
    } else {
      return labels;
    }
  }
  return "";
};

const LabelData = (label: LabelType | undefined, theme: MantineTheme) => {
  return (
    <Group spacing={10} sx={{ width: "100%" }}>
      {LabelColor(label, theme)}
      {LabelName(label)}
    </Group>
  );
};

type LabelCheckboxProps = {
  labelsFilters: string[];
  setLabelsFilters: (labelsFilters: string[]) => void;
};

export const LabelCheckboxGroup = ({ labelsFilters, setLabelsFilters }: LabelCheckboxProps) => {
  const { classes, theme } = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [labelOptions, setLabelOptions] = useState<LabelType[]>([]);

  useEffect(() => {
    setLabelOptions(
      Object.values(LabelType).filter(item =>
        item.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
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
      <Checkbox.Group
        orientation="vertical"
        spacing={0}
        value={labelsFilters}
        onChange={setLabelsFilters}
      >
        {labelOptions.map(label => (
          <Checkbox
            key={label}
            size="xs"
            pb={10}
            value={label}
            label={LabelData(label, theme)}
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

type GenericLabelsMenuProps = {
  children: React.ReactNode;
  selectedLabels?: LabelType[];
  setSelectedLabels?: (selectedLabels: LabelType[]) => void;
  task?: TaskById;
};

export const GenericLabelMenu = ({
  children,
  selectedLabels,
  setSelectedLabels,
  task,
}: GenericLabelsMenuProps) => {
  const theme = useMantineTheme();
  const { fetchUpdateTask } = useActions();
  const [labels, setLabels] = useState<string[] | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [labelOptions, setLabelOptions] = useState<LabelType[]>([]);

  useEffect(() => {
    setLabelOptions(
      Object.values(LabelType).filter(item =>
        item.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue]);

  const onUpdateTaskLabels = async (labels: string[]) => {
    const res = await fetchUpdateTask({
      taskId: task?.id,
      labels: labels,
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

  useEffect(() => {
    if (labels) {
      onUpdateTaskLabels(labels);
    }
  }, [labels]);

  const labelValue = selectedLabels ? selectedLabels : labels ? labels : task?.labels;
  const onChangeLabel = selectedLabels ? setSelectedLabels : setLabels;

  return (
    <Menu shadow="md" closeOnItemClick={false} position="bottom-start">
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
        <Checkbox.Group
          spacing={0}
          value={labelValue}
          onChange={onChangeLabel}
          orientation="vertical"
        >
          {labelOptions.map(label => (
            <Menu.Item key={label} p={0}>
              <Checkbox
                size="xs"
                value={label}
                label={LabelData(label, theme)}
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

type LabelSelectorProps = {
  selectedLabels: LabelType[];
  setSelectedLabels: (selectedLabels: LabelType[]) => void;
};

export const LabelSelector = ({ selectedLabels, setSelectedLabels }: LabelSelectorProps) => {
  const theme = useMantineTheme();
  return (
    <GenericLabelMenu selectedLabels={selectedLabels} setSelectedLabels={setSelectedLabels}>
      <Button compact variant="light" color={"gray"} leftIcon={LabelColor(selectedLabels, theme)}>
        <Text size={"xs"}>{LabelName(selectedLabels)}</Text>
      </Button>
    </GenericLabelMenu>
  );
};
