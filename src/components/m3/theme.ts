import React from "react";
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

  interface TypographyVariants {
    displayLarge: React.CSSProperties;
    displayMedium: React.CSSProperties;
    displaySmall: React.CSSProperties;
    headlineLarge: React.CSSProperties;
    headlineMedium: React.CSSProperties;
    headlineSmall: React.CSSProperties;
    titleLarge: React.CSSProperties;
    titleMedium: React.CSSProperties;
    titleSmall: React.CSSProperties;
    labelLarge: React.CSSProperties;
    labelMedium: React.CSSProperties;
    labelSmall: React.CSSProperties;
    bodyLarge: React.CSSProperties;
    bodyMedium: React.CSSProperties;
    bodySmall: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    displayLarge?: React.CSSProperties;
    displayMedium?: React.CSSProperties;
    displaySmall?: React.CSSProperties;
    headlineLarge?: React.CSSProperties;
    headlineMedium?: React.CSSProperties;
    headlineSmall?: React.CSSProperties;
    titleLarge?: React.CSSProperties;
    titleMedium?: React.CSSProperties;
    titleSmall?: React.CSSProperties;
    labelLarge?: React.CSSProperties;
    labelMedium?: React.CSSProperties;
    labelSmall?: React.CSSProperties;
    bodyLarge?: React.CSSProperties;
    bodyMedium?: React.CSSProperties;
    bodySmall?: React.CSSProperties;
  }

  interface Theme {
    opacities: {
      hover: number,
      focus: number,
      press: number,
      drag: number,
      disabled: number,
      disabledContainer: number
    };
  }

  interface ThemeOptions {
    opacities?: {
      hover?: number,
      focus?: number,
      press?: number,
      drag?: number,
      disabled?: number,
      disabledContainer?: number
    }
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    displayLarge: true,
    displayMedium: true,
    displaySmall: true,
    headlineLarge: true,
    headlineMedium: true,
    headlineSmall: true,
    titleLarge: true,
    titleMedium: true,
    titleSmall: true,
    labelLarge: true
    labelMedium: true,
    labelSmall: true,
    bodyLarge: true,
    bodyMedium: true,
    bodySmall: true
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
  },
  typography: {
    displayLarge: {
      lineHeight: "4rem",
      fontSize: "3.5625rem",
      fontWeight: "400",
      letterSpacing: "0"
    },
    displayMedium: {
      lineHeight: "3.25rem",
      fontSize: "2.8125rem",
      fontWeight: "400",
      letterSpacing: "0"
    },
    displaySmall: {
      lineHeight: "2.75rem",
      fontSize: "2.25rem",
      fontWeight: "400",
      letterSpacing: "0"
    },
    headlineLarge: {
      lineHeight: "2.5rem",
      fontSize: "2rem",
      fontWeight: "400",
      letterSpacing: "0"
    },
    headlineMedium: {
      lineHeight: "2.25rem",
      fontSize: "1.75rem",
      fontWeight: "400",
      letterSpacing: "0"
    },
    headlineSmall: {
      lineHeight: "2rem",
      fontSize: "1.5rem",
      fontWeight: "400",
      letterSpacing: "0"
    },
    titleLarge: {
      lineHeight: "1.75rem",
      fontSize: "1.375rem",
      fontWeight: "400",
      letterSpacing: "0"
    },
    titleMedium: {
      lineHeight: "1.5rem",
      fontSize: "1rem",
      fontWeight: "500",
      letterSpacing: "0.0094rem"
    },
    titleSmall: {
      lineHeight: "1.25rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      letterSpacing: "0.0071rem"
    },
    labelLarge: {
      lineHeight: "1.25rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      letterSpacing: "0.0071rem"
    },
    labelMedium: {
      lineHeight: "1rem",
      fontSize: "0.75rem",
      fontWeight: "500",
      letterSpacing: "0.0417rem"
    },
    labelSmall: {
      lineHeight: "0.375rem",
      fontSize: "0.6875rem",
      fontWeight: "500",
      letterSpacing: "0.0455rem"
    },
    bodyLarge: {
      lineHeight: "1.5rem",
      fontSize: "1rem",
      fontWeight: "400",
      letterSpacing: "0.0094rem"
    },
    bodyMedium: {
      lineHeight: "1.25rem",
      fontSize: "0.875rem",
      fontWeight: "400",
      letterSpacing: "0.0179rem"
    },
    bodySmall: {
      lineHeight: "1rem",
      fontSize: "0.75rem",
      fontWeight: "400",
      letterSpacing: "0.0333rem"
    }
  },
  opacities: {
    hover: 0.08,
    focus: 0.12,
    press: 0.12,
    drag: 0.16,
    disabled: 0.12,
    disabledContainer: 0.38
  }
});

export default theme;
