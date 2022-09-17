import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { BookingShortData } from "../../../api";

import BookingContext from "./context";
import M3ListItemButton from "../../m3/M3ListItemButton";
import M3NavLink from "../../m3/M3NavLink";
import BookingsListItemText from "./BookingsListItemText";
import ShortInfo from "./ShortInfo";
import RoomsCount from "./RoomsCount";

type BookingProps = {
  booking: BookingShortData
};

export default function Booking({ booking }: BookingProps): JSX.Element {
  const theme = useTheme();

  const nameSplit = booking.name.split(" ");
  const initials = nameSplit.length === 1 ?
    nameSplit[0][0].toLocaleUpperCase() :
    `${nameSplit[0][0].toLocaleUpperCase()}${nameSplit[1][0].toLocaleUpperCase()}`;

  return (
    <BookingContext.Provider value={booking}>
      <M3NavLink to={`/bookings/${booking.id}`}>
        {({ isActive }) => (
          <M3ListItemButton selected={isActive} sx={{
            height: "4.75rem",
            justifyContent: "space-between",
            alignItems: "flex-start",
            borderRadius: "0.75rem"
          }}>
            <Box sx={{
              flexBasis: "4rem",
              pr: "1rem",
              pt: "0.375rem"
            }}>
              <BookingsListItemText sx={{
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
              </BookingsListItemText>
            </Box>
            <ShortInfo />
            <RoomsCount />
          </M3ListItemButton>
        )}
      </M3NavLink>
    </BookingContext.Provider>
  );
}
