import React from "react";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";

import M3IconButton from "../../m3/M3IconButton";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { togglePanoramicView } from "../../../redux/tableSlice";

export default function PanoramicViewAction(): JSX.Element {
  const isPanoramicView = useAppSelector(state => state.table.isPanoramicView);
  const dispatch = useAppDispatch();

  const icon = isPanoramicView ? <ViewAgendaOutlinedIcon /> : <VisibilityOutlinedIcon />;

  function toggleView(): void {
    dispatch(togglePanoramicView());
  }

  return (
    <M3IconButton onClick={toggleView}>
      {icon}
    </M3IconButton>
  );
}
