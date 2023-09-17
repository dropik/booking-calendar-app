import React from "react";
import { Outlet } from "react-router-dom";
import Stack from "@mui/material/Stack";


import DrawerAdjacent from "../m3/DrawerAdjacent";
import Form from "./Form";
import List from "./List";
import TopAppBar from "../TopAppBar";
import UpperHeader from "../TopAppBar/UpperHeader";

export default function Bookings(): JSX.Element {
  return (
    <>
      <TopAppBar>
        <UpperHeader />
      </TopAppBar>
      <DrawerAdjacent>
        <Stack spacing={2} direction="row" sx={{ pr: "1rem" }}>
          <Stack spacing={0} sx={{ flexBasis: "25rem", flexShrink: 0 }}>
            <Form>
              {(name, from, to, isValid) => <List name={name} from={from} to={to} isValid={isValid} />}
            </Form>
          </Stack>
          <Outlet />
        </Stack>
      </DrawerAdjacent>
    </>
  );
}
