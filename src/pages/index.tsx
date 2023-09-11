import { useRouter } from "next/router";
import { useEffect } from "react";

const Plexo = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/tasks");
  }, [router]);

  return <h1>Hello Plexo</h1>;
};

export default Plexo;
