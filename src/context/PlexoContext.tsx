import { LabelType } from "components/ui/Task/types";
import { TaskPriority, TaskStatus } from "integration/graphql";
import { Member, Project, Team } from "modules/app/datatypes";
import { createContext, ReactNode, useContext, useState } from "react";

type PlexoProviderProps = {
  children: ReactNode;
};

type FilterValues = {
  status: string[];
  assignees: string[];
  leader: string[];
  creator: string[];
  priority: string[];
  labels: string[];
  project: string[];
  team: string[];
};

type PlexoContextProps = {
  navBarOpened: boolean;
  setNavBarOpened: (navBarOpened: boolean) => void;
  newTaskOpened: boolean;
  setNewTaskOpened: (newTaskOpened: boolean) => void;
  createMoreTasks: boolean;
  setCreateMoreTasks: (createMoreTasks: boolean) => void;
  statusFilters: string[];
  setStatusFilters: (statusFilters: string[]) => void;
  assigneeFilters: string[];
  setAssigneeFilters: (assigneeFilters: string[]) => void;
  leaderFilters: string[];
  setLeaderFilters: (leaderFilters: string[]) => void;
  creatorFilters: string[];
  setCreatorFilters: (creatorFilters: string[]) => void;
  priorityFilters: string[];
  setPriorityFilters: (priorityFilters: string[]) => void;
  labelsFilters: string[];
  setLabelsFilters: (labelsFilters: string[]) => void;
  projectFilters: string[];
  setProjectFilters: (projectFilters: string[]) => void;
  teamFilters: string[];
  setTeamFilters: (teamFilters: string[]) => void;
  filterValues: FilterValues | null;
  setFilterValues: (filterValues: FilterValues | null) => void;
};

export const PlexoContext = createContext<PlexoContextProps | null>(null);

export const usePlexoContext = () => {
  const context = useContext(PlexoContext);
  if (context === null) {
    throw new Error("usePlexoContext debe estar dentro del PlexoProvider");
  }
  return context;
};

const PlexoProvider = ({ children }: PlexoProviderProps) => {
  const [navBarOpened, setNavBarOpened] = useState(false);
  const [newTaskOpened, setNewTaskOpened] = useState(false);
  const [createMoreTasks, setCreateMoreTasks] = useState(false);
  //Filters
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [assigneeFilters, setAssigneeFilters] = useState<string[]>([]);
  const [leaderFilters, setLeaderFilters] = useState<string[]>([]);
  const [creatorFilters, setCreatorFilters] = useState<string[]>([]);
  const [priorityFilters, setPriorityFilters] = useState<string[]>([]);
  const [labelsFilters, setLabelsFilters] = useState<string[]>([]);
  const [projectFilters, setProjectFilters] = useState<string[]>([]);
  const [teamFilters, setTeamFilters] = useState<string[]>([]);
  const [filterValues, setFilterValues] = useState<FilterValues | null>(null);

  return (
    <PlexoContext.Provider
      value={{
        navBarOpened,
        setNavBarOpened,
        newTaskOpened,
        setNewTaskOpened,
        createMoreTasks,
        setCreateMoreTasks,
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
        teamFilters,
        setTeamFilters,
        filterValues,
        setFilterValues,
      }}
    >
      {children}
    </PlexoContext.Provider>
  );
};

export default PlexoProvider;
