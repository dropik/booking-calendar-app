import React from "react";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";

import "./DayAlert.css";

type Props = {
  hasUnassignedTiles: boolean
};

export default function DayAlert({ hasUnassignedTiles }: Props): JSX.Element {
  return hasUnassignedTiles ?
    <span
      className="day-alert"
      title="Ci sono occupazioni non assegnati"
    >
      <NotificationImportantIcon fontSize="small" />
    </span> :
    <></>;
}
