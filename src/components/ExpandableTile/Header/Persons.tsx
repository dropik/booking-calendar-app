import React, { useContext } from "react";
import Typography from "@mui/material/Typography";

import { TileContext } from "../../Tile/context";

import M3Skeleton from "../../m3/M3Skeleton";

export default function Persons(): JSX.Element {
  const { data } = useContext(TileContext);
  const personsStr = data ? `${data.persons} person${data.persons === 1 ? "a" : "e"}` : undefined;

  return (
    <Typography variant="titleMedium">{personsStr ? personsStr : <M3Skeleton width="5rem" />}</Typography>
  );
}
