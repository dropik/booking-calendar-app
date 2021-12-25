import React from "react";
import { hot } from "react-hot-loader";
import DatePicker, { registerLocale } from "react-datepicker";
import it from "date-fns/locale/it";

import { useCurrentDate } from "../redux/hooks";

import "react-datepicker/dist/react-datepicker.css";
import "./DateInput.css";

registerLocale("it", it);

type Props = {
  onDateChange: (date: Date) => void
};

function DateInput(props: Props): JSX.Element {
  const currentDate = useCurrentDate();

  return (
    <DatePicker
      locale="it"
      dateFormat="dd/MM/yyyy"
      selected={new Date(currentDate)}
      onChange={props.onDateChange}
    />
  );
}

export default hot(module)(DateInput);
