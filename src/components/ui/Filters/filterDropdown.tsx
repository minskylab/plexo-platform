import { Checkbox, Group, Kbd, MantineTheme, Menu, Skeleton, TextInput, Box } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { Member, Project, TaskPriority, TaskStatus } from "integration/graphql";
import { useData } from "lib/useData";
import {
  AntennaBars5,
  CircleDashed,
  LayoutGrid,
  Tag,
  UserCheck,
  UserCircle,
} from "tabler-icons-react";
import { AssigneeName, AssigneePhoto } from "../Task/assignee";
import { LabelColor, LabelName } from "../Task/label";
import { PriorityIcon, priorityName } from "../Task/priority";
import { ProjectIcon, ProjectName } from "../Task/project";
import { StatusIcon, statusName } from "../Task/status";
import { LabelType } from "../Task/types";
import { Filter } from "./types";
import { Member as MemberType, Project as ProjectType } from "../../../modules/app/datatypes";

type FilterDropdownProps = {
  setOpenedMenu: (openedMenu: boolean) => void;
  filter: String;
  onFilterSelect?: (filter: String) => void;
  filterList: Filter[];
  setFilterList: (filterList: Filter[]) => void;
  statusFilters: TaskStatus[];
  setStatusFilters: (statusFilters: TaskStatus[]) => void;
  assigneeFilters: Member["id"][];
  setAssigneeFilters: (assigneeFilters: Member["id"][]) => void;
  leaderFilters: Member["id"][];
  setLeaderFilters: (leaderFilters: Member["id"][]) => void;
  creatorFilters: Member["id"][];
  setCreatorFilters: (creatorFilters: Member["id"][]) => void;
  priorityFilters: TaskPriority[];
  setPriorityFilters: (priorityFilters: TaskPriority[]) => void;
  labelsFilters: LabelType[];
  setLabelsFilters: (labelsFilters: LabelType[]) => void;
  projectFilters: Project["id"][];
  setProjectFilters: (projectsFilters: Project["id"][]) => void;
  theme: MantineTheme;
};

const StatusData = (status: TaskStatus, theme: MantineTheme) => {
  return (
    <Group spacing={10} sx={{ width: "100%" }}>
      {StatusIcon(theme, status, 18)}
      {statusName(status)}
    </Group>
  );
};

const memberData = (member: MemberType) => {
  return (
    <Group spacing={10} sx={{ width: "100%" }}>
      {AssigneePhoto(member)}
      {AssigneeName(member)}
    </Group>
  );
};

const PriorityData = (priority: TaskPriority) => {
  return (
    <Group spacing={10} sx={{ width: "100%" }}>
      {PriorityIcon(priority, 18)}
      {priorityName(priority)}
    </Group>
  );
};

const LabelData = (label: LabelType, theme: MantineTheme) => {
  return (
    <Group spacing={10} sx={{ width: "100%" }}>
      {LabelColor(label, theme)}
      {LabelName(label)}
    </Group>
  );
};

const ProjectData = (project: ProjectType | null) => {
  return (
    <Group spacing={10} sx={{ width: "100%" }}>
      {ProjectIcon(project)}
      {ProjectName(project)}
    </Group>
  );
};

