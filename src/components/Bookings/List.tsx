import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { BookingShort as BookingShortResponse, ColorAssignments, api } from "../../api";
import { TileColor } from "../../redux/tilesSlice";

import Booking from "./Booking";
import Skeleton from "./Skeleton";

export type BookingShort = Required<BookingShortResponse>;

type ListProps = {
  name: string,
  from: string,
  to: string,
  isValid: boolean
}

export default function List({ name, from, to, isValid }: ListProps): JSX.Element {
  const { data: bookings, isSuccess: isLoaded, isFetching } = api.endpoints.getBookingsByName.useQuery({ name, from, to });
  const [postAssignments] = api.endpoints.postAssignments.useMutation();
  const [assignedColors, setAssignedColors] = useState<ColorAssignments>({ });

  useEffect(() => {
    if (isLoaded && isValid) {
      const newColorAssignments: ColorAssignments = { };
      const colorAssignments: ColorAssignments = { };

      for (const booking of bookings) {
        if (booking.color) {
          colorAssignments[booking.id] = booking.color;
        } else {
          const newColor: TileColor = `booking${Math.floor(Math.random() * 7) + 1}` as TileColor;
          newColorAssignments[booking.id] = newColor;
          colorAssignments[booking.id] = newColor;
        }
      }

      setAssignedColors(colorAssignments);

      if (Object.keys(newColorAssignments).length > 0) {
        postAssignments({
          colors: newColorAssignments,
          rooms: { },
        });
      }
    }
  }, [bookings, isLoaded, isValid, postAssignments]);

  return (
    <Box sx={{ maxHeight: "calc(100vh - 21rem)", overflowY: "auto" }}>
      <Stack spacing={0} sx={{ position: "relative", pb: "1rem" }}>
        {!isFetching && isLoaded ?
          bookings.map((booking) => {
            const coloredBooking: Required<BookingShort> = { ...booking, color: assignedColors[booking.id] ?? "booking1" };
            return (
              <Booking key={booking.id} booking={coloredBooking}/>
            );
          }) :
          <Skeleton />}
      </Stack>
    </Box>
  );
}
