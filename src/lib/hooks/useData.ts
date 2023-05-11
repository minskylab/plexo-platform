import {
  LabelsDocument,
  MembersDocument,
  ProjectsDocument,
  TeamsDocument,
  MemberByIdDocument,
  TaskByIdDocument,
  ProjectByIdDocument,
  TeamByIdDocument,
} from "integration/graphql";
import { useQuery } from "urql";

interface UseDataProps {
  memberId?: string | undefined;
  taskId?: string | undefined;
  projectId?: string | undefined;
  teamId?: string | undefined;
}

export const useData = ({ memberId, taskId, projectId, teamId }: UseDataProps) => {
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

  const [{ data: taskData, fetching: isLoadingTask }] = useQuery({
    pause: taskId ? false : true,
    query: TaskByIdDocument,
    variables: {
      taskId: taskId,
    },
  });

  const [{ data: projectData, fetching: isLoadingProject }] = useQuery({
    pause: projectId ? false : true,
    query: ProjectByIdDocument,
    variables: {
      projectId: projectId,
    },
  });

  const [{ data: teamData, fetching: isLoadingTeam }] = useQuery({
    pause: teamId ? false : true,
    query: TeamByIdDocument,
    variables: {
      teamId: teamId,
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
    taskData,
    isLoadingTask,
    projectData,
    isLoadingProject,
    teamData,
    isLoadingTeam,
  };
};
