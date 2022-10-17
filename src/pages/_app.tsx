import type { AppProps } from "next/app";
import { Provider as URQLProvider } from "urql";
import { URQLClient } from "lib/client";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import Fonts from "theming/fonts";
import { useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { colorBrandDark, colorBrandPrimary } from "theming";

const client = URQLClient();

const FairpayApp = (props: AppProps & { colorScheme: ColorScheme }) => {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie("mantine-color-scheme", nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <URQLProvider value={client}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: colorScheme,
            fontFamily: "Open Sans",
            colors: {
              brand: colorBrandPrimary,
              dark: colorBrandDark,
            },
            primaryColor: "brand",
          }}
        >
          <Fonts />
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </URQLProvider>
  );
};

FairpayApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  // get color scheme from cookie
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});

export default FairpayApp;
