import React from "react";

import Stack from "@mui/material/Stack";

import M3Divider from "../m3/M3Divider";
import PersonalDataSection from "./PersonalDataSection";
import ChangePasswordSection from "./ChangePasswordSection";

export default function UserTab(): JSX.Element {
  return (
    <Stack spacing={4}>
      <PersonalDataSection />
      <M3Divider />
      <ChangePasswordSection />
    </Stack>
  );
}
