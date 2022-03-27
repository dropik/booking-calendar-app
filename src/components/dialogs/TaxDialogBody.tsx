import React from "react";
import { hot } from "react-hot-loader";
import DatePicker from "react-datepicker";

import "./TaxDialogBody.css";

function TaxDialogBody(): JSX.Element {
  return (
    // <div className="row">
    //   {/* <div>
    //     <span className="label">Da:</span>
    //     <DatePicker locale="it" dateFormat="dd/MM/yyyy" selected={new Date()} onChange={() => []} />
    //   </div>
    //   <div>
    //     <span className="label">A:</span>
    //     <DatePicker locale="it" dateFormat="dd/MM/yyyy" selected={new Date()} onChange={() => []} />
    //   </div>
    //   <div className="button">Calcola</div> */}
    //   {/* <div className="message">Calcolo...</div> */}
    // </div>
    <div className="table">
      <div className="row">
        <div>Standard:</div>
        <div><b>100</b></div>
      </div>
      <div className="row">
        <div>Ragazzi sotto 14 anni:</div>
        <div><b>12</b></div>
      </div>
      <div className="row">
        <div>Permanenze oltre 10 giorni:</div>
        <div><b>2</b></div>
      </div>
      <div className="row centered">
        <div className="button">OK</div>
      </div>
    </div>
  );
}

export default hot(module)(TaxDialogBody);
