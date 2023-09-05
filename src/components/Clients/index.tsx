import React, { useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import Cancel from "@mui/icons-material/Cancel";

import { api } from "../../api";
import { useAppSelector } from "../../redux/hooks";

import DrawerAdjacent from "../m3/DrawerAdjacent";
import M3IconButton from "../m3/M3IconButton";
import ClientCard from "./ClientCard";
import { Utils } from "../../utils";

export default function Clients(): JSX.Element {
  const [query, setQuery] = useState("");
  const { data: loadedClients, isFetching, isSuccess: isLoaded } = api.endpoints.getClientsByQuery.useQuery(
    { query, from: Utils.getDateShift(new Date(), -180), to: Utils.dateToString(new Date()) },    // hard coding from and to until a better solution for fetching clients
    { skip: query === "" },
  );
  const drawerOpened = useAppSelector((state) => state.drawer.open);
  const skeletonClients = [0, 1];
  const clients = query === "" || !isLoaded ? [] : loadedClients;

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
          <Typography variant="displayLarge" sx={{ pt: "4rem", pl: "1rem" }}>Clienti</Typography>
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
        <Box sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${drawerOpened ? 3 : 4}, 1fr)`
        }}>
          {clients.map((client) => <ClientCard key={client.id} client={client} />)}
          {isFetching ? skeletonClients.map((client) => <ClientCard key={client} />) : null}
        </Box>
      </Stack>
    </DrawerAdjacent>
  );
}
