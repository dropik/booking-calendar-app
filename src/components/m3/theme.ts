import React from "react";
import { createTheme, hslToRgb, PaletteColor, PaletteColorOptions, recomposeColor, rgbToHex } from "@mui/material/styles";

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

    colorBackground: Palette["secondary"];
    onBackground: Palette["colorBackground"];
    surface: Palette["colorBackground"];
    onSurface: Palette["colorBackground"];

    surfaceVariant: Palette["colorBackground"];
    onSurfaceVariant: Palette["colorBackground"];
    outline: Palette["colorBackground"];

    shadow: Palette["colorBackground"];
    surfaceTint: Palette["primary"];
    inverseSurface: Palette["colorBackground"];
    inverseOnSurface: Palette["colorBackground"];
    inversePrimary: Palette["primary"];
  }

  type ThemePalettes = keyof Pick<Palette, {
    [key in keyof Palette]: Palette[key] extends PaletteColor ? key : never
  }[keyof Palette]>;

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

    colorBackground?: PaletteOptions["secondary"];
    onBackground?: PaletteOptions["colorBackground"];
    surface?: PaletteOptions["colorBackground"];
    onSurface?: PaletteOptions["colorBackground"];

    surfaceVariant?: PaletteOptions["colorBackground"];
    onSurfaceVariant?: PaletteOptions["colorBackground"];
    outline?: PaletteOptions["colorBackground"];

    shadow?: PaletteOptions["colorBackground"];
    surfaceTint?: PaletteOptions["primary"];
    inverseSurface?: PaletteOptions["colorBackground"];
    inverseOnSurface?: PaletteOptions["colorBackground"];
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
      disabledContainer: number,
      surface1: number,
      surface2: number,
      surface3: number,
      surface4: number,
      surface5: number
    };

    drawerWidth: string;
  }

  interface ThemeOptions {
    opacities?: {
      hover?: number,
      focus?: number,
      press?: number,
      drag?: number,
      disabled?: number,
      disabledContainer?: number,
      surface1?: number,
      surface2?: number,
      surface3?: number,
      surface4?: number,
      surface5?: number
    };

    drawerWidth?: string;
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

const makeColor: (keyColor: (luminosity: number) => string) => PaletteColorOptions = (keyColor) => ({
  main: keyColor(40),
  light: keyColor(40),
  dark: keyColor(80)
});

const makeOnColor: (keyColor: (luminosity: number) => string) => PaletteColorOptions = (keyColor) => ({
  main: keyColor(100),
  light: keyColor(100),
  dark: keyColor(20)
});

const makeColorContainer: (keyColor: (luminosity: number) => string) => PaletteColorOptions = (keyColor) => ({
  main: keyColor(90),
  light: keyColor(90),
  dark: keyColor(30)
});

const makeOnColorContainer: (keyColor: (luminosity: number) => string) => PaletteColorOptions = (keyColor) => ({
  main: keyColor(10),
  light: keyColor(10),
  dark: keyColor(90)
});

const assembleColor: (hue: number, saturation: number, luminosity: number) => string = (hue, saturation, luminosity) =>
  rgbToHex(hslToRgb(recomposeColor({
    type: "hsl",
    values: [hue, saturation, luminosity]
  })));

const primary: (luminosity: number) => string = (luminosity) =>
  assembleColor(219, 93, luminosity);

const secondary: (luminosity: number) => string = (luminosity) =>
  assembleColor(193, 68, luminosity);

const tertiary: (luminosity: number) => string = (luminosity) =>
  assembleColor(73, 98, luminosity);

const error: (luminosity: number) => string = (luminosity) =>
  assembleColor(13, 89, luminosity);

const neutral: (luminosity: number) => string = (luminosity) =>
  assembleColor(212, 13, luminosity);

const neutralVariant: (luminosity: number) => string = (luminosity) =>
  assembleColor(203, 9, luminosity);

const theme = createTheme({
  palette: {
    primary:            makeColor(primary),
    onPrimary:          makeOnColor(primary),
    primaryContainer:   makeColorContainer(primary),
    onPrimaryContainer: makeOnColorContainer(primary),

    secondary:            makeColor(secondary),
    onSecondary:          makeOnColor(secondary),
    secondaryContainer:   makeColorContainer(secondary),
    onSecondaryContainer: makeOnColorContainer(secondary),

    tertiary:             makeColor(tertiary),
    onTertiary:           makeOnColor(tertiary),
    tertiaryContainer:    makeColorContainer(tertiary),
    onTertiaryContainer:  makeOnColorContainer(tertiary),

    error:            makeColor(error),
    onError:          makeOnColor(error),
    errorContainer:   makeColorContainer(error),
    onErrorContainer: makeOnColorContainer(error),

    colorBackground: {
      main: neutral(99),
      light: neutral(99),
      dark: neutral(10)
    },
    onBackground: {
      main: neutral(10),
      light: neutral(10),
      dark: neutral(90)
    },
    surface: {
      main: neutral(99),
      light: neutral(99),
      dark: neutral(10)
    },
    onSurface: {
      main: neutral(10),
      light: neutral(10),
      dark: neutral(90)
    },

    surfaceVariant: {
      main: neutralVariant(90),
      light: neutralVariant(90),
      dark: neutralVariant(30)
    },
    onSurfaceVariant: {
      main: neutralVariant(30),
      light: neutralVariant(30),
      dark: neutralVariant(80)
    },
    outline: {
      main: neutralVariant(50),
      light: neutralVariant(50),
      dark: neutralVariant(60)
    },

    shadow: {
      main: neutral(0),
      light: neutral(0),
      dark: neutral(0)
    },
    surfaceTint: {
      main: primary(40),
      light: primary(40),
      dark: primary(80)
    },
    inverseSurface: {
      main: neutral(20),
      light: neutral(20),
      dark: neutral(90)
    },
    inverseOnSurface: {
      main: neutral(95),
      light: neutral(95),
      dark: neutral(20)
    },
    inversePrimary: {
      main: primary(80),
      light: primary(80),
      dark: primary(40)
    },
    background: {
      default: neutral(99),
      paper: neutral(99)
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
    disabledContainer: 0.38,
    surface1: 0.05,
    surface2: 0.08,
    surface3: 0.11,
    surface4: 0.12,
    surface5: 0.14
  },

  drawerWidth: "22.5rem"
});

export default theme;
