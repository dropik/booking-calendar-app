import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ErrorOutlineOutlined from "@mui/icons-material/ErrorOutlineOutlined";

import { ClientShortData, fetchClientsByTile } from "../../../../../../../../../../api";
import { useAppSelector } from "../../../../../../../../../../redux/hooks";
import { TileContext } from "../../context";

import M3TextButton from "../../../../../../../../../m3/M3TextButton";

type DetailsProps = {
  open: boolean,
  onClose: () => void
};

export default function Details({ open, onClose }: DetailsProps): JSX.Element {
  const { data } = useContext(TileContext);
  const theme = useTheme();
  const [clients, setClients] = useState<ClientShortData[]>([]);

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
    <Collapse in={open} easing={{
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
  );
}
