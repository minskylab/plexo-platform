import Layout from "components/ui/Layout";
import { usePlexoContext } from "context/PlexoContext";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { NextPageWithLayout } from "./_app";

const PlexoPage: NextPageWithLayout = () => {
  const router = useRouter();
  let plexo = usePlexoContext();

  // console.log("plexo auth cookie: ", plexo.authCookie);

  // useEffect(() => {
  //   if (!plexo.authCookie) {
  //     router.push("/login");
  //   }
  // }, [router, plexo.authCookie]);

  useEffect(() => {
    router.replace("/tasks", undefined, { shallow: true });
  }, [router]);

  return <h1>Hello Plexo</h1>;
};

PlexoPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PlexoPage;
