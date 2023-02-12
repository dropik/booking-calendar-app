import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";

import M3Chip from "../m3/M3Chip";
import M3Dialog from "../m3/M3Dialog";
import M3Skeleton from "../m3/M3Skeleton";
import M3Divider from "../m3/M3Divider";
import M3TextButton from "../m3/M3TextButton";

export default function IstatTools(): JSX.Element {
  const theme = useTheme();
  const [selected, setSelected] = useState(false);

  function open(): void {
    setSelected(true);
  }

  function close(): void {
    setSelected(false);
  }

  return (
    <>
      <M3Chip selected={selected} onClick={open} label="ISTAT" />
      <M3Dialog open={selected} onClose={close} heightRem={24.875} transitionDuration={theme.transitions.duration.medium4}>
        <Stack spacing={3} sx={{ p: "1.5rem", minWidth: "45rem", }}>
          <Stack spacing={2} alignItems="center">
            <AddchartOutlinedIcon />
            <Typography variant="headlineSmall">ISTAT</Typography>
            <Stack direction="column" spacing={0} sx={{ width: "100%" }}>
              <Stack direction="row" spacing={2} alignItems="flex-end">
                <Typography variant="labelLarge" width="9rem">Data:</Typography>
                <Typography variant="titleMedium"><M3Skeleton width="6rem" /></Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="flex-end">
                <Typography variant="labelLarge" width="9rem">Presenze precedenti:</Typography>
                <Typography variant="titleMedium"><M3Skeleton width="6rem" /></Typography>
              </Stack>
            </Stack>
            <Stack direction="column" spacing={0} sx={{ width: "100%" }}>
              <Stack direction="row" sx={{ width: "100%" }}>
                <Typography variant="titleLarge" textAlign="center" sx={{ flexBasis: "50%" }}>Italiani</Typography>
                <Typography variant="titleLarge" textAlign="center" sx={{ flexBasis: "50%" }}>Stranieri</Typography>
              </Stack>
              <Box sx={{ position: "relative", width: "100%", height: "1px", mt: "0.5rem" }}>
                <M3Divider sx={{ position: "absolute", margin: 0, left: "-1.5rem", right: "-1.5rem" }} />
              </Box>
              <Stack direction="row" sx={{ width: "100%", }}>
                <Stack direction="column" sx={{
                  flexBasis: "50%",
                  borderRight: `1px solid ${theme.palette.outline.main}`
                }}>
                  <Stack direction="row" sx={{ width: "100%", py: "0.25rem" }}>
                    <Typography variant="titleSmall" textAlign="center" sx={{ flexBasis: "50%"}}>Targa</Typography>
                    <Typography variant="titleSmall" textAlign="center" sx={{ flexBasis: "25%" }}>Arrivi</Typography>
                    <Typography variant="titleSmall" textAlign="center" sx={{ flexBasis: "25%" }}>Partenze</Typography>
                  </Stack>
                  <Stack direction="column" spacing={0} sx={{ maxHeight: "10rem", overflowY: "overlay", px: "1rem" }}>
                    <Typography variant="titleMedium" sx={{ width: "100%" }}><M3Skeleton /></Typography>
                    <Typography variant="titleMedium" sx={{ width: "100%" }}><M3Skeleton /></Typography>
                    <Typography variant="titleMedium" sx={{ width: "100%", mb: "0.25rem" }}><M3Skeleton /></Typography>
                  </Stack>
                </Stack>
                <Stack direction="column" sx={{ flexBasis: "50%" }}>
                  <Stack direction="row" sx={{ width: "100%", py: "0.25rem" }}>
                    <Typography variant="titleSmall" textAlign="center" sx={{ flexBasis: "50%"}}>Targa</Typography>
                    <Typography variant="titleSmall" textAlign="center" sx={{ flexBasis: "25%" }}>Arrivi</Typography>
                    <Typography variant="titleSmall" textAlign="center" sx={{ flexBasis: "25%" }}>Partenze</Typography>
                  </Stack>
                  <Stack direction="column" spacing={0} sx={{ maxHeight: "10rem", overflowY: "overlay", px: "1rem" }}>
                    <Typography variant="titleMedium" sx={{ width: "100%" }}><M3Skeleton /></Typography>
                    <Typography variant="titleMedium" sx={{ width: "100%" }}><M3Skeleton /></Typography>
                    <Typography variant="titleMedium" sx={{ width: "100%", mb: "0.25rem" }}><M3Skeleton /></Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Box sx={{ position: "relative", width: "100%", height: "1px" }}>
                <M3Divider sx={{ position: "absolute", margin: 0, left: "-1.5rem", right: "-1.5rem" }} />
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ width: "100%" }} justifyContent="flex-end">
              <M3TextButton onClick={close}>Cancella</M3TextButton>
              <M3TextButton>Esporta</M3TextButton>
            </Stack>
          </Stack>
        </Stack>
      </M3Dialog>
    </>
  );
}
