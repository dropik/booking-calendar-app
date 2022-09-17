import React, { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import BookingContext from "./context";
import ListItemText from "./ListItemText";

export default function Initials(): JSX.Element {
  const theme = useTheme();
  const booking = useContext(BookingContext);

  const nameSplit = booking.name.split(" ");
  const initials = nameSplit.length === 1 ?
    nameSplit[0][0].toLocaleUpperCase() :
    `${nameSplit[0][0].toLocaleUpperCase()}${nameSplit[1][0].toLocaleUpperCase()}`;

  return (
    <Box sx={{
      flexBasis: "4rem",
      pr: "1rem",
      pt: "0.375rem"
    }}>
      <ListItemText sx={{
        width: "4rem",
        height: "4rem",
        textAlign: "center",
        lineHeight: "4.5rem",
        borderRadius: "2rem",
        backgroundColor: theme.palette[`${booking.color}Container`].light
      }}>
        <Typography variant="headlineSmall">
          {initials}
        </Typography>
      </ListItemText>
    </Box>
  );
}
