import type { ReactElement } from "react";

import Layout from "components/ui/Layout";
import { TasksPageContent } from "modules/tasks";
import { NextPageWithLayout } from "pages/_app";

const TasksPage: NextPageWithLayout = () => {
  return <TasksPageContent />;
};

TasksPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TasksPage;
