import React from "react";
import Stack from "@mui/material/Stack";

import TopAppBar from "..";
import UpperHeader from "./UpperHeader";
import DatesContainer from "./DatesContainer";

export default function Calendar(): JSX.Element {
  return (
    <TopAppBar>
      <Stack sx={{
        width: "100%",
        height: "9.5rem"
      }}>
        <UpperHeader />
        <DatesContainer />
      </Stack>
    </TopAppBar>
  );
}
