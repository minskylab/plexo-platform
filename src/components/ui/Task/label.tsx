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
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useActions } from "lib/useActions";
import { TaskById } from "modules/app/datatypes";
import { Check, Tag, X } from "tabler-icons-react";

import { LabelType } from "./types";
import { useState, useEffect } from "react";

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

  const onUpdateTaskLabels = async (labels: string[]) => {
    const res = await fetchUpdateTask({
      taskId: task?.id,
      labels: labels,
    });

    if (res.data) {
      showNotification({
        autoClose: 5000,
        title: "Labels updated",
        message: res.data.updateTask.title,
        color: "blue",
        icon: <Check size={18} />,
      });
    }
    if (res.error) {
      showNotification({
        autoClose: 5000,
        title: "Error!",
        message: "Try again",
        color: "red",
        icon: <X size={18} />,
      });
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
    <Menu shadow="md" width={180} closeOnItemClick={false} position="bottom-start">
      <Menu.Target>
        <Tooltip label="Add labels" position="bottom">
          {children}
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown>
        <TextInput
          placeholder="Change labels..."
          variant="filled"
          rightSection={<Kbd px={8}>L</Kbd>}
        ></TextInput>
        <Menu.Divider />
        <Checkbox.Group spacing={0} value={labelValue} onChange={onChangeLabel}>
          {Object.values(LabelType).map(label => (
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
