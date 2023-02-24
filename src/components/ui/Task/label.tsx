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
import { Tag } from "tabler-icons-react";

import { LabelType } from "./types";

export const LabelColor = (
  labels: LabelType[] | LabelType | string | undefined,
  theme: MantineTheme
) => {
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
        return labels[0];
      } else {
        return labels.length + " labels";
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
  selectedLabels: LabelType[];
  setSelectedLabels: (selectedLabels: LabelType[]) => void;
  theme: MantineTheme;
};

export const GenericLabelMenu = ({
  children,
  selectedLabels,
  setSelectedLabels,
  theme,
}: GenericLabelsMenuProps) => {
  return (
    <Menu shadow="md" width={180} closeOnItemClick={false}>
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
        <Checkbox.Group spacing={0} value={selectedLabels} onChange={setSelectedLabels}>
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
    <GenericLabelMenu
      selectedLabels={selectedLabels}
      setSelectedLabels={setSelectedLabels}
      theme={theme}
    >
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
