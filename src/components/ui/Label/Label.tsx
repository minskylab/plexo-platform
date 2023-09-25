import {
  ActionIcon,
  Badge,
  Checkbox,
  ColorPicker,
  ColorSwatch,
  createStyles,
  Group,
  Paper,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { DotsVertical } from "tabler-icons-react";
import router from "next/router";

import { Label } from "lib/types";
import { DateLabel } from "lib/utils";
import { LabelMenu } from "./menu";


type LabelProps = {
  label: Label;
  active?: boolean;
  checked?: boolean;
};

const useStyles = createStyles(theme => ({
  MIN: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
  date: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
  badgeLabel: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  badgeProject: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
  text: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
}));

// type ColorLabelSelectorProps = {
//   color: string | undefined ;
//   setColor: (value: String | undefined) => void;
// };


// export const ColorLabelSelector = ({ color, setColor }: ColorLabelSelectorProps) => {
//   return (
//     <Group position="right" spacing={8}>
//       <ColorPicker value={color} onChange={setColor} />
//     </Group>
//   );
// }


export const LabelListElement = ({ label, active = false, checked = false }: LabelProps) => {
  const theme = useMantineTheme();
  const [controlledChecked, setChecked] = useState(checked);
  const { classes } = useStyles();

  return (
    <Paper px={6} py={4} mt={1} withBorder={active}>
      <Group spacing={0}>
        <Group position="left" spacing={8} sx={{ flex: 1 }}>
          <Checkbox
            checked={controlledChecked}
            onChange={event => setChecked(event.currentTarget.checked)}
            size="xs"
            sx={{
              opacity: controlledChecked ? 1 : 0,
              ":hover": {
                opacity: 1,
              },
            }}
          />
          
          <ColorSwatch color={label.color as string} size={10} />
          <Text
            size={"sm"}
            lineClamp={1}
            // onClick={() => router.push(`/tasks/${task.id}`)}
            className={classes.text}
          >
            
            {label.name}
          </Text>
          
          
          {//put this text field to the left
          }
          <Text lineClamp={1} className={classes.text} size={"sm"} color={"dimmed"}>
            {label.description}
          </Text>
          
        </Group>

        <Group position="right" spacing={8}>
          

          <Text lineClamp={1} className={classes.date} size={"sm"} color={"dimmed"}>
            {DateLabel(label.createdAt)}
          </Text>


          <LabelMenu label={label}>
            <ActionIcon radius={"sm"} size={"xs"}>
              <DotsVertical size={18} />
            </ActionIcon>
          </LabelMenu>
        </Group>
      </Group>
    </Paper>
  );
};

