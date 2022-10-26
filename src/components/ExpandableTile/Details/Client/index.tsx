import React from "react";
import Stack from "@mui/material/Stack";

import { Client } from "../../../../api";

import FullName from "./FullName";
import BirthInfo from "./BirthInfo";
import ClientContext from "./context";

type ClientProps = {
  client: Client
};

export default function Client({ client }: ClientProps): JSX.Element {
  return (
    <ClientContext.Provider value={client}>
      <Stack>
        <FullName />
        <BirthInfo />
      </Stack>
    </ClientContext.Provider>
  );
}
