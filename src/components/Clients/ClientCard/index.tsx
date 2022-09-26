import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlined from "@mui/icons-material/ExpandLessOutlined";

import { ClientData } from "../../../api";

import M3IconButton from "../../m3/M3IconButton";
import Details from "./Details";

type ClientCardProps = {
  client: ClientData
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
          <Typography variant="headlineMedium">{`${client.name} ${client.surname}`}</Typography>
          <Typography variant="titleMedium">{(new Date(client.dateOfBirth).toLocaleDateString())}</Typography>
        </Stack>
        <Typography variant="bodySmall">
          {`${client.placeOfBirth ? `${client.placeOfBirth} - ` : ""}${client.stateOfBirth}`}
        </Typography>
        <M3IconButton sx={{ position: "absolute", right: "1rem", bottom: "0.5rem" }} onClick={() => setOpen(!open)}>
          {open ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
        </M3IconButton>
      </Stack>
      <Collapse mountOnEnter unmountOnExit in={open} easing={theme.transitions.easing.fastOutSlowIn}>
        <Details bookingId={client.bookingId} />
      </Collapse>
    </Stack>
  );
}
