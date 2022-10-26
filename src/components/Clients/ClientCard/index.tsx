import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlined from "@mui/icons-material/ExpandLessOutlined";

import { ClientWithBooking } from "../../../api";

import M3IconButton from "../../m3/M3IconButton";
import Details from "./Details";
import M3Skeleton from "../../m3/M3Skeleton";

type ClientCardProps = {
  client?: ClientWithBooking
};

export default function ClientCard({ client }: ClientCardProps): JSX.Element {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Stack sx={{
      borderRadius: "0.75rem",
      border: `1px solid ${theme.palette.outline.light}`,
      mr: "0.5rem",
      mb: "0.5rem",
      overflow: "hidden"
    }}>
      <Stack spacing={2} sx={{ position: "relative", p: "1rem", flexGrow: 1 }}>
        <Stack>
          <Typography variant="headlineMedium">{client ? `${client.name} ${client.surname}` : <M3Skeleton width="10rem" />}</Typography>
          <Typography variant="titleMedium">{client ? (new Date(client.dateOfBirth).toLocaleDateString()) : <M3Skeleton width="6rem" />}</Typography>
        </Stack>
        <Typography variant="bodySmall">
          {client ? `${client.placeOfBirth ? `${client.placeOfBirth} - ` : ""}${client.stateOfBirth}` : <M3Skeleton width="9rem" />}
        </Typography>
        {client ? (
          <M3IconButton sx={{ position: "absolute", right: "1rem", bottom: "0.5rem" }} onClick={() => setOpen(!open)}>
            {open ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
          </M3IconButton>
        ) : null}
      </Stack>
      {client ? (
        <Collapse mountOnEnter unmountOnExit in={open} easing={theme.transitions.easing.fastOutSlowIn}>
          <Details client={client} />
        </Collapse>
      ) : null}
    </Stack>
  );
}
