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

export type Member = {
  __typename?: "Member";
  assignedTasks: Array<Task>;
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  githubId?: Maybe<Scalars["String"]>;
  googleId?: Maybe<Scalars["String"]>;
  id: Scalars["UUID"];
  name: Scalars["String"];
  ownedProjects: Array<Project>;
  ownedTasks: Array<Task>;
  photoUrl?: Maybe<Scalars["String"]>;
  role: MemberRole;
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
  createProject: Project;
  createTask: Task;
  deleteMember: Member;
  deleteProject: Project;
  deleteTask: Task;
  updateMember: Member;
  updateProject: Project;
  updateTask: Task;
};

export type MutationRootCreateProjectArgs = {
  description?: InputMaybe<Scalars["String"]>;
  labels?: InputMaybe<Array<Scalars["String"]>>;
  name: Scalars["String"];
  ownerId: Scalars["UUID"];
  prefix: Scalars["String"];
};

export type MutationRootCreateTaskArgs = {
  assigneeId?: InputMaybe<Scalars["UUID"]>;
  description?: InputMaybe<Scalars["String"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]>;
  labels?: InputMaybe<Array<Scalars["String"]>>;
  ownerId: Scalars["UUID"];
  priority?: InputMaybe<Scalars["String"]>;
  projectId?: InputMaybe<Scalars["UUID"]>;
  status?: InputMaybe<Scalars["String"]>;
  title: Scalars["String"];
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

export type MutationRootUpdateMemberArgs = {
  email?: InputMaybe<Scalars["String"]>;
  id: Scalars["UUID"];
  name?: InputMaybe<Scalars["String"]>;
};

export type MutationRootUpdateProjectArgs = {
  description?: InputMaybe<Scalars["String"]>;
  id: Scalars["UUID"];
  labels?: InputMaybe<Array<Scalars["String"]>>;
  name?: InputMaybe<Scalars["String"]>;
  prefix?: InputMaybe<Scalars["String"]>;
};

export type MutationRootUpdateTaskArgs = {
  assigneeId?: InputMaybe<Scalars["UUID"]>;
  description?: InputMaybe<Scalars["String"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]>;
  id: Scalars["UUID"];
  labels?: InputMaybe<Array<Scalars["String"]>>;
  priority?: InputMaybe<Scalars["String"]>;
  projectId?: InputMaybe<Scalars["UUID"]>;
  status?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type Project = {
  __typename?: "Project";
  createdAt: Scalars["DateTime"];
  description?: Maybe<Scalars["String"]>;
  id: Scalars["UUID"];
  members: Array<Member>;
  name: Scalars["String"];
  owner?: Maybe<Member>;
  ownerId: Scalars["UUID"];
  prefix: Scalars["String"];
  tasks: Array<Task>;
  updatedAt: Scalars["DateTime"];
};

export type ProjectFilter = {
  description?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type QueryRoot = {
  __typename?: "QueryRoot";
  memberByEmail: Member;
  memberById: Member;
  members: Array<Member>;
  projectById: Project;
  projects: Array<Project>;
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
  assignee?: Maybe<Member>;
  assigneeId?: Maybe<Scalars["UUID"]>;
  createdAt: Scalars["DateTime"];
  description?: Maybe<Scalars["String"]>;
  dueDate?: Maybe<Scalars["DateTime"]>;
  id: Scalars["UUID"];
  labels: Array<Scalars["String"]>;
  owner: Member;
  ownerId: Scalars["UUID"];
  priority: TaskPriority;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars["UUID"]>;
  status: TaskStatus;
  title: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type TaskFilter = {
  assigneeId?: InputMaybe<Scalars["UUID"]>;
  dueDateFrom?: InputMaybe<Scalars["DateTime"]>;
  dueDateTo?: InputMaybe<Scalars["DateTime"]>;
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

export type Team = {
  __typename?: "Team";
  createdAt: Scalars["DateTime"];
  id: Scalars["UUID"];
  members: Array<Member>;
  name: Scalars["String"];
  owner: Member;
  ownerId: Scalars["UUID"];
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
    assignedTasks: Array<{ __typename?: "Task"; id: any }>;
    ownedProjects: Array<{ __typename?: "Project"; id: any }>;
  }>;
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
    description?: string | null;
    prefix: string;
    ownerId: any;
    owner?: { __typename?: "Member"; id: any } | null;
    tasks: Array<{ __typename?: "Task"; id: any }>;
  }>;
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
    labels: Array<string>;
    assigneeId?: any | null;
    projectId?: any | null;
    dueDate?: any | null;
    owner: { __typename?: "Member"; id: any };
    assignee?: { __typename?: "Member"; id: any } | null;
    project?: { __typename?: "Project"; id: any } | null;
  }>;
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
    labels: Array<string>;
    assigneeId?: any | null;
    projectId?: any | null;
  };
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
    owner: { __typename?: "Member"; id: any };
    members: Array<{ __typename?: "Member"; id: any }>;
  }>;
};

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
                  name: { kind: "Name", value: "assignedTasks" },
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
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "prefix" } },
                { kind: "Field", name: { kind: "Name", value: "ownerId" } },
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
} as unknown as DocumentNode<ProjectsQuery, ProjectsQueryVariables>;
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
                { kind: "Field", name: { kind: "Name", value: "labels" } },
                { kind: "Field", name: { kind: "Name", value: "assigneeId" } },
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
                  name: { kind: "Name", value: "assignee" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "project" },
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
} as unknown as DocumentNode<TasksQuery, TasksQueryVariables>;
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
                { kind: "Field", name: { kind: "Name", value: "labels" } },
                { kind: "Field", name: { kind: "Name", value: "assigneeId" } },
                { kind: "Field", name: { kind: "Name", value: "projectId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TasksSubscriptionSubscription, TasksSubscriptionSubscriptionVariables>;
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
