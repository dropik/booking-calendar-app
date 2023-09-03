import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import M3FilledButton from "./m3/M3FilledButton";
import M3Divider from "./m3/M3Divider";

export default function Login(): JSX.Element {
  return (
    <Box sx={{
      width: "100vw",
      height: "100vh",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Stack direction="row" spacing={6} alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center" mb="2rem">
          <Box sx={{
            backgroundImage: "url(/assets/avatar.svg)",
            backgroundPosition: "center",
            backgroundSize: "contain",
            width: "56px",
            height: "56px",
            borderRadius: "28px",
          }}></Box>
          <Typography variant="displayMedium">Booking Calendar</Typography>
        </Stack>
        <M3Divider orientation="vertical" sx={{ height: "15rem" }} />
        <Stack spacing={1} minWidth="30rem" pl="0.5rem" pr="4rem" sx={{ boxSizing: "border-box" }}>
          <Typography variant="headlineMedium" mb="1rem">Log-in</Typography>
          <TextField fullWidth name="username" label="Username" />
          <TextField fullWidth name="password" type="password" label="Password" />
          <Stack direction="row" width="100%" justifyContent="flex-end">
            <M3FilledButton>Log-in</M3FilledButton>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
