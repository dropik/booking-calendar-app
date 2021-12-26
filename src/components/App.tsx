import React, { useEffect, useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { dateToString } from "../utils";
import { useAppDispatch } from "../redux/hooks";

import Header from "./Header";
import Hotel from "./Hotel";
import TableContainer from "./TableContainer";

import "./App.css";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const dateChangeHandler = getDateChangeHandler(dispatch);

  useDocumentSizeAdjustmentLayoutEffect(dispatch);
  useWindowCursorGrabbingEffect();

  return (
    <div className="app">
      <Header onDateChange={dateChangeHandler}/>
      <Hotel tableContainerRef={tableContainerRef} />
      <TableContainer tableContainerRef={tableContainerRef} />
    </div>
  );
}

function getDateChangeHandler(dispatch: React.Dispatch<AnyAction>): (date: Date) => void {
  return (date: Date) => {
    if (date !== null) {
      dispatch({ type: "changeDate", payload: { date: dateToString(date), tiles: [] } });
    }
  };
}

function useDocumentSizeAdjustmentLayoutEffect(dispatch: React.Dispatch<AnyAction>): void {
  useLayoutEffect(() => {
    function handleResize() {
      dispatch({ type: "resize" });
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
