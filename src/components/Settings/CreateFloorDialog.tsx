import React, { useEffect, useState } from "react";

import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import { api } from "../../api";

import M3TextButton from "../m3/M3TextButton";
import M3Fab from "../m3/M3Fab";
import { M3SurfaceTint } from "../m3/M3Tints";
import M3Dialog from "../m3/M3Dialog";

export default function CreateFloorDialog(): JSX.Element {
  const theme = useTheme();
  const [creatingState, setCreatingState] = useState<"idle" | "creating">("idle");
  const [name, setName] = useState("");
  const [validated, setValidated] = useState(true);
  const isUserDataLoaded = api.endpoints.getCurrentUser.useQueryState(null).isSuccess;
  const [postFloor, postFloorResult] = api.endpoints.postFloor.useMutation();

  const openDialog = creatingState !== "idle";

  function closeDialog(): void {
    setCreatingState("idle");
  }

  useEffect(() => {
    if (postFloorResult.isSuccess) {
      setCreatingState("idle");
      postFloorResult.reset();
    }
  }, [postFloorResult]);

  function create(): void {
    if (name !== "" && validated) {
      postFloor({ name });
    } else {
      setValidated(false);
    }
  }

  return (
    <>
      {isUserDataLoaded ? (<M3Fab onClick={() => setCreatingState("creating")} sx={{
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
        <M3SurfaceTint sx={{
          backgroundColor: theme.palette.primary.light,
          opacity: theme.opacities.surface3
        }} />
      </M3Fab>) : null}
      <M3Dialog open={openDialog} onClose={closeDialog} heightRem={18.25}>
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
            {postFloorResult.isLoading ?
              <CircularProgress /> :
              (<>
                <M3TextButton onClick={closeDialog}>Cancella</M3TextButton>
                <M3TextButton onClick={create}>Crea</M3TextButton>
              </>)}
          </Stack>
        </Stack>
      </M3Dialog>
    </>
  );
}
