import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import Cancel from "@mui/icons-material/Cancel";

import { ClientData, fetchClients } from "../../api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { show as showMessage } from "../../redux/snackbarMessageSlice";

import DrawerAdjacent from "../m3/DrawerAdjacent";
import M3IconButton from "../m3/M3IconButton";
import ClientCard from "./ClientCard";

export default function Clients(): JSX.Element {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const [clients, setClients] = useState<ClientData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const drawerOpened = useAppSelector((state) => state.drawer.open);
  const skeletonClients = [0, 1];

  useEffect(() => {
    if (query === "") {
      setClients([]);
    }
  }, [query]);

  useEffect(() => {
    let isSubscribed = true;

    async function fetchData() {
      try {
        const response = await fetchClients(query);
        if (isSubscribed) {
          setClients(response.data);
        }
      } catch(error) {
        dispatch(showMessage({ type: "error" }));
      } finally {
        setIsLoading(false);
      }
    }

    if (query !== "") {
      setIsLoading(true);
      fetchData();
    }

    return () => { isSubscribed = false; };
  }, [dispatch, query]);

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
          {(isLoading && clients.length === 0) ?
            skeletonClients.map((client) => <ClientCard key={client} />) :
            clients.map((client) => <ClientCard key={client.id} client={client} />)}
        </Box>
      </Stack>
    </DrawerAdjacent>
  );
}
