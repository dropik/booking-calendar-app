import React, { useContext } from "react";
import Typography from "@mui/material/Typography";

import ClientContext from "./context";
import { Utils } from "../../../../utils";

export default function FullName(): JSX.Element {
  const client = useContext(ClientContext);

  return (
    <Typography variant="titleMedium">{`${Utils.evaluateEntitiesInString(client.name)} ${Utils.evaluateEntitiesInString(client.surname)}`}</Typography>
  );
}
