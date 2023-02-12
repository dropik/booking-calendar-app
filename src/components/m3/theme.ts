import React from "react";
import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material/styles";
import { argbFromHex, ColorGroup, hexFromArgb, Scheme, themeFromSourceColor } from "@material/material-color-utilities";

const INFO = 0;
const WARNING = 1;
const BOOKING1 = 2;
const BOOKING2 = 3;
const BOOKING3 = 4;
const BOOKING4 = 5;
const BOOKING5 = 6;
const BOOKING6 = 7;
const BOOKING7 = 8;
const BOOKING8 = 9;

const themeObj = themeFromSourceColor(argbFromHex("#35692A"), [
  {
    name: "info",
    value: argbFromHex("#02677D"),
    blend: true
  },
  {
    name: "warning",
    value: argbFromHex("#FF8344"),
    blend: true
  },
  {
    name: "booking1",
    value: argbFromHex("#CD3232"),
    blend: true
  },
  {
    name: "booking2",
    value: argbFromHex("#BF9740"),
    blend: true
  },
  {
    name: "booking3",
    value: argbFromHex("#B7BF40"),
    blend: true
  },
  {
    name: "booking4",
    value: argbFromHex("#68BF40"),
    blend: true
  },
  {
    name: "booking5",
    value: argbFromHex("#40BDBF"),
    blend: true
  },
  {
    name: "booking6",
    value: argbFromHex("#4086BF"),
    blend: true
  },
  {
    name: "booking7",
    value: argbFromHex("#4044BF"),
    blend: true
  },
  {
    name: "booking8",
    value: argbFromHex("#A640BF"),
    blend: true
  },
]);
const light = themeObj.schemes.light;
const dark = themeObj.schemes.dark;
type SchemeColors = keyof ReturnType<Scheme["toJSON"]>;
type CustomColors = keyof ColorGroup;

function makePalette(color: SchemeColors): PaletteColorOptions {
  return {
    main: hexFromArgb(light[color]),
    light: hexFromArgb(light[color]),
    dark: hexFromArgb(dark[color])
  };
}

