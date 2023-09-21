import {
  SuggestNewTaskDocument,
  MemberByIdDocument,
  TaskByIdDocument,
  ProjectByIdDocument,
  TeamByIdDocument,
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

export const useData = ({ memberId, taskId, projectId, teamId, taskDetails }: UseDataProps) => {
  //Queries

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

  const [{ data: taskSuggestionData, fetching: isLoadingTaskSuggestion }, fetchTaskSuggestion] =
    useQuery({
      pause: true,
      query: SuggestNewTaskDocument,
      variables: {
        taskSuggestion: {
          title: taskDetails?.title ? taskDetails?.title : null,
          description: taskDetails?.description ? taskDetails?.description : null,
          dueDate: taskDetails?.dueDate ? taskDetails?.dueDate : null,
          status: taskDetails?.status ? taskDetails?.status : null,
          priority: taskDetails?.priority ? taskDetails?.priority : null,
        },
      },
    });

  return {
    memberData,
    isLoadingMember,
    taskData,
    isLoadingTask,
    projectData,
    isLoadingProject,
    teamData,
    isLoadingTeam,
    taskSuggestionData,
    isLoadingTaskSuggestion,
    fetchTaskSuggestion,
  };
};
