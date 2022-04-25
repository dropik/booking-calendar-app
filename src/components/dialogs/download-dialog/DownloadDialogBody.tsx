import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { DownloadDialogState } from "../DownloadDialog";

import M3DatePicker from "../../m3/M3DatePicker";

type Props = {
  state: DownloadDialogState,
  selectedDate: string,
  onChangeDate: (date: Date | null) => void,
  noData: boolean
};

export default function DownloadDialogBody({ state, selectedDate, onChangeDate, noData }: Props): JSX.Element {
  switch (state) {
  case "fill":
    return (
      <M3DatePicker
        value={new Date(selectedDate)}
        onChange={onChangeDate}
        renderInput={(props) => <TextField {...props} />}
      />
    );
  case "loading":
    return (
      <Typography align="center">
        <CircularProgress color="primary" />
      </Typography>
    );
  case "done":
    return (
      <Typography variant="bodyMedium" align="center">
        {noData ? "Niente da scaricare" : <CheckIcon />}
      </Typography>
    );
  }
}
