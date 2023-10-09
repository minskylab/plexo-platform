import Layout from "components/ui/Layout";
// import { usePlexoContext } from "context/PlexoContext";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { NextPageWithLayout } from "./_app";

const PlexoPage: NextPageWithLayout = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/tasks", undefined, { shallow: true });
  }, [router]);

  return <h1></h1>;
};

PlexoPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PlexoPage;
