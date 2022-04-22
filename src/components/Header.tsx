import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TodayIcon from "@mui/icons-material/Today";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import { useAppDispatch, useCurrentDate } from "../redux/hooks";
import * as Utils from "../utils";
import * as SidemenuSlice from "../redux/sidemenuSlice";
import * as TableSlice from "../redux/tableSlice";

import M3AppBar from "./m3/M3AppBar";
import M3TextButton from "./m3/M3TextButton";

export default function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentDate = useCurrentDate();
  const [open, setOpen] = useState(false);

  function openDateInput() {
    setOpen(true);
  }

  function closeDateInput() {
    setOpen(false);
  }

  function showSidemenu() {
    dispatch(SidemenuSlice.show());
  }

  function changeTableDate(date: Date | null) {
    if (open) {
      if (date !== null) {
        dispatch(TableSlice.changeDate({ date: Utils.dateToString(date) }));
      }
    }
  }

  return (
    <M3AppBar>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <M3TextButton
          onClick={showSidemenu}
          iconOnly
          sx={{ color: (theme) => theme.palette.onSurface.main, mr: "1rem" }}
        >
          <MenuIcon />
        </M3TextButton>
        <Typography variant="titleLarge">Booking Calendar</Typography>
      </Box>
      <M3TextButton
        sx={{ color: (theme) => theme.palette.onSurfaceVariant.main }}
        iconOnly
        onClick={openDateInput}
      >
        <TodayIcon />
      </M3TextButton>
      <MobileDatePicker
        value={new Date(currentDate)}
        onChange={changeTableDate}
        renderInput={() => <></>}
        open={open}
        onAccept={closeDateInput}
        DialogProps={{
          onClose: closeDateInput
        }}
      />
    </M3AppBar>
  );
}
