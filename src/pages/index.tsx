import { type GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Plexo = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/tasks");
  }, []);

  return <h1>Plexo</h1>;
};

export default Plexo;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: "/tasks",
    },
    props: {},
  };
};
