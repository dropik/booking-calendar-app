import React from "react";
import { hot } from "react-hot-loader";

import "./Sidemenu.css";

function Sidemenu(): JSX.Element {
  return (
    <div className="sidemenu">
      <div className="container">
        <div className="title">
          <h3>Utilità</h3>
        </div>
        <hr color="#252525" />
        <div>Esporta dati polizia</div>
        <div>Esporta ISTAT</div>
        <div>Tassa di soggiorno</div>
        <div>Cerca persona</div></div>
      <div className="fallback"></div>
    </div>
  );
}

export default hot(module)(Sidemenu);
