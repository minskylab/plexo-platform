import { Button, Menu, Text, TextInput, Avatar, Skeleton, Tooltip, Kbd } from "@mantine/core";
import { useState } from "react";

import { useData } from "lib/useData";
import { Member, Project } from "modules/app/datatypes";
import { useProjectActions } from "lib/useProjectActions";
import { showNotification } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";

export const LeadProjectPhoto = (member: Member | null) => {
  return member?.photoUrl ? (
    <Avatar src={member.photoUrl} size="sm" radius="xl" />
  ) : (
    <Avatar size="sm" radius="xl" />
  );
};

export const LeadProjectName = (member: Member | null) => {
  return member ? member?.name : "Lead";
};

type GenericLeadsMenuProps = {
  children: React.ReactNode;
  onSelect?: (member: Member | null) => void;
  project?: Project;
};

export const GenericLeadMenu = ({ children, onSelect, project }: GenericLeadsMenuProps) => {
  const { membersData, isLoadingMembers, memberData } = useData(project?.leadId);
  const { fetchUpdateProject } = useProjectActions();
  const memberName = memberData?.memberById.name;

  const onUpdateProjectLead = async (leadId: string | null) => {
    const res = await fetchUpdateProject({
      projectId: project?.id,
      leadId: leadId,
    });

    if (res.data) {
      showNotification({
        autoClose: 5000,
        title: "Lead updated",
        message: res.data.updateProject.name,
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

  return (
    <Menu shadow="md" width={180}>
      <Menu.Target>
        <Tooltip label={memberName ? `Lead by ${memberName}` : "Lead by"} position="bottom">
          {children}
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown>
        <TextInput
          placeholder="Lead by..."
          variant="filled"
          rightSection={<Kbd px={8}>A</Kbd>}
        ></TextInput>
        <Menu.Divider />
        <Menu.Item
          icon={<Avatar size="sm" radius="xl" />}
          onClick={() => {
            onSelect && onSelect(null);
            project && onUpdateProjectLead(null);
          }}
        >
          Unassigned
        </Menu.Item>
        {isLoadingMembers ? (
          <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
        ) : (
          membersData?.members.map(m => {
            return (
              <Menu.Item
                key={m.id}
                icon={
                  m?.photoUrl ? (
                    <Avatar src={m.photoUrl} size="sm" radius="xl" />
                  ) : (
                    <Avatar size="sm" radius="xl" />
                  )
                }
                onClick={() => {
                  onSelect && onSelect(m);
                  project && onUpdateProjectLead(m.id);
                }}
              >
                {m.name}
              </Menu.Item>
            );
          })
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

type LeadProjectSelectorProps = {
  lead: Member | null;
  setLead: (lead: Member | null) => void;
};

export const LeadProjectSelector = ({ lead, setLead }: LeadProjectSelectorProps) => {
  return (
    <GenericLeadMenu onSelect={member => setLead(member)}>
      {typeof lead === "undefined" ? (
        <Button compact variant="light" color={"gray"}>
          {LeadProjectPhoto(lead)}
        </Button>
      ) : (
        <Button compact variant="light" color={"gray"} leftIcon={LeadProjectPhoto(lead)}>
          <Text size={"xs"}>{LeadProjectName(lead)}</Text>
        </Button>
      )}
    </GenericLeadMenu>
  );
};
