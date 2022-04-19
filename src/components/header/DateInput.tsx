import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

import * as Utils from "../../utils";
import { useAppDispatch, useCurrentDate } from "../../redux/hooks";
import * as TableSlice from "../../redux/tableSlice";

import SidemenuButton from "./SidemenuButton";

export default function DateInput(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentDate = useCurrentDate();

  function changeTableDate(date: Date | null) {
    if (date !== null) {
      dispatch(TableSlice.changeDate({ date: Utils.dateToString(date) }));
    }
  }

  return (
    <>
      <SidemenuButton />
      <div>
        <DatePicker
          value={new Date(currentDate)}
          onChange={changeTableDate}
          renderInput={(props) => <TextField {...props} />}
        />
      </div>
    </>
  );
}
