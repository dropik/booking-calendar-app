import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BookIcon from "@mui/icons-material/Book";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import PersonIcon from "@mui/icons-material/Person";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Drawer from "@mui/material/Drawer";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as DrawerSlice from "../redux/drawerSlice";
import * as DialogSlice from "../redux/dialogSlice";

import "./AppDrawer.css";

export default function AppDrawer(): JSX.Element {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.drawer.open);

  function closeDrawer() {
    dispatch(DrawerSlice.close());
  }

  function showDialog(dialog: DialogSlice.ZeroParameterDialog) {
    dispatch(DialogSlice.show({ dialogType: dialog }));
  }

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: "20rem",
        "& .MuiDrawer-paper": {
          width: "20rem",
          boxSizing: "border-box",
        },
      }}
    >
      <h3 className="title">
        <span className="icon button" onClick={closeDrawer}><ArrowBackIcon /></span>
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
    </Drawer>
  );
}
