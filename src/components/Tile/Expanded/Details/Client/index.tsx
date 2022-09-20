import React from "react";
import Stack from "@mui/material/Stack";

import { ClientShortData } from "../../../../../api";

import FullName from "./FullName";
import BirthInfo from "./BirthInfo";
import ClientContext from "./context";

type ClientProps = {
  client: ClientShortData
};

export default function Client({ client }: ClientProps): JSX.Element {
  return (
    <ClientContext.Provider value={client}>
      <Stack spacing={0}>
        <FullName />
        <BirthInfo />
      </Stack>
    </ClientContext.Provider>
  );
}
