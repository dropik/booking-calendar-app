import React, { useEffect } from "react";

import Header from "./components/Header";
import Hotel from "./components/Hotel";
import TableContainer from "./components/TableContainer";
import OccupationInfo from "./components/OccupationInfo";
import Sidemenu from "./components/Sidemenu";
import Dialog from "./components/Dialog";

import "./App.css";

export default function App(): JSX.Element {
  useWindowCursorGrabbingEffect();

  return (
    <div className="app">
      <Header />
      <Hotel />
      <TableContainer />
      <OccupationInfo />
      <Sidemenu />
      <Dialog />
    </div>
  );
}

function useWindowCursorGrabbingEffect(): void {
  useEffect(() => {
    function setCursorGrabbing() {
      document.documentElement.classList.add("tile-grabbing");
    }

    function unsetCursorGrabbing() {
      document.documentElement.classList.remove("tile-grabbing");
    }

    window.addEventListener("mousedown", setCursorGrabbing);
    window.addEventListener("mouseup", unsetCursorGrabbing);

    return () => {
      window.removeEventListener("mousedown", setCursorGrabbing);
      window.removeEventListener("mouseup", unsetCursorGrabbing);
    };
  }, []);
}
