import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import Cancel from "@mui/icons-material/Cancel";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";

import { ClientData, fetchClients } from "../../api";

import DrawerAdjacent from "../m3/DrawerAdjacent";
import M3IconButton from "../m3/M3IconButton";
import M3TextButton from "../m3/M3TextButton";

export default function Clients(): JSX.Element {
  const [query, setQuery] = useState("");
  const [clients, setClients] = useState<ClientData[]>([]);
  const theme = useTheme();

  useEffect(() => {
    if (query === "") {
      setClients([]);
    }
  }, [query]);

  useEffect(() => {
    let isSubscribed = true;

    async function fetchData() {
      if (query !== "") {
        const response = await fetchClients(query);
        if (isSubscribed) {
          setClients(response.data);
        }
      }
    }

    fetchData();

    return () => { isSubscribed = false; };
  }, [query]);

  return (
    <DrawerAdjacent>
      <Stack spacing={2} sx={{ pr: "1rem", pb: "0.5rem" }}>
        <Stack
          spacing={0}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          sx={{ pb: "1rem" }}
        >
          <Typography variant="displaySmall" sx={{ pt: "5rem" }}>Clienti</Typography>
          <Stack spacing={1} direction="row">
            <TextField
              value={query}
              placeholder="Cerca cliente"
              InputProps={{
                endAdornment: query === "" ? (
                  <InputAdornment position="end">
                    <SearchOutlined />
                  </InputAdornment>
                ) : (
                  <M3IconButton onClick={() => setQuery("")}><Cancel /></M3IconButton>
                ),
                sx: {
                  borderRadius: "1.75rem",
                  minWidth: "20rem"
                }
              }}
              onChange={(event) => setQuery(event.target.value)}
            />
          </Stack>
        </Stack>
        <Grid container spacing={0} direction="row" columns={4}>
          {clients.map((client) => {
            const formattedFrom = (new Date(client.booking.from)).toLocaleDateString();
            const formattedTo = (new Date(client.booking.to)).toLocaleDateString();
            const periodStr = `${formattedFrom} - ${formattedTo}`;

            return (
              <Grid item key={client.id} xs={1} >
                <Stack sx={{
                  borderRadius: "0.75rem",
                  border: `1px solid ${theme.palette.outline.light}`,
                  mr: "0.5rem",
                  mb: "0.5rem"
                }}>
                  <Stack sx={{ p: "1rem" }}>
                    <Typography variant="headlineMedium">{`${client.name} ${client.surname}`}</Typography>
                    <Typography variant="titleMedium">{(new Date(client.dateOfBirth).toLocaleDateString())}</Typography>
                    <Stack sx={{ pt: "0.5rem" }} justifyContent="space-between" alignItems="center" direction="row">
                      <Typography variant="bodySmall">
                        {`${client.placeOfBirth ? `${client.placeOfBirth} - ` : ""}${client.stateOfBirth}`}
                      </Typography>
                      <M3IconButton><ExpandMoreOutlined /></M3IconButton>
                    </Stack>
                  </Stack>
                  <Stack spacing={2} sx={{
                    p: "1rem",
                    borderTop: `1px solid ${theme.palette.outline.light}`
                  }}>
                    <Typography variant="titleLarge">Prenotazione</Typography>
                    <Stack sx={{ pl: "1rem" }}>
                      <Typography variant="titleMedium">{client.booking.name}</Typography>
                      <Typography variant="bodySmall">{periodStr}</Typography>
                    </Stack>
                    <Stack alignItems="flex-end">
                      <M3TextButton>Mostra prenotazione</M3TextButton>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </DrawerAdjacent>
  );
}
