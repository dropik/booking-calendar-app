import React, { useContext, useEffect, useState } from "react";
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
import { ClientShortData, fetchClientsByTile } from "../../../../../../../../../api";
import { useAppSelector } from "../../../../../../../../../redux/hooks";
import { ArrowForwardOutlined, ErrorOutlineOutlined } from "@mui/icons-material";
import M3TextButton from "../../../../../../../../m3/M3TextButton";

type ExpandedProps = {
  anchorEl: HTMLElement | null,
  onClose: () => void
};

export default function Expanded({ anchorEl, onClose }: ExpandedProps): JSX.Element {
  const { data } = useContext(TileContext);
  const theme = useTheme();
  const [clients, setClients] = useState<ClientShortData[]>([]);

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

  const errorType: "none" | "error" | "warning" = useAppSelector((state) => {
    if (data.roomNumber) {
      let assignedRoomType = "";
      for (const floor of state.hotel.data.floors) {
        for (const room of floor.rooms) {
          if (room.number === data.roomNumber) {
            assignedRoomType = room.type;
            break;
          }
        }
        if (assignedRoomType !== "") {
          break;
        }
      }
      const roomTypeAcceptedPersonsCount = state.roomTypes.data[assignedRoomType];
      if (roomTypeAcceptedPersonsCount) {
        if (!roomTypeAcceptedPersonsCount.includes(data.persons)) {
          return "error";
        }
      }

      if (assignedRoomType !== data.roomType) {
        return "warning";
      }
    }

    return "none";
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetchClientsByTile(data.id);
      setClients(response.data);
    }
    fetchData().catch();
  }, [data.id]);

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
        {errorType !== "none" ? (
          <Stack spacing={1} direction="row" sx={{
            color: errorType === "error" ? theme.palette.error.light : theme.palette.warning.dark
          }}>
            <ErrorOutlineOutlined />
            <Typography variant="bodySmall">
              {errorType === "error" ?
                "La stanza assegnata all'occupazione non è dedicata a questa quantità degli ospiti." :
                "La tipologia della stanza assegnata non coincide con quella richiesta dall'occupazione."
              }
            </Typography>
          </Stack>
        ) : null}
        <Typography variant="titleLarge">Ospiti</Typography>
        <Stack spacing={1} sx={{ pr: "1rem", pl: "1rem" }}>
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
        <Stack direction="row" justifyContent="end">
          <M3TextButton startIcon={<ArrowForwardOutlined />}>Prenotazione</M3TextButton>
        </Stack>
      </Stack>
      <SurfaceTint sx={{
        backgroundColor: theme.palette.primary.light,
        opacity: theme.opacities.surface1
      }} />
    </Popover>
  );
}
