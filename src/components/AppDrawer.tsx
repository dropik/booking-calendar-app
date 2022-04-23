import React, { useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BookIcon from "@mui/icons-material/Book";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import PersonIcon from "@mui/icons-material/Person";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as DrawerSlice from "../redux/drawerSlice";
import * as DialogSlice from "../redux/dialogSlice";

import "../globals.css";
import "./AppDrawer.css";

export default function AppDrawer(): JSX.Element {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.drawer.open);
  const drawerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function close() {
    if (drawerRef.current) {
      drawerRef.current.classList.add("hide");
    }
    if (containerRef.current) {
      containerRef.current.classList.add("hide");
    }
  }

  function handleDrawerAnimationEnd() {
    if (drawerRef.current) {
      if (drawerRef.current.classList.contains("show")) {
        drawerRef.current.classList.remove("show");
      } else if (drawerRef.current.classList.contains("hide")) {
        dispatch(DrawerSlice.close());
      }
    }
  }

  function handleContainerAnimationEnd() {
    if (containerRef.current) {
      containerRef.current.classList.remove("show");
    }
  }

  function showDialog(dialog: DialogSlice.ZeroParameterDialog) {
    dispatch(DialogSlice.show({ dialogType: dialog }));
  }

  if (!open) {
    return <></>;
  }

  return (
    <div ref={drawerRef} onAnimationEnd={handleDrawerAnimationEnd} className="drawer show">
      <div ref={containerRef} onAnimationEnd={handleContainerAnimationEnd} className="container show">
        <h3 className="title">
          <span className="icon button" onClick={close}><ArrowBackIcon /></span>
          Utilità
          <span className="icon"></span>
        </h3>
        <hr color="#252525" />
        <div className="group-label">Esporta</div>
        <div className="menu-item button" onClick={() => { showDialog("police"); }}>
          <span className="icon"><LocalPoliceIcon /></span>
          Polizia
        </div>
        <div className="menu-item button" onClick={() => { showDialog("istat"); }}>
          <span className="icon"><QueryStatsIcon /></span>
          ISTAT
        </div>
        <hr color="#252525" />
        <div className="group-label"> Calcola</div>
        <div className="menu-item button" onClick={() => { showDialog("cityTax"); }}>
          <span className="icon"><AttachMoneyIcon /></span>
          Tassa di soggiorno
        </div>
        <hr color="#252525" />
        <div className="group-label">Cerca</div>
        <div className="menu-item button" onClick={() => { showDialog("findBooking"); }}>
          <span className="icon"><BookIcon /></span>
          Prenotazione
        </div>
        <div className="menu-item button" onClick={() => { showDialog("findClient"); }}>
          <span className="icon"><PersonIcon /></span>
          Cliente
        </div>
      </div>
      <div className="fallback" onClick={close}></div>
    </div>
  );
}
