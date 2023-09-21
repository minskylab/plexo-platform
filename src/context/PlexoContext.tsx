import {
  LabelsDocument,
  MembersDocument,
  ProjectsDocument,
  TeamsDocument,
} from "integration/graphql";
import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useQuery } from "urql";

import { Label, Member, Project, Task, Team } from "lib/types";

type PlexoProviderProps = {
  children: ReactNode;
  authCookie?: string;
  authEmailURL?: string;
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
  taskId: string | undefined;
  setTaskId: (taskId: string | undefined) => void;
  tasks: Task[] | undefined;
  setTasks: (tasks: Task[] | undefined) => void;
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
  authCookie: string | undefined;
  authEmailURL: string | undefined;
  setAuthCookie: (authCookie: string) => void;
  projectsData: Project[] | undefined;
  isLoadingProjects: boolean;
  membersData: Member[] | undefined;
  isLoadingMembers: boolean;
  teamsData: Team[] | undefined;
  isLoadingTeams: boolean;
  labelsData: Label[] | undefined;
  isLoadingLabels: boolean;
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

const PlexoProvider = ({ authCookie, authEmailURL, children }: PlexoProviderProps) => {
  const [taskId, setTaskId] = useState<string | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);

  const [navBarOpened, setNavBarOpened] = useState(false);
  const [newTaskOpened, setNewTaskOpened] = useState(false);
  const [createMoreTasks, setCreateMoreTasks] = useState(false);

  const [authCookieState, setAuthCookie] = useState(authCookie);

  const [projectsData, setProjectsData] = useState<Project[] | undefined>(undefined);
  const [membersData, setMembersData] = useState<Member[] | undefined>(undefined);
  const [teamsData, setTeamsData] = useState<Team[] | undefined>(undefined);
  const [labelsData, setLabelsData] = useState<Label[] | undefined>(undefined);

  //Queries

  const [{ data: projects, fetching: isLoadingProjects }] = useQuery({
    query: ProjectsDocument,
  });

  const [{ data: members, fetching: isLoadingMembers }] = useQuery({
    query: MembersDocument,
  });

  const [{ data: teams, fetching: isLoadingTeams }] = useQuery({
    query: TeamsDocument,
  });

  const [{ data: labels, fetching: isLoadingLabels }] = useQuery({
    query: LabelsDocument,
  });

  useEffect(() => {
    if (!isLoadingProjects && projects) {
      setProjectsData(projects.projects);
    }
  }, [projects, isLoadingProjects]);

  useEffect(() => {
    if (!isLoadingMembers && members) {
      setMembersData(members.members);
    }
  }, [members, isLoadingMembers]);

  useEffect(() => {
    if (!isLoadingTeams && teams) {
      setTeamsData(teams.teams);
    }
  }, [teams, isLoadingTeams]);

  useEffect(() => {
    if (!isLoadingLabels && labels) {
      setLabelsData(labels.labels);
    }
  }, [labels, isLoadingLabels]);

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
        authCookie: authCookieState,
        setAuthCookie,
        authEmailURL,
        taskId,
        setTaskId,
        tasks,
        setTasks,
        projectsData,
        isLoadingProjects,
        membersData,
        isLoadingMembers,
        teamsData,
        isLoadingTeams,
        labelsData,
        isLoadingLabels,
      }}
    >
      {children}
    </PlexoContext.Provider>
  );
};

export default PlexoProvider;
