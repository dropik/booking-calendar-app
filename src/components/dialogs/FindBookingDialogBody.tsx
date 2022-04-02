import React from "react";
import { hot } from "react-hot-loader";
import DatePicker from "react-datepicker";

import "./FindBookingDialogBody.css";

function FindBookingDialogBody(): JSX.Element {
  return (
    <>
      <div className="row">
        <div>
          <span className="label">Nome / ID:</span>
          <input type={"text"} />
        </div>
        <div>
          <span className="label">Dal:</span>
          <DatePicker
            locale="it"
            dateFormat="dd/MM/yyyy"
            selected={new Date()}
            onChange={() => []}
          />
        </div>
        <div>
          <span className="label">Al:</span>
          <DatePicker
            locale="it"
            dateFormat="dd/MM/yyyy"
            selected={new Date()}
            onChange={() => []}
          />
        </div>
        <div className="button">Cerca</div>
      </div>
      <hr className="search-field-border" />
      <div className="bookings-container">
        <div className="row list-header">
          <div className="id">ID</div>
          <div className="name">Nome</div>
          <div className="from">Dal</div>
          <div className="to">Al</div>
        </div>
        {/* <h3>Nessuna Prenotazione</h3> */}
        <div className="row button">
          <div className="id">#1234</div>
          <div className="name">Ivan Petrov</div>
          <div className="from">02/02/2022</div>
          <div className="to">05/02/2022</div>
        </div>
      </div>
    </>
  );
}

export default hot(module)(FindBookingDialogBody);
