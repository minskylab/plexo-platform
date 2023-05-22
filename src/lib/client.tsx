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

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "";
const WS_ENDPOINT = process.env.NEXT_PUBLIC_WS_ENDPOINT || "";
const PLEXO_TOKEN = process.env.NEXT_PUBLIC_PLEXO_TOKEN || "";

const wsClient =
  typeof window === "undefined"
    ? null
    : createWSClient({
        url: WS_ENDPOINT,
        connectionParams: {
          Authorization: "",
        },
      });

export const URQLClient = () => {
  return createClient({
    url: GRAPHQL_ENDPOINT,
    fetchOptions: {
      headers: {
        Authorization: PLEXO_TOKEN,
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
