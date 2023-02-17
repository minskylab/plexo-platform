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
  Tooltip,
} from "@mantine/core";
import { Tag } from "tabler-icons-react";

import { LabelType } from "./types";

export const LabelColor = (labels: LabelType[] | LabelType | undefined) => {
  const theme = useMantineTheme();

  if (labels) {
    if (Array.isArray(labels)) {
      if (labels.length == 1) {
        switch (labels[0]) {
          case "BUG":
            return <ColorSwatch color={theme.colors.red[7]} size={10} />;
          case "FEATURE":
            return <ColorSwatch color={theme.colors.violet[3]} size={10} />;
          case "IMPROVEMENT":
            return <ColorSwatch color={theme.colors.blue[6]} size={10} />;
          case "MIGRATED":
            return <ColorSwatch color={theme.colors.blue[4]} size={10} />;
        }
      } else if (labels.length > 1) {
        return (
          <Group spacing={0}>
            {labels.map(label => {
              return LabelColor(label);
            })}
          </Group>
        );
      } else {
        return <Tag size={16} />;
      }
    } else {
      switch (labels) {
        case "BUG":
          return <ColorSwatch key={labels} color={theme.colors.red[7]} size={10} />;
        case "FEATURE":
          return <ColorSwatch key={labels} color={theme.colors.violet[3]} size={10} />;
        case "IMPROVEMENT":
          return <ColorSwatch key={labels} color={theme.colors.blue[6]} size={10} />;
        case "MIGRATED":
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
          case "BUG":
            return "Bug";
          case "FEATURE":
            return "Feature";
          case "IMPROVEMENT":
            return "Improvement";
          case "MIGRATED":
            return "Migrated";
        }
      } else {
        return labels.length + " labels";
      }
    } else {
      switch (labels) {
        case "BUG":
          return "Bug";
        case "FEATURE":
          return "Feature";
        case "IMPROVEMENT":
          return "Improvement";
        case "MIGRATED":
          return "Migrated";
      }
    }
  }
  return "";
};

const LabelData = (label: LabelType | undefined) => {
  return (
    <Group spacing={10} sx={{ width: "100%" }}>
      {LabelColor(label)}
      {LabelName(label)}
    </Group>
  );
};

type GenericLabelsMenuProps = {
  children: React.ReactNode;
  selectedLabels: LabelType[];
  setSelectedLabels: (selectedLabels: LabelType[]) => void;
};

export const GenericLabelMenu = ({
  children,
  selectedLabels,
  setSelectedLabels,
}: GenericLabelsMenuProps) => {
  return (
    <Menu shadow="md" width={180} closeOnItemClick={false}>
      <Tooltip label="Add labels" position="bottom">
        {children}
      </Tooltip>

      <Menu.Dropdown>
        <TextInput
          placeholder="Change labels..."
          variant="filled"
          rightSection={<Kbd px={8}>L</Kbd>}
        ></TextInput>
        <Menu.Divider />
        <Checkbox.Group spacing={0} value={selectedLabels} onChange={setSelectedLabels}>
          {Object.values(LabelType).map(label => (
            <Menu.Item key={label} p={0}>
              <Checkbox
                size="xs"
                value={label}
                label={LabelData(label)}
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
      {selectedLabels.length ? (
        <Button compact variant="light" color={"gray"} leftIcon={LabelColor(selectedLabels)}>
          <Text size={"xs"}>{LabelName(selectedLabels)}</Text>
        </Button>
      ) : (
        <Button compact variant="light" color={"gray"}>
          {LabelColor(selectedLabels)}
        </Button>
      )}
    </GenericLabelMenu>
  );
};
