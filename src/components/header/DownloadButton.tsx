import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

import { useAppDispatch } from "../../redux/hooks";
import * as DialogSlice from "../../redux/dialogSlice";

import M3TextButton from "../m3/M3TextButton";
import Menu from "../Menu";

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
        sx={{ color: theme.palette.onSurfaceVariant.main }}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <FileDownloadOutlinedIcon />
      </M3TextButton>
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={close}
        list={[
          {
            text: "Polizia",
            icon: <LocalPoliceOutlinedIcon />,
            onClick: () => showDialog("police")
          },
          {
            text: "ISTAT",
            icon: <QueryStatsIcon />,
            onClick: () => showDialog("istat")
          }
        ]}
      />
    </div>
  );
}
