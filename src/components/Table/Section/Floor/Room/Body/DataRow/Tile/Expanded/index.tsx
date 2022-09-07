import React, { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MoreVertOutlined from "@mui/icons-material/MoreVertOutlined";

import * as Utils from "../../../../../../../../../utils";
import { TileContext } from "../context";
import { TileColor } from "../../../../../../../../../redux/tilesSlice";

import M3IconButton from "../../../../../../../../m3/M3IconButton";
import { SurfaceTint } from "../../../../../../../../m3/Tints";
import { ClientShortData } from "../../../../../../../../../api";

type ExpandedProps = {
  anchorEl: HTMLElement | null,
  onClose: () => void
};

export default function Expanded({ anchorEl, onClose }: ExpandedProps): JSX.Element {
  const { data } = useContext(TileContext);
  const theme = useTheme();

  const clients: ClientShortData[] = [
    {
      id: "0",
      name: "Ivan",
      surname: "Petrov",
      dateOfBirth: "1986/08/05",
      placeOfBirth: "Canazei (TN)",
      stateOfBirth: "Italia",
      bookingId: "0",
      bookingName: "Ivan Petrov"
    },
    {
      id: "1",
      name: "Vasya",
      surname: "Pupkin",
      dateOfBirth: "1986/08/05",
      placeOfBirth: "Canazei (TN)",
      stateOfBirth: "Italia",
      bookingId: "0",
      bookingName: "Ivan Petrov"
    }
  ];

  const open = Boolean(anchorEl);
  const id = open ? "expanded-tile" : undefined;
  const anchorElWidthPx = anchorEl ? anchorEl.getBoundingClientRect().width : 0;
  const anchorElWidthRem = Utils.pxToRem(anchorElWidthPx);
  const anchorElWidthRemCaped = Math.max(anchorElWidthRem, 22.5);

  const personsStr = `${data.persons} person${data.persons === 1 ? "a" : "e"}`;
  const formattedFrom = (new Date(data.from)).toLocaleDateString();
  const formattedTo = (new Date(Utils.getDateShift(data.from, data.nights))).toLocaleDateString();
  const periodStr = `${formattedFrom} - ${formattedTo}`;
  const formattedRoomType = `${data.entity[0].toLocaleUpperCase()}${data.entity.slice(1)}`;

  return (
    <Popover
      id={id}
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "center"
      }}
      transformOrigin={{
        horizontal: "center",
        vertical: "center"
      }}
      elevation={1}
      marginThreshold={0}
      PaperProps={{
        sx: {
          width: `${anchorElWidthRemCaped}rem`,
          borderRadius: "0.75rem",
          backgroundColor: theme.palette.surface.light,
          color: theme.palette.onSurface.light
        }
      }}
    >
      <Stack spacing={0} sx={{
        p: "1rem",
        borderRadius: "inherit",
        backgroundColor: theme.palette[`${data.color}Container`].light,
        color: theme.palette[`on${data.color[0].toUpperCase()}${data.color.substring(1)}Container` as `on${Capitalize<TileColor>}Container`].light
      }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="headlineMedium">{data.name}</Typography>
          <M3IconButton><MoreVertOutlined /></M3IconButton>
        </Stack>
        <Typography variant="titleMedium">{personsStr}</Typography>
        <Stack sx={{ pt: "0.5rem" }}>
          <Typography variant="bodySmall">{periodStr}</Typography>
          <Typography variant="bodySmall">{formattedRoomType}</Typography>
          {data.roomNumber ? (
            <Typography variant="bodySmall">{`Camera ${data.roomNumber}`}</Typography>
          ) : null}
        </Stack>
      </Stack>
      <Stack spacing={1} sx={{ p: "1rem" }}>
        <Typography variant="titleLarge">Ospiti</Typography>
        <Stack spacing={1} sx={{ p: "1rem" }}>
          {clients.map((client) => (
            <Stack key={client.id} spacing={0}>
              <Typography variant="titleMedium">{`${client.name} ${client.surname}`}</Typography>
              <Typography variant="bodySmall">
                {
                  `${(new Date(client.dateOfBirth)).toLocaleDateString()} -
                  ${client.placeOfBirth} -
                  ${client.stateOfBirth}`
                }
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <SurfaceTint sx={{
        backgroundColor: theme.palette.primary.light,
        opacity: theme.opacities.surface1
      }} />
    </Popover>
  );
}
