import React, { useEffect, useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { remToPx } from "../utils";
import globals from "../globals";
import { useAppDispatch } from "../redux/hooks";
import * as main from "../redux/mainSlice";

import Header from "./Header";
import Hotel from "./Hotel";
import TableContainer from "./TableContainer";

import "./App.css";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const dateChangeHandler = getDateChangeHandler(dispatch, tableContainerRef);

  useDocumentSizeAdjustmentLayoutEffect(dispatch);
  useInitialScrollLeftEffect(tableContainerRef);
  useWindowCursorGrabbingEffect();

  return (
    <div className="app">
      <Header onDateChange={dateChangeHandler}/>
      <Hotel tableContainerRef={tableContainerRef} />
      <TableContainer tableContainerRef={tableContainerRef} />
    </div>
  );
}

function getDateChangeHandler(
  dispatch: React.Dispatch<AnyAction>,
  tableContainerRef: React.RefObject<HTMLDivElement>
): (date: Date) => void {
  return (date: Date) => {
    if (date !== null) {
      dispatch(main.changeDate({ date: date.toLocaleDateString("en-CA"), tiles: [] }));
      setInitialScrollLeft(tableContainerRef);
    }
  };
}

function useDocumentSizeAdjustmentLayoutEffect(dispatch: React.Dispatch<AnyAction>): void {
  useLayoutEffect(() => {
    function handleResize() {
      dispatch(main.resize());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
}

function useInitialScrollLeftEffect(ref: React.RefObject<HTMLDivElement>): void {
  useEffect(() => { setInitialScrollLeft(ref); });
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

function setInitialScrollLeft(ref: React.RefObject<HTMLDivElement>): void {
  const columnWidth = remToPx(4) + 1;
  const scrollLeft = columnWidth * globals.TABLE_PRELOAD_AMOUNT + 1;
  const currentTarget = ref.current;
  if (currentTarget) {
    currentTarget.scrollLeft = scrollLeft;
  }
}

export default hot(module)(App);
