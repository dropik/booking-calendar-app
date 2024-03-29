import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import TopAppBar from "..";
import UpperHeader from "../UpperHeader";
import DatesContainer from "./DatesContainer";
import DateInput from "./DateInput";
import PanoramicViewAction from "./PanoramicViewAction";

export default function Calendar(): JSX.Element {
  return (
    <TopAppBar>
      <Stack sx={{
        width: "100%",
        height: "9.5rem"
      }}>
        <UpperHeader actions={[
          <PanoramicViewAction key="panoramicView" />
        ]}>
          <DateInput />
          <Typography variant="titleLarge">
            Booking Calendar
          </Typography>
        </UpperHeader>
        <DatesContainer />
      </Stack>
    </TopAppBar>
  );
}
