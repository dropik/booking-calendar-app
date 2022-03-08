import React from "react";
import { hot } from "react-hot-loader";

import "./SaveAndReset.css";

function SaveAndReset(): JSX.Element {
  return (
    <div className="save-and-reset">
      <div className="button reset">Reset</div>
      <div className="button save">Salva</div>
    </div>
  );
}

export default hot(module)(SaveAndReset);
