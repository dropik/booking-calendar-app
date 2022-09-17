import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import * as Utils from "../../utils";
import { BookingShortData, fetchBookings } from "../../api";
import { useCurrentDate } from "../../redux/hooks";
import { TileColor } from "../../redux/tilesSlice";

import M3DatePicker from "../m3/M3DatePicker";
import M3NavLink from "../m3/M3NavLink";
import M3ListItemButton from "../m3/M3ListItemButton";
import BookingsListItemText from "./BookingsListItemText";

export default function Bookings(): JSX.Element {
  const theme = useTheme();
  const currentDate = useCurrentDate();
  const [from, setFrom] = useState(currentDate);
  const [to, setTo] = useState(Utils.getDateShift(currentDate, 1));
  const [name, setName] = useState("");
  const [bookings, setBookings] = useState<BookingShortData[]>([]);
  const [isFromValid, setIsFromValid] = useState(true);
  const [isToValid, setIsToValid] = useState(true);

  const isValid = isFromValid && isToValid;

  useEffect(() => {
    let subscribed = true;

    async function fetchData() {
      if (isValid) {
        const response = await fetchBookings(name, from, to);
        if (subscribed) {
          setBookings(response.data);
        }
      }
    }

    fetchData();

    return () => { subscribed = false; };
  }, [name, from, to, isValid]);

  return (
    <Stack spacing={2} direction="row" sx={{ pl: "1rem", pr: "1rem" }}>
      <Stack spacing={0} sx={{ width: "25rem" }}>
        <Stack spacing={1} sx={{ pt: "1rem", pb: "1rem" }}>
          <Stack spacing={1} direction="row">
            <M3DatePicker
              value={new Date(from)}
              onChange={(date: Date | null) => {
                if (date) {
                  setFrom(Utils.dateToString(date));
                  setIsFromValid(false);
                }
              }}
              onAccept={() => setIsFromValid(true)}
              onError={(reason) => setIsFromValid(reason === null)}
              renderInput={({ error, ...props }) => (
                <TextField
                  {...props}
                  id="from"
                  label="Dal"
                  onBlur={() => setIsFromValid(!error)}
                  error={error}
                  helperText={error ? "Periodo non valido" : null}
                />
              )}
              shouldDisableDate={(date) => {
                return Utils.daysBetweenDates(Utils.dateToString(date), to) < 0;
              }}
            />
            <M3DatePicker
              value={new Date(to)}
              onChange={(date: Date | null) => {
                if (date) {
                  setTo(Utils.dateToString(date));
                  setIsToValid(false);
                }
              }}
              onAccept={() => setIsToValid(true)}
              onError={(reason) => setIsToValid(reason === null)}
              renderInput={({ error, ...props }) => (
                <TextField
                  {...props}
                  id="to"
                  label="Al"
                  onBlur={() => setIsToValid(!error)}
                  error={error}
                  helperText={error ? "Periodo non valido" : null}
                />
              )}
              shouldDisableDate={(date) => {
                return Utils.daysBetweenDates(from, Utils.dateToString(date)) < 0;
              }}
            />
          </Stack>
          <TextField id="name" label="Nome" onChange={(event) => { setName(event.target.value); }} />
        </Stack>
        <Stack spacing={0}>
          {bookings.map((booking) => {
            const nameSplit = booking.name.split(" ");
            const initials = nameSplit.length === 1 ?
              nameSplit[0][0].toLocaleUpperCase() :
              `${nameSplit[0][0].toLocaleUpperCase()}${nameSplit[1][0].toLocaleUpperCase()}`;

            return (
              <M3NavLink key={booking.id} to={`/bookings/${booking.id}`}>
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
                        backgroundColor: theme.palette[`${booking.color}Container` as `${TileColor}Container`].light
                      }}>
                        <Typography variant="headlineSmall">
                          {initials}
                        </Typography>
                      </BookingsListItemText>
                    </Box>
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
                    <BookingsListItemText sx={{
                      flexShrink: 1,
                      textAlign: "right",
                      paddingTop: "1rem"
                    }}>
                      <Typography variant="bodySmall">
                        {`${booking.occupations} stanz${booking.occupations === 1 ? "a" : "e"}`}
                      </Typography>
                    </BookingsListItemText>
                  </M3ListItemButton>
                )}
              </M3NavLink>
            );
          })}
        </Stack>
      </Stack>
      <Outlet />
    </Stack>
  );
}
