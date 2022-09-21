import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setBookingsFormFrom, setBookingsFormName, setBookingsFormTo } from "../../redux/bookingsFormSlice";

import FromDateInput from "./FromDateInput";
import ToDateInput from "./ToDateInput";

type FormProps = {
  children: (name: string, from: string, to: string, isValid: boolean) => React.ReactNode
};

export default function Form({ children }: FormProps): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const from = useAppSelector((state) => state.bookingsForm.from);
  const to = useAppSelector((state) => state.bookingsForm.to);
  const name = useAppSelector((state) => state.bookingsForm.name);
  const [isFromValid, setIsFromValid] = useState(true);
  const [isToValid, setIsToValid] = useState(true);

  const isValid = isFromValid && isToValid;

  function setFrom(value: string): void {
    dispatch(setBookingsFormFrom(value));
  }

  function setTo(value: string): void {
    dispatch(setBookingsFormTo(value));
  }

  function setName(value: string): void {
    dispatch(setBookingsFormName(value));
  }

  return (
    <>
      <Stack spacing={1} sx={{
        position: "sticky",
        boxSizing: "border-box",
        pt: "1rem",
        pb: "1rem",
        zIndex: theme.zIndex.appBar,
        backgroundColor: theme.palette.surface.light,
        borderRadius: "0.75rem"
      }}>
        <Typography variant="displaySmall" sx={{ pt: "5rem", pb: "2rem", textAlign: "center" }}>Prenotazioni</Typography>
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
