import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import SearchOutlined from "@mui/icons-material/SearchOutlined";

import { ClientData, fetchClients } from "../../api";

import DrawerAdjacent from "../m3/DrawerAdjacent";

export default function Clients(): JSX.Element {
  const [query, setQuery] = useState("");
  const [clients, setClients] = useState<ClientData[]>([]);

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
      <Stack spacing={2} sx={{ pr: "1rem" }}>
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
              placeholder="Cerca cliente"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchOutlined />
                  </InputAdornment>
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
        <Stack spacing={1} direction="row">
          {clients.map((client) => (
            <Box key={client.id}>{client.name}</Box>
          ))}
        </Stack>
      </Stack>
    </DrawerAdjacent>
  );
}
