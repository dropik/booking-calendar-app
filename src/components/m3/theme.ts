import React from "react";
import { createTheme, PaletteColor, PaletteColorOptions, recomposeColor, rgbToHex } from "@mui/material/styles";
import { lab2rgb } from "rgb-lab";

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

    onSuccess: Palette["success"];
    successContainer: Palette["success"];
    onSuccessContainer: Palette["success"];

    onInfo: Palette["info"];
    infoContainer: Palette["info"];
    onInfoContainer: Palette["info"];

    onError: Palette["error"];
    errorContainer: Palette["error"];
    onErrorContainer: Palette["error"];

    onWarning: Palette["warning"];
    warningContainer: Palette["warning"];
    onWarningContainer: Palette["warning"];

    booking1: Palette["primary"];
    onBooking1: Palette["booking1"];
    booking1Container: Palette["booking1"];
    onBooking1Container: Palette["booking1"];

    booking2: Palette["primary"];
    onBooking2: Palette["booking2"];
    booking2Container: Palette["booking2"];
    onBooking2Container: Palette["booking2"];

    booking3: Palette["primary"];
    onBooking3: Palette["booking3"];
    booking3Container: Palette["booking3"];
    onBooking3Container: Palette["booking3"];

    booking4: Palette["primary"];
    onBooking4: Palette["booking4"];
    booking4Container: Palette["booking4"];
    onBooking4Container: Palette["booking4"];

    booking5: Palette["primary"];
    onBooking5: Palette["booking5"];
    booking5Container: Palette["booking5"];
    onBooking5Container: Palette["booking5"];

    booking6: Palette["primary"];
    onBooking6: Palette["booking6"];
    booking6Container: Palette["booking6"];
    onBooking6Container: Palette["booking6"];

    booking7: Palette["primary"];
    onBooking7: Palette["booking7"];
    booking7Container: Palette["booking7"];
    onBooking7Container: Palette["booking7"];

    booking8: Palette["primary"];
    onBooking8: Palette["booking8"];
    booking8Container: Palette["booking8"];
    onBooking8Container: Palette["booking8"];

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

  type ThemePalettes = {
    [key in keyof Palette]: Palette[key] extends PaletteColor ? key : never
  }[keyof Palette];

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

    onSuccess?: PaletteOptions["success"];
    successContainer?: PaletteOptions["success"];
    onSuccessContainer?: PaletteOptions["success"];

    onInfo?: PaletteOptions["info"];
    infoContainer?: PaletteOptions["info"];
    onInfoContainer?: PaletteOptions["info"];

    onError?: PaletteOptions["error"];
    errorContainer?: PaletteOptions["error"];
    onErrorContainer?: PaletteOptions["error"];

    onWarning?: PaletteOptions["warning"];
    warningContainer?: PaletteOptions["warning"];
    onWarningContainer?: PaletteOptions["warning"];

    booking1?: PaletteOptions["primary"];
    onBooking1?: PaletteOptions["booking1"];
    booking1Container?: PaletteOptions["booking1"];
    onBooking1Container?: PaletteOptions["booking1"];

    booking2?: PaletteOptions["primary"];
    onBooking2?: PaletteOptions["booking2"];
    booking2Container?: PaletteOptions["booking2"];
    onBooking2Container?: PaletteOptions["booking2"];

    booking3?: PaletteOptions["primary"];
    onBooking3?: PaletteOptions["booking3"];
    booking3Container?: PaletteOptions["booking3"];
    onBooking3Container?: PaletteOptions["booking3"];

    booking4?: PaletteOptions["primary"];
    onBooking4?: PaletteOptions["booking4"];
    booking4Container?: PaletteOptions["booking4"];
    onBooking4Container?: PaletteOptions["booking4"];

    booking5?: PaletteOptions["primary"];
    onBooking5?: PaletteOptions["booking5"];
    booking5Container?: PaletteOptions["booking5"];
    onBooking5Container?: PaletteOptions["booking5"];

    booking6?: PaletteOptions["primary"];
    onBooking6?: PaletteOptions["booking6"];
    booking6Container?: PaletteOptions["booking6"];
    onBooking6Container?: PaletteOptions["booking6"];

    booking7?: PaletteOptions["primary"];
    onBooking7?: PaletteOptions["booking7"];
    booking7Container?: PaletteOptions["booking7"];
    onBooking7Container?: PaletteOptions["booking7"];

    booking8?: PaletteOptions["primary"];
    onBooking8?: PaletteOptions["booking8"];
    booking8Container?: PaletteOptions["booking8"];
    onBooking8Container?: PaletteOptions["booking8"];

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

  interface Easing {
    fastOutSlowIn: string;
  }

  interface Duration {
    long: number
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

const makeColor: (keyColor: (luminance: number) => string) => PaletteColorOptions = (keyColor) => ({
  main: keyColor(40),
  light: keyColor(40),
  dark: keyColor(80)
});

const makeOnColor: (keyColor: (luminance: number) => string) => PaletteColorOptions = (keyColor) => ({
  main: keyColor(100),
  light: keyColor(100),
  dark: keyColor(20)
});

const makeColorContainer: (keyColor: (luminance: number) => string) => PaletteColorOptions = (keyColor) => ({
  main: keyColor(90),
  light: keyColor(90),
  dark: keyColor(30)
});

const makeOnColorContainer: (keyColor: (luminance: number) => string) => PaletteColorOptions = (keyColor) => ({
  main: keyColor(10),
  light: keyColor(10),
  dark: keyColor(90)
});

const assembleColor: (luminance: number, a: number, b: number) => string = (luminance, a, b) =>
  rgbToHex(recomposeColor({
    type: "rgb",
    values: lab2rgb([luminance, a, b]),
    colorSpace: "srgb"
  }));

const primary: (luminance: number) => string = (luminance) =>
  assembleColor(luminance, -31, 36);

const secondary: (luminance: number) => string = (luminance) =>
  assembleColor(luminance, -10, 11);

const tertiary: (luminance: number) => string = (luminance) =>
  assembleColor(luminance, -15, -5);

const success = primary;

const info: (luminance: number) => string = (luminance) =>
  assembleColor(luminance, -17, -19);

const error: (luminance: number) => string = (luminance) =>
  assembleColor(luminance, 60, 43);

const warning: (luminance: number) => string = (luminance) =>
  assembleColor(luminance, 56, 61);

const neutral: (luminance: number) => string = (luminance) =>
  assembleColor(luminance, -2, 3);

const neutralVariant: (luminance: number) => string = (luminance) =>
  assembleColor(luminance, -4, 6);

const booking1: (luminance: number) => string = (luminance) =>
  assembleColor(luminance, 31, 13);

const booking2: (luminance: number) => string = (luminance) =>
  assembleColor(luminance, -3, 33);

const booking3: (luminance: number) => string = (luminance) =>
  assembleColor(luminance, -17, 29);

const booking4: (luminance: number) => string = (luminance) =>
  assembleColor(luminance, -29, 26);

const booking5: (luminance: number) => string = (luminance) =>
  assembleColor(luminance, -18, -6);

const booking6: (luminance: number) => string = (luminance) =>
  assembleColor(luminance, -5, -25);

const booking7: (luminance: number) => string = (luminance) =>
  assembleColor(luminance, 20, -39);

const booking8: (luminance: number) => string = (luminance) =>
  assembleColor(luminance, 34, -28);

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

    success:             makeColor(success),
    onSuccess:           makeOnColor(success),
    successContainer:    makeColorContainer(success),
    onSuccessContainer:  makeOnColorContainer(success),

    info:             makeColor(info),
    onInfo:           makeOnColor(info),
    infoContainer:    makeColorContainer(info),
    onInfoContainer:  makeOnColorContainer(info),

    error:            makeColor(error),
    onError:          makeOnColor(error),
    errorContainer:   makeColorContainer(error),
    onErrorContainer: makeOnColorContainer(error),

    warning:             makeColor(warning),
    onWarning:           makeOnColor(warning),
    warningContainer:    makeColorContainer(warning),
    onWarningContainer:  makeOnColorContainer(warning),

    booking1: makeColor(booking1),
    onBooking1: makeOnColor(booking1),
    booking1Container: makeColorContainer(booking1),
    onBooking1Container: makeOnColorContainer(booking1),

    booking2: makeColor(booking2),
    onBooking2: makeOnColor(booking2),
    booking2Container: makeColorContainer(booking2),
    onBooking2Container: makeOnColorContainer(booking2),

    booking3: makeColor(booking3),
    onBooking3: makeOnColor(booking3),
    booking3Container: makeColorContainer(booking3),
    onBooking3Container: makeOnColorContainer(booking3),

    booking4: makeColor(booking4),
    onBooking4: makeOnColor(booking4),
    booking4Container: makeColorContainer(booking4),
    onBooking4Container: makeOnColorContainer(booking4),

    booking5: makeColor(booking5),
    onBooking5: makeOnColor(booking5),
    booking5Container: makeColorContainer(booking5),
    onBooking5Container: makeOnColorContainer(booking5),

    booking6: makeColor(booking6),
    onBooking6: makeOnColor(booking6),
    booking6Container: makeColorContainer(booking6),
    onBooking6Container: makeOnColorContainer(booking6),

    booking7: makeColor(booking7),
    onBooking7: makeOnColor(booking7),
    booking7Container: makeColorContainer(booking7),
    onBooking7Container: makeOnColorContainer(booking7),

    booking8: makeColor(booking8),
    onBooking8: makeOnColor(booking8),
    booking8Container: makeColorContainer(booking8),
    onBooking8Container: makeOnColorContainer(booking8),

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

  drawerWidth: "22.5rem",

  transitions: {
    easing: {
      fastOutSlowIn: "cubic-bezier(1, 0.1, 0, 1)"
    },
    duration: {
      long: 800
    }
  }
});

export default theme;
