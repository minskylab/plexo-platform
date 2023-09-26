import {
  ActionIcon,
  Button,
  ColorSwatch,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DotsVertical } from "tabler-icons-react";

import { usePlexoContext } from "context/PlexoContext";
import { Label } from "lib/types";
import { NewLabel } from "./NewLabel";
import { LabelMenu } from "./LabelMenu";

const LabelListElement = ({ label }: { label: Label }) => {
  return (
    <Paper px={"sm"} py={4} mt={1}>
      <Group position="apart">
        <Group position="left" sx={{ flex: 1 }}>
          <ColorSwatch color={label.color as string} size={10} />
          <Text size={"sm"}>{label.name}</Text>
        </Group>

        <LabelMenu label={label}>
          <ActionIcon radius={"sm"} size={"xs"}>
            <DotsVertical size={18} />
          </ActionIcon>
        </LabelMenu>
      </Group>
    </Paper>
  );
};

export const OrganizationSection = () => {
  const { labelsData } = usePlexoContext();
  const [opened, { open, close }] = useDisclosure(false);

  const labelsParsedData =
    labelsData?.map(label => ({
      id: label.id as string,
      name: label.name,
      color: label.color,
      createdAt: label.createdAt,
      description: label.description,
    })) ?? [];

  return (
    <>
      <NewLabel opened={opened} close={close} />
      <Container size={"sm"}>
        <Stack spacing={"xl"}>
          <TextInput label="Organization Name" defaultValue={"Plexo"} />

          <Stack>
            <Group position="apart">
              <Text size={"sm"}>Labels</Text>

              <Button compact onClick={open}>
                New Label
              </Button>
            </Group>
            {labelsParsedData.length ? (
              <Stack spacing={2}>
                {labelsParsedData
                  .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                  .map((t: Label) => (
                    <LabelListElement key={t.id} label={t} />
                  ))}
              </Stack>
            ) : null}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};
