import React from "react";
import TextField from "@mui/material/TextField";

import * as Utils from "../../utils";

import M3DatePicker from "../m3/M3DatePicker";

type ToDateInputProps = {
  from: string,
  to: string,
  setTo: (value: string) => void,
  setIsToValid: (value: boolean) => void
};

export default function ToDateInput({ from, to, setTo, setIsToValid }: ToDateInputProps): JSX.Element {
  return (
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
  );
}
