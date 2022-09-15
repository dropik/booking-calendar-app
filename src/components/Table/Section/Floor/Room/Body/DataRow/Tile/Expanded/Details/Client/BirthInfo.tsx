import React from "react";
import Typography from "@mui/material/Typography";

import { ClientShortData } from "../../../../../../../../../../../api";

type BirthInfoProps = {
  client: ClientShortData
};

export default function BirthInfo({ client }: BirthInfoProps): JSX.Element {
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
