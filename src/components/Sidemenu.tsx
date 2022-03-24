import React from "react";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faBuilding, faChartColumn, faMoneyBill, faPerson } from "@fortawesome/free-solid-svg-icons";

import "../globals.css";
import "./Sidemenu.css";

function Sidemenu(): JSX.Element {
  return (
    <div className="sidemenu">
      <div className="container">
        <h3 className="title">
          <span className="icon button"><FontAwesomeIcon icon={faAngleLeft} /></span>
          Utilità
          <span className="icon"></span>
        </h3>
        <hr color="#252525" />
        <div className="group-label">Esporta</div>
        <div className="menu-item button">
          <span className="icon"><FontAwesomeIcon icon={faBuilding} /></span>
          Polizia
        </div>
        <div className="menu-item button">
          <span className="icon"><FontAwesomeIcon icon={faChartColumn} /></span>
          ISTAT
        </div>
        <hr color="#252525" />
        <div className="group-label"> Calcola</div>
        <div className="menu-item button">
          <span className="icon"><FontAwesomeIcon icon={faMoneyBill} /></span>
          Tassa di soggiorno
        </div>
        <hr color="#252525" />
        <div className="group-label">Cerca</div>
        <div className="menu-item button">
          <span className="icon"><FontAwesomeIcon icon={faPerson} /></span>
          Cerca persona
        </div>
      </div>
      <div className="fallback"></div>
    </div>
  );
}

export default hot(module)(Sidemenu);
