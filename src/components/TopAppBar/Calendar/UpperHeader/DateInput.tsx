import React, { useRef, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDownOutlined";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ChevronLeftOutlined from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlined from "@mui/icons-material/ChevronRightOutlined";

import M3TextButton from "../../../m3/M3TextButton";
import M3IconButton from "../../../m3/M3IconButton";
import M3DatePicker from "../../../m3/M3DatePicker";
import M3Selectbox from "../../../m3/M3Selectbox";

import { Utils } from "../../../../utils";
import { useAppDispatch, useColumns, useLeftmostDate } from "../../../../redux/hooks";
import * as TableSlice from "../../../../redux/tableSlice";

export default function DateInput(): JSX.Element {
  const dispatch = useAppDispatch();
  const leftmostDate = useLeftmostDate();
  const columns = useColumns();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLButtonElement>(null);

  const leftmostDateObj = new Date(leftmostDate);
  const rightmostDateObj = new Date(leftmostDate);
  rightmostDateObj.setDate(rightmostDateObj.getDate() + columns - 1);
  let leftmostMonth = leftmostDateObj.toLocaleDateString("default", { month: "long" });
  if (leftmostMonth.length > 4) {
    leftmostMonth = leftmostDateObj.toLocaleDateString("default", { month: "short" });
  }
  leftmostMonth = `${leftmostMonth[0].toLocaleUpperCase()}${leftmostMonth.substring(1)}`;
  let rightmostMonth = rightmostDateObj.toLocaleDateString("default", { month: "long" });
  if (rightmostMonth.length > 4) {
    rightmostMonth = rightmostDateObj.toLocaleDateString("default", { month: "short" });
  }
  rightmostMonth = `${rightmostMonth[0].toLocaleUpperCase()}${rightmostMonth.substring(1)}`;
  const leftmostYear = leftmostDateObj.getFullYear();
  const rightmostYear = rightmostDateObj.getFullYear();
  let dateString = "";
  if (leftmostYear === rightmostYear) {
    if (leftmostMonth === rightmostMonth) {
      dateString = `${leftmostMonth} ${leftmostYear}`;
    } else {
      dateString = `${leftmostMonth} - ${rightmostMonth} ${leftmostYear}`;
    }
  } else {
    dateString = `${leftmostMonth} ${leftmostYear} - ${rightmostMonth} ${rightmostYear}`;
  }

  const open = Boolean(anchorEl);
  const id = open ? "datepicker-wrapper" : undefined;

  function tryUpdateDate(date: Date | null): void {
    if (date) {
      setAnchorEl(null);
      dispatch(TableSlice.changeDate({ date: Utils.dateToString(date) }));
    }
  }

  function tryUpdateColumns(event: SelectChangeEvent<number>): void {
    const columns = event.target.value as number;
    if (columns > 0) {
      dispatch(TableSlice.updateColums({ columns }));
    }
  }

  function openDateInput(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function goNext() {
    dispatch(TableSlice.goNext());
  }

  function goPrev() {
    dispatch(TableSlice.goPrev());
  }

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      gap: "0.5rem",
      alignItems: "center",
    }}>
      <Box sx={{
        display: "flex",
      }}>
        <M3IconButton onClick={goPrev}>
          <ChevronLeftOutlined />
        </M3IconButton>
        <M3IconButton onClick={goNext}>
          <ChevronRightOutlined />
        </M3IconButton>
      </Box>
      <M3TextButton
        ref={ref}
        onClick={openDateInput}
        aria-describedby={id}
        focused={open}
        endIcon={<ArrowDropDownIcon />}
      >
        {dateString}
      </M3TextButton>
      <Popover open={open} anchorReference="none" PaperProps={{ sx: { display: "none" } }}>
        <M3DatePicker
          value={new Date(leftmostDate)}
          onChange={tryUpdateDate}
          renderInput={() => <></>}
          open={open}
          onClose={() => { setAnchorEl(null); }}
          PopperProps={{
            anchorEl: ref.current,
            placement: "bottom-end"
          }}
        />
      </Popover>
      <M3Selectbox value={columns} onChange={tryUpdateColumns}>
        <MenuItem value={15}>15 Giorni</MenuItem>
        <MenuItem value={30}>30 Giorni</MenuItem>
        <MenuItem value={45}>45 Giorni</MenuItem>
        <MenuItem value={60}>60 Giorni</MenuItem>
      </M3Selectbox>
    </Box>
  );
}
