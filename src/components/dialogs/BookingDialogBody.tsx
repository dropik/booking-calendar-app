import React from "react";
import { hot } from "react-hot-loader";

import "./BookingDialogBody.css";

function BookingDialogBody(): JSX.Element {
  return (
    <>
      <div className="row">
        <div className="field-label">Dal</div>
        <div><b>02/02/2022</b></div>
      </div>
      <div className="row">
        <div className="field-label">Al</div>
        <div><b>05/02/2022</b></div>
      </div>
      <h3 className="sub-header">Stanze</h3>
      <hr />
      <div className="rooms-container">
        <div className="room-container">
          <div className="row">
            <h4>Camera matrimoniale (Camera matrimoniale/doppia) - Non assegnata</h4>
          </div>
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
