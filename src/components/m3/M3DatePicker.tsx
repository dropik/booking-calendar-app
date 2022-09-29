import React from "react";
import { alpha, useTheme } from "@mui/material/styles";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";

export default function M3DatePicker<TInputDate, TDate>({ ...props }: DatePickerProps<TInputDate, TDate>): JSX.Element {
  const theme = useTheme();

  return (
    <DatePicker
      {...props}
      PaperProps={{
        elevation: 2,
        sx: {
          backgroundColor: theme.palette.surface.main,
          color: theme.palette.onSurface.main,
          borderRadius: "0.25rem",
          "::after": {
            content: "' '",
            pointerEvents: "none",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: theme.palette.primary.light,
            opacity: theme.opacities.surface2,
            borderRadius: "0.25rem",
            zIndex: 9999
          },
          "& .MuiSvgIcon-root": {
            color: theme.palette.onSurfaceVariant.main
          },
          "& .MuiCalendarPicker-viewTransitionContainer": {
            borderTop: `0.0625rem solid ${theme.palette.surfaceVariant.main}`
          },
          "& > div > div": {
            maxHeight: "22.4375rem",
            "& .MuiCalendarPicker-root": {
              maxHeight: "22.4375rem"
            }
          },
          "& .MuiButtonBase-root,button": {
            color: theme.palette.onSurface.main,
            lineHeight: theme.typography.labelLarge,
            fontSize: theme.typography.labelLarge,
            fontWeight: theme.typography.labelLarge,
            letterSpacing: theme.typography.labelLarge,
            "&:hover": {
              backgroundColor: alpha(theme.palette.onSurface.main, theme.opacities.hover)
            },
            "&.Mui-disabled": {
              color: theme.palette.onSurface.light,
              opacity: 0.38
            },
            "&.Mui-selected": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.onPrimary.main,
              "&:hover": {
                boxShadow: theme.shadows[1],
                backgroundColor: theme.palette.primary.main
              },
              "&:focus": {
                backgroundColor: theme.palette.primary.main
              },
              "&:focus-visible": {
                boxShadow: theme.shadows[0],
                backgroundColor: theme.palette.primary.main
              },
              "&:active": {
                backgroundColor: theme.palette.primary.main
              }
            }
          }
        }
      }}
    />
  );
}
