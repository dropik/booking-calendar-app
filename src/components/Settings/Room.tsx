import React from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useAppSelector } from "../../redux/hooks";

import M3IconButton from "../m3/M3IconButton";

type RoomProps = {
  id: string
};

export default function Room({ id }: RoomProps): JSX.Element {
  const theme = useTheme();
  const room = useAppSelector((state) => state.rooms.data[id]);
  const roomType = `${room.type[0].toLocaleUpperCase()}${room.type.slice(1)}`;

  return (
    <Stack direction="row" sx={{
      borderBottom: `1px solid ${theme.palette.outline.light}`,
      p: "1rem",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <Stack direction="row" alignItems="center">
        <Stack direction="row" sx={{ flexBasis: "10rem", flexShrink: 0 }}>
          <Typography variant="titleLarge">{`Camera ${room.number}`}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <M3IconButton sx={{
            borderRadius: "1.25rem",
            border: `1px solid ${theme.palette.outline.light}`
          }}>
            <EditOutlinedIcon />
          </M3IconButton>
          <M3IconButton sx={{
            borderRadius: "1.25rem",
            border: `1px solid ${theme.palette.outline.light}`
          }}>
            <DeleteOutlineOutlinedIcon />
          </M3IconButton>
        </Stack>
      </Stack>
      <Stack direction="row" sx={{
        borderRadius: "0.5rem",
        border: `1px solid ${theme.palette.outline.light}`,
        height: "2rem",
        boxSizing: "border-box",
        alignItems: "center",
        pl: "1rem",
        pr: "1rem"
      }}>
        <Typography variant="labelLarge">{roomType}</Typography>
      </Stack>
    </Stack>
  );
}
