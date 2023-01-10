import { devtoolsExchange } from "@urql/devtools";
import {
  cacheExchange,
  CombinedError,
  createClient,
  dedupExchange,
  errorExchange,
  fetchExchange,
} from "urql";

export const URQLClient = () => {
  return createClient({
    url: "https://plexo-minsky.internal.minsky.cc/graphql",
    fetchOptions: {
      headers: {
        Authorization: "Bearer xxx",
      },
    },
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange,
      errorExchange({
        onError: (error: CombinedError) => {
          console.log({ error });
        },
      }),
      fetchExchange,
    ],
  });
};
