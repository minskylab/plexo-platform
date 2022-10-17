import { Colors, TypographyProps, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { GlobalStyles } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  // initialColorMode: "dark",
  useSystemColorMode: true,
};

const colors: Colors = {
  primary: "#8F98FE",
  secondary: "#FEE7AF",
};

const fonts = {
  body: "Open Sans, system-ui, sans-serif",
  heading: "Georgia, serif",
  mono: "Menlo, monospace",
};

const styles: GlobalStyles = {
  global: () => ({
    "html, body": {
      backgroundColor: "dark",
    },
  }),
};

const customTheme = extendTheme({ colors, config, styles, fonts });

export { customTheme };
