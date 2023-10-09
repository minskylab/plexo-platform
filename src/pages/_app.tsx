import { ColorScheme } from "@mantine/core";
import type { AppProps } from "next/app";
import { getCookie } from "cookies-next";
import { ReactElement, ReactNode, useState } from "react";
import { Provider as URQLProvider } from "urql";
import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";

import Fonts from "theming/fonts";
import { URQLClient } from "lib/client";
import { MyMantineProvider } from "theming/mantine";
import PlexoProvider from "../context/PlexoContext";
import MySpotlightProvider from "components/ui/NavBarWithSearch/searchPopup";

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

const client = URQLClient({
  graphQLEndpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
});

const PlexoApp = ({
  Component,
  pageProps,
  colorScheme,
  authCookie,
}: AppPropsWithLayout<PlexoPlatformAppProps> & PlexoPlatformAppProps) => {
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <>
      <Head>
        <title>Plexo</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" type="image/png" sizes="5x5" href="/plexo.png" />
      </Head>
      <URQLProvider value={client}>
        <PlexoProvider authCookie={authCookie}>
          <MyMantineProvider colorScheme={colorScheme}>
            <MySpotlightProvider>
              <Fonts />
              {getLayout(<Component {...pageProps} />)}
            </MySpotlightProvider>
          </MyMantineProvider>
        </PlexoProvider>
      </URQLProvider>
    </>
  );
};

PlexoApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => {
  return {
    colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
    viewMode: getCookie("viewMode", ctx) || "list",
    authCookie: getCookie("plexo-session-token", ctx) || "",
  };
};

export default PlexoApp;
