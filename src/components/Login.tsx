import React, { useRef } from "react";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

import { api } from "../api";

import M3FilledButton from "./m3/M3FilledButton";
import M3Divider from "./m3/M3Divider";

export default function Login(): JSX.Element {
  const theme = useTheme();
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [auth, authResult] = api.endpoints.postAuthToken.useMutation();

  if (authResult.isSuccess) {
    window.location.href = "/";
  }

  function submitForm(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (!usernameRef.current || !passwordRef.current) return;
    auth({ username: usernameRef.current.value, password: passwordRef.current.value });
  }

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
        <Stack spacing={1} minWidth="26rem" pl="0.5rem" pr="2rem" sx={{ boxSizing: "border-box" }} component="form" onSubmit={submitForm}>
          <Typography variant="headlineMedium" mb="1rem">Log-in</Typography>
          <TextField fullWidth inputRef={usernameRef} name="username" label="Username" />
          <TextField fullWidth inputRef={passwordRef} name="password" type="password" label="Password" />
          <Stack direction="row" width="100%" justifyContent="space-between" alignItems="center">
            <Typography variant="labelMedium" color={theme.palette.error.main}>{authResult.isError ? "Username o password sbagliati" : null}</Typography>
            {authResult.isLoading ? <CircularProgress /> : <M3FilledButton type="submit">Log-in</M3FilledButton>}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
