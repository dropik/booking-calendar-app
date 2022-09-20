import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { fetchBookingById } from "../../api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setBookingData, unsetBookingData } from "../../redux/bookingSlice";

import Definer from "../Definer";
import { TileContext } from "../Tile/context";
import ExpandableTile from "../ExpandableTile";

export default function BookingDetails(): JSX.Element {
  const theme = useTheme();
  const { bookingId } = useParams();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.booking.data);

  useEffect(() => {
    let isSubscribed = true;

    async function fetchData() {
      if (bookingId) {
        const response = await fetchBookingById(bookingId);

        if (isSubscribed) {
          dispatch(setBookingData(response.data));
        }
      }
    }

    fetchData();

    return () => {
      isSubscribed = false;
      dispatch(unsetBookingData());
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
          <Definer value={data}>
            {(booking) => {
              const formattedFrom = (new Date(booking.from)).toLocaleDateString();
              const formattedTo = (new Date(booking.to)).toLocaleDateString();
              const periodStr = `${formattedFrom} - ${formattedTo}`;

              return (
                <>
                  <Typography variant="titleMedium">{booking.name}</Typography>
                  <Typography variant="bodySmall">{periodStr}</Typography>
                </>
              );
            }}
          </Definer>
        </Stack>
      </Box>
      <Definer value={data}>
        {(booking) => (
          <Stack spacing={1} sx={{
            maxHeight: "calc(100vh - 5rem)",
            overflowY: "auto",
            boxSizing: "border-box",
            pb: "1rem"
          }}>
            {booking.rooms.map((room, index) => (
              <TileContext.Provider key={room.id} value={{ data: room, cropRight: false, cropLeft: false }}>
                <ExpandableTile variant="in-content" isFirst={index === 0} />
              </TileContext.Provider>
            ))}
          </Stack>
        )}
      </Definer>
    </Stack>
  );
}
