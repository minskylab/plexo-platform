import type { ReactElement } from "react";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { useData } from "lib/useData";
import Layout from "components/ui/Layout";
import ProjectDetailContent from "modules/projectDetail";

import { NextPageWithLayout } from "pages/_app";

const ProjectPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { projectData, isLoadingProject } = useData({ projectId: id as string });

  return <ProjectDetailContent project={projectData?.projectById} isLoading={isLoadingProject} />;
};

ProjectPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProjectPage;
