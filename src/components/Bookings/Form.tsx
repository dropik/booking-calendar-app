import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import * as Utils from "../../utils";
import { useCurrentDate } from "../../redux/hooks";

import FromDateInput from "./FromDateInput";
import ToDateInput from "./ToDateInput";

type FormProps = {
  children: (name: string, from: string, to: string, isValid: boolean) => React.ReactNode
};

export default function Form({ children }: FormProps): JSX.Element {
  const theme = useTheme();
  const currentDate = useCurrentDate();
  const [from, setFrom] = useState(currentDate);
  const [to, setTo] = useState(Utils.getDateShift(currentDate, 1));
  const [name, setName] = useState("");
  const [isFromValid, setIsFromValid] = useState(true);
  const [isToValid, setIsToValid] = useState(true);

  const isValid = isFromValid && isToValid;

  return (
    <>
      <Stack spacing={1} sx={{
        position: "fixed",
        width: "25rem",
        boxSizing: "border-box",
        pt: "1rem",
        pb: "1rem",
        zIndex: theme.zIndex.appBar,
        backgroundColor: theme.palette.surface.light
      }}>
        <Stack spacing={1} direction="row">
          <FromDateInput from={from} to={to} setFrom={setFrom} setIsFromValid={setIsFromValid} />
          <ToDateInput from={from} to={to} setTo={setTo} setIsToValid={setIsToValid} />
        </Stack>
        <TextField id="name" label="Nome" onChange={(event) => { setName(event.target.value); }} />
      </Stack>
      {children(name, from, to, isValid)}
    </>
  );
}
