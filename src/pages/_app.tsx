import { ColorScheme } from "@mantine/core";
import type { AppProps } from "next/app";
import { getCookie } from "cookies-next";
import { ReactElement, ReactNode, useState } from "react";
import { Provider as URQLProvider } from "urql";
import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import Script from "next/script";

import Fonts from "theming/fonts";
import { MyMantineProvider } from "theming/mantine";
import { URQLClient } from "lib/client";
import PlexoProvider from "../context/PlexoContext";

export type NextPageWithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<T> = AppProps & {
  Component: NextPageWithLayout<T>;
};

type PlexoPlatformAppProps = {
  colorScheme: ColorScheme;
  viewMode: "list" | "grid";
  authCookie: string;
  //
  graphQLEndpoint: string | undefined;
  authEmailURL: string | undefined;
};

const PlexoApp = ({
  Component,
  pageProps,
  colorScheme,
  authCookie,
  graphQLEndpoint,
  authEmailURL,
}: AppPropsWithLayout<PlexoPlatformAppProps> & PlexoPlatformAppProps) => {
  const getLayout = Component.getLayout ?? (page => page);

  // console.log("authCookie: ", authCookie);
  // console.log("graphQLEndpoint: ", graphQLEndpoint);

  const [client, setClient] = useState(
    URQLClient({
      graphQLEndpoint: graphQLEndpoint,
    })
  );

  let [authCookieState, setAuthCookie] = useState(authCookie);

  return (
    <>
      <Script
        async
        src="https://umami.internal.plexo.app/script.js"
        data-website-id="605878f4-653c-40f8-a7de-f70e9831c6c3"
      />
      <Head>
        <title>Plexo</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" type="image/png" sizes="5x5" href="/plexo.png" />
      </Head>
      <URQLProvider value={client}>
        <PlexoProvider authCookie={authCookieState} authEmailURL={authEmailURL}>
          <MyMantineProvider colorScheme={colorScheme}>
            <Fonts />
            {getLayout(<Component {...pageProps} />)}
          </MyMantineProvider>
        </PlexoProvider>
      </URQLProvider>
    </>
  );
};

PlexoApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => {
  // console.log("GET INITIAL PROPS");
  // console.log(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT);
  // console.log(process.env.NEXT_PUBLIC_URL_EMAIL_AUTH);

  return {
    // get color scheme from cookie
    colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
    viewMode: getCookie("viewMode", ctx) || "list",

    authCookie: getCookie("plexo-session-token", ctx) || "",
    graphQLEndpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    authEmailURL: process.env.NEXT_PUBLIC_URL_EMAIL_AUTH,
  };
};

export default PlexoApp;
