import { MembersQuery, ProjectsQuery, TeamsQuery } from "integration/graphql";

export enum LabelType {
  Bug = "BUG",
  Feature = "FEATURE",
  Improvement = "IMPROVEMENT",
  Migrated = "MIGRATED",
}

export type MemberType = MembersQuery["members"][number];
export type ProjectsType = ProjectsQuery["projects"][number];
export type TeamsType = TeamsQuery["teams"][number];
