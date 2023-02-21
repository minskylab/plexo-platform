import { DeleteTaskDocument, NewTaskDocument } from "integration/graphql";
import { useMutation } from "urql";

export const useTaskActions = () => {
  //Mutations
  const [createTask, fetchCreateTask] = useMutation(NewTaskDocument);
  const [deleteTask, fetchDeleteTask] = useMutation(DeleteTaskDocument);

  return {
    createTask,
    fetchCreateTask,
    deleteTask,
    fetchDeleteTask,
  };
};
