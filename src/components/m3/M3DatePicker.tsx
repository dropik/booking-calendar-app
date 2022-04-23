import React from "react";
import { alpha } from "@mui/material/styles";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";

export default function M3DatePicker<TDate>({ ...props }: DatePickerProps<TDate>): JSX.Element {
  return (
    <DatePicker
      {...props}
      PaperProps={{
        sx: {
          backgroundColor: (theme) => theme.palette.surface.main,
          boxShadow: (theme) => theme.shadows[2],
          color: (theme) => theme.palette.onSurface.main,
          borderRadius: "0.25rem",
          "& .MuiDialogActions-root": {
            position: "absolute",
            pointerEvents: "none",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            backgroundColor: (theme) => theme.palette.surfaceTint.main,
            opacity: (theme) => theme.opacities.surface2
          },
          "& .MuiSvgIcon-root": {
            color: (theme) => theme.palette.onSurfaceVariant.main
          },
          "& div[role=presentation]": {
            overflow: "visible"
          },
          "& .MuiCalendarPicker-viewTransitionContainer": {
            borderTop: (theme) => `0.0625rem solid ${theme.palette.surfaceVariant.main}`
          },
          "& > div > div": {
            maxHeight: "22.4375rem",
            "& .MuiCalendarPicker-root": {
              maxHeight: "22.4375rem"
            }
          },
          "& .MuiButtonBase-root,button": {
            color: (theme) => theme.palette.onSurface.main,
            lineHeight: (theme) => theme.typography.labelLarge,
            fontSize: (theme) => theme.typography.labelLarge,
            fontWeight: (theme) => theme.typography.labelLarge,
            letterSpacing: (theme) => theme.typography.labelLarge,
            "&:hover": {
              backgroundColor: (theme) => alpha(theme.palette.onSurface.main, theme.opacities.hover)
            },
            "&.Mui-selected": {
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.onPrimary.main,
              "::before": {
                content: "' '",
                position: "absolute",
                pointerEvents: "none",
                borderRadius: "inherit",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: (theme) => theme.palette.onPrimary.main,
                opacity: 0
              },
              "&:hover": {
                boxShadow: (theme) => theme.shadows[1],
                backgroundColor: (theme) => theme.palette.primary.main,
                "::before": {
                  opacity: (theme) => theme.opacities.hover
                }
              },
              "&:focus": {
                backgroundColor: (theme) => theme.palette.primary.main,
              },
              "&:focus-visible": {
                boxShadow: (theme) => theme.shadows[0],
                backgroundColor: (theme) => theme.palette.primary.main,
                "::before": {
                  opacity: (theme) => theme.opacities.focus
                }
              },
              "&:active": {
                backgroundColor: (theme) => theme.palette.primary.main,
                "::before": {
                  opacity: (theme) => theme.opacities.hover
                }
              }
            }
          }
        }
      }}
    />
  );
}
