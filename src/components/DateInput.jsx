import React from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function DateInput({ onDateChange }) {
  const currentDate = useSelector(state => state.main.currentDate);

  function handleDateChange(event) {
    if (!event.target.value) {
      event.preventDefault();
    } else {
      onDateChange(event);
    }
  }

  return (
    <input
      type="date"
      id="fromDate"
      value={currentDate}
      onChange={handleDateChange}
    />
  );
}

DateInput.propTypes = {
  onDateChange: PropTypes.func.isRequired
};

export default hot(module)(DateInput);
