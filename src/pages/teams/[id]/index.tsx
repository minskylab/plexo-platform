import { useData } from "lib/useData";
import TeamDetailContent from "modules/app/teamDetail";
import { useRouter } from "next/router";

const TeamPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { teamData, isLoadingTeams } = useData({ teamId: id as string });

  return <TeamDetailContent team={teamData?.teamById} isLoading={isLoadingTeams} />;
};

export default TeamPage;
