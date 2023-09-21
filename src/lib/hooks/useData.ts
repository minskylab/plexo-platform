import {
  LabelsDocument,
  MembersDocument,
  ProjectsDocument,
  TeamsDocument,
  MemberByIdDocument,
  TaskStatus,
  TaskPriority,
} from "integration/graphql";
import { useQuery } from "urql";

interface UseDataProps {
  memberId?: string | undefined;
  taskId?: string | undefined;
  projectId?: string | undefined;
  teamId?: string | undefined;
  taskDetails?: {
    title: string | null;
    description: string | null;
    dueDate: Date | null;
    status: TaskStatus | null;
    priority: TaskPriority | null;
  };
}

export const useData = ({ memberId }: UseDataProps) => {
  //Queries
  const [{ data: projectsData, fetching: isLoadingProjects }] = useQuery({
    query: ProjectsDocument,
  });

  const [{ data: membersData, fetching: isLoadingMembers }] = useQuery({
    query: MembersDocument,
  });

  const [{ data: teamsData, fetching: isLoadingTeams }] = useQuery({
    query: TeamsDocument,
  });

  const [{ data: labelsData, fetching: isLoadingLabels }] = useQuery({
    query: LabelsDocument,
  });

  const [{ data: memberData, fetching: isLoadingMember }] = useQuery({
    pause: memberId ? false : true,
    query: MemberByIdDocument,
    variables: {
      memberId: memberId,
    },
  });

  return {
    projectsData,
    isLoadingProjects,
    membersData,
    isLoadingMembers,
    teamsData,
    isLoadingTeams,
    labelsData,
    isLoadingLabels,
    memberData,
    isLoadingMember,
  };
};
