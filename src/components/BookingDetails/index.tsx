import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

import { fetchBookingById } from "../../api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setBookingData, setScrollTop, unsetBookingData } from "../../redux/bookingSlice";

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
      spacing={2}
      sx={{
        position: "relative",
        height: "calc(100vh - 10.5rem)",
        flexGrow: 1,
        backgroundColor: theme.palette.surfaceVariant.light,
        color: theme.palette.onSurfaceVariant.light,
        borderBottomRightRadius: "0.75rem",
        borderBottomLeftRadius: "0.75rem",
        overflowY: "auto"
      }}
      onScroll={(event) => {
        dispatch(setScrollTop(event.currentTarget.scrollTop));
      }}
    >
      <Stack spacing={2}>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
        <div>{data?.name}</div>
      </Stack>
    </Stack>
  );
}
