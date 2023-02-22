import {
  Button,
  Kbd,
  Menu,
  Text,
  TextInput,
  ColorSwatch,
  useMantineTheme,
  Checkbox,
  Group,
  MantineTheme,
} from "@mantine/core";
import { Tag } from "tabler-icons-react";
import { useState } from "react";

import { LabelType } from "./types";

export const LabelColor = (labels: LabelType[] | LabelType | undefined, theme: MantineTheme) => {
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

export const LabelName = (labels: LabelType[] | LabelType | undefined) => {
  if (labels) {
    if (Array.isArray(labels)) {
      if (labels.length == 1) {
        switch (labels[0]) {
          case "Bug":
            return "Bug";
          case "Feature":
            return "Feature";
          case "Improvement":
            return "Improvement";
          case "Migrated":
            return "Migrated";
        }
      } else {
        return labels.length + " labels";
      }
    } else {
      switch (labels) {
        case "Bug":
          return "Bug";
        case "Feature":
          return "Feature";
        case "Improvement":
          return "Improvement";
        case "Migrated":
          return "Migrated";
      }
    }
  }
  return "";
};

type GenericLabelsMenuProps = {
  children: React.ReactNode;
  selectedLabels: LabelType[];
  onChange: (label: LabelType) => void;
};

export const GenericLabelMenu = ({
  children,
  selectedLabels,
  onChange,
}: GenericLabelsMenuProps) => {
  const theme = useMantineTheme();
  return (
    <Menu shadow="md" width={180} closeOnItemClick={false}>
      <Menu.Target>
        {/* <ActionIcon variant="light" radius={"sm"}>
                {PriorityIcon(task.priority)}
              </ActionIcon> */}
        {children}
      </Menu.Target>

      <Menu.Dropdown>
        <TextInput
          placeholder="Change labels..."
          variant="filled"
          rightSection={<Kbd px={8}>L</Kbd>}
        ></TextInput>
        <Menu.Divider />
        {Object.values(LabelType).map(label => (
          <Menu.Item
            onClick={() => {
              onChange(label);
            }}
            key={label}
          >
            <Group spacing={10}>
              <Checkbox
                size="xs"
                id={label}
                checked={selectedLabels.includes(label)}
                onChange={() => onChange(label)}
              />
              {LabelColor(label, theme)}
              {LabelName(label)}
            </Group>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

type LabelSelectorProps = {
  initialLabel: LabelType[];
};

export const LabelSelector = ({ initialLabel }: LabelSelectorProps) => {
  const theme = useMantineTheme();
  const [selectedLabels, setSelectedLabels] = useState<LabelType[]>(initialLabel);

  const handleCheckboxChange = (label: LabelType) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter(selectedLabel => selectedLabel !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  return (
    <GenericLabelMenu onChange={handleCheckboxChange} selectedLabels={selectedLabels}>
      {selectedLabels.length ? (
        <Button compact variant="light" color={"gray"} leftIcon={LabelColor(selectedLabels, theme)}>
          <Text size={"xs"}>{LabelName(selectedLabels)}</Text>
        </Button>
      ) : (
        <Button compact variant="light" color={"gray"}>
          {LabelColor(selectedLabels, theme)}
        </Button>
      )}
    </GenericLabelMenu>
  );
};
