import {
  LabelsDocument,
  MembersDocument,
  ProjectsDocument,
  TeamsDocument,
} from "integration/graphql";
import { useQuery } from "urql";
import { MemberByIdDocument, TaskByIdDocument, ProjectByIdDocument } from "../integration/graphql";

interface UseDataProps {
  memberId?: string | undefined;
  taskId?: string | undefined;
  projectId?: string | undefined;
}

export const useData = ({ memberId, taskId, projectId }: UseDataProps) => {
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
  };
};
