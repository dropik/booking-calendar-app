import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { TileContext } from "../../context";

import MoreButton from "./MoreButton";

export default function HeadlineRow(): JSX.Element {
  const { data } = useContext(TileContext);

  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="headlineMedium">{data.name}</Typography>
      <MoreButton />
    </Stack>
  );
}
