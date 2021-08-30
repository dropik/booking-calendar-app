import React from 'react';
import { hot } from 'react-hot-loader';
import { useSelector } from 'react-redux';

function DateInput(props) {
  const currentDate = useSelector(state => state.currentDate.value);

  function handleDateChange(event) {
    if (!event.target.value) {
      event.preventDefault();
    } else {
      props.onDateChange(event);
    }
  }

  return (
    <input type="date" id="fromDate" value={currentDate} onChange={handleDateChange} />
  );
}

export default hot(module)(DateInput);