import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Provider as URQLProvider } from "urql";

import { customTheme } from "theming";
import { URQLClient } from "lib/client";
import Fonts from "theming/fonts";

const client = URQLClient();

const FairpayApp = ({ Component, pageProps }: AppProps) => {
  return (
    <URQLProvider value={client}>
      <ChakraProvider resetCSS theme={customTheme}>
        <Fonts />
        <Component {...pageProps} />
      </ChakraProvider>
    </URQLProvider>
  );
};

export default FairpayApp;
