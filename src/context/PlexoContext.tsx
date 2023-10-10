import {
  LabelsDocument,
  MembersDocument,
  ProjectsDocument,
  TeamsDocument,
  UserDocument,
} from "integration/graphql";
import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useQuery } from "urql";

import { Label, Member, Project, Task, Team, User } from "lib/types";

type PlexoProviderProps = {
  children: ReactNode;
  authCookie?: string;
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
  authCookie: string | undefined;
  setAuthCookie: (authCookie: string) => void;
  userData: User | undefined;
  isLoadingUser: boolean;
  projectsData: Project[] | undefined;
  isLoadingProjects: boolean;
  membersData: Member[] | undefined;
  isLoadingMembers: boolean;
  teamsData: Team[] | undefined;
  isLoadingTeams: boolean;
  labelsData: Label[] | undefined;
  isLoadingLabels: boolean;
};

export const PlexoContext = createContext<PlexoContextProps | null>(null);

export const usePlexoContext = () => {
  const context = useContext(PlexoContext);
  if (context === null) {
    throw new Error("usePlexoContext debe estar dentro del PlexoProvider");
  }
  return context;
};

const PlexoProvider = ({ authCookie, children }: PlexoProviderProps) => {
  const [taskId, setTaskId] = useState<string | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);

  const [navBarOpened, setNavBarOpened] = useState(false);
  const [newTaskOpened, setNewTaskOpened] = useState(false);
  const [createMoreTasks, setCreateMoreTasks] = useState(false);

  const [authCookieState, setAuthCookie] = useState(authCookie);

  const [userData, setUserData] = useState<User | undefined>(undefined);
  const [projectsData, setProjectsData] = useState<Project[] | undefined>(undefined);
  const [membersData, setMembersData] = useState<Member[] | undefined>(undefined);
  const [teamsData, setTeamsData] = useState<Team[] | undefined>(undefined);
  const [labelsData, setLabelsData] = useState<Label[] | undefined>(undefined);

  const [{ data: user, fetching: isLoadingUser }] = useQuery({
    query: UserDocument,
  });

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

  useEffect(() => {
    if (!isLoadingUser && user) {
      setUserData(user.me);
    }
  }, [user, isLoadingUser]);

  return (
    <PlexoContext.Provider
      value={{
        navBarOpened,
        setNavBarOpened,
        newTaskOpened,
        setNewTaskOpened,
        createMoreTasks,
        setCreateMoreTasks,
        authCookie: authCookieState,
        setAuthCookie,
        taskId,
        setTaskId,
        tasks,
        setTasks,
        userData,
        isLoadingUser,
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
