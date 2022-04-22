import React, { useRef, useState } from "react";
import TodayIcon from "@mui/icons-material/Today";
import Popover from "@mui/material/Popover";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import M3TextButton from "../m3/M3TextButton";

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
        sx={{ color: (theme) => theme.palette.onSurfaceVariant.main }}
        iconOnly
        onClick={openDateInput}
        aria-describedby={id}
        className={open ? "focused" : ""}
      >
        <TodayIcon />
      </M3TextButton>
      <Popover sx={{ opacity: 0 }} id={id} open={open} anchorEl={anchorEl}>
        <DatePicker
          value={currentDate}
          onChange={tryUpdateDate}
          renderInput={() => <></>}
          open={open}
          PopperProps={{
            anchorEl: ref.current,
            placement: "bottom-end"
          }}
          PaperProps={{
            sx: {
              backgroundColor: (theme) => theme.palette.surface.main,
              boxShadow: (theme) => theme.shadows[2],
              color: (theme) => theme.palette.onSurface.main,
              borderRadius: "0.25rem",
              "& .MuiDialogActions-root": {
                position: "absolute",
                pointerEvents: "none",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1,
                backgroundColor: (theme) => theme.palette.surfaceTint.main,
                opacity: (theme) => theme.opacities.surface2
              },
              "& .MuiSvgIcon-root": {
                color: (theme) => theme.palette.onSurfaceVariant.main
              },
              "& div[role=presentation]": {
                overflow: "visible"
              }
            }
          }}
        />
      </Popover>
    </div>
  );
}
