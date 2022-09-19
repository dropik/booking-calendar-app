import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useAppSelector } from "../../redux/hooks";
import Definer from "../Definer";

export default function BookingDetailsHeader(): JSX.Element {
  const data = useAppSelector((state) => state.booking.data);
  const theme = useTheme();

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
        backgroundColor: theme.palette.surfaceVariant.light,
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
      </Stack>
    </Box>
  );
}
