import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { ColorAssignments, api } from "../../api";
import { ColoredBooking, TileColor, addColorizedBookings } from "../../redux/tilesSlice";

export default function FetchTiles(): null {
  const dispatch = useAppDispatch();
  const args = useAppSelector((state) => state.table.lastFetchPeriod);
  const query = api.endpoints.getBookings.useQuery(args, { pollingInterval: 180000, refetchOnMountOrArgChange: true });
  const [postAssignments] = api.endpoints.postAssignments.useMutation();

  useEffect(() => {
    const bookings = query.data;
    if (!bookings) return;

    const coloredBookings: ColoredBooking[] = [];

    const assignments: ColorAssignments = { };

    for (const booking of bookings) {
      if (!booking.color) {
        const newColor = `booking${Math.floor((Math.random() * 7)) + 1}` as TileColor;
        assignments[booking.id] = newColor;
        coloredBookings.push({ color: newColor, ...booking });
      } else {
        coloredBookings.push({ color: booking.color, ...booking });
      }
    }

    dispatch(addColorizedBookings(coloredBookings));

    if (Object.keys(assignments).length > 0) {
      postAssignments({
        colors: assignments,
        rooms: { },
      });
    }
  }, [postAssignments, query.data, dispatch]);

  return null;
}
