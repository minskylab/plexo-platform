import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  UUID: any;
};

export type DataDiffEvent = {
  __typename?: "DataDiffEvent";
  data: Scalars["String"];
  kind: DataDiffEventKind;
};

export enum DataDiffEventKind {
  Created = "CREATED",
  Deleted = "DELETED",
  Updated = "UPDATED",
}

export type Label = {
  __typename?: "Label";
  color?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  description?: Maybe<Scalars["String"]>;
  id: Scalars["UUID"];
  name: Scalars["String"];
  tasks: Array<Task>;
  updatedAt: Scalars["DateTime"];
};

export type Member = {
  __typename?: "Member";
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  githubId?: Maybe<Scalars["String"]>;
  googleId?: Maybe<Scalars["String"]>;
  id: Scalars["UUID"];
  leadingTasks: Array<Task>;
  name: Scalars["String"];
  ownedProjects: Array<Project>;
  ownedTasks: Array<Task>;
  photoUrl?: Maybe<Scalars["String"]>;
  projects: Array<Project>;
  role: MemberRole;
  tasks: Array<Task>;
  teams?: Maybe<Array<Team>>;
  updatedAt: Scalars["DateTime"];
};

export type MemberFilter = {
  email?: InputMaybe<Scalars["String"]>;
  githubId?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<Scalars["String"]>;
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
  createTeam: Team;
  deleteLabel: Label;
  deleteMember: Member;
  deleteProject: Project;
  deleteTask: Task;
  deleteTeam: Team;
  updateLabel: Label;
  updateMember: Member;
  updateProject: Project;
  updateTask: Task;
  updateTeam: Team;
};

export type MutationRootCreateLabelArgs = {
  color?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
};

export type MutationRootCreateProjectArgs = {
  description?: InputMaybe<Scalars["String"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]>;
  leadId?: InputMaybe<Scalars["UUID"]>;
  members?: InputMaybe<Array<Scalars["UUID"]>>;
  name: Scalars["String"];
  ownerId: Scalars["UUID"];
  prefix?: InputMaybe<Scalars["String"]>;
  startDate?: InputMaybe<Scalars["DateTime"]>;
  teams?: InputMaybe<Array<Scalars["UUID"]>>;
};

export type MutationRootCreateTaskArgs = {
  assignees?: InputMaybe<Array<Scalars["UUID"]>>;
  description?: InputMaybe<Scalars["String"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]>;
  labels?: InputMaybe<Array<Scalars["UUID"]>>;
  leadId?: InputMaybe<Scalars["UUID"]>;
  priority?: InputMaybe<Scalars["String"]>;
  projectId?: InputMaybe<Scalars["UUID"]>;
  status?: InputMaybe<Scalars["String"]>;
  title: Scalars["String"];
};

export type MutationRootCreateTeamArgs = {
  members?: InputMaybe<Array<Scalars["UUID"]>>;
  name: Scalars["String"];
  ownerId: Scalars["UUID"];
  prefix?: InputMaybe<Scalars["String"]>;
  projects?: InputMaybe<Array<Scalars["UUID"]>>;
  visibility?: InputMaybe<Scalars["String"]>;
};

export type MutationRootDeleteLabelArgs = {
  id: Scalars["UUID"];
};

export type MutationRootDeleteMemberArgs = {
  id: Scalars["UUID"];
};

export type MutationRootDeleteProjectArgs = {
  id: Scalars["UUID"];
};

export type MutationRootDeleteTaskArgs = {
  id: Scalars["UUID"];
};

export type MutationRootDeleteTeamArgs = {
  id: Scalars["UUID"];
};

export type MutationRootUpdateLabelArgs = {
  color?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  id: Scalars["UUID"];
  name?: InputMaybe<Scalars["String"]>;
};

export type MutationRootUpdateMemberArgs = {
  email?: InputMaybe<Scalars["String"]>;
  id: Scalars["UUID"];
  name?: InputMaybe<Scalars["String"]>;
  projects?: InputMaybe<Array<Scalars["UUID"]>>;
  role?: InputMaybe<Scalars["String"]>;
  teams?: InputMaybe<Array<Scalars["UUID"]>>;
};

