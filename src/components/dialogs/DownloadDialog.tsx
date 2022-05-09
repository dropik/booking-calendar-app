import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import * as Utils from "../../utils";
import { useAppDispatch, useAppSelector, useCurrentDate } from "../../redux/hooks";
import * as DialogSlice from "../../redux/dialogSlice";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";

import { SurfaceTint } from "../m3/Tints";
import DownloadDialogBody from "./DownloadDialogBody";
import DownloadDialogActions from "./DownloadDialogActions";

export type DownloadDialogState = "fill" | "loading" | "done";

type Props = {
  type: "police" | "istat";
  onFetchAsync: (date: string) => Promise<{ data: Blob }>
  setFilename: (date: string) => string,
  icon: ReactNode,
  title: string
};

export default function DownloadDialog({ type, onFetchAsync, setFilename, icon, title }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const currentDate = useCurrentDate();
  const open = useAppSelector((state) => state.dialog.dialogs[0]?.type === type);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [state, setState] = useState<DownloadDialogState>("fill");
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
    setNoData(false);
  }

  useEffect(() => {
    setSelectedDate(currentDate);
  }, [currentDate]);

  function download() {
    async function fetchDataAsync() {
      try {
        const response = await onFetchAsync(selectedDate);
        const data = response.data;
        if (anchorRef.current) {
          if (data.size > 0) {
            anchorRef.current.href = URL.createObjectURL(data);
            anchorRef.current.download = setFilename(selectedDate);
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
    <Dialog
      open={open}
      onClose={closeDialog}
      TransitionProps={{ onExited: resetState }}
      PaperProps={{
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
      }}
    >
      <Typography align="center" sx={{
        height: "1.5rem",
        color: theme.palette.secondary.main
      }}
      >
        {icon}
      </Typography>
      <DialogTitle sx={{
        textAlign: "center",
        paddingBottom: "1rem",
        color: theme.palette.onSurface.main
      }}><Typography variant="headlineSmall">{title}</Typography></DialogTitle>
      <DownloadDialogBody state={state} selectedDate={selectedDate} onChangeDate={changeDate} noData={noData} />
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "end",
        marginTop: "1.5rem"
      }}>
        <DownloadDialogActions state={state} onClose={closeDialog} onDownload={download} />
      </Box>
      <a ref={anchorRef}></a>
      <SurfaceTint />
    </Dialog>
  );
}
