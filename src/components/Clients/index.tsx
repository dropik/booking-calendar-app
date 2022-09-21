import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchOutlined from "@mui/icons-material/SearchOutlined";

import DrawerAdjacent from "../m3/DrawerAdjacent";
import InputAdornment from "@mui/material/InputAdornment";

export default function Clients(): JSX.Element {
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
            />
          </Stack>
        </Stack>
      </Stack>
    </DrawerAdjacent>
  );
}
