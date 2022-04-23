import React from "react";
import { TextField } from "@mui/material";

import * as Utils from "../../utils";
import M3DatePicker from "../m3/M3DatePicker";

type Props = {
  label?: string,
  value: string,
  onChange: (newValue: string) => void,
  minValue?: string,
  maxValue?: string
};

export default function DateInput({ label, value, onChange, minValue, maxValue}: Props): JSX.Element {
  return (
    <M3DatePicker
      label={label}
      value={new Date(value)}
      onChange={(date) => {
        if (date) {
          onChange(Utils.dateToString(date));
        }
      }}
      renderInput={(props) => <TextField {...props} />}
      shouldDisableDate={(date) => {
        const dateStr = Utils.dateToString(date);
        if (minValue && Utils.daysBetweenDates(minValue, dateStr) <= 0) {
          return true;
        } else if (maxValue && Utils.daysBetweenDates(maxValue, dateStr) >= 0) {
          return true;
        }
        return false;
      }}
      allowSameDateSelection
    />
  );
}
