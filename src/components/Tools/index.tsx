import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import DrawerAdjacent from "../m3/DrawerAdjacent";

export default function Tools(): JSX.Element {
  return (
    <DrawerAdjacent>
      <Stack spacing={2} sx={{ pr: "1rem" }}>
        <Typography variant="displaySmall" sx={{ pt: "4rem" }}>Strumenti</Typography>
      </Stack>
    </DrawerAdjacent>
  );
}