export type MutationRootUpdateProjectArgs = {
  description?: InputMaybe<Scalars["String"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]>;
  id: Scalars["UUID"];
  leadId?: InputMaybe<Scalars["UUID"]>;
  members?: InputMaybe<Array<Scalars["UUID"]>>;
  name?: InputMaybe<Scalars["String"]>;
  ownerId?: InputMaybe<Scalars["UUID"]>;
  prefix?: InputMaybe<Scalars["String"]>;
  startDate?: InputMaybe<Scalars["DateTime"]>;
  teams?: InputMaybe<Array<Scalars["UUID"]>>;
};

export type MutationRootUpdateTaskArgs = {
  assignees?: InputMaybe<Array<Scalars["UUID"]>>;
  description?: InputMaybe<Scalars["String"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]>;
  id: Scalars["UUID"];
  labels?: InputMaybe<Array<Scalars["UUID"]>>;
  leadId?: InputMaybe<Scalars["UUID"]>;
  priority?: InputMaybe<Scalars["String"]>;
  projectId?: InputMaybe<Scalars["UUID"]>;
  status?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type MutationRootUpdateTeamArgs = {
  id: Scalars["UUID"];
  members?: InputMaybe<Array<Scalars["UUID"]>>;
  name?: InputMaybe<Scalars["String"]>;
  ownerId?: InputMaybe<Scalars["UUID"]>;
  prefix?: InputMaybe<Scalars["String"]>;
  projects?: InputMaybe<Array<Scalars["UUID"]>>;
  visibility?: InputMaybe<Scalars["String"]>;
};

export type Project = {
  __typename?: "Project";
  createdAt: Scalars["DateTime"];
  description?: Maybe<Scalars["String"]>;
  dueDate?: Maybe<Scalars["DateTime"]>;
  id: Scalars["UUID"];
  leadId?: Maybe<Scalars["UUID"]>;
  leader?: Maybe<Member>;
  members: Array<Member>;
  name: Scalars["String"];
  owner?: Maybe<Member>;
  ownerId: Scalars["UUID"];
  prefix?: Maybe<Scalars["String"]>;
  startDate?: Maybe<Scalars["DateTime"]>;
  tasks: Array<Task>;
  teams: Array<Team>;
  updatedAt: Scalars["DateTime"];
};

export type ProjectFilter = {
  description?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type QueryRoot = {
  __typename?: "QueryRoot";
  labels: Array<Label>;
  me: Member;
  memberByEmail: Member;
  memberById: Member;
  members: Array<Member>;
  projectById: Project;
  projects: Array<Project>;
  suggestNewTask: TaskSuggestionResult;
  taskById: Task;
  tasks: Array<Task>;
  teamById: Team;
  teams: Array<Team>;
};

export type QueryRootMemberByEmailArgs = {
  email: Scalars["String"];
};

export type QueryRootMemberByIdArgs = {
  id: Scalars["UUID"];
};

export type QueryRootMembersArgs = {
  filter?: InputMaybe<MemberFilter>;
};

export type QueryRootProjectByIdArgs = {
  id: Scalars["UUID"];
};

export type QueryRootProjectsArgs = {
  filter?: InputMaybe<ProjectFilter>;
};

export type QueryRootSuggestNewTaskArgs = {
  task: TaskSuggestion;
};

export type QueryRootTaskByIdArgs = {
  id: Scalars["UUID"];
};

export type QueryRootTasksArgs = {
  filter?: InputMaybe<TaskFilter>;
};

export type QueryRootTeamByIdArgs = {
  id: Scalars["UUID"];
};

export type QueryRootTeamsArgs = {
  filter?: InputMaybe<TeamFilter>;
};

export type SubscriptionRoot = {
  __typename?: "SubscriptionRoot";
  example: DataDiffEvent;
  integers: Scalars["Int"];
  projects: Project;
  taskById: Task;
  tasks: Task;
  teams: Team;
};

export type SubscriptionRootIntegersArgs = {
  step?: Scalars["Int"];
};

export type SubscriptionRootTaskByIdArgs = {
  id: Scalars["UUID"];
};

export type Task = {
  __typename?: "Task";
  assignees: Array<Member>;
  count: Scalars["Int"];
  createdAt: Scalars["DateTime"];
  description?: Maybe<Scalars["String"]>;
  dueDate?: Maybe<Scalars["DateTime"]>;
  id: Scalars["UUID"];
  labels: Array<Label>;
  leadId?: Maybe<Scalars["UUID"]>;
  leader?: Maybe<Member>;
  owner?: Maybe<Member>;
  ownerId: Scalars["UUID"];
  priority: TaskPriority;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars["UUID"]>;
  status: TaskStatus;
  title: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type TaskFilter = {
  dueDateFrom?: InputMaybe<Scalars["DateTime"]>;
  dueDateTo?: InputMaybe<Scalars["DateTime"]>;
  leadId?: InputMaybe<Scalars["UUID"]>;
  priority?: InputMaybe<TaskPriority>;
  projectId?: InputMaybe<Scalars["UUID"]>;
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

export type TaskSuggestion = {
  description?: InputMaybe<Scalars["String"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]>;
  priority?: InputMaybe<TaskPriority>;
  status?: InputMaybe<TaskStatus>;
  title?: InputMaybe<Scalars["String"]>;
};

export type TaskSuggestionResult = {
  __typename?: "TaskSuggestionResult";
  description: Scalars["String"];
  dueDate: Scalars["DateTime"];
  priority: TaskPriority;
  status: TaskStatus;
  title: Scalars["String"];
};

export type Team = {
  __typename?: "Team";
  createdAt: Scalars["DateTime"];
  id: Scalars["UUID"];
  members: Array<Member>;
  name: Scalars["String"];
  owner?: Maybe<Member>;
  ownerId: Scalars["UUID"];
  prefix?: Maybe<Scalars["String"]>;
  projects: Array<Project>;
  updatedAt: Scalars["DateTime"];
  visibility: TeamVisibility;
};

export type TeamFilter = {
  name?: InputMaybe<Scalars["String"]>;
  visibility?: InputMaybe<Scalars["String"]>;
};

export enum TeamVisibility {
  Internal = "INTERNAL",
  None = "NONE",
  Private = "PRIVATE",
  Public = "PUBLIC",
}

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
  memberId: Scalars["UUID"];
}>;

export type MemberByIdQuery = {
  __typename?: "QueryRoot";
  memberById: { __typename?: "Member"; id: any; name: string };
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
  projectId: Scalars["UUID"];
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
    leader?: { __typename?: "Member"; id: any; name: string } | null;
    members: Array<{ __typename?: "Member"; id: any; name: string }>;
    tasks: Array<{ __typename?: "Task"; id: any; title: string }>;
    teams: Array<{ __typename?: "Team"; id: any; name: string }>;
  };
};

export type NewProjectMutationVariables = Exact<{
  name: Scalars["String"];
  prefix?: InputMaybe<Scalars["String"]>;
  ownerId: Scalars["UUID"];
  description?: InputMaybe<Scalars["String"]>;
  leadId?: InputMaybe<Scalars["UUID"]>;
  startDate?: InputMaybe<Scalars["DateTime"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]>;
  members?: InputMaybe<Array<Scalars["UUID"]> | Scalars["UUID"]>;
  teams?: InputMaybe<Array<Scalars["UUID"]> | Scalars["UUID"]>;
}>;

export type NewProjectMutation = {
  __typename?: "MutationRoot";
  createProject: { __typename?: "Project"; id: any; name: string };
};

export type DeleteProjectMutationVariables = Exact<{
  projectId: Scalars["UUID"];
}>;

export type DeleteProjectMutation = {
  __typename?: "MutationRoot";
  deleteProject: { __typename?: "Project"; id: any; name: string };
};

export type UpdateProjectMutationVariables = Exact<{
  projectId: Scalars["UUID"];
  name?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]>;
  leadId?: InputMaybe<Scalars["UUID"]>;
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

export type TaskByIdQueryVariables = Exact<{
  taskId: Scalars["UUID"];
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
    labels: Array<{ __typename?: "Label"; id: any; name: string }>;
    assignees: Array<{ __typename?: "Member"; id: any; name: string }>;
    leader?: { __typename?: "Member"; id: any; name: string } | null;
    project?: { __typename?: "Project"; id: any; name: string } | null;
  };
};

export type TasksSubscriptionSubscriptionVariables = Exact<{ [key: string]: never }>;

export type TasksSubscriptionSubscription = {
  __typename?: "SubscriptionRoot";
  tasks: {
    __typename?: "Task";
    id: any;
    status: TaskStatus;
    title: string;
    description?: string | null;
    createdAt: any;
    updatedAt: any;
    priority: TaskPriority;
    ownerId: any;
    leadId?: any | null;
    projectId?: any | null;
    labels: Array<{ __typename?: "Label"; id: any; name: string }>;
  };
};

export type NewTaskMutationVariables = Exact<{
  title: Scalars["String"];
  description?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Scalars["String"]>;
  priority?: InputMaybe<Scalars["String"]>;
  projectId?: InputMaybe<Scalars["UUID"]>;
  leadId?: InputMaybe<Scalars["UUID"]>;
  labels?: InputMaybe<Array<Scalars["UUID"]> | Scalars["UUID"]>;
  assigness?: InputMaybe<Array<Scalars["UUID"]> | Scalars["UUID"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]>;
}>;

export type NewTaskMutation = {
  __typename?: "MutationRoot";
  createTask: { __typename?: "Task"; id: any; title: string; status: TaskStatus };
};

export type DeleteTaskMutationVariables = Exact<{
  taskId: Scalars["UUID"];
}>;

export type DeleteTaskMutation = {
  __typename?: "MutationRoot";
  deleteTask: { __typename?: "Task"; id: any; title: string };
};

export type UpdateTaskMutationVariables = Exact<{
  taskId: Scalars["UUID"];
  status?: InputMaybe<Scalars["String"]>;
  priority?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]>;
  projectId?: InputMaybe<Scalars["UUID"]>;
  leadId?: InputMaybe<Scalars["UUID"]>;
  labels?: InputMaybe<Array<Scalars["UUID"]> | Scalars["UUID"]>;
  assignees?: InputMaybe<Array<Scalars["UUID"]> | Scalars["UUID"]>;
}>;

