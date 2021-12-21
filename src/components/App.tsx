import React, { Dispatch, useEffect, useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";

import { remToPx } from "../utils";
import globals from "../globals";
import { changeDate, resize } from "../redux/mainSlice";
import { useAppDispatch } from "../redux/hooks";

import Header from "./Header";
import TableContainer from "./TableContainer";

import "./App.css";
import { AnyAction } from "@reduxjs/toolkit";
import Hotel from "./Hotel";

function App() {
  const dispatch = useAppDispatch();
  const tableContainerRef = useRef<HTMLDivElement>(null);

  useDocumentResizeAdjustment(dispatch);
  useInitialScrollLeft(tableContainerRef);

  function handleDateChange(date: Date) {
    if (date !== null) {
      dispatch(changeDate({ date: date.toLocaleDateString("en-CA"), tiles: [] }));
      setInitialScrollLeft(tableContainerRef);
    }
  }

  return (
    <div className="app">
      <Header onDateChange={handleDateChange}/>
      <Hotel tableContainerRef={tableContainerRef} />
      <TableContainer tableContainerRef={tableContainerRef} />
    </div>
  );
}

function useDocumentResizeAdjustment(dispatch: Dispatch<AnyAction>) {
  useLayoutEffect(() => {
    function handleResize() {
      dispatch(resize());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
}

function useInitialScrollLeft(ref: React.RefObject<HTMLDivElement>) {
  useEffect(() => { setInitialScrollLeft(ref); });
}

function setInitialScrollLeft(ref: React.RefObject<HTMLDivElement>) {
  const columnWidth = remToPx(4) + 1;
  const scrollLeft = columnWidth * globals.TABLE_PRELOAD_AMOUNT + 1;
  const currentTarget = ref.current;
  if (currentTarget) {
    currentTarget.scrollLeft = scrollLeft;
  }
}

export default hot(module)(App);
