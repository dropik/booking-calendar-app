import React from "react";
import { alpha, useTheme } from "@mui/material/styles";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";

export default function M3DatePicker<TDate>({ ...props }: DatePickerProps<TDate>): JSX.Element {
  const theme = useTheme();

  return (
    <DatePicker
      {...props}
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.surface.main,
          boxShadow: theme.shadows[2],
          color: theme.palette.onSurface.main,
          borderRadius: "0.25rem",
          "& .MuiDialogActions-root": {
            position: "absolute",
            pointerEvents: "none",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            backgroundColor: theme.palette.surfaceTint.main,
            opacity: theme.opacities.surface2
          },
          "& .MuiSvgIcon-root": {
            color: theme.palette.onSurfaceVariant.main
          },
          "& div[role=presentation]": {
            overflow: "visible"
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
            "&.Mui-selected": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.onPrimary.main,
              "::before": {
                content: "' '",
                position: "absolute",
                pointerEvents: "none",
                borderRadius: "inherit",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: theme.palette.onPrimary.main,
                opacity: 0
              },
              "&:hover": {
                boxShadow: theme.shadows[1],
                backgroundColor: theme.palette.primary.main,
                "::before": {
                  opacity: theme.opacities.hover
                }
              },
              "&:focus": {
                backgroundColor: theme.palette.primary.main,
              },
              "&:focus-visible": {
                boxShadow: theme.shadows[0],
                backgroundColor: theme.palette.primary.main,
                "::before": {
                  opacity: theme.opacities.focus
                }
              },
              "&:active": {
                backgroundColor: theme.palette.primary.main,
                "::before": {
                  opacity: theme.opacities.hover
                }
              }
            }
          }
        }
      }}
    />
  );
}
