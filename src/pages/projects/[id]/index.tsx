import { useData } from "lib/useData";
import ProjectDetailContent from "modules/app/projectDetail";
import { useRouter } from "next/router";

const ProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { projectData, isLoadingProject } = useData({ projectId: id as string });

  return <ProjectDetailContent project={projectData?.projectById} isLoading={isLoadingProject} />;
};

export default ProjectPage;
