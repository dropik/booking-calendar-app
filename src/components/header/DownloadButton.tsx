import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

import { useAppDispatch } from "../../redux/hooks";
import * as DialogSlice from "../../redux/dialogSlice";

import M3TextButton from "../m3/M3TextButton";
import M3Menu from "../m3/M3Menu";
import M3MenuItem from "../m3/M3MenuItem";
import M3ListItemText from "../m3/M3ListItemText";
import M3ListItemIcon from "../m3/M3ListItemIcon";

export default function DownloadButton(): JSX.Element {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? "download-menu" : undefined;

  function close() {
    setAnchorEl(null);
  }

  function showDialog(dialog: DialogSlice.ZeroParameterDialog) {
    dispatch(DialogSlice.show({ dialogType: dialog }));
    close();
  }

  return (
    <div>
      <M3TextButton
        iconOnly
        aria-describedby={id}
        className={open ? "focused" : ""}
        sx={{
          color: theme.palette.onSurfaceVariant.main
        }}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <FileDownloadOutlinedIcon />
      </M3TextButton>
      <M3Menu
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={close}
      >
        <M3MenuItem onClick={() => showDialog("police")}>
          <M3ListItemIcon><LocalPoliceOutlinedIcon /></M3ListItemIcon>
          <M3ListItemText>Polizia</M3ListItemText>
        </M3MenuItem>
        <M3MenuItem onClick={() => showDialog("istat")}>
          <M3ListItemIcon><QueryStatsIcon /></M3ListItemIcon>
          <M3ListItemText>ISTAT</M3ListItemText>
        </M3MenuItem>
      </M3Menu>
    </div>
  );
}