function makeCustomPalette(id: number, color: CustomColors): PaletteColorOptions {
  return {
    main: hexFromArgb(themeObj.customColors[id].light[color]),
    light: hexFromArgb(themeObj.customColors[id].light[color]),
    dark: hexFromArgb(themeObj.customColors[id].dark[color])
  };
}

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
    emphasized: string;
    emphasizedAccelerate: string;
    emphasizedDecelerate: string;
  }

  interface Duration {
    medium3: number;
    medium4: number;
    long1: number;
    long2: number;
    long3: number;
    long4: number;
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

const theme = createTheme({
  palette: {
    primary:              makePalette("primary"),
    onPrimary:            makePalette("onPrimary"),
    primaryContainer:     makePalette("primaryContainer"),
    onPrimaryContainer:   makePalette("onPrimaryContainer"),

    secondary:            makePalette("secondary"),
    onSecondary:          makePalette("onSecondary"),
    secondaryContainer:   makePalette("secondaryContainer"),
    onSecondaryContainer: makePalette("onSecondaryContainer"),

    tertiary:             makePalette("tertiary"),
    onTertiary:           makePalette("onTertiary"),
    tertiaryContainer:    makePalette("tertiaryContainer"),
    onTertiaryContainer:  makePalette("onTertiaryContainer"),

    success:              makePalette("primary"),
    onSuccess:            makePalette("onPrimary"),
    successContainer:     makePalette("primaryContainer"),
    onSuccessContainer:   makePalette("onPrimaryContainer"),

    info:                 makeCustomPalette(INFO, "color"),
    onInfo:               makeCustomPalette(INFO, "onColor"),
    infoContainer:        makeCustomPalette(INFO, "colorContainer"),
    onInfoContainer:      makeCustomPalette(INFO, "onColorContainer"),

    error:                makePalette("error"),
    onError:              makePalette("onError"),
    errorContainer:       makePalette("errorContainer"),
    onErrorContainer:     makePalette("onErrorContainer"),

    warning:              makeCustomPalette(WARNING, "color"),
    onWarning:            makeCustomPalette(WARNING, "onColor"),
    warningContainer:     makeCustomPalette(WARNING, "colorContainer"),
    onWarningContainer:   makeCustomPalette(WARNING, "onColorContainer"),

    booking1:             makeCustomPalette(BOOKING1, "color"),
    onBooking1:           makeCustomPalette(BOOKING1, "onColor"),
    booking1Container:    makeCustomPalette(BOOKING1, "colorContainer"),
    onBooking1Container:  makeCustomPalette(BOOKING1, "onColorContainer"),

    booking2:             makeCustomPalette(BOOKING2, "color"),
    onBooking2:           makeCustomPalette(BOOKING2, "onColor"),
    booking2Container:    makeCustomPalette(BOOKING2, "colorContainer"),
    onBooking2Container:  makeCustomPalette(BOOKING2, "onColorContainer"),

    booking3:             makeCustomPalette(BOOKING3, "color"),
    onBooking3:           makeCustomPalette(BOOKING3, "onColor"),
    booking3Container:    makeCustomPalette(BOOKING3, "colorContainer"),
    onBooking3Container:  makeCustomPalette(BOOKING3, "onColorContainer"),

    booking4:             makeCustomPalette(BOOKING4, "color"),
    onBooking4:           makeCustomPalette(BOOKING4, "onColor"),
    booking4Container:    makeCustomPalette(BOOKING4, "colorContainer"),
    onBooking4Container:  makeCustomPalette(BOOKING4, "onColorContainer"),

    booking5:             makeCustomPalette(BOOKING5, "color"),
    onBooking5:           makeCustomPalette(BOOKING5, "onColor"),
    booking5Container:    makeCustomPalette(BOOKING5, "colorContainer"),
    onBooking5Container:  makeCustomPalette(BOOKING5, "onColorContainer"),

    booking6:             makeCustomPalette(BOOKING6, "color"),
    onBooking6:           makeCustomPalette(BOOKING6, "onColor"),
    booking6Container:    makeCustomPalette(BOOKING6, "colorContainer"),
    onBooking6Container:  makeCustomPalette(BOOKING6, "onColorContainer"),

    booking7:             makeCustomPalette(BOOKING7, "color"),
    onBooking7:           makeCustomPalette(BOOKING7, "onColor"),
    booking7Container:    makeCustomPalette(BOOKING7, "colorContainer"),
    onBooking7Container:  makeCustomPalette(BOOKING7, "onColorContainer"),

    booking8:             makeCustomPalette(BOOKING8, "color"),
    onBooking8:           makeCustomPalette(BOOKING8, "onColor"),
    booking8Container:    makeCustomPalette(BOOKING8, "colorContainer"),
    onBooking8Container:  makeCustomPalette(BOOKING8, "onColorContainer"),

    colorBackground: makePalette("background"),
    onBackground: makePalette("onBackground"),
    surface: makePalette("surface"),
    onSurface: makePalette("onSurface"),
    surfaceVariant: makePalette("surfaceVariant"),
    onSurfaceVariant: makePalette("onSurfaceVariant"),
    outline: makePalette("outline"),
    shadow: makePalette("shadow"),
    surfaceTint: makePalette("primary"),
    inverseSurface: makePalette("inverseSurface"),
    inverseOnSurface: makePalette("inverseOnSurface"),
    inversePrimary: makePalette("inversePrimary"),
    background: {
      default: hexFromArgb(themeObj.palettes.neutral.tone(99)),
      paper: hexFromArgb(themeObj.palettes.neutral.tone(99))
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
      emphasized: "cubic-bezier(0.61, -0.02, 0.11, 0.94)",
      emphasizedAccelerate: "cubic-bezier(0.3, 0, 0.8, 0.15)",
      emphasizedDecelerate: "cubic-bezier(0.05, 0.7, 0.1, 1)",
    },
    duration: {
      medium3: 350,
      medium4: 400,
      long1: 450,
      long2: 500,
      long3: 550,
      long4: 600,
    }
  }
});

export default theme;
