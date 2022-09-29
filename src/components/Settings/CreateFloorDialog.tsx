import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import { postFloorAsync } from "../../api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createFloor } from "../../redux/floorsSlice";
import { show as showMessage } from "../../redux/snackbarMessageSlice";

import M3TextButton from "../m3/M3TextButton";
import M3Fab from "../m3/M3Fab";
import { SurfaceTint } from "../m3/Tints";
import { CircularProgress } from "@mui/material";

export default function CreateFloorDialog(): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [creatingState, setCreatingState] = useState<"idle" | "creating" | "loading">("idle");
  const [name, setName] = useState("");
  const [validated, setValidated] = useState(true);
  const floorsReady = useAppSelector((state) => state.floors.status === "idle");

  const openDialog = creatingState !== "idle";

  function closeDialog(): void {
    setCreatingState("idle");
  }

  function create(): void {
    async function postAsync(): Promise<void> {
      try {
        const response = await postFloorAsync({ name });
        dispatch(createFloor({ id: response.id, name }));
      } catch (error) {
        dispatch(showMessage({ type: "error" }));
      } finally {
        setCreatingState("idle");
      }
    }

    if (name !== "" && validated) {
      setCreatingState("loading");
      postAsync();
    } else {
      setValidated(false);
    }
  }

  return (
    <>
      {floorsReady ? (<M3Fab onClick={() => setCreatingState("creating")} sx={{
        position: "fixed",
        right: 0,
        bottom: 0,
        width: "auto",
        minWidth: "5rem"
      }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ p: "1rem" }}>
          <AddOutlinedIcon />
          <Typography variant="labelLarge">Crea</Typography>
        </Stack>
        <SurfaceTint sx={{
          backgroundColor: theme.palette.primary.light,
          opacity: theme.opacities.surface3
        }} />
      </M3Fab>) : null}
      <Dialog keepMounted open={openDialog} onClose={closeDialog} PaperProps={{
        elevation: 0,
        sx: {
          height: "calc(100vh - 4rem)",
          backgroundColor: "transparent",
          overflow: "visible"
        }
      }}>
        <Paper elevation={3} sx={{
          borderRadius: "1.75rem",
          minWidth: "17.5rem",
          maxWidth: "35rem",
          position: "relative",
          mt: "calc(50vh - 11.125rem)"
        }}>
          <Collapse
            in={openDialog}
            easing={theme.transitions.easing.fastOutSlowIn}
          >
            <Stack spacing={3} sx={{ p: "1.5rem" }}>
              <Stack spacing={2} alignItems="center">
                <AddOutlinedIcon />
                <Typography variant="headlineSmall">Crea piano</Typography>
                <Typography variant="bodyMedium" sx={{ display: "block", width: "100%", textAlign: "left" }}>
                  Crea un nuovo piano vuoto con seguente nome:
                </Typography>
                <TextField
                  label="Nome"
                  onChange={(event) => {
                    const newName = event.currentTarget.value;
                    setName(newName);
                    if (newName === "") {
                      setValidated(false);
                    } else {
                      setValidated(true);
                    }
                  }}
                  onKeyUp={(event) => {
                    if (event.key === "Enter") {
                      create();
                    }
                  }}
                  error={!validated}
                  helperText={validated ? undefined : "Il nome non può essere vuoto."}
                  sx={{ minWidth: "20rem" }} />
              </Stack>
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                {creatingState === "loading" ?
                  <CircularProgress /> :
                  (<>
                    <M3TextButton onClick={closeDialog}>Cancella</M3TextButton>
                    <M3TextButton onClick={create}>Crea</M3TextButton>
                  </>)}
              </Stack>
            </Stack>
          </Collapse>
          <SurfaceTint sx={{
            backgroundColor: theme.palette.primary.light,
            opacity: theme.opacities.surface3
          }} />
        </Paper>
      </Dialog>
    </>
  );
}
