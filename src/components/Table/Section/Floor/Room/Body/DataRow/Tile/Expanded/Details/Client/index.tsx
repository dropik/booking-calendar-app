import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ClientShortData } from "../../../../../../../../../../../api";

import FullName from "./FullName";

type ClientProps = {
  client: ClientShortData
};

export default function Client({ client }: ClientProps): JSX.Element {
  return (
    <Stack spacing={0}>
      <FullName client={client} />
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