export type UpdateTaskMutation = {
  __typename?: "MutationRoot";
  updateTask: { __typename?: "Task"; id: any; title: string };
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
  teamId: Scalars["UUID"];
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
  name: Scalars["String"];
  ownerId: Scalars["UUID"];
  prefix?: InputMaybe<Scalars["String"]>;
  members?: InputMaybe<Array<Scalars["UUID"]> | Scalars["UUID"]>;
  projects?: InputMaybe<Array<Scalars["UUID"]> | Scalars["UUID"]>;
}>;

export type NewTeamMutation = {
  __typename?: "MutationRoot";
  createTeam: { __typename?: "Team"; id: any; name: string };
};

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
          variable: { kind: "Variable", name: { kind: "Name", value: "ownerId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
          },
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
                name: { kind: "Name", value: "ownerId" },
                value: { kind: "Variable", name: { kind: "Name", value: "ownerId" } },
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
          variable: { kind: "Variable", name: { kind: "Name", value: "dueDate" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "DateTime" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "leadId" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
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
                name: { kind: "Name", value: "dueDate" },
                value: { kind: "Variable", name: { kind: "Name", value: "dueDate" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "leadId" },
                value: { kind: "Variable", name: { kind: "Name", value: "leadId" } },
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
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "priority" } },
                { kind: "Field", name: { kind: "Name", value: "ownerId" } },
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
                { kind: "Field", name: { kind: "Name", value: "leadId" } },
                { kind: "Field", name: { kind: "Name", value: "projectId" } },
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
          variable: { kind: "Variable", name: { kind: "Name", value: "assigness" } },
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
                value: { kind: "Variable", name: { kind: "Name", value: "assigness" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "dueDate" },
                value: { kind: "Variable", name: { kind: "Name", value: "dueDate" } },
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
          variable: { kind: "Variable", name: { kind: "Name", value: "ownerId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } },
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
                name: { kind: "Name", value: "ownerId" },
                value: { kind: "Variable", name: { kind: "Name", value: "ownerId" } },
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
