import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

import { BookingData, fetchBookingById } from "../../api";

export default function BookingDetails(): JSX.Element {
  const theme = useTheme();
  const { bookingId } = useParams();
  const [data, setData] = useState<BookingData | undefined>(undefined);

  useEffect(() => {
    let isSubscribed = true;

    async function fetchData() {
      if (bookingId) {
        const response = await fetchBookingById(bookingId);

        if (isSubscribed) {
          setData(response.data);
        }
      }
    }

    fetchData();

    return () => {
      isSubscribed = false;
      setData(undefined);
    };
  }, [bookingId]);

  return (
    <Stack spacing={2} sx={{
      position: "relative",
      height: "calc(100vh - 10.5rem)",
      flexGrow: 1,
      backgroundColor: theme.palette.surfaceVariant.light,
      color: theme.palette.onSurfaceVariant.light,
      borderBottomRightRadius: "0.75rem",
      borderBottomLeftRadius: "0.75rem"
    }}>
      {data?.name}
    </Stack>
  );
}
