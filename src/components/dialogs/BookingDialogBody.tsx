import React from "react";
import { hot } from "react-hot-loader";

import "./BookingDialogBody.css";

function BookingDialogBody(): JSX.Element {
  return (
    <>
      <div className="row">
        <div className="field-label">Da:</div>
        <div><b>02/02/2022</b></div>
      </div>
      <div className="row">
        <div className="field-label">A:</div>
        <div><b>05/02/2022</b></div>
      </div>
      <h4>Stanze</h4>
      <hr />
      <div className="rooms-container">
        <h4 className="room-name">Camera matrimoniale (Camera matrimoniale/doppia)</h4>
        <div className="persons-container">
          <div className="row person button">
            <div>Vasya</div>
            <div>Pupkin</div>
            <div>05/02/1986</div>
          </div>
          <div className="row person button">
            <div>Masha</div>
            <div>Pupkina</div>
            <div>06/02/1987</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default hot(module)(BookingDialogBody);
