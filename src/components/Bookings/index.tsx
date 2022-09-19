import React from "react";
import { Outlet } from "react-router-dom";
import Stack from "@mui/material/Stack";


import Form from "./Form";
import List from "./List";

export default function Bookings(): JSX.Element {
  return (
    <Stack spacing={2} direction="row" sx={{ pr: "1rem" }}>
      <Stack spacing={0} sx={{ width: "25rem" }}>
        <Form>
          {(name, from, to, isValid) => <List name={name} from={from} to={to} isValid={isValid} />}
        </Form>
      </Stack>
      <Outlet />
    </Stack>
  );
}
