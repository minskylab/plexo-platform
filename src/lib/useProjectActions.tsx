import {
  DeleteProjectDocument,
  NewProjectDocument,
  UpdateProjectDocument,
} from "integration/graphql";
import { useMutation } from "urql";

export const useProjectActions = () => {
  // Mutations
  const [createProject, fetchCreateProject] = useMutation(NewProjectDocument);
  const [deleteProject, fetchDeleteProject] = useMutation(DeleteProjectDocument);
  const [updateProject, fetchUpdateProject] = useMutation(UpdateProjectDocument);

  return {
    createProject,
    fetchCreateProject,
    deleteProject,
    fetchDeleteProject,
    updateProject,
    fetchUpdateProject,
  };
};
