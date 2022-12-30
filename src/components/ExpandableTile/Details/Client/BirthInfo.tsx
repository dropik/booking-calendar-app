import React, { useContext } from "react";
import Typography from "@mui/material/Typography";

import ClientContext from "./context";
import { Utils } from "../../../../utils";

export default function BirthInfo(): JSX.Element {
  const client = useContext(ClientContext);

  return (
    <Typography variant="bodySmall">
      {
        `${(new Date(client.dateOfBirth)).toLocaleDateString()} -
        ${client.placeOfBirth ? Utils.evaluateEntitiesInString(`${client.placeOfBirth}${client.provinceOfBirth ? ` (${client.provinceOfBirth})` : ""} - `) : ""}
        ${client.stateOfBirth}`
      }
    </Typography>
  );
}
