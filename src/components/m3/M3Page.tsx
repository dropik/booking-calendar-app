import React, { useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { useAppDispatch } from "../../redux/hooks";
import { setSurfaceDim } from "../../redux/layoutSlice";

import M3IconButton from "./M3IconButton";
import M3ConfirmExitDialog from "./M3ConfirmExitDialog";

type M3PageProps = {
  children: React.ReactNode,
  topBarElement?: React.ReactNode | ((isEntered: boolean) => React.ReactNode),
  exit: boolean,
  onExited: () => void,
  onBeforeExit?: () => boolean,
}

export default function M3Page({ children, topBarElement, exit, onExited, onBeforeExit }: M3PageProps): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isEntered, setIsEntered] = useState(false);
  const [shouldExit, setShouldExit] = useState(false);
  const [openConfirmExitDialog, setOpenConfirmExitDialog] = useState(false);

  const confirmExit = useCallback(() => {
    setIsEntered(false);
    dispatch(setSurfaceDim(false));
  }, [dispatch]);

  useEffect(() => {
    setIsEntered(true);
    dispatch(setSurfaceDim(true));

    return () => {
      dispatch(setSurfaceDim(false));
    };
  }, [dispatch]);

  useEffect(() => {
    if (shouldExit) {
      navigate(-1);
    }
  }, [navigate, shouldExit]);

  useEffect(() => {
    if (exit) {
      onExited();
      confirmExit();
    }
  }, [confirmExit, dispatch, exit, onExited]);

  function tryExit(): void {
    if (!onBeforeExit || onBeforeExit()) {
      confirmExit();
    } else {
      setOpenConfirmExitDialog(true);
    }
  }

  function closeConfirm(): void {
    setOpenConfirmExitDialog(false);
  }

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: theme.palette.surfaceContainer.main,
        borderRadius: "24px 0px 0px 24px",
        p: "1rem",
        boxSizing: "border-box",
        transition: theme.transitions.create(["transform", "opacity"], {
          duration: isEntered ? theme.transitions.duration.short : theme.transitions.duration.shortest,
          easing: isEntered
            ? theme.transitions.easing.emphasized
            : theme.transitions.easing.emphasizedAccelerate,
        }),
        transform: isEntered ? "none" : "translateX(50px)",
        opacity: isEntered ? 1 : 0,
      }}
      onTransitionEnd={() => {
        if (!isEntered) {
          setShouldExit(true);
        }
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <M3IconButton onClick={tryExit}>
          <ArrowBackOutlinedIcon />
        </M3IconButton>
        <M3ConfirmExitDialog open={openConfirmExitDialog} onCancel={closeConfirm} onConfirm={confirmExit} />
        {typeof(topBarElement) === "function" ? topBarElement(isEntered) : topBarElement}
      </Stack>
      {children}
    </Stack>
  );
}
