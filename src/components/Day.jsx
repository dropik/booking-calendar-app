import React from "react";
import { hot } from "react-hot-loader";
import PropTyeps from "prop-types";

import "./Day.css";

function Day({ day }) {
  return (
    <div className="day">
      <b>{day}</b>
    </div>
  );
}

Day.propTypes = {
  day: PropTyeps.string.isRequired
};

export default hot(module)(Day);
