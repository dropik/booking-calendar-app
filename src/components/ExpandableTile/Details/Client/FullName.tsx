import React, { useContext } from "react";
import Typography from "@mui/material/Typography";

import ClientContext from "./context";
import { evaluateEntitiesInString } from "../../../../utils";

export default function FullName(): JSX.Element {
  const client = useContext(ClientContext);

  return (
    <Typography variant="titleMedium">{`${evaluateEntitiesInString(client.name)} ${evaluateEntitiesInString(client.surname)}`}</Typography>
  );
}
