import {
  TasksQuery,
  MembersQuery,
  ProjectsQuery,
  TeamsQuery,
  TaskByIdQuery,
  LabelsQuery,
  UserQuery,
  ProjectByIdQuery,
  TeamByIdQuery,
  SubdivideTaskQuery,
  TaskActivityQuery,
} from "integration/graphql";

export type Task = TasksQuery["tasks"][number];
export type TaskById = TaskByIdQuery["taskById"];
export type Project = ProjectsQuery["projects"][number];
export type Member = MembersQuery["members"][number];
export type Team = TeamsQuery["teams"][number];
export type Label = LabelsQuery["labels"][number];
export type ProjectById = ProjectByIdQuery["projectById"];
export type TeamById = TeamByIdQuery["teamById"];
export type User = UserQuery["me"];
export type TaskSuggestion = SubdivideTaskQuery["subdivideTask"][number];
export type TaskActivity = TaskActivityQuery["activity"][number];
