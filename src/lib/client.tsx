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

export const URQLClient = ({ graphQLEndpoint }: { graphQLEndpoint?: string }) => {
  // console.log("CREATING URQL CLIENT");

  const GRAPHQL_ENDPOINT =
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || graphQLEndpoint || "/graphql";

  const WS_ENDPOINT = process.env.NEXT_PUBLIC_WS_ENDPOINT || "/graphql/ws";

  const wsClient =
    typeof window === "undefined"
      ? null
      : createWSClient({
          url: WS_ENDPOINT,
          connectionParams: {
            Authorization: "",
          },
        });

  // console.log(GRAPHQL_ENDPOINT);

  return createClient({
    url: GRAPHQL_ENDPOINT,
    fetchOptions: {
      credentials: "include",
      headers: {
        // Authorization: PLEXO_TOKEN,
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
        forwardSubscription(request) {
          const input = { ...request, query: request.query || "" };
          return {
            subscribe(sink) {
              return {
                unsubscribe: wsClient!.subscribe(input, sink),
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
