import React from "react";
import { hot } from "react-hot-loader";

import { useAppSelector } from "../redux/hooks";

type Props = {
  onDateChange: (event: React.FormEvent<HTMLInputElement>) => void
};

function DateInput(props: Props) {
  const currentDate = useAppSelector(state => state.main.currentDate);

  function handleDateChange(event: React.FormEvent<HTMLInputElement>) {
    if (!event.currentTarget.value) {
      event.preventDefault();
    } else {
      props.onDateChange(event);
    }
  }

  return (
    <input
      type="date"
      id="fromDate"
      aria-label="fromDate"
      value={currentDate}
      onChange={handleDateChange}
      pattern="\d{4}-\d{2}-\d{2}"
    />
  );
}

export default hot(module)(DateInput);
