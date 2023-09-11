import { useEffect, type ReactElement } from "react";
import { useRouter } from "next/router";

import { useData } from "lib/hooks/useData";
import Layout from "components/ui/Layout";
import TeamDetailPageContent from "modules/teamDetail";
import { NextPageWithLayout } from "pages/_app";
import { usePlexoContext } from "context/PlexoContext";

const TeamPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { teamData, isLoadingTeams } = useData({ teamId: id as string });

  const plexo = usePlexoContext();

  useEffect(() => {
    if (!plexo.authCookie) {
      router.push("/login");
    }
  }, [router, plexo.authCookie]);

  return <TeamDetailPageContent team={teamData?.teamById} isLoading={isLoadingTeams} />;
};

TeamPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TeamPage;
