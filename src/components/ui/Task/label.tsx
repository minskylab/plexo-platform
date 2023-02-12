import { Button, Kbd, Menu, Text, TextInput, Avatar, Skeleton, ColorSwatch, useMantineTheme,Checkbox, Group} from "@mantine/core";
import { Member, MembersDocument} from "../../../integration/graphql";
import { useState } from "react";
import { useQuery, useSubscription } from "urql";
import { LabelType } from "./labelType";
import { Tag } from "tabler-icons-react";


export const LabelColor = (
  labels: LabelType[] | LabelType | undefined,
  ) => {
    const theme = useMantineTheme();
    if (labels){
        if (Array.isArray(labels)) {
            if (labels.length == 1){
                switch (labels[0]) {
                    case "BUG":
                        return <ColorSwatch color={theme.colors.red[7]}  size={10}/>;
                    case "FEATURE":
                        return <ColorSwatch color={theme.colors.violet[3]} size={10} />;
                    case "IMPROVEMENT":
                        return <ColorSwatch color={theme.colors.blue[6]} size={10}/>;
                    case "MIGRATED":
                        return <ColorSwatch color={theme.colors.blue[4]} size={10}/>;
                }
            }
            else if (labels.length > 1){
                return (
                    <Group spacing={0} >
                      {labels.map(label => {
                        return LabelColor(label)
                      })}
                    </Group>
                  );
            }
            else{
                return <Tag size={16} />;
            }
        }
        else{
            switch (labels) {
                case "BUG":
                    return <ColorSwatch color={theme.colors.red[7]}  size={10}/>;
                case "FEATURE":
                    return <ColorSwatch color={theme.colors.violet[3]} size={10} />;
                case "IMPROVEMENT":
                    return <ColorSwatch color={theme.colors.blue[6]} size={10}/>;
                case "MIGRATED":
                    return <ColorSwatch color={theme.colors.blue[4]} size={10}/>;
            }
        }
    }
    if (typeof labels == "undefined")
    {
        return <Tag size={16} />;

    }
  };

  export const LabelName = (labels: LabelType[] | LabelType | undefined) => {
    if (labels)
    {
        if (Array.isArray(labels)){
            if (labels.length == 1){
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
            }
            else {
                return labels.length + " labels";
            }
        }
        else{
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

type GenericLabelsMenuProps = {
  children: React.ReactNode;
  selectedLabels: LabelType[];
  onChange: ( label: LabelType) => void;
};

export const GenericLabelMenu = ({ children, selectedLabels, onChange }: GenericLabelsMenuProps) => {
    // const [{ data: membersData, fetching: isFetchingMembersData }] = useQuery({
    //     query: MembersDocument,
    //     });
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
        {Object.values(LabelType).map((label) => (
            <Menu.Item 
                onClick={()=>onChange(label)}
                key={label}
            >
            <Group spacing={10}>
            <Checkbox
                    size="xs"
                    id={label}
                    checked={selectedLabels.includes(label)}
                />
                    {LabelColor(label)}
                    {LabelName(label)}
                    </Group>
            </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

// type LabelSelectorProps = {
//   initialLabel?: LabelType;
// };

export const LabelSelector = () => {
  //const [label, setLabel] = useState< LabelType | undefined>(initialLabel);
  const [selectedLabels, setSelectedLabels] = useState<LabelType[]>([]);

  const handleCheckboxChange = ( label: LabelType) => {

    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((selectedLabel) => selectedLabel !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };


  return (
    <GenericLabelMenu onChange={handleCheckboxChange} selectedLabels={selectedLabels}>
      {selectedLabels.length ? 
      <Button compact variant="light" color={"gray"} leftIcon={LabelColor(selectedLabels)}>
        {selectedLabels.length == 1 ? <Text size={"xs"}>{LabelName(selectedLabels[0])}</Text>
        : <Text size={"xs"}>{selectedLabels.length} labels</Text> }
      </Button> :
      <Button compact variant="light" color={"gray"}>{LabelColor(selectedLabels)}</Button>
      }
    </GenericLabelMenu>
  );
};
