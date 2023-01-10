import { TasksQuery, MembersQuery, ProjectsQuery, TeamsQuery } from "integration/graphql";

export type Task = TasksQuery["tasks"][number];
export type Project = ProjectsQuery["projects"][number];
export type Member = MembersQuery["members"][number];
export type Team = TeamsQuery["teams"][number];
