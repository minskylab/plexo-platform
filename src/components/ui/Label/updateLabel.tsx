import {
  Group,
  Modal,
  Text,
  TextInput,
  Textarea,
  Button,
  Popover,
  Tooltip,
  Stack,
  createStyles,
  ColorPicker,
  ColorSwatch,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import { CalendarTime, Check, X } from "tabler-icons-react";
import { useState } from "react";

import { useActions } from "lib/hooks/useActions";
import { DateLabel } from "lib/utils";
import { Label, Member } from "lib/types";



type UpdateLabelProps = {
  label: Label | undefined;
  updateLabelOpened: boolean;
  setUpdateLabelOpened: (newLabelOpened: boolean) => void;
};

const useStyles = createStyles(theme => ({
  input: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    "&:focus-within": {
      borderColor: theme.colors.brand[6],
    },
  },
}));

const UpdateLabel = ({label, updateLabelOpened, setUpdateLabelOpened }: UpdateLabelProps) => {
  const { classes, theme } = useStyles();

  const [name, setName] = useState(label?.name ? label.name : "",);
  const [description, setDescription] = useState(label?.description ? label.description : "", );
  const [color, setColor] = useState(label?.color ? label.color : "");
  const { updateLabel, fetchUpdateLabel } = useActions();

  const onUpdateLabel = async () => {
    const res = await fetchUpdateLabel({
      labelId: label?.id,
      name: name,
      description: description.length ? description : null,
      color: color? color : "white",
    });

    if (res.data) {
      setUpdateLabelOpened(false);
      resetInitialValues(); //TODO
      showNotification({
        autoClose: 5000,
        title: "Label updated",
        message: res.data.updateLabel.name,
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

  const resetInitialValues = () => {
    setName("");
    setDescription("");
    setColor("white");

  };

  return (
    <Modal
      overlayProps={{
        color: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2],
        opacity: 0.5,
        transitionProps: {
          transition: "slide-up",
        },
      }}
      size={"md"}
      opened={updateLabelOpened}
      onClose={() => {
        setUpdateLabelOpened(false);
        resetInitialValues();
      }}
      shadow="md"
      title={
        <Group spacing={8}>
          <Text size={"sm"}>Update Label</Text>
        </Group>
      }
    >
      
      <Stack spacing={10}>
        <Group position="left" spacing={8} sx={{ flex: 1 }}>
      <ColorSwatch color={color as string} size={20} />
        <TextInput
          data-autoFocus
          placeholder="Label name"
          value={name}
          onChange={e => setName(e.target.value)}
          size="md"
          classNames={{
            input: classes.input,
          }}
        />
        </Group>
        <Textarea
          autosize
          minRows={2}
          placeholder="Description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          size="sm"
          classNames={{
            input: classes.input,
          }}
        />
        <Group spacing={6} mb={"md"}>
          <ColorPicker value={color} onChange={setColor} />

          
        </Group>
      </Stack>

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
        <Button compact variant="default" onClick={() => setUpdateLabelOpened(false)}>
          Cancel
        </Button>
        <Button
          compact
          variant="filled"
          disabled={name.length ? false : true}
          loading={updateLabel.fetching}
          onClick={() => {
            onUpdateLabel();
          }}
        >
          Update Label
        </Button>
      </Group>
    </Modal>
  );
};

export default UpdateLabel;
