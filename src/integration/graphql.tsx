import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  UUID: { input: any; output: any };
};

export type Activity = {
  __typename?: "Activity";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["UUID"]["output"];
  member: Member;
  memberId: Scalars["UUID"]["output"];
  operation: ActivityOperationType;
  resourceId: Scalars["UUID"]["output"];
  resourceType: ActivityResourceType;
  updatedAt: Scalars["DateTime"]["output"];
};

export enum ActivityOperationType {
  Create = "CREATE",
  Delete = "DELETE",
  Update = "UPDATE",
}

export enum ActivityResourceType {
  Label = "LABEL",
  Member = "MEMBER",
  Organization = "ORGANIZATION",
  Project = "PROJECT",
  Task = "TASK",
  Team = "TEAM",
}

export type CreateTaskInput = {
  assignees?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  labels?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  leadId?: InputMaybe<Scalars["UUID"]["input"]>;
  parentId?: InputMaybe<Scalars["UUID"]["input"]>;
  priority?: InputMaybe<Scalars["String"]["input"]>;
  projectId?: InputMaybe<Scalars["UUID"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  subtasks?: InputMaybe<Array<CreateTaskInput>>;
  title: Scalars["String"]["input"];
};

export type Label = {
  __typename?: "Label";
  color?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["UUID"]["output"];
  name: Scalars["String"]["output"];
  tasks: Array<Task>;
  updatedAt: Scalars["DateTime"]["output"];
};

export type LoginResponse = {
  __typename?: "LoginResponse";
  memberId: Scalars["String"]["output"];
  token: Scalars["String"]["output"];
};

export type Member = {
  __typename?: "Member";
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  githubId?: Maybe<Scalars["String"]["output"]>;
  googleId?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["UUID"]["output"];
  leadingTasks: Array<Task>;
  name: Scalars["String"]["output"];
  ownedProjects: Array<Project>;
  ownedTasks: Array<Task>;
  photoUrl?: Maybe<Scalars["String"]["output"]>;
  projects: Array<Project>;
  role: MemberRole;
  tasks: Array<Task>;
  teams: Array<Team>;
  updatedAt: Scalars["DateTime"]["output"];
};

export type MemberFilter = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  githubId?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<Scalars["String"]["input"]>;
};

export enum MemberRole {
  Admin = "ADMIN",
  Member = "MEMBER",
  ReadOnly = "READ_ONLY",
}

export type MutationRoot = {
  __typename?: "MutationRoot";
  createLabel: Label;
  createProject: Project;
  createTask: Task;
  createTasks: Array<Task>;
  createTeam: Team;
  deleteLabel: Label;
  deleteProject: Project;
  deleteTask: Task;
  deleteTeam: Team;
  login: LoginResponse;
  register: LoginResponse;
  updateLabel: Label;
  updateMember: Member;
  updatePassword: Member;
  updateProfile: Member;
  updateProject: Project;
  updateTask: Task;
  updateTeam: Team;
};

export type MutationRootCreateLabelArgs = {
  color?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
};

export type MutationRootCreateProjectArgs = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  leadId?: InputMaybe<Scalars["UUID"]["input"]>;
  members?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  name: Scalars["String"]["input"];
  prefix?: InputMaybe<Scalars["String"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  teams?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
};

