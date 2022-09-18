import React from "react";
import TextField from "@mui/material/TextField";

import * as Utils from "../../utils";

import M3DatePicker from "../m3/M3DatePicker";

type FromDateInputProps = {
  from: string,
  to: string,
  setFrom: (value: string) => void,
  setIsFromValid: (value: boolean) => void
};

export default function FromDateInput({ from, to, setFrom, setIsFromValid }: FromDateInputProps): JSX.Element {
  return (
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
  );
}
