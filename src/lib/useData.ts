import { MembersDocument, ProjectsDocument, TeamsDocument } from "integration/graphql";
import { useQuery } from "urql";
import { MemberByIdDocument, TaskByIdDocument } from "../integration/graphql";

interface UseDataProps {
  memberId?: string | undefined;
  taskId?: string | undefined;
}

export const useData = ({ memberId, taskId }: UseDataProps) => {
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

  const [{ data: memberData, fetching: isLoadingMember }] = useQuery({
    pause: memberId ? false : true,
    query: MemberByIdDocument,
    variables: {
      memberId: memberId,
    },
  });

  const [{ data: taskData, fetching: isLoadingTask }] = useQuery({
    pause: taskId ? false : true,
    query: TaskByIdDocument,
    variables: {
      taskId: taskId,
    },
  });

  return {
    projectsData,
    isLoadingProjects,
    membersData,
    isLoadingMembers,
    teamsData,
    isLoadingTeams,
    memberData,
    isLoadingMember,
    taskData,
    isLoadingTask,
  };
};
