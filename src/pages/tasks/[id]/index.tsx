import { useEffect, type ReactElement } from "react";
import { useRouter } from "next/router";

import { useData } from "lib/hooks/useData";
import { NextPageWithLayout } from "pages/_app";
import TaskDetailPageContent from "modules/taskDetail";
import Layout from "components/ui/Layout";
import { usePlexoContext } from "context/PlexoContext";

const TaskPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { taskData, isLoadingTask } = useData({ taskId: id as string });
  const plexo = usePlexoContext();

  useEffect(() => {
    if (!plexo.authCookie) {
      router.push("/login");
    }
  }, [router, plexo.authCookie]);

  return <TaskDetailPageContent task={taskData?.taskById} isLoading={isLoadingTask} />;
};

TaskPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TaskPage;
