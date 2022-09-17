import React, { useContext } from "react";
import Typography from "@mui/material/Typography";

import BookingContext from "./context";
import ListItemText from "./ListItemText";

export default function RoomsCount(): JSX.Element {
  const booking = useContext(BookingContext);

  return (
    <ListItemText sx={{
      flexShrink: 1,
      textAlign: "right",
      paddingTop: "1rem"
    }}>
      <Typography variant="bodySmall">
        {`${booking.occupations} stanz${booking.occupations === 1 ? "a" : "e"}`}
      </Typography>
    </ListItemText>
  );
}
