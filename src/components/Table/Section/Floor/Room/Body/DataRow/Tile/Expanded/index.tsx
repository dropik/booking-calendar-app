import React, { useContext, useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import MoreVertOutlined from "@mui/icons-material/MoreVertOutlined";
import ArrowForwardOutlined from "@mui/icons-material/ArrowForwardOutlined";
import ErrorOutlineOutlined from "@mui/icons-material/ErrorOutlineOutlined";

import * as Utils from "../../../../../../../../../utils";
import { useAppSelector } from "../../../../../../../../../redux/hooks";
import { TileContext } from "../context";
import { TileColor } from "../../../../../../../../../redux/tilesSlice";
import { ClientShortData, fetchClientsByTile } from "../../../../../../../../../api";

import M3IconButton from "../../../../../../../../m3/M3IconButton";
import { SurfaceTint } from "../../../../../../../../m3/Tints";
import M3TextButton from "../../../../../../../../m3/M3TextButton";
import Box from "@mui/material/Box";

type ExpandedProps = {
  anchorEl: HTMLElement | null,
  onClose: () => void
};

export default function Expanded({ anchorEl, onClose }: ExpandedProps): JSX.Element {
  const { data } = useContext(TileContext);
  const theme = useTheme();
  const [clients, setClients] = useState<ClientShortData[]>([]);
  const [openDetails, setOpenDetails] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

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

  const anchorElRect = anchorEl?.getBoundingClientRect();
  const popoverRootPosition = anchorElRect ?
    { top: 0, left: anchorElRect.x + anchorElRect.width / 2 } :
    { top: 0, left: 0 };

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
      onClose={() => {
        setOpenDetails(false);
      }}
      anchorReference="anchorPosition"
      anchorPosition={popoverRootPosition}
      transformOrigin={{
        horizontal: "center",
        vertical: "top"
      }}
      elevation={0}
      transitionDuration={0}
      PaperProps={{
        sx: {
          display: "flex",
          flexDirection: "column-reverse",
          width: `${anchorElWidthRemCaped}rem`,
          height: "calc(100vh - 2rem)",
          maxHeight: "calc(100vh - 2rem)",
          backgroundColor: "transparent",
          overflow: "visible",
          pointerEvents: "none"
        }
      }}
      TransitionProps={{
        onEntered: () => {
          setOpenDetails(true);
        }
      }}
    >
      <Box sx={{
        flexBasis: anchorElRect && headerRef.current ?
          `calc(100vh - 2rem - ${anchorElRect.y - (headerRef.current.getBoundingClientRect().height - anchorElRect.height) / 2}px)` :
          undefined,
        overflow: "visible"
      }}>
        <Box sx={{
          position: "relative",
          borderRadius: "0.75rem",
          backgroundColor: theme.palette.surface.light,
          color: theme.palette.onSurface.light,
          boxShadow: theme.shadows[1],
          pointerEvents: "auto"
        }}>
          <Stack spacing={0} sx={{
            p: "1rem",
            borderRadius: "inherit",
            backgroundColor: theme.palette[`${data.color}Container`].light,
            color: theme.palette[`on${data.color[0].toUpperCase()}${data.color.substring(1)}Container` as `on${Capitalize<TileColor>}Container`].light
          }} ref={headerRef}>
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
          <Collapse in={openDetails} easing={{
            enter: theme.transitions.easing.easeOut,
            exit: theme.transitions.easing.fastOutSlowIn
          }} onExited={() => {
            onClose();
          }}>
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
                <M3TextButton>Mostra prenotazione</M3TextButton>
              </Stack>
            </Stack>
          </Collapse>
          <SurfaceTint sx={{
            backgroundColor: theme.palette.primary.light,
            opacity: theme.opacities.surface1
          }} />
        </Box>
      </Box>
    </Popover>
  );
}
