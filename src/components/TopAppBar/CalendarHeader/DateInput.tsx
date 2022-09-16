import React, { useRef, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDownOutlined";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import ChevronLeftOutlined from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlined from "@mui/icons-material/ChevronRightOutlined";

import M3TextButton from "../../m3/M3TextButton";
import M3IconButton from "../../m3/M3IconButton";
import M3DatePicker from "../../m3/M3DatePicker";

import * as Utils from "../../../utils";
import { useAppDispatch, useColumns, useCurrentDate, useLeftmostDate } from "../../../redux/hooks";
import * as TableSlice from "../../../redux/tableSlice";

export default function DateInput(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentDate = useCurrentDate();
  const leftmostDate = useLeftmostDate();
  const columns = useColumns();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLButtonElement>(null);

  const leftmostDateObj = new Date(leftmostDate);
  const rightmostDateObj = new Date(leftmostDate);
  rightmostDateObj.setDate(rightmostDateObj.getDate() + columns);
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

  function tryUpdateDate(date: Date | null) {
    if (date) {
      setAnchorEl(null);
      dispatch(TableSlice.changeDate({ date: Utils.dateToString(date) }));
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
    }}>
      <Box sx={{
        display: "flex"
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
          value={new Date(currentDate)}
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
    </Box>
  );
}
