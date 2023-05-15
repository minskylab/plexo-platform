import { createContext, ReactNode, useContext, useState, useEffect } from "react";

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
  total: number;
};

const STORAGE_KEY = "filterValues";

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

  let storedFilterValues;

  if (typeof window !== "undefined") {
    storedFilterValues = localStorage.getItem(STORAGE_KEY);
  }

  const filterValuesStorage = storedFilterValues
    ? JSON.parse(storedFilterValues)
    : {
        status: [],
        assignee: [],
        leader: [],
        creator: [],
        priority: [],
        labels: [],
        project: [],
        team: [],
      };

  const [statusFilters, setStatusFilters] = useState<string[]>(filterValuesStorage.status ?? []);
  const [assigneeFilters, setAssigneeFilters] = useState<string[]>(
    filterValuesStorage.assignee ?? []
  );
  const [leaderFilters, setLeaderFilters] = useState<string[]>(filterValuesStorage.leader ?? []);
  const [creatorFilters, setCreatorFilters] = useState<string[]>(filterValuesStorage.creator ?? []);
  const [priorityFilters, setPriorityFilters] = useState<string[]>(
    filterValuesStorage.priority ?? []
  );
  const [labelsFilters, setLabelsFilters] = useState<string[]>(filterValuesStorage.labels ?? []);
  const [projectFilters, setProjectFilters] = useState<string[]>(filterValuesStorage.project ?? []);
  const [teamFilters, setTeamFilters] = useState<string[]>(filterValuesStorage.team ?? []);
  const [total, setTotal] = useState(0);
  const [filterValues, setFilterValues] = useState<FilterValues | null>(null);

  useEffect(() => {
    const filterValues = {
      status: statusFilters,
      assignee: assigneeFilters,
      leader: leaderFilters,
      creator: creatorFilters,
      priority: priorityFilters,
      labels: labelsFilters,
      project: projectFilters,
    };
    let filtrostotal = Object.values(filterValues).filter(value => value.length > 0);
    setTotal(filtrostotal.length);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filterValues));
  }, [
    statusFilters,
    assigneeFilters,
    leaderFilters,
    creatorFilters,
    priorityFilters,
    labelsFilters,
    projectFilters,
  ]);

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
        total,
      }}
    >
      {children}
    </PlexoContext.Provider>
  );
};

export default PlexoProvider;
