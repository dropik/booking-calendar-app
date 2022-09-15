import React from "react";
import Typography from "@mui/material/Typography";

import { ClientShortData } from "../../../../../../../../../../../api";

type FullNameProps = {
  client: ClientShortData
};

export default function FullName({ client }: FullNameProps): JSX.Element {
  return (
    <Typography variant="titleMedium">{`${client.name} ${client.surname}`}</Typography>
  );
}
