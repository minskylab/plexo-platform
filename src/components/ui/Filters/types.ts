import { Member, MembersQuery, Project, ProjectsQuery, TaskPriority, TaskStatus } from "integration/graphql";
import { LabelType } from "../Task/types";

//tipos de filtros
type filterTypes =  TaskStatus[] | Member[] | TaskPriority[] | LabelType[] | Project[];

export interface Filter {
name: string;
elements: filterTypes;
}

export type MemberType = MembersQuery["members"][number];
export type ProjectsType = ProjectsQuery["projects"][number];