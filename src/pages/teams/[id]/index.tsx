import type { ReactElement } from "react";
import { useRouter } from "next/router";

import { useData } from "lib/hooks/useData";
import Layout from "components/ui/Layout";
import TeamDetailPageContent from "modules/teamDetail";
import { NextPageWithLayout } from "pages/_app";

const TeamPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { teamData, isLoadingTeams } = useData({ teamId: id as string });

  return <TeamDetailPageContent team={teamData?.teamById} isLoading={isLoadingTeams} />;
};

TeamPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TeamPage;
