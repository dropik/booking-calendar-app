import React from "react";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

import { useAppDispatch } from "../../redux/hooks";
import * as DialogSlice from "../../redux/dialogSlice";

import Menu from ".";

type Props = {
  anchorEl: HTMLElement | null,
  onClose: () => void
}

export default function DownloadMenu({ anchorEl, onClose }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const open = Boolean(anchorEl);
  const id = open ? "download-menu" : undefined;

  function showDialog(dialog: DialogSlice.ZeroParameterDialog) {
    dispatch(DialogSlice.show({ dialogType: dialog }));
  }

  return (
    <Menu
      id={id}
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      onAnyItemClick={onClose}
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
  );
}
