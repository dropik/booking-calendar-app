import React from "react";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { Floor } from "../../redux/floorsSlice";

import M3FilledButton from "../m3/M3FilledButton";
import M3IconButton from "../m3/M3IconButton";
import { SurfaceTint } from "../m3/Tints";
import Room from "./Room";

type FloorProps = {
  floor: Floor
};

export default function Floor({ floor }: FloorProps): JSX.Element {
  const theme = useTheme();

  const floorName = `${floor.name[0].toLocaleUpperCase()}${floor.name.slice(1)}`;

  return (
    <Stack>
      <Paper elevation={1} sx={{ p: "1rem", position: "relative", borderRadius: "0.75rem" }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="headlineLarge">{floorName}</Typography>
            <Stack direction="row" justifyContent="space-between">
              <M3IconButton><EditOutlinedIcon /></M3IconButton>
              <M3IconButton><DeleteOutlineOutlinedIcon /></M3IconButton>
            </Stack>
          </Stack>
          <Stack direction="row">
            <M3FilledButton>Crea camera</M3FilledButton>
          </Stack>
        </Stack>
        <SurfaceTint sx={{
          backgroundColor: theme.palette.primary.light,
          opacity: theme.opacities.surface1
        }} />
      </Paper>
      <Stack>
        {floor.roomIds.map((roomId) => <Room key={roomId} id={roomId} />)}
      </Stack>
    </Stack>
  );
}
