import React from "react";
import Stack from "@mui/material/Stack";

import { ClientShortData } from "../../../../../../../../../../../api";

import FullName from "./FullName";
import BirthInfo from "./BirthInfo";

type ClientProps = {
  client: ClientShortData
};

export default function Client({ client }: ClientProps): JSX.Element {
  return (
    <Stack spacing={0}>
      <FullName client={client} />
      <BirthInfo client={client} />
    </Stack>
  );
}
