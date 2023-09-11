import { useEffect, type ReactElement } from "react";
import { useRouter } from "next/router";

import { useData } from "lib/hooks/useData";
import Layout from "components/ui/Layout";
import ProjectDetailContent from "modules/projectDetail";
import { NextPageWithLayout } from "pages/_app";
import { usePlexoContext } from "context/PlexoContext";

const ProjectPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { projectData, isLoadingProject } = useData({ projectId: id as string });

  const plexo = usePlexoContext();

  useEffect(() => {
    if (!plexo.authCookie) {
      router.push("/login");
    }
  }, [router, plexo.authCookie]);

  return <ProjectDetailContent project={projectData?.projectById} isLoading={isLoadingProject} />;
};

ProjectPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProjectPage;
