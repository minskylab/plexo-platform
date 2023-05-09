import { ColorScheme } from "@mantine/core";
import type { AppProps } from "next/app";
import { getCookie } from "cookies-next";
import { ReactElement, ReactNode } from "react";
import { Provider as URQLProvider } from "urql";
import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";

import Fonts from "theming/fonts";
import { URQLClient } from "lib/client";
import { MyMantineProvider } from "theming/mantine";
import PlexoProvider from "../context/PlexoContext";

export type NextPageWithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<T> = AppProps & {
  Component: NextPageWithLayout<T>;
};

type LogesAppProps = {
  colorScheme: ColorScheme;
};

const client = URQLClient();

const PlexoApp = ({
  Component,
  pageProps,
  colorScheme,
}: AppPropsWithLayout<LogesAppProps> & LogesAppProps) => {
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <>
      <Head>
        <title>Plexo</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" type="image/png" sizes="5x5" href="/plexo.png" />
      </Head>
      <URQLProvider value={client}>
        <PlexoProvider>
          <MyMantineProvider colorScheme={colorScheme}>
            <Fonts />
            {getLayout(<Component {...pageProps} />)}
          </MyMantineProvider>
        </PlexoProvider>
      </URQLProvider>
    </>
  );
};

PlexoApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  // get color scheme from cookie
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
  viewMode: getCookie("viewMode", ctx) || "list",
});

export default PlexoApp;
