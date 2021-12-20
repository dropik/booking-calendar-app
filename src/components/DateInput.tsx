import React from "react";
import { hot } from "react-hot-loader";

import { useCurrentDate } from "../redux/hooks";

type Props = {
  onDateChange: (event: React.FormEvent<HTMLInputElement>) => void
};

function DateInput(props: Props) {
  const currentDate = useCurrentDate();

  return (
    <input
      type="date"
      id="fromDate"
      aria-label="fromDate"
      value={currentDate}
      onChange={(event: React.FormEvent<HTMLInputElement>) => { handleDateChange(props, event); }}
      pattern="\d{4}-\d{2}-\d{2}"
    />
  );
}

function handleDateChange(props: Props, event: React.FormEvent<HTMLInputElement>) {
  if (!event.currentTarget.value) {
    event.preventDefault();
  } else {
    props.onDateChange(event);
  }
}

export default hot(module)(DateInput);
