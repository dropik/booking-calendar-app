import React, { useEffect } from "react";
import { hot } from "react-hot-loader";

import Header from "./components/Header";
import Hotel from "./components/Hotel";
import TableContainer from "./components/TableContainer";

import "./App.css";

function App(): JSX.Element {
  useWindowCursorGrabbingEffect();

  return (
    <div className="app">
      <Header />
      <Hotel />
      <TableContainer />
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

export default hot(module)(App);
