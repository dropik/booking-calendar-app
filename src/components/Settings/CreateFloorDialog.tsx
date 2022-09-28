import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import M3TextButton from "../m3/M3TextButton";
import M3Fab from "../m3/M3Fab";
import { SurfaceTint } from "../m3/Tints";

export default function CreateFloorDialog(): JSX.Element {
  const theme = useTheme();
  const [creatingState, setCreatingState] = useState<"idle" | "creating" | "loading">("idle");

  const openDialog = creatingState !== "idle";

  function closeDialog(): void {
    setCreatingState("idle");
  }

  return (
    <>
      <M3Fab onClick={() => setCreatingState("creating")} sx={{
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
      </M3Fab>
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
                <TextField label="Nome" sx={{ minWidth: "20rem" }} />
              </Stack>
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <M3TextButton onClick={closeDialog}>Cancella</M3TextButton>
                <M3TextButton>Crea</M3TextButton>
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
