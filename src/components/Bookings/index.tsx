import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import * as Utils from "../../utils";
import { BookingShortData, fetchBookings } from "../../api";
import { useCurrentDate } from "../../redux/hooks";

import M3DatePicker from "../m3/M3DatePicker";

export default function Bookings(): JSX.Element {
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
          {bookings.map((booking) => (
            <NavLink key={booking.id} to={`/bookings/${booking.id}`}>
              {booking.name}
            </NavLink>
          ))}
        </Stack>
      </Stack>
      <Outlet />
    </Stack>
  );
}
