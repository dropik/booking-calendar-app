import React, { useEffect, useLayoutEffect } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { useAppDispatch } from "./redux/hooks";
import * as TableSlice from "./redux/tableSlice";

import Header from "./components/Header";
import Hotel from "./components/Hotel";
import TableContainer from "./components/TableContainer";

import "./App.css";

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useDocumentSizeAdjustmentLayoutEffect(dispatch);
  useWindowCursorGrabbingEffect();

  return (
    <div className="app">
      <Header />
      <Hotel />
      <TableContainer />
    </div>
  );
}

function useDocumentSizeAdjustmentLayoutEffect(dispatch: React.Dispatch<AnyAction>): void {
  useLayoutEffect(() => {
    function handleResize() {
      dispatch(TableSlice.resize());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);
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
