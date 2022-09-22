import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import DrawerAdjacent from "../m3/DrawerAdjacent";
import M3DatePicker from "../m3/M3DatePicker";
import { useCurrentDate } from "../../redux/hooks";
import * as Utils from "../../utils";
import TextField from "@mui/material/TextField";
import M3TextButton from "../m3/M3TextButton";
import { useTheme } from "@mui/material/styles";
import { SurfaceTint } from "../m3/Tints";

export default function Tools(): JSX.Element {
  const currentDate = useCurrentDate();
  const [downloadDate, setDownloadDate] = useState(currentDate);
  const theme = useTheme();

  return (
    <DrawerAdjacent>
      <Stack spacing={2} sx={{ pr: "1rem" }}>
        <Typography variant="displaySmall" sx={{ pt: "4rem" }}>Strumenti</Typography>
        <Stack direction="row" spacing={2}>
          <Stack spacing={2} sx={{
            position: "relative",
            p: "1rem",
            borderRadius: "0.75rem",
            flexShrink: 1
          }}>
            <Typography variant="headlineMedium">Scarica dati</Typography>
            <M3DatePicker
              value={new Date(downloadDate)}
              onChange={(date: Date | null) => {
                if (date) {
                  setDownloadDate(Utils.dateToString(date));
                }
              }}
              renderInput={(props) => <TextField {...props} />}
            />
            <Stack spacing={1} direction="row" justifyContent="flex-end">
              <M3TextButton>Polizia</M3TextButton>
              <M3TextButton>ISTAT</M3TextButton>
            </Stack>
            <SurfaceTint sx={{
              backgroundColor: theme.palette.primary.light,
              opacity: theme.opacities.surface2,
              m: "0 !important"
            }} />
          </Stack>
        </Stack>
      </Stack>
    </DrawerAdjacent>
  );
}
