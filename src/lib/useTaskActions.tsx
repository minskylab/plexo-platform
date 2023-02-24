import { DeleteTaskDocument, NewTaskDocument, UpdateTaskDocument } from "integration/graphql";
import { useMutation } from "urql";

export const useTaskActions = () => {
  //Mutations
  const [createTask, fetchCreateTask] = useMutation(NewTaskDocument);
  const [deleteTask, fetchDeleteTask] = useMutation(DeleteTaskDocument);
  const [updateTask, fetchUpdateTask] = useMutation(UpdateTaskDocument);

  return {
    createTask,
    fetchCreateTask,
    deleteTask,
    fetchDeleteTask,
    updateTask,
    fetchUpdateTask,
  };
};
