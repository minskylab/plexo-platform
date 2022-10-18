export type TeamScope = "private" | "public" | "internal";

export type Member = {
  name: string;
  email?: string;

  teams?: Team[];
};

export type Team = {
  name: string;
  scope: TeamScope;

  members?: Member[];
};

export type TaskStatus = "backlog" | "todo" | "in-progress" | "in-review" | "done" | "canceled";

export type TaskPriority = "low" | "medium" | "high" | "urgent";

export type Task = {
  code: string;

  project: Project;

  title: string;
  status: TaskStatus;

  description?: string;
  labels?: string[];

  priority?: TaskPriority;

  assigned?: Member;
  parent?: Task;
};

export type Project = {
  name: string;

  issues?: Task[];
};
