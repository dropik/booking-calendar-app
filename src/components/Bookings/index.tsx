import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import * as Utils from "../../utils";
import { useCurrentDate } from "../../redux/hooks";

import M3DatePicker from "../m3/M3DatePicker";

export default function Bookings(): JSX.Element {
  const currentDate = useCurrentDate();
  const [from, setFrom] = useState(currentDate);
  const [to, setTo] = useState(Utils.getDateShift(currentDate, 1));
  const [name, setName] = useState("");

  return (
    <Stack spacing={2} direction="row" sx={{
      pl: "1rem",
      pr: "1rem"
    }}>
      <Stack spacing={1} sx={{ width: "25rem" }}>
        <Stack spacing={1} direction="row" sx={{ pt: "0.5rem" }}>
          <M3DatePicker
            value={new Date(from)}
            onChange={(date: Date | null) => {
              if (date) {
                setFrom(Utils.dateToString(date));
              }
            }}
            renderInput={(props) => <TextField {...props} id="from" label="Dal" />}
          />
          <M3DatePicker
            value={new Date(to)}
            onChange={(date: Date | null) => {
              if (date) {
                setTo(Utils.dateToString(date));
              }
            }}
            renderInput={(props) => <TextField {...props} id="to" label="Al" />}
          />
        </Stack>
        <TextField id="name" label="Nome" onChange={(event) => { setName(event.target.value); }} />
      </Stack>
      <Box sx={{ flexGrow: 1 }}>
        Details
      </Box>
    </Stack>
  );
}
