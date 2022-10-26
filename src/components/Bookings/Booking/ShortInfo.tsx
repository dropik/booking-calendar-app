import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import BookingContext from "./context";
import ListItemText from "./ListItemText";
import { evaluateEntitiesInString } from "../../../utils";

export default function ShortInfo(): JSX.Element {
  const booking = useContext(BookingContext);

  const formattedFrom = (new Date(booking.from)).toLocaleDateString();
  const formattedTo = (new Date(booking.to)).toLocaleDateString();

  return (
    <Stack sx={{
      flexGrow: 1,
      pt: "1rem",
      pb: "1rem"
    }}>
      <ListItemText>
        <Typography variant="titleMedium">{evaluateEntitiesInString(booking.name)}</Typography>
      </ListItemText>
      <ListItemText>
        <Typography variant="bodySmall">{`${formattedFrom} - ${formattedTo}`}</Typography>
      </ListItemText>
    </Stack>
  );
}
