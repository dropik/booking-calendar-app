import React, { useEffect } from "react";

import Header from "./components/Header";
import Hotel from "./components/Hotel";
import TableContainer from "./components/TableContainer";
import Sidemenu from "./components/Sidemenu";
import Dialog from "./components/Dialog";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

export default function App(): JSX.Element {
  useWindowCursorGrabbingEffect();

  return (
    <div className="app">
      <Header />
      <Hotel />
      <TableContainer />
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
