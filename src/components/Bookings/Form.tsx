import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import * as Utils from "../../utils";
import { useCurrentDate } from "../../redux/hooks";

import M3DatePicker from "../m3/M3DatePicker";

type FormProps = {
  children: (name: string, from: string, to: string, isValid: boolean) => React.ReactNode
};

export default function Form({ children }: FormProps): JSX.Element {
  const currentDate = useCurrentDate();
  const [from, setFrom] = useState(currentDate);
  const [to, setTo] = useState(Utils.getDateShift(currentDate, 1));
  const [name, setName] = useState("");
  const [isFromValid, setIsFromValid] = useState(true);
  const [isToValid, setIsToValid] = useState(true);

  const isValid = isFromValid && isToValid;

  return (
    <>
      <Stack spacing={1} sx={{ pt: "1rem", pb: "1rem" }}>
        <Stack spacing={1} direction="row">
          <M3DatePicker
            value={new Date(from)}
            onChange={(date: Date | null) => {
              if (date) {
                setFrom(Utils.dateToString(date));
                setIsFromValid(false);
              }
            }}
            onAccept={() => setIsFromValid(true)}
            onError={(reason) => setIsFromValid(reason === null)}
            renderInput={({ error, ...props }) => (
              <TextField
                {...props}
                id="from"
                label="Dal"
                onBlur={() => setIsFromValid(!error)}
                error={error}
                helperText={error ? "Periodo non valido" : null}
              />
            )}
            shouldDisableDate={(date) => {
              return Utils.daysBetweenDates(Utils.dateToString(date), to) < 0;
            }}
          />
          <M3DatePicker
            value={new Date(to)}
            onChange={(date: Date | null) => {
              if (date) {
                setTo(Utils.dateToString(date));
                setIsToValid(false);
              }
            }}
            onAccept={() => setIsToValid(true)}
            onError={(reason) => setIsToValid(reason === null)}
            renderInput={({ error, ...props }) => (
              <TextField
                {...props}
                id="to"
                label="Al"
                onBlur={() => setIsToValid(!error)}
                error={error}
                helperText={error ? "Periodo non valido" : null}
              />
            )}
            shouldDisableDate={(date) => {
              return Utils.daysBetweenDates(from, Utils.dateToString(date)) < 0;
            }}
          />
        </Stack>
        <TextField id="name" label="Nome" onChange={(event) => { setName(event.target.value); }} />
      </Stack>
      {children(name, from, to, isValid)}
    </>
  );
}
