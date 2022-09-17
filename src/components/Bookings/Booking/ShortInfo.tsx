import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import BookingContext from "./context";
import ListItemText from "./ListItemText";

export default function ShortInfo(): JSX.Element {
  const booking = useContext(BookingContext);

  const formattedFrom = (new Date(booking.from)).toLocaleDateString();
  const formattedTo = (new Date(booking.to)).toLocaleDateString();

  return (
    <Stack spacing={0} sx={{
      flexGrow: 1,
      pt: "1rem",
      pb: "1rem"
    }}>
      <ListItemText>
        <Typography variant="titleMedium">{booking.name}</Typography>
      </ListItemText>
      <ListItemText>
        <Typography variant="bodySmall">{`${formattedFrom} - ${formattedTo}`}</Typography>
      </ListItemText>
    </Stack>
  );
}
