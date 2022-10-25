import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Booking, fetchBookingById } from "../../api";
import { useAppDispatch } from "../../redux/hooks";
import { show as showMessage } from "../../redux/snackbarMessageSlice";

import { TileContext } from "../Tile/context";
import ExpandableTile from "../ExpandableTile";
import M3Skeleton from "../m3/M3Skeleton";
import { TileColor, TileData } from "../../redux/tilesSlice";

export default function BookingDetails(): JSX.Element {
  const theme = useTheme();
  const { bookingId } = useParams();
  const dispatch = useAppDispatch();
  const [booking, setBooking] = useState<Booking | undefined>(undefined);
  const skeletonRooms = [0, 1];

  const periodStr = booking ?
    `${(new Date(booking.from)).toLocaleDateString()} - ${(new Date(booking.to)).toLocaleDateString()}` :
    undefined;

  useEffect(() => {
    let isSubscribed = true;

    async function fetchData() {
      if (bookingId) {
        try {
          const response = await fetchBookingById(bookingId);

          if (isSubscribed) {
            setBooking(response.data);
          }
        } catch(error) {
          dispatch(showMessage({ type: "error" }));
        }
      }
    }

    fetchData();

    return () => {
      isSubscribed = false;
      setBooking(undefined);
    };
  }, [dispatch, bookingId]);

  return (
    <Stack
      sx={{
        position: "relative",
        flexGrow: 1,
        borderBottomRightRadius: "0.75rem",
        borderBottomLeftRadius: "0.75rem",
      }}
    >
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%"
      }}>
        <Stack spacing={0} sx={{
          position: "sticky",
          boxSizing: "border-box",
          flexGrow: 1,
          height: "4rem",
          backgroundColor: theme.palette.secondaryContainer.light,
          color: theme.palette.onSecondaryContainer.light,
          borderTopRightRadius: "0.75rem",
          borderTopLeftRadius: "0.75rem",
          justifyContent: "center",
          pr: "1rem",
          pl: "1rem"
        }}>
          <Typography variant="titleMedium">{booking ? booking.name : <M3Skeleton width="6rem" />}</Typography>
          <Typography variant="bodySmall">{periodStr ? periodStr : <M3Skeleton width="10rem" />}</Typography>
        </Stack>
      </Box>
      <Stack spacing={1} sx={{
        maxHeight: "calc(100vh - 5rem)",
        overflowY: "auto",
        boxSizing: "border-box",
        pb: "1rem"
      }}>
        {booking ? booking.tiles.map((tile, index) => {
          const tileData: TileData = {
            id: tile.id,
            bookingId: booking.id,
            name: booking.name,
            from: tile.from,
            nights: tile.nights,
            roomType: tile.roomType,
            entity: tile.entity,
            persons: tile.persons,
            color: booking.color ?? `booking${Math.floor(Math.random() * 7) + 1}` as TileColor,
            roomId: tile.roomId
          };

          return (
            <TileContext.Provider key={tile.id} value={{ data: tileData, cropRight: false, cropLeft: false }}>
              <ExpandableTile variant="in-content" isFirst={index === 0} />
            </TileContext.Provider>
          );
        }) : skeletonRooms.map((room) => (
          <TileContext.Provider key={room} value={{ cropRight: false, cropLeft: false }}>
            <ExpandableTile variant="in-content" isFirst={room === 0} />
          </TileContext.Provider>
        ))}
      </Stack>
    </Stack>
  );
}
