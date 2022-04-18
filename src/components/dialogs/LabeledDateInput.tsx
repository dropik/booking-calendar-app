import React from "react";
import DatePicker from "react-datepicker";

import * as Utils from "../../utils";

type Props = {
  id: string,
  label: string,
  isValid: boolean,
  value: string,
  onChange: (newValue: string) => void
};

export default function LabeledDateInput({ id, label, isValid, value, onChange}: Props): JSX.Element {
  return (
    <div>
      <label htmlFor={id} className="label">{label}:</label>
      <DatePicker
        id={id}
        className={isValid ? "" : "invalid"}
        locale="it"
        dateFormat="dd/MM/yyyy"
        selected={new Date(value)}
        onChange={(date: Date) => { onChange(Utils.dateToString(date)); }}
      />
    </div>
  );
}
