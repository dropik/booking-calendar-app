import React, { useContext } from "react";
import Typography from "@mui/material/Typography";

import ClientContext from "./context";

export default function BirthInfo(): JSX.Element {
  const client = useContext(ClientContext);

  return (
    <Typography variant="bodySmall">
      {
        `${(new Date(client.dateOfBirth)).toLocaleDateString()} -
        ${client.placeOfBirth ? `${client.placeOfBirth} - ` : ""}
        ${client.stateOfBirth}`
      }
    </Typography>
  );
}
