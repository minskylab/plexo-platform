import {
  TasksQuery,
  MembersQuery,
  ProjectsQuery,
  TeamsQuery,
  TaskByIdQuery,
  LabelsQuery,
} from "integration/graphql";

export type Task = TasksQuery["tasks"][number];
export type TaskById = TaskByIdQuery["taskById"];
export type Project = ProjectsQuery["projects"][number];
export type Member = MembersQuery["members"][number];
export type Team = TeamsQuery["teams"][number];
export type Label = LabelsQuery["labels"][number];