export const FilterDropdown = ({
  setOpenedMenu,
  filter,
  onFilterSelect,
  filterList,
  setFilterList,
  statusFilters,
  setStatusFilters,
  assigneeFilters,
  setAssigneeFilters,
  leaderFilters,
  setLeaderFilters,
  creatorFilters,
  setCreatorFilters,
  priorityFilters,
  setPriorityFilters,
  labelsFilters,
  setLabelsFilters,
  projectFilters,
  setProjectFilters,
  theme,
}: FilterDropdownProps) => {
  const { membersData, isLoadingMembers } = useData();
  const { projectsData, isLoadingProjects } = useData();

  const ref = useClickOutside(() => {
    setOpenedMenu(false);
    switch (filter) {
      case "status":
        if (statusFilters.length > 0) {
          setFilterList([...filterList, { name: "status", elements: statusFilters }]);
        }
        setStatusFilters([]);
      case "assignee":
        if (assigneeFilters.length > 0) {
          setFilterList([...filterList, { name: "assignee", elements: assigneeFilters }]);
        }
        setAssigneeFilters([]);
      case "leader":
        if (leaderFilters.length > 0) {
          setFilterList([...filterList, { name: "leader", elements: leaderFilters }]);
        }
        setLeaderFilters([]);
      case "creator":
        if (creatorFilters.length > 0) {
          setFilterList([...filterList, { name: "creator", elements: creatorFilters }]);
        }
        setCreatorFilters([]);
      case "priority":
        if (priorityFilters.length > 0) {
          setFilterList([...filterList, { name: "priority", elements: priorityFilters }]);
        }
        setPriorityFilters([]);
      case "labels":
        if (labelsFilters.length > 0) {
          setFilterList([...filterList, { name: "labels", elements: labelsFilters }]);
        }
        setLabelsFilters([]);
      case "project":
        if (projectFilters.length > 0) {
          setFilterList([...filterList, { name: "project", elements: projectFilters }]);
        }
        setProjectFilters([]);
    }
  });

  const typeFilterDropdown = () => {
    switch (filter) {
      case "status":
        return (
          <>
            <TextInput
              placeholder="Status"
              variant="filled"
              rightSection={<Kbd px={8}>P</Kbd>}
            ></TextInput>
            <Menu.Divider />
            <Checkbox.Group spacing={0} value={statusFilters} onChange={setStatusFilters}>
              <Menu.Item p={0}>
                <Checkbox
                  size="xs"
                  value={TaskStatus.None}
                  label={StatusData(TaskStatus.None, theme)}
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
              <Menu.Item p={0}>
                <Checkbox
                  size="xs"
                  value={TaskStatus.Backlog}
                  label={StatusData(TaskStatus.Backlog, theme)}
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
              <Menu.Item p={0}>
                <Checkbox
                  size="xs"
                  value={TaskStatus.ToDo}
                  label={StatusData(TaskStatus.ToDo, theme)}
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
              <Menu.Item p={0}>
                <Checkbox
                  size="xs"
                  value={TaskStatus.InProgress}
                  label={StatusData(TaskStatus.InProgress, theme)}
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
              <Menu.Item p={0}>
                <Checkbox
                  size="xs"
                  value={TaskStatus.Done}
                  label={StatusData(TaskStatus.Done, theme)}
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
              <Menu.Item p={0}>
                <Checkbox
                  size="xs"
                  value={TaskStatus.Canceled}
                  label={StatusData(TaskStatus.Canceled, theme)}
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
            </Checkbox.Group>
          </>
        );
      case "assignee":
        return (
          <>
            <TextInput
              placeholder="Assignee"
              variant="filled"
              rightSection={<Kbd px={8}>P</Kbd>}
            ></TextInput>
            <Menu.Divider />
            {isLoadingMembers ? (
              <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
            ) : (
              <Checkbox.Group spacing={0} value={assigneeFilters} onChange={setAssigneeFilters}>
                {membersData?.members.map(m => {
                  return (
                    <Menu.Item key={m.id} p={0}>
                      <Checkbox
                        size="xs"
                        value={m.id}
                        label={memberData(m)}
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
                  );
                })}
              </Checkbox.Group>
            )}
          </>
        );
      case "leader":
        return (
          <>
            <TextInput
              placeholder="Leader"
              variant="filled"
              rightSection={<Kbd px={8}>P</Kbd>}
            ></TextInput>
            <Menu.Divider />
            {isLoadingMembers ? (
              <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
            ) : (
              <Checkbox.Group spacing={0} value={leaderFilters} onChange={setLeaderFilters}>
                {membersData?.members.map(m => {
                  return (
                    <Menu.Item key={m.id} p={0}>
                      <Checkbox
                        size="xs"
                        value={m.id}
                        label={memberData(m)}
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
                  );
                })}
              </Checkbox.Group>
            )}
          </>
        );
      case "creator":
        return (
          <>
            <TextInput
              placeholder="Creator"
              variant="filled"
              rightSection={<Kbd px={8}>P</Kbd>}
            ></TextInput>
            <Menu.Divider />
            {isLoadingMembers ? (
              <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
            ) : (
              <Checkbox.Group spacing={0} value={creatorFilters} onChange={setCreatorFilters}>
                {membersData?.members.map(m => {
                  return (
                    <Menu.Item key={m.id} p={0}>
                      <Checkbox
                        size="xs"
                        value={m.id}
                        label={memberData(m)}
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
                  );
                })}
              </Checkbox.Group>
            )}
          </>
        );
      case "priority":
        return (
          <>
            <TextInput
              placeholder="Status"
              variant="filled"
              rightSection={<Kbd px={8}>P</Kbd>}
            ></TextInput>
            <Menu.Divider />
            <Checkbox.Group spacing={0} value={priorityFilters} onChange={setPriorityFilters}>
              <Menu.Item p={0}>
                <Checkbox
                  size="xs"
                  value={TaskPriority.None}
                  label={PriorityData(TaskPriority.None)}
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
              <Menu.Item p={0}>
                <Checkbox
                  size="xs"
                  value={TaskPriority.Low}
                  label={PriorityData(TaskPriority.Low)}
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
              <Menu.Item p={0}>
                <Checkbox
                  size="xs"
                  value={TaskPriority.Medium}
                  label={PriorityData(TaskPriority.Medium)}
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
              <Menu.Item p={0}>
                <Checkbox
                  size="xs"
                  value={TaskPriority.High}
                  label={PriorityData(TaskPriority.High)}
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
              <Menu.Item p={0}>
                <Checkbox
                  size="xs"
                  value={TaskPriority.Urgent}
                  label={PriorityData(TaskPriority.Urgent)}
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
            </Checkbox.Group>
          </>
        );
      case "labels":
        return (
          <>
            <TextInput
              placeholder="Status"
              variant="filled"
              rightSection={<Kbd px={8}>P</Kbd>}
            ></TextInput>
            <Menu.Divider />
            <Checkbox.Group spacing={0} value={labelsFilters} onChange={setLabelsFilters}>
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
          </>
        );
      case "project":
        return (
          <>
            <TextInput
              placeholder="Status"
              variant="filled"
              rightSection={<Kbd px={8}>P</Kbd>}
            ></TextInput>
            <Menu.Divider />
            {isLoadingProjects ? (
              <Skeleton height={36} radius="sm" sx={{ "&::after": { background: "#e8ebed" } }} />
            ) : (
              <Checkbox.Group spacing={0} value={projectFilters} onChange={setProjectFilters}>
                {projectsData?.projects.map(p => {
                  return (
                    <Menu.Item key={p.id} p={0}>
                      <Checkbox
                        size="xs"
                        value={p.id}
                        label={ProjectData(p)}
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
                  );
                })}
              </Checkbox.Group>
            )}
          </>
        );
    }
    return (
      <>
        <TextInput
          placeholder="Filter..."
          variant="filled"
          rightSection={<Kbd px={8}>P</Kbd>}
        ></TextInput>
        <Menu.Divider />
        <Menu.Item
          onClick={() => onFilterSelect && onFilterSelect("status")}
          icon={<CircleDashed size={18} />}
        >
          Status
        </Menu.Item>
        <Menu.Item
          onClick={() => onFilterSelect && onFilterSelect("assignee")}
          icon={<UserCircle size={18} />}
        >
          Assignee
        </Menu.Item>
        <Menu.Item
          onClick={() => onFilterSelect && onFilterSelect("leader")}
          icon={<UserCheck size={18} />}
        >
          Leader
        </Menu.Item>
        <Menu.Item
          onClick={() => onFilterSelect && onFilterSelect("creator")}
          icon={<UserCheck size={18} />}
        >
          Creator
        </Menu.Item>
        <Menu.Item
          onClick={() => onFilterSelect && onFilterSelect("priority")}
          icon={<AntennaBars5 size={18} />}
        >
          Priority
        </Menu.Item>
        <Menu.Item
          onClick={() => onFilterSelect && onFilterSelect("labels")}
          icon={<Tag size={18} />}
        >
          Labels
        </Menu.Item>
        <Menu.Item
          onClick={() => onFilterSelect && onFilterSelect("project")}
          icon={<LayoutGrid size={18} />}
        >
          Project
        </Menu.Item>
      </>
    );
  };

  return (
    <Box ref={ref}>
      <Menu.Dropdown>{typeFilterDropdown()}</Menu.Dropdown>
    </Box>
  );
};
