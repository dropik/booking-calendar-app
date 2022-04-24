import React, { useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import CheckIcon from "@mui/icons-material/Check";

import * as Utils from "../utils";
import * as Api from "../api";
import { useAppDispatch, useAppSelector, useCurrentDate } from "../redux/hooks";
import * as DialogSlice from "../redux/dialogSlice";
import * as ConnectionErrorSlice from "../redux/connectionErrorSlice";

import M3DatePicker from "./m3/M3DatePicker";
import M3TextButton from "./m3/M3TextButton";
import { SurfaceTint } from "./m3/Tints";

type DialogState = "fill" | "loading" | "done";

export default function PoliceDialog(): JSX.Element {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const currentDate = useCurrentDate();
  const open = useAppSelector((state) => state.dialog.dialogs[0]?.type === "police");
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [state, setState] = useState<DialogState>("fill");
  const [noData, setNoData] = useState(false);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  function closeDialog() {
    dispatch(DialogSlice.closeAll());
  }

  function changeDate(date: Date | null) {
    if (date) {
      setSelectedDate(Utils.dateToString(date));
    }
  }

  function resetState() {
    setState("fill");
  }

  function download() {
    async function fetchDataAsync() {
      try {
        const response = await Api.fetchPoliceDataAsync(selectedDate);
        const data = response.data;
        if (anchorRef.current) {
          if (data.size > 0) {
            anchorRef.current.href = URL.createObjectURL(data);
            anchorRef.current.download =  `polizia-${selectedDate}.txt`;
            anchorRef.current.click();
          } else {
            setNoData(true);
          }
          setState("done");
        }
      } catch (error) {
        dispatch(ConnectionErrorSlice.show());
        setState("fill");
      }
    }
    fetchDataAsync();
    setState("loading");
  }

  return (
    <Dialog open={open} onClose={closeDialog} TransitionProps={{ onExited: resetState }} PaperProps={{
      sx: {
        boxShadow: theme.shadows[3],
        borderRadius: "1.75rem",
        minWidth: "17.5rem",
        maxWidth: "35rem",
        padding: "1.5rem",
        backgroundColor: theme.palette.surface.main,
        color: theme.palette.onSurfaceVariant.main,
        "& .surface-tint": {
          backgroundColor: theme.palette.surfaceTint.main,
          opacity: theme.opacities.surface3
        }
      }
    }}>
      <Typography align="center" sx={{
        height: "1.5rem",
        color: theme.palette.secondary.main
      }}
      >
        <LocalPoliceOutlinedIcon />
      </Typography>
      <DialogTitle sx={{
        textAlign: "center",
        paddingBottom: "1rem",
        color: theme.palette.onSurface.main
      }}><Typography variant="headlineSmall">Scarica dati polizia</Typography></DialogTitle>
      <DialogBody state={state} selectedDate={selectedDate} onChangeDate={changeDate} noData={noData} />
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "end",
        marginTop: "1.5rem"
      }}>
        <DialogActions state={state} onClose={closeDialog} onDownload={download} />
      </Box>
      <a ref={anchorRef}></a>
      <SurfaceTint />
    </Dialog>
  );
}

type DialogBodyProps = {
  state: DialogState,
  selectedDate: string,
  onChangeDate: (date: Date | null) => void,
  noData: boolean
};

function DialogBody({ state, selectedDate, onChangeDate, noData }: DialogBodyProps): JSX.Element {
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

type DialogActionsProps = {
  state: DialogState,
  onClose: () => void,
  onDownload: () => void
};

function DialogActions({ state, onClose, onDownload }: DialogActionsProps): JSX.Element {
  switch (state) {
  case "fill":
    return (
      <>
        <M3TextButton sx={{ marginRight: "0.5rem" }} onClick={onClose}>Cancella</M3TextButton>
        <M3TextButton onClick={onDownload}>Scarica</M3TextButton>
      </>
    );
  case "loading":
    return <></>;
  case "done":
    return (
      <M3TextButton onClick={onClose}>Ok</M3TextButton>
    );
  }
}
