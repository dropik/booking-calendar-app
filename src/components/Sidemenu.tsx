import React, { useRef } from "react";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faBuilding, faChartColumn, faMoneyBill, faPerson } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as SidemenuSlice from "../redux/sidemenuSlice";
import * as DialogSlice from "../redux/dialogSlice";

import "../globals.css";
import "./Sidemenu.css";

function Sidemenu(): JSX.Element {
  const dispatch = useAppDispatch();
  const showed = useAppSelector((state) => state.sidemenu.showed);
  const sidemenuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function hideMenu() {
    if (sidemenuRef.current) {
      sidemenuRef.current.classList.add("hide");
    }
    if (containerRef.current) {
      containerRef.current.classList.add("hide");
    }
  }

  function handleSidemenuAnimationEnd() {
    if (sidemenuRef.current) {
      if (sidemenuRef.current.classList.contains("show")) {
        sidemenuRef.current.classList.remove("show");
      } else if (sidemenuRef.current.classList.contains("hide")) {
        dispatch(SidemenuSlice.hide());
      }
    }
  }

  function handleContainerAnimationEnd() {
    if (containerRef.current) {
      containerRef.current.classList.remove("show");
    }
  }

  function showDialog(dialog: DialogSlice.DialogType) {
    dispatch(DialogSlice.show({ dialogType: dialog }));
  }

  if (!showed) {
    return <></>;
  }

  return (
    <div ref={sidemenuRef} onAnimationEnd={handleSidemenuAnimationEnd} className="sidemenu show">
      <div ref={containerRef} onAnimationEnd={handleContainerAnimationEnd} className="container show">
        <h3 className="title">
          <span className="icon button" onClick={hideMenu}><FontAwesomeIcon icon={faAngleLeft} /></span>
          Utilità
          <span className="icon"></span>
        </h3>
        <hr color="#252525" />
        <div className="group-label">Esporta</div>
        <div className="menu-item button" onClick={() => { showDialog("police"); }}>
          <span className="icon"><FontAwesomeIcon icon={faBuilding} /></span>
          Polizia
        </div>
        <div className="menu-item button" onClick={() => { showDialog("istat"); }}>
          <span className="icon"><FontAwesomeIcon icon={faChartColumn} /></span>
          ISTAT
        </div>
        <hr color="#252525" />
        <div className="group-label"> Calcola</div>
        <div className="menu-item button" onClick={() => { showDialog("cityTax"); }}>
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
      <div className="fallback" onClick={hideMenu}></div>
    </div>
  );
}

export default hot(module)(Sidemenu);
