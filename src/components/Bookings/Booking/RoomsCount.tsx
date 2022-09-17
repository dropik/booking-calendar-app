import React from "react";
import Typography from "@mui/material/Typography";

import { BookingShortData } from "../../../api";

import BookingsListItemText from "./BookingsListItemText";

type RoomsCountProps = {
  booking: BookingShortData
};

export default function RoomsCount({ booking }: RoomsCountProps): JSX.Element {
  return (
    <BookingsListItemText sx={{
      flexShrink: 1,
      textAlign: "right",
      paddingTop: "1rem"
    }}>
      <Typography variant="bodySmall">
        {`${booking.occupations} stanz${booking.occupations === 1 ? "a" : "e"}`}
      </Typography>
    </BookingsListItemText>
  );
}
