import React, { useContext } from "react";
import Typography from "@mui/material/Typography";

import ClientContext from "./context";

export default function FullName(): JSX.Element {
  const client = useContext(ClientContext);

  return (
    <Typography variant="titleMedium">{`${client.name} ${client.surname}`}</Typography>
  );
}
