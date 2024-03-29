import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { TileContext } from "../../Tile/context";
import ExpandableTileContext from "../context";

import MoreButton from "./MoreButton";
import M3Skeleton from "../../m3/M3Skeleton";
import { Utils } from "../../../utils";

export default function HeadlineRow(): JSX.Element {
  const { data } = useContext(TileContext);
  const { variant } = useContext(ExpandableTileContext);

  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="headlineMedium">{data ? Utils.evaluateEntitiesInString(data.name) : <M3Skeleton width="10rem" />}</Typography>
      {variant === "popup" ? <MoreButton /> : null}
    </Stack>
  );
}
