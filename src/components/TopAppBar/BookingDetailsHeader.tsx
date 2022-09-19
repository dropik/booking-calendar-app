import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useAppSelector } from "../../redux/hooks";
import Definer from "../Definer";
import { SurfaceTint } from "../m3/Tints";

export default function BookingDetailsHeader(): JSX.Element {
  const { data, scrollTop } = useAppSelector((state) => state.booking);
  const theme = useTheme();

  const showTint = scrollTop > 0;

  return (
    <Box sx={{
      flexGrow: 1,
      display: "flex",
      flexDirection: "column-reverse",
      justifyContent: "flex-start",
      pr: "1rem"
    }}>
      <Stack spacing={0} sx={{
        height: "4rem",
        position: "relative",
        backgroundColor: theme.palette.surfaceVariant.light,
        color: theme.palette.onSurfaceVariant.light,
        borderTopRightRadius: "0.75rem",
        borderTopLeftRadius: "0.75rem",
        justifyContent: "center",
        pr: "1rem",
        pl: "1rem"
      }}>
        <Definer value={data}>
          {(booking) => {
            const formattedFrom = (new Date(booking.from)).toLocaleDateString();
            const formattedTo = (new Date(booking.to)).toLocaleDateString();
            const periodStr = `${formattedFrom} - ${formattedTo}`;

            return (
              <>
                <Typography variant="titleMedium">{booking.name}</Typography>
                <Typography variant="bodySmall">{periodStr}</Typography>
              </>
            );
          }}
        </Definer>
        <SurfaceTint sx={{
          backgroundColor: theme.palette.primary.light,
          opacity: 0,
          transition: theme.transitions.create(["opacity"], {
            easing: theme.transitions.easing.fastOutSlowIn,
            duration: theme.transitions.duration.standard
          }),
          ...(showTint && {
            opacity: theme.opacities.surface2
          })
        }} />
      </Stack>
    </Box>
  );
}
