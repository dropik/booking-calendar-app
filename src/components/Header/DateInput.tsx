import React, { useRef, useState } from "react";
import TodayIcon from "@mui/icons-material/Today";
import Popover from "@mui/material/Popover";

import M3TextButton from "../m3/M3TextButton";
import M3DatePicker from "../m3/M3DatePicker";

import * as Utils from "../../utils";
import { useAppDispatch, useCurrentDate } from "../../redux/hooks";
import * as TableSlice from "../../redux/tableSlice";

export default function DateInput(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentDate = useCurrentDate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? "datepicker-wrapper" : undefined;

  function tryUpdateDate(date: Date | null) {
    if (date) {
      setAnchorEl(null);
      dispatch(TableSlice.changeDate({ date: Utils.dateToString(date) }));
    }
  }

  function openDateInput(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  return (
    <div ref={ref}>
      <M3TextButton
        iconOnly
        onClick={openDateInput}
        aria-describedby={id}
        focused={open}
      >
        <TodayIcon />
      </M3TextButton>
      <Popover sx={{ opacity: 0 }} id={id} open={open} anchorEl={anchorEl}>
        <M3DatePicker
          value={currentDate}
          onChange={tryUpdateDate}
          renderInput={() => <></>}
          open={open}
          PopperProps={{
            anchorEl: ref.current,
            placement: "bottom-end"
          }}
        />
      </Popover>
    </div>
  );
}
