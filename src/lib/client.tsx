import { devtoolsExchange } from "@urql/devtools";
import {
  cacheExchange,
  CombinedError,
  createClient,
  dedupExchange,
  errorExchange,
  fetchExchange,
  subscriptionExchange,
} from "urql";
import { createClient as createWSClient } from "graphql-ws";

const wsClient =
  typeof window === "undefined"
    ? null
    : createWSClient({
        url: "wss://plexo-minsky.internal.minsky.cc/graphql/ws",
        connectionParams: {
          Authorization: "Bearer xxx",
        },
      });

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
      subscriptionExchange({
        forwardSubscription(operation) {
          return {
            subscribe: sink => {
              return {
                unsubscribe: wsClient!.subscribe(operation, sink),
              };
            },
          };
        },
      }),
      fetchExchange,
    ],
  });
};
