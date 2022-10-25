import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import * as Utils from "../../../utils";
import { useAppDispatch } from "../../../redux/hooks";
import { setBookingsFormFrom, setBookingsFormName, setBookingsFormTo } from "../../../redux/bookingsFormSlice";

import ExpandableTileContext from "../context";
import { TileContext } from "../../Tile/context";
import M3TextButton from "../../m3/M3TextButton";

type ShowBookingButtonProps = {
  show: boolean
};

export default function ShowBookingButton({ show }: ShowBookingButtonProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const { variant } = useContext(ExpandableTileContext);
  const { data } = useContext(TileContext);

  if (variant === "in-content") {
    return null;
  }

  return (
    <Stack direction="row" justifyContent="end">
      {show && data ? (
        <Link to={`/bookings/${data.from}/${data.bookingId}`} style={{ textDecoration: "none" }}>
          <M3TextButton onClick={() => {
            dispatch(setBookingsFormFrom(data.from));
            dispatch(setBookingsFormTo(Utils.getDateShift(data.from, data.nights)));
            dispatch(setBookingsFormName(""));
          }}>
            Mostra prenotazione
          </M3TextButton>
        </Link>
      ) : <Box sx={{ height: "2.5rem" }}></Box>}
    </Stack>
  );
}
