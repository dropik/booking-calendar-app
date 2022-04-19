import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    onPrimary: Palette["primary"];
    primaryContainer: Palette["primary"];
    onPrimaryContainer: Palette["primary"];

    onSecondary: Palette["secondary"];
    secondaryContainer: Palette["secondary"];
    onSecondaryContainer: Palette["secondary"];

    tertiary: Palette["secondary"];
    onTertiary: Palette["tertiary"];
    tertiaryContainer: Palette["tertiary"];
    onTertiaryContainer: Palette["tertiary"];

    onError: Palette["error"];
    errorContainer: Palette["error"];
    onErrorContainer: Palette["error"];

    colourBackground: Palette["secondary"];
    onBackground: Palette["colourBackground"];
    surface: Palette["colourBackground"];
    onSurface: Palette["colourBackground"];

    surfaceVariant: Palette["colourBackground"];
    onSurfaceVariant: Palette["colourBackground"];
    outline: Palette["colourBackground"];

    shadow: Palette["colourBackground"];
    surfaceTint: Palette["primary"];
    inverseSurface: Palette["colourBackground"];
    inverseOnSurface: Palette["colourBackground"];
    inversePrimary: Palette["primary"];
  }

  interface PaletteOptions {
    onPrimary?: PaletteOptions["primary"];
    primaryContainer?: PaletteOptions["primary"];
    onPrimaryContainer?: PaletteOptions["primary"];

    onSecondary?: PaletteOptions["secondary"];
    secondaryContainer?: PaletteOptions["secondary"];
    onSecondaryContainer?: PaletteOptions["secondary"];

    tertiary?: PaletteOptions["secondary"];
    onTertiary?: PaletteOptions["tertiary"];
    tertiaryContainer?: PaletteOptions["tertiary"];
    onTertiaryContainer?: PaletteOptions["tertiary"];

    onError?: PaletteOptions["error"];
    errorContainer?: PaletteOptions["error"];
    onErrorContainer?: PaletteOptions["error"];

    colourBackground?: PaletteOptions["secondary"];
    onBackground?: PaletteOptions["colourBackground"];
    surface?: PaletteOptions["colourBackground"];
    onSurface?: PaletteOptions["colourBackground"];

    surfaceVariant?: PaletteOptions["colourBackground"];
    onSurfaceVariant?: PaletteOptions["colourBackground"];
    outline?: PaletteOptions["colourBackground"];

    shadow?: PaletteOptions["colourBackground"];
    surfaceTint?: PaletteOptions["primary"];
    inverseSurface?: PaletteOptions["colourBackground"];
    inverseOnSurface?: PaletteOptions["colourBackground"];
    inversePrimary?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#6750A4",
      light: "#6750A4",
      dark: "#D0BCFF"
    },
    onPrimary: {
      main: "#FFFFFF",
      light: "#FFFFFF",
      dark: "#371E73"
    },
    primaryContainer: {
      main: "#EADDFF",
      light: "#EADDFF",
      dark: "#4F378B"
    },
    onPrimaryContainer: {
      main: "#21005E",
      light: "#21005E",
      dark: "#EADDFF"
    },

    secondary: {
      main: "#625B71",
      light: "#625B71",
      dark: "#CCC2DC"
    },
    onSecondary: {
      main: "#FFFFFF",
      light: "#FFFFFF",
      dark: "#332D41"
    },
    secondaryContainer: {
      main: "#E8DEF8",
      light: "#E8DEF8",
      dark: "#4A4458"
    },
    onSecondaryContainer: {
      main: "#1E192B",
      light: "#1E192B",
      dark: "#E8DEF8"
    },

    tertiary: {
      main: "#7D5260",
      light: "#7D5260",
      dark: "#EFB8C8"
    },
    onTertiary: {
      main: "#FFFFFF",
      light: "#FFFFFF",
      dark: "#492532"
    },
    tertiaryContainer: {
      main: "#FFD8E4",
      light: "#FFD8E4",
      dark: "#633B48"
    },
    onTertiaryContainer: {
      main: "#370B1E",
      light: "#370B1E",
      dark: "#FFD8E4"
    },

    error: {
      main: "#B3261E",
      light: "#B3261E",
      dark: "#F2B8B5"
    },
    onError: {
      main: "#FFFFFF",
      light: "#FFFFFF",
      dark: "#601410"
    },
    errorContainer: {
      main: "#F9DEDC",
      light: "#F9DEDC",
      dark: "#8C1D18"
    },
    onErrorContainer: {
      main: "#370B1E",
      light: "#370B1E",
      dark: "#F9DEDC"
    },

    colourBackground: {
      main: "#FFFBFE",
      light: "#FFFBFE",
      dark: "#1C1B1F"
    },
    onBackground: {
      main: "#1C1B1F",
      light: "#1C1B1F",
      dark: "#E6E1E5"
    },
    surface: {
      main: "#FFFBFE",
      light: "#FFFBFE",
      dark: "#1C1B1F"
    },
    onSurface: {
      main: "#1C1B1F",
      light: "#1C1B1F",
      dark: "#E6E1E5"
    },

    surfaceVariant: {
      main: "#E7E0EC",
      light: "#E7E0EC",
      dark: "#49454F"
    },
    onSurfaceVariant: {
      main: "#49454E",
      light: "#49454E",
      dark: "#CAC4D0"
    },
    outline: {
      main: "#79747E",
      light: "#79747E",
      dark: "#938F99"
    },

    shadow: {
      main: "#000000",
      light: "#000000",
      dark: "#000000"
    },
    surfaceTint: {
      main: "#6750A4",
      light: "#6750A4",
      dark: "#D0BCFF"
    },
    inverseSurface: {
      main: "#313033",
      light: "#313033",
      dark: "#E6E1E5"
    },
    inverseOnSurface: {
      main: "#F4EFF4",
      light: "#F4EFF4",
      dark: "#313033"
    },
    inversePrimary: {
      main: "#D0BCFF",
      light: "#D0BCFF",
      dark: "#6750A4"
    }
  }
});

export default theme;
