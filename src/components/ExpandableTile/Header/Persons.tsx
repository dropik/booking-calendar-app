import React, { useContext } from "react";
import Typography from "@mui/material/Typography";

import { TileContext } from "../../Tile/context";

export default function Persons(): JSX.Element {
  const { data } = useContext(TileContext);
  const personsStr = `${data.persons} person${data.persons === 1 ? "a" : "e"}`;

  return (
    <Typography variant="titleMedium">{personsStr}</Typography>
  );
}
