import {
  DeleteProjectDocument,
  DeleteTaskDocument,
  NewProjectDocument,
  NewTaskDocument,
  UpdateProjectDocument,
  UpdateTaskDocument,
} from "integration/graphql";
import { useMutation } from "urql";

export const useActions = () => {
  // Task
  const [createTask, fetchCreateTask] = useMutation(NewTaskDocument);
  const [deleteTask, fetchDeleteTask] = useMutation(DeleteTaskDocument);
  const [updateTask, fetchUpdateTask] = useMutation(UpdateTaskDocument);
  // Project
  const [createProject, fetchCreateProject] = useMutation(NewProjectDocument);
  const [deleteProject, fetchDeleteProject] = useMutation(DeleteProjectDocument);
  const [updateProject, fetchUpdateProject] = useMutation(UpdateProjectDocument);

  return {
    createTask,
    fetchCreateTask,
    deleteTask,
    fetchDeleteTask,
    updateTask,
    fetchUpdateTask,
    createProject,
    fetchCreateProject,
    deleteProject,
    fetchDeleteProject,
    updateProject,
    fetchUpdateProject,
  };
};
