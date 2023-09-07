import { useRouter } from "next/router";
import { useEffect } from "react";

const Plexo = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/tasks");
  }, []);

  return;
};

export default Plexo;
