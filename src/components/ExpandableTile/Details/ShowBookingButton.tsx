import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";

import * as Utils from "../../../utils";
import { useAppDispatch } from "../../../redux/hooks";
import { setBookingsFormFrom, setBookingsFormName, setBookingsFormTo } from "../../../redux/bookingsFormSlice";

import ExpandableTileContext from "../context";
import { TileContext } from "../../Tile/context";
import M3TextButton from "../../m3/M3TextButton";

export default function ShowBookingButton(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const { variant } = useContext(ExpandableTileContext);
  const { data } = useContext(TileContext);

  if (variant === "in-content") {
    return null;
  }

  return (
    <Stack direction="row" justifyContent="end">
      <Link to={`/bookings/${data.bookingId}`} style={{ textDecoration: "none" }}>
        <M3TextButton onClick={() => {
          dispatch(setBookingsFormFrom(data.from));
          dispatch(setBookingsFormTo(Utils.getDateShift(data.from, data.nights)));
          dispatch(setBookingsFormName(""));
        }}>
          Mostra prenotazione
        </M3TextButton>
      </Link>
    </Stack>
  );
}
