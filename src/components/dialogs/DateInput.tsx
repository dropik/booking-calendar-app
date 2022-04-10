import React from "react";
import { hot } from "react-hot-loader";
import DatePicker from "react-datepicker";

import * as Utils from "../../utils";

type Props = {
  value: string,
  onChange: (newValue: string) => void
};

function DateInput({ value, onChange }: Props): JSX.Element {
  return (
    <div>
      <DatePicker
        locale="it"
        dateFormat="dd/MM/yyyy"
        selected={new Date(value)}
        onChange={(date: Date) => onChange(Utils.dateToString(date))}
      />
    </div>
  );
}

export default hot(module)(DateInput);
