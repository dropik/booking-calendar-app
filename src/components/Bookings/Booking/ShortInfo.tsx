import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import BookingContext from "./context";
import BookingsListItemText from "./BookingsListItemText";

export default function ShortInfo(): JSX.Element {
  const booking = useContext(BookingContext);

  return (
    <Stack spacing={0} sx={{
      flexGrow: 1,
      pt: "1rem",
      pb: "1rem"
    }}>
      <BookingsListItemText>
        <Typography variant="titleMedium">{booking.name}</Typography>
      </BookingsListItemText>
      <BookingsListItemText>
        <Typography variant="bodySmall">{`${booking.from} - ${booking.to}`}</Typography>
      </BookingsListItemText>
    </Stack>
  );
}
