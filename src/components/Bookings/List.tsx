/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { BookingShort as BookingShortResponse, ColorAssignments, api, fetchBookings } from "../../api";
import { useAppDispatch } from "../../redux/hooks";
import { show as showMessage } from "../../redux/snackbarMessageSlice";

import Booking from "./Booking";
import Skeleton from "./Skeleton";
import { TileColor } from "../../redux/tilesSlice";

export type BookingShort = Required<BookingShortResponse>;

type ListProps = {
  name: string,
  from: string,
  to: string,
  isValid: boolean
}

export default function List({ name, from, to, isValid }: ListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [bookings, setBookings] = useState<BookingShort[]>([]);
  const [postColorAssignments] = api.endpoints.postColorAssignments.useMutation();

  useEffect(() => {
    let subscribed = true;

    async function fetchData() {
      if (isValid) {
        try {
          const response = await fetchBookings(name, from, to);
          const newBookings: BookingShort[] = [];
          const colorAssignments: ColorAssignments = { };

          for (const booking of response.data) {
            if (booking.color) {
              newBookings.push({ ...booking, color: booking.color });
            } else {
              const newColor: TileColor = `booking${Math.floor(Math.random() * 7) + 1}` as TileColor;
              colorAssignments[booking.id] = newColor;
              newBookings.push({ ...booking, color: newColor });
            }
          }

          if (Object.keys(colorAssignments).length > 0) {
            postColorAssignments(colorAssignments);
          }

          if (subscribed) {
            setBookings(newBookings);
          }
        } catch(error: any) {
          dispatch(showMessage({ type: "error", message: error?.message }));
        }
      }
    }

    fetchData();

    return () => { subscribed = false; };
  }, [dispatch, name, from, to, isValid, postColorAssignments]);

  return (
    <Box sx={{ maxHeight: "calc(100vh - 21rem)", overflowY: "auto" }}>
      <Stack spacing={0} sx={{ position: "relative", pb: "1rem" }}>
        {bookings.length > 0 ?
          bookings.map((booking) => <Booking key={booking.id} booking={booking}/>) :
          <Skeleton />}
      </Stack>
    </Box>
  );
}
