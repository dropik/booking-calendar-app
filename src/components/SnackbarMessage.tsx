import React from "react";
import { useTheme } from "@mui/material/styles";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { hide as hideMessage } from "../redux/snackbarMessageSlice";

import M3Snackbar from "./m3/M3Snackbar";
import M3Alert from "./m3/M3Alert";
import M3IconButton from "./m3/M3IconButton";

export default function SnackbarMessage(): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.snackbarMessage.message);
  const open = useAppSelector((state) => state.snackbarMessage.show);

  function close() {
    dispatch(hideMessage());
  }

  return (
    <>
      <M3Snackbar open={open} autoHideDuration={message.type === "error" ? undefined : 3000} onClose={close}>
        <M3Alert icon={<></>} sx={{
          height: "3rem",
          boxSizing: "border-box",
          py: 0,
          pl: "1rem",
          pr: message.type === "error" ? "0.5rem" : "1rem",
          backgroundColor: theme.palette.inverseSurface.main,
          color: theme.palette.inverseOnSurface.main,
          ".MuiAlert-icon": {
            mr: 0,
          },
          ".MuiAlert-message": {
            padding: 0,
            display: "flex",
            alignItems: "center",
            position: "relative",
            bottom: 0,
            height: "3rem",
          }
        }}>
          {message.message ? message.message : "Server error!"}
          {message.type === "error" ? (
            <M3IconButton onClick={close} sx={{
              ml: "1rem",
            }}>
              <CloseOutlinedIcon sx={{
                color: theme.palette.inverseOnSurface.main,
              }} />
            </M3IconButton>
          ) : null}
        </M3Alert>
      </M3Snackbar>
    </>
  );
}
