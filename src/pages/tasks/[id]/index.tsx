import { useData } from "lib/useData";
import TaskDetailContent from "modules/app/taskDetail";
import { useRouter } from "next/router";

const TaskPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { taskData, isLoadingTask } = useData({ taskId: id as string });

  return <TaskDetailContent task={taskData?.taskById} isLoading={isLoadingTask} />;
};

export default TaskPage;
