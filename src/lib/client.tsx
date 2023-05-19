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
        url: "wss://demo.plexo.app/graphql/ws",
        connectionParams: {
          Authorization: "Bearer xxx",
        },
      });

export const URQLClient = () => {
  return createClient({
    url: "https://demo.plexo.app/graphql",
    fetchOptions: {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_PLEXO_TOKEN || "",
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
    requestPolicy: "network-only",
  });
};
