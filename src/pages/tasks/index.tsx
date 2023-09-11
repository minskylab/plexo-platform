import { useEffect, type ReactElement } from "react";

import Layout from "components/ui/Layout";
import { TasksPageContent } from "modules/tasks";
import { NextPageWithLayout } from "pages/_app";
import { useRouter } from "next/router";
import { usePlexoContext } from "context/PlexoContext";

const TasksPage: NextPageWithLayout = () => {
  let router = useRouter();
  let plexo = usePlexoContext();

  // console.log("plexo auth cookie: ", plexo.authCookie);

  useEffect(() => {
    if (!plexo.authCookie) {
      router.push("/login");
    }
  }, [router, plexo.authCookie]);

  return <TasksPageContent />;
};

TasksPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TasksPage;
