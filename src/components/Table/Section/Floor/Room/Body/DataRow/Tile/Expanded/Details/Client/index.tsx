import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ClientShortData } from "../../../../../../../../../../../api";

type ClientProps = {
  client: ClientShortData
};

export default function Client({ client }: ClientProps): JSX.Element {
  return (
    <Stack spacing={0}>
      <Typography variant="titleMedium">{`${client.name} ${client.surname}`}</Typography>
      <Typography variant="bodySmall">
        {
          `${(new Date(client.dateOfBirth)).toLocaleDateString()} -
          ${client.placeOfBirth} -
          ${client.stateOfBirth}`
        }
      </Typography>
    </Stack>
  );
}