export type MutationRootCreateTaskArgs = {
  assignees?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  labels?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  leadId?: InputMaybe<Scalars["UUID"]["input"]>;
  parentId?: InputMaybe<Scalars["UUID"]["input"]>;
  priority?: InputMaybe<Scalars["String"]["input"]>;
  projectId?: InputMaybe<Scalars["UUID"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  subtasks?: InputMaybe<Array<CreateTaskInput>>;
  title: Scalars["String"]["input"];
};

export type MutationRootCreateTasksArgs = {
  tasks: Array<CreateTaskInput>;
};

export type MutationRootCreateTeamArgs = {
  members?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  name: Scalars["String"]["input"];
  prefix?: InputMaybe<Scalars["String"]["input"]>;
  projects?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  visibility?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationRootDeleteLabelArgs = {
  id: Scalars["UUID"]["input"];
};

export type MutationRootDeleteProjectArgs = {
  id: Scalars["UUID"]["input"];
};

export type MutationRootDeleteTaskArgs = {
  id: Scalars["UUID"]["input"];
};

export type MutationRootDeleteTeamArgs = {
  id: Scalars["UUID"]["input"];
};

export type MutationRootLoginArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationRootRegisterArgs = {
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationRootUpdateLabelArgs = {
  color?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["UUID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationRootUpdateMemberArgs = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["UUID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationRootUpdatePasswordArgs = {
  currentPassword: Scalars["String"]["input"];
  newPassword: Scalars["String"]["input"];
};

export type MutationRootUpdateProfileArgs = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  photoUrl?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationRootUpdateProjectArgs = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  id: Scalars["UUID"]["input"];
  leadId?: InputMaybe<Scalars["UUID"]["input"]>;
  members?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  ownerId?: InputMaybe<Scalars["UUID"]["input"]>;
  prefix?: InputMaybe<Scalars["String"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  teams?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
};

export type MutationRootUpdateTaskArgs = {
  assignees?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  id: Scalars["UUID"]["input"];
  labels?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  leadId?: InputMaybe<Scalars["UUID"]["input"]>;
  priority?: InputMaybe<Scalars["String"]["input"]>;
  projectId?: InputMaybe<Scalars["UUID"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationRootUpdateTeamArgs = {
  id: Scalars["UUID"]["input"];
  members?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  ownerId?: InputMaybe<Scalars["UUID"]["input"]>;
  prefix?: InputMaybe<Scalars["String"]["input"]>;
  projects?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  visibility?: InputMaybe<Scalars["String"]["input"]>;
};

export type Project = {
  __typename?: "Project";
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  dueDate?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["UUID"]["output"];
  leadId?: Maybe<Scalars["UUID"]["output"]>;
  leader?: Maybe<Member>;
  members: Array<Member>;
  name: Scalars["String"]["output"];
  owner?: Maybe<Member>;
  ownerId: Scalars["UUID"]["output"];
  prefix?: Maybe<Scalars["String"]["output"]>;
  startDate?: Maybe<Scalars["DateTime"]["output"]>;
  tasks: Array<Task>;
  teams: Array<Team>;
  updatedAt: Scalars["DateTime"]["output"];
};

export type ProjectFilter = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryRoot = {
  __typename?: "QueryRoot";
  activity: Array<Activity>;
  labels: Array<Label>;
  me: Member;
  memberByEmail: Member;
  memberById: Member;
  members: Array<Member>;
  projectById: Project;
  projects: Array<Project>;
  subdivideTask: Array<TaskSuggestionResult>;
  suggestNewTask: TaskSuggestionResult;
  taskById: Task;
  tasks: Array<Task>;
  teamById: Team;
  teams: Array<Team>;
};

export type QueryRootActivityArgs = {
  memberId?: InputMaybe<Scalars["UUID"]["input"]>;
  operationType?: InputMaybe<ActivityOperationType>;
  resourceId?: InputMaybe<Scalars["UUID"]["input"]>;
  resourceType?: InputMaybe<ActivityResourceType>;
};

export type QueryRootMemberByEmailArgs = {
  email: Scalars["String"]["input"];
};

export type QueryRootMemberByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryRootMembersArgs = {
  filter?: InputMaybe<MemberFilter>;
};

export type QueryRootProjectByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryRootProjectsArgs = {
  filter?: InputMaybe<ProjectFilter>;
};

export type QueryRootSubdivideTaskArgs = {
  subtasks?: Scalars["Int"]["input"];
  taskId: Scalars["String"]["input"];
};

export type QueryRootSuggestNewTaskArgs = {
  task: TaskSuggestionInput;
};

export type QueryRootTaskByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryRootTasksArgs = {
  filter?: InputMaybe<TaskFilter>;
};

export type QueryRootTeamByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryRootTeamsArgs = {
  filter?: InputMaybe<TeamFilter>;
};

export type SubscriptionRoot = {
  __typename?: "SubscriptionRoot";
  projects: Project;
  subscribeProject?: Maybe<Project>;
  subscribeTask?: Maybe<Task>;
  subscribeTeam?: Maybe<Team>;
  taskById: Task;
  tasks: Task;
  teams: Team;
};

export type SubscriptionRootTaskByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type Task = {
  __typename?: "Task";
  assignees: Array<Member>;
  count: Scalars["Int"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  dueDate?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["UUID"]["output"];
  labels: Array<Label>;
  leadId?: Maybe<Scalars["UUID"]["output"]>;
  leader?: Maybe<Member>;
  owner?: Maybe<Member>;
  ownerId: Scalars["UUID"]["output"];
  parent?: Maybe<Task>;
  parentId?: Maybe<Scalars["UUID"]["output"]>;
  priority: TaskPriority;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars["UUID"]["output"]>;
  status: TaskStatus;
  subtasks: Array<Task>;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type TaskFilter = {
  dueDateFrom?: InputMaybe<Scalars["DateTime"]["input"]>;
  dueDateTo?: InputMaybe<Scalars["DateTime"]["input"]>;
  leadId?: InputMaybe<Scalars["UUID"]["input"]>;
  priority?: InputMaybe<TaskPriority>;
  projectId?: InputMaybe<Scalars["UUID"]["input"]>;
  status?: InputMaybe<TaskStatus>;
};

export enum TaskPriority {
  High = "HIGH",
  Low = "LOW",
  Medium = "MEDIUM",
  None = "NONE",
  Urgent = "URGENT",
}

export enum TaskStatus {
  Backlog = "BACKLOG",
  Canceled = "CANCELED",
  Done = "DONE",
  InProgress = "IN_PROGRESS",
  None = "NONE",
  ToDo = "TO_DO",
}

export type TaskSuggestionInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  priority?: InputMaybe<TaskPriority>;
  status?: InputMaybe<TaskStatus>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type TaskSuggestionResult = {
  __typename?: "TaskSuggestionResult";
  description: Scalars["String"]["output"];
  dueDate: Scalars["DateTime"]["output"];
  priority: TaskPriority;
  status: TaskStatus;
  title: Scalars["String"]["output"];
};

export type Team = {
  __typename?: "Team";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["UUID"]["output"];
  members: Array<Member>;
  name: Scalars["String"]["output"];
  owner?: Maybe<Member>;
  ownerId: Scalars["UUID"]["output"];
  prefix?: Maybe<Scalars["String"]["output"]>;
  projects: Array<Project>;
  updatedAt: Scalars["DateTime"]["output"];
  visibility: TeamVisibility;
};

export type TeamFilter = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  visibility?: InputMaybe<Scalars["String"]["input"]>;
};

export enum TeamVisibility {
  Internal = "INTERNAL",
  None = "NONE",
  Private = "PRIVATE",
  Public = "PUBLIC",
}

export type RegisterMutationVariables = Exact<{
  name: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type RegisterMutation = {
  __typename?: "MutationRoot";
  register: { __typename?: "LoginResponse"; token: string };
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type LoginMutation = {
  __typename?: "MutationRoot";
  login: { __typename?: "LoginResponse"; token: string };
};

export type LabelsQueryVariables = Exact<{ [key: string]: never }>;

export type LabelsQuery = {
  __typename?: "QueryRoot";
  labels: Array<{ __typename?: "Label"; id: any; name: string; color?: string | null }>;
};

export type MembersQueryVariables = Exact<{ [key: string]: never }>;

export type MembersQuery = {
  __typename?: "QueryRoot";
  members: Array<{
    __typename?: "Member";
    id: any;
    createdAt: any;
    updatedAt: any;
    name: string;
    email: string;
    githubId?: string | null;
    googleId?: string | null;
    photoUrl?: string | null;
    role: MemberRole;
    ownedTasks: Array<{ __typename?: "Task"; id: any }>;
    leadingTasks: Array<{ __typename?: "Task"; id: any }>;
    ownedProjects: Array<{ __typename?: "Project"; id: any }>;
  }>;
};

export type MemberByIdQueryVariables = Exact<{
  memberId: Scalars["UUID"]["input"];
}>;

export type MemberByIdQuery = {
  __typename?: "QueryRoot";
  memberById: { __typename?: "Member"; id: any; name: string };
};

export type UpdateMemberMutationVariables = Exact<{
  memberId: Scalars["UUID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type UpdateMemberMutation = {
  __typename?: "MutationRoot";
  updateMember: { __typename?: "Member"; id: any; name: string; email: string; role: MemberRole };
};

export type ProjectsQueryVariables = Exact<{ [key: string]: never }>;

export type ProjectsQuery = {
  __typename?: "QueryRoot";
  projects: Array<{
    __typename?: "Project";
    id: any;
    createdAt: any;
    updatedAt: any;
    name: string;
    prefix?: string | null;
    ownerId: any;
    description?: string | null;
    leadId?: any | null;
    startDate?: any | null;
    dueDate?: any | null;
    owner?: { __typename?: "Member"; id: any } | null;
    tasks: Array<{ __typename?: "Task"; id: any; title: string }>;
    members: Array<{ __typename?: "Member"; id: any; name: string }>;
  }>;
};

export type ProjectsSubscriptionSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ProjectsSubscriptionSubscription = {
  __typename?: "SubscriptionRoot";
  projects: {
    __typename?: "Project";
    id: any;
    name: string;
    prefix?: string | null;
    description?: string | null;
    createdAt: any;
    updatedAt: any;
    startDate?: any | null;
    dueDate?: any | null;
    ownerId: any;
    leadId?: any | null;
  };
};

export type ProjectByIdQueryVariables = Exact<{
  projectId: Scalars["UUID"]["input"];
}>;

export type ProjectByIdQuery = {
  __typename?: "QueryRoot";
  projectById: {
    __typename?: "Project";
    id: any;
    name: string;
    prefix?: string | null;
    description?: string | null;
    leadId?: any | null;
    startDate?: any | null;
    dueDate?: any | null;
    owner?: { __typename?: "Member"; id: any; name: string } | null;
    leader?: { __typename?: "Member"; id: any; name: string; photoUrl?: string | null } | null;
    members: Array<{ __typename?: "Member"; id: any; name: string }>;
    tasks: Array<{ __typename?: "Task"; id: any; title: string }>;
    teams: Array<{ __typename?: "Team"; id: any; name: string }>;
  };
};

export type NewProjectMutationVariables = Exact<{
  name: Scalars["String"]["input"];
  prefix?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  leadId?: InputMaybe<Scalars["UUID"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  members?: InputMaybe<Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]>;
  teams?: InputMaybe<Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]>;
}>;

export type NewProjectMutation = {
  __typename?: "MutationRoot";
  createProject: { __typename?: "Project"; id: any; name: string };
};

export type DeleteProjectMutationVariables = Exact<{
  projectId: Scalars["UUID"]["input"];
}>;

export type DeleteProjectMutation = {
  __typename?: "MutationRoot";
  deleteProject: { __typename?: "Project"; id: any; name: string };
};

export type UpdateProjectMutationVariables = Exact<{
  projectId: Scalars["UUID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  leadId?: InputMaybe<Scalars["UUID"]["input"]>;
  members?: InputMaybe<Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]>;
  teams?: InputMaybe<Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]>;
}>;

export type UpdateProjectMutation = {
  __typename?: "MutationRoot";
  updateProject: { __typename?: "Project"; id: any; name: string };
};

export type TasksQueryVariables = Exact<{ [key: string]: never }>;

export type TasksQuery = {
  __typename?: "QueryRoot";
  tasks: Array<{
    __typename?: "Task";
    id: any;
    createdAt: any;
    updatedAt: any;
    title: string;
    description?: string | null;
    status: TaskStatus;
    priority: TaskPriority;
    ownerId: any;
    count: number;
    leadId?: any | null;
    projectId?: any | null;
    dueDate?: any | null;
    labels: Array<{ __typename?: "Label"; id: any; name: string; color?: string | null }>;
    owner?: { __typename?: "Member"; id: any } | null;
    assignees: Array<{ __typename?: "Member"; id: any; name: string }>;
    project?: { __typename?: "Project"; id: any; name: string } | null;
    leader?: { __typename?: "Member"; id: any; name: string; photoUrl?: string | null } | null;
  }>;
};

export type TaskByIdQueryVariables = Exact<{
  taskId: Scalars["UUID"]["input"];
}>;

export type TaskByIdQuery = {
  __typename?: "QueryRoot";
  taskById: {
    __typename?: "Task";
    id: any;
    title: string;
    description?: string | null;
    ownerId: any;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: any | null;
    count: number;
    parent?: { __typename?: "Task"; id: any; count: number } | null;
    labels: Array<{ __typename?: "Label"; id: any; name: string }>;
    assignees: Array<{ __typename?: "Member"; id: any; name: string }>;
    leader?: { __typename?: "Member"; id: any; name: string; photoUrl?: string | null } | null;
    project?: { __typename?: "Project"; id: any; name: string } | null;
    subtasks: Array<{
      __typename?: "Task";
      id: any;
      createdAt: any;
      updatedAt: any;
      title: string;
      description?: string | null;
      status: TaskStatus;
      priority: TaskPriority;
      ownerId: any;
      count: number;
      leadId?: any | null;
      projectId?: any | null;
      dueDate?: any | null;
      labels: Array<{ __typename?: "Label"; id: any; name: string; color?: string | null }>;
      owner?: { __typename?: "Member"; id: any } | null;
      assignees: Array<{ __typename?: "Member"; id: any; name: string }>;
      project?: { __typename?: "Project"; id: any; name: string } | null;
      leader?: { __typename?: "Member"; id: any; name: string } | null;
    }>;
  };
};

export type TasksSubscriptionSubscriptionVariables = Exact<{ [key: string]: never }>;

export type TasksSubscriptionSubscription = {
  __typename?: "SubscriptionRoot";
  tasks: {
    __typename?: "Task";
    id: any;
    createdAt: any;
    updatedAt: any;
    title: string;
    description?: string | null;
    status: TaskStatus;
    priority: TaskPriority;
    ownerId: any;
    count: number;
  };
};

export type NewTaskMutationVariables = Exact<{
  title: Scalars["String"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  priority?: InputMaybe<Scalars["String"]["input"]>;
  projectId?: InputMaybe<Scalars["UUID"]["input"]>;
  leadId?: InputMaybe<Scalars["UUID"]["input"]>;
  labels?: InputMaybe<Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]>;
  assignees?: InputMaybe<Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  subtasks?: InputMaybe<Array<CreateTaskInput> | CreateTaskInput>;
  parentId?: InputMaybe<Scalars["UUID"]["input"]>;
}>;

export type NewTaskMutation = {
  __typename?: "MutationRoot";
  createTask: { __typename?: "Task"; id: any; title: string; status: TaskStatus };
};

export type DeleteTaskMutationVariables = Exact<{
  taskId: Scalars["UUID"]["input"];
}>;

export type DeleteTaskMutation = {
  __typename?: "MutationRoot";
  deleteTask: { __typename?: "Task"; id: any; title: string };
};

export type UpdateTaskMutationVariables = Exact<{
  taskId: Scalars["UUID"]["input"];
  status?: InputMaybe<Scalars["String"]["input"]>;
  priority?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  projectId?: InputMaybe<Scalars["UUID"]["input"]>;
  leadId?: InputMaybe<Scalars["UUID"]["input"]>;
  labels?: InputMaybe<Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]>;
  assignees?: InputMaybe<Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]>;
}>;

export type UpdateTaskMutation = {
  __typename?: "MutationRoot";
  updateTask: { __typename?: "Task"; id: any; title: string };
};

export type SuggestNewTaskQueryVariables = Exact<{
  taskSuggestion: TaskSuggestionInput;
}>;

export type SuggestNewTaskQuery = {
  __typename?: "QueryRoot";
  suggestNewTask: {
    __typename?: "TaskSuggestionResult";
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: any;
  };
};

export type SubdivideTaskQueryVariables = Exact<{
  taskId: Scalars["String"]["input"];
  count?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type SubdivideTaskQuery = {
  __typename?: "QueryRoot";
  subdivideTask: Array<{
    __typename?: "TaskSuggestionResult";
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: any;
  }>;
};

export type CreateTasksMutationVariables = Exact<{
  tasks: Array<CreateTaskInput> | CreateTaskInput;
}>;

export type CreateTasksMutation = {
  __typename?: "MutationRoot";
  createTasks: Array<{ __typename?: "Task"; id: any; title: string }>;
};

export type TaskActivityQueryVariables = Exact<{
  resourceId?: InputMaybe<Scalars["UUID"]["input"]>;
  resourceType?: InputMaybe<ActivityResourceType>;
}>;

export type TaskActivityQuery = {
  __typename?: "QueryRoot";
  activity: Array<{
    __typename?: "Activity";
    id: any;
    createdAt: any;
    memberId: any;
    resourceId: any;
    operation: ActivityOperationType;
    resourceType: ActivityResourceType;
    member: { __typename?: "Member"; name: string; photoUrl?: string | null };
  }>;
};

export type TeamsQueryVariables = Exact<{ [key: string]: never }>;

export type TeamsQuery = {
  __typename?: "QueryRoot";
  teams: Array<{
    __typename?: "Team";
    id: any;
    createdAt: any;
    updatedAt: any;
    name: string;
    ownerId: any;
    visibility: TeamVisibility;
    owner?: { __typename?: "Member"; id: any } | null;
    members: Array<{ __typename?: "Member"; id: any }>;
  }>;
};

export type TeamByIdQueryVariables = Exact<{
  teamId: Scalars["UUID"]["input"];
}>;

export type TeamByIdQuery = {
  __typename?: "QueryRoot";
  teamById: {
    __typename?: "Team";
    id: any;
    name: string;
    prefix?: string | null;
    members: Array<{ __typename?: "Member"; id: any; name: string }>;
    projects: Array<{ __typename?: "Project"; id: any; name: string }>;
  };
};

export type NewTeamMutationVariables = Exact<{
  name: Scalars["String"]["input"];
  prefix?: InputMaybe<Scalars["String"]["input"]>;
  members?: InputMaybe<Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]>;
  projects?: InputMaybe<Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]>;
}>;

export type NewTeamMutation = {
  __typename?: "MutationRoot";
  createTeam: { __typename?: "Team"; id: any; name: string };
};

export type DeleteTeamMutationVariables = Exact<{
  teamId: Scalars["UUID"]["input"];
}>;

export type DeleteTeamMutation = {
  __typename?: "MutationRoot";
  deleteTeam: { __typename?: "Team"; id: any; name: string };
};

export type UpdateTeamMutationVariables = Exact<{
  teamId: Scalars["UUID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  members?: InputMaybe<Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]>;
  projects?: InputMaybe<Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]>;
}>;

export type UpdateTeamMutation = {
  __typename?: "MutationRoot";
  updateTeam: { __typename?: "Team"; id: any; name: string };
};

export type UserQueryVariables = Exact<{ [key: string]: never }>;

export type UserQuery = {
  __typename?: "QueryRoot";
  me: { __typename?: "Member"; id: any; name: string; email: string; photoUrl?: string | null };
};

export const RegisterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Register" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "email" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "password" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "register" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: { kind: "Variable", name: { kind: "Name", value: "name" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: { kind: "Variable", name: { kind: "Name", value: "email" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: { kind: "Variable", name: { kind: "Name", value: "password" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "token" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "email" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "password" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "login" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: { kind: "Variable", name: { kind: "Name", value: "email" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: { kind: "Variable", name: { kind: "Name", value: "password" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "token" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LabelsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Labels" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "labels" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "color" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LabelsQuery, LabelsQueryVariables>;
export const MembersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Members" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "members" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "githubId" } },
                { kind: "Field", name: { kind: "Name", value: "googleId" } },
                { kind: "Field", name: { kind: "Name", value: "photoUrl" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "ownedTasks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "leadingTasks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "ownedProjects" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MembersQuery, MembersQueryVariables>;
export const MemberByIdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "MemberById" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "memberId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "memberById" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "memberId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MemberByIdQuery, MemberByIdQueryVariables>;
export const UpdateMemberDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateMember" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "memberId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "email" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "role" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateMember" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "memberId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: { kind: "Variable", name: { kind: "Name", value: "name" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: { kind: "Variable", name: { kind: "Name", value: "email" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "role" },
                value: { kind: "Variable", name: { kind: "Name", value: "role" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateMemberMutation, UpdateMemberMutationVariables>;
export const ProjectsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Projects" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "projects" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "prefix" } },
                { kind: "Field", name: { kind: "Name", value: "ownerId" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "leadId" } },
                { kind: "Field", name: { kind: "Name", value: "startDate" } },
                { kind: "Field", name: { kind: "Name", value: "dueDate" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "tasks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "members" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectsQuery, ProjectsQueryVariables>;
export const ProjectsSubscriptionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "subscription",
      name: { kind: "Name", value: "ProjectsSubscription" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "projects" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "prefix" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "startDate" } },
                { kind: "Field", name: { kind: "Name", value: "dueDate" } },
                { kind: "Field", name: { kind: "Name", value: "ownerId" } },
                { kind: "Field", name: { kind: "Name", value: "leadId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ProjectsSubscriptionSubscription,
  ProjectsSubscriptionSubscriptionVariables
>;
export const ProjectByIdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ProjectById" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "projectId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "projectById" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "projectId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "prefix" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "leadId" } },
                { kind: "Field", name: { kind: "Name", value: "startDate" } },
                { kind: "Field", name: { kind: "Name", value: "dueDate" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "leader" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "photoUrl" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "members" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "tasks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "teams" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectByIdQuery, ProjectByIdQueryVariables>;
export const NewProjectDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "NewProject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "prefix" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "description" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "leadId" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "startDate" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "DateTime" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "dueDate" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "DateTime" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "members" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "teams" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createProject" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: { kind: "Variable", name: { kind: "Name", value: "name" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "prefix" },
                value: { kind: "Variable", name: { kind: "Name", value: "prefix" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: { kind: "Variable", name: { kind: "Name", value: "description" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "leadId" },
                value: { kind: "Variable", name: { kind: "Name", value: "leadId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "startDate" },
                value: { kind: "Variable", name: { kind: "Name", value: "startDate" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "dueDate" },
                value: { kind: "Variable", name: { kind: "Name", value: "dueDate" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "members" },
                value: { kind: "Variable", name: { kind: "Name", value: "members" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "teams" },
                value: { kind: "Variable", name: { kind: "Name", value: "teams" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NewProjectMutation, NewProjectMutationVariables>;
export const DeleteProjectDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteProject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "projectId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteProject" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "projectId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const UpdateProjectDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateProject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "projectId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "description" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "startDate" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "DateTime" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "dueDate" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "DateTime" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "leadId" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "members" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "teams" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateProject" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "projectId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: { kind: "Variable", name: { kind: "Name", value: "name" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: { kind: "Variable", name: { kind: "Name", value: "description" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "startDate" },
                value: { kind: "Variable", name: { kind: "Name", value: "startDate" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "dueDate" },
                value: { kind: "Variable", name: { kind: "Name", value: "dueDate" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "leadId" },
                value: { kind: "Variable", name: { kind: "Name", value: "leadId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "members" },
                value: { kind: "Variable", name: { kind: "Name", value: "members" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "teams" },
                value: { kind: "Variable", name: { kind: "Name", value: "teams" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const TasksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Tasks" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "tasks" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "priority" } },
                { kind: "Field", name: { kind: "Name", value: "ownerId" } },
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "labels" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "color" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "leadId" } },
                { kind: "Field", name: { kind: "Name", value: "projectId" } },
                { kind: "Field", name: { kind: "Name", value: "dueDate" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "assignees" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "project" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "leader" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "photoUrl" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TasksQuery, TasksQueryVariables>;
export const TaskByIdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TaskById" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "taskId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "taskById" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "taskId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "ownerId" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "priority" } },
                { kind: "Field", name: { kind: "Name", value: "dueDate" } },
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "parent" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "count" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "labels" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "assignees" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "leader" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "photoUrl" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "project" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "subtasks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                      { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "description" } },
                      { kind: "Field", name: { kind: "Name", value: "status" } },
                      { kind: "Field", name: { kind: "Name", value: "priority" } },
                      { kind: "Field", name: { kind: "Name", value: "ownerId" } },
                      { kind: "Field", name: { kind: "Name", value: "count" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "labels" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "color" } },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "leadId" } },
                      { kind: "Field", name: { kind: "Name", value: "projectId" } },
                      { kind: "Field", name: { kind: "Name", value: "dueDate" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "owner" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "assignees" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "project" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "leader" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TaskByIdQuery, TaskByIdQueryVariables>;
export const TasksSubscriptionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "subscription",
      name: { kind: "Name", value: "TasksSubscription" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "tasks" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "priority" } },
                { kind: "Field", name: { kind: "Name", value: "ownerId" } },
                { kind: "Field", name: { kind: "Name", value: "count" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TasksSubscriptionSubscription, TasksSubscriptionSubscriptionVariables>;
export const NewTaskDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "NewTask" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "title" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "description" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "status" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "priority" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "projectId" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "leadId" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "labels" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "assignees" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "dueDate" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "DateTime" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "subtasks" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: { kind: "NamedType", name: { kind: "Name", value: "CreateTaskInput" } },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "parentId" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createTask" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "title" },
                value: { kind: "Variable", name: { kind: "Name", value: "title" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: { kind: "Variable", name: { kind: "Name", value: "description" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "status" },
                value: { kind: "Variable", name: { kind: "Name", value: "status" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "priority" },
                value: { kind: "Variable", name: { kind: "Name", value: "priority" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "projectId" },
                value: { kind: "Variable", name: { kind: "Name", value: "projectId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "leadId" },
                value: { kind: "Variable", name: { kind: "Name", value: "leadId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "labels" },
                value: { kind: "Variable", name: { kind: "Name", value: "labels" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "assignees" },
                value: { kind: "Variable", name: { kind: "Name", value: "assignees" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "dueDate" },
                value: { kind: "Variable", name: { kind: "Name", value: "dueDate" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "subtasks" },
                value: { kind: "Variable", name: { kind: "Name", value: "subtasks" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "parentId" },
                value: { kind: "Variable", name: { kind: "Name", value: "parentId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NewTaskMutation, NewTaskMutationVariables>;
export const DeleteTaskDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteTask" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "taskId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteTask" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "taskId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const UpdateTaskDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateTask" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "taskId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "status" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "priority" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "title" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "description" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "dueDate" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "DateTime" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "projectId" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "leadId" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "labels" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "assignees" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateTask" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "taskId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "status" },
                value: { kind: "Variable", name: { kind: "Name", value: "status" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "title" },
                value: { kind: "Variable", name: { kind: "Name", value: "title" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "priority" },
                value: { kind: "Variable", name: { kind: "Name", value: "priority" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: { kind: "Variable", name: { kind: "Name", value: "description" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "dueDate" },
                value: { kind: "Variable", name: { kind: "Name", value: "dueDate" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "projectId" },
                value: { kind: "Variable", name: { kind: "Name", value: "projectId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "leadId" },
                value: { kind: "Variable", name: { kind: "Name", value: "leadId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "labels" },
                value: { kind: "Variable", name: { kind: "Name", value: "labels" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "assignees" },
                value: { kind: "Variable", name: { kind: "Name", value: "assignees" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const SuggestNewTaskDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SuggestNewTask" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "taskSuggestion" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "TaskSuggestionInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "suggestNewTask" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "task" },
                value: { kind: "Variable", name: { kind: "Name", value: "taskSuggestion" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "priority" } },
                { kind: "Field", name: { kind: "Name", value: "dueDate" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SuggestNewTaskQuery, SuggestNewTaskQueryVariables>;
export const SubdivideTaskDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SubdivideTask" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "taskId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "count" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "subdivideTask" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "taskId" },
                value: { kind: "Variable", name: { kind: "Name", value: "taskId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "subtasks" },
                value: { kind: "Variable", name: { kind: "Name", value: "count" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "priority" } },
                { kind: "Field", name: { kind: "Name", value: "dueDate" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SubdivideTaskQuery, SubdivideTaskQueryVariables>;
export const CreateTasksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateTasks" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "tasks" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: { kind: "NamedType", name: { kind: "Name", value: "CreateTaskInput" } },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createTasks" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "tasks" },
                value: { kind: "Variable", name: { kind: "Name", value: "tasks" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateTasksMutation, CreateTasksMutationVariables>;
export const TaskActivityDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TaskActivity" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "resourceId" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "resourceType" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "ActivityResourceType" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "activity" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "resourceId" },
                value: { kind: "Variable", name: { kind: "Name", value: "resourceId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "resourceType" },
                value: { kind: "Variable", name: { kind: "Name", value: "resourceType" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "memberId" } },
                { kind: "Field", name: { kind: "Name", value: "resourceId" } },
                { kind: "Field", name: { kind: "Name", value: "operation" } },
                { kind: "Field", name: { kind: "Name", value: "resourceType" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "member" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "photoUrl" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TaskActivityQuery, TaskActivityQueryVariables>;
export const TeamsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Teams" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teams" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "ownerId" } },
                { kind: "Field", name: { kind: "Name", value: "visibility" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "members" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeamsQuery, TeamsQueryVariables>;
export const TeamByIdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeamById" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "teamId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teamById" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "teamId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "prefix" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "members" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "projects" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeamByIdQuery, TeamByIdQueryVariables>;
export const NewTeamDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "NewTeam" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "prefix" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "members" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "projects" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createTeam" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: { kind: "Variable", name: { kind: "Name", value: "name" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "prefix" },
                value: { kind: "Variable", name: { kind: "Name", value: "prefix" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "members" },
                value: { kind: "Variable", name: { kind: "Name", value: "members" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "projects" },
                value: { kind: "Variable", name: { kind: "Name", value: "projects" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NewTeamMutation, NewTeamMutationVariables>;
export const DeleteTeamDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteTeam" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "teamId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteTeam" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "teamId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const UpdateTeamDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateTeam" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "teamId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "members" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "projects" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateTeam" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "teamId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: { kind: "Variable", name: { kind: "Name", value: "name" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "members" },
                value: { kind: "Variable", name: { kind: "Name", value: "members" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "projects" },
                value: { kind: "Variable", name: { kind: "Name", value: "projects" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateTeamMutation, UpdateTeamMutationVariables>;
export const UserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "User" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "photoUrl" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
