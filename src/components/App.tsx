import React, { Dispatch, useEffect, useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";

import { remToPx } from "../utils";
import globals from "../globals";
import { changeDate, resize } from "../redux/mainSlice";
import { useAppDispatch } from "../redux/hooks";

import Header from "./Header";
import Hotel from "./Hotel";
import TableContainer from "./TableContainer";

import "./App.css";
import { AnyAction } from "@reduxjs/toolkit";

function App() {
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  useDocumentResizeAdjustment(dispatch);
  useInitialScrollLeft(containerRef);

  return (
    <div className="app">
      <Header onDateChange={
        (event: React.FormEvent<HTMLInputElement>) => {
          dispatch(changeDate({ date: event.currentTarget.value, tiles: [] }));
          setInitialScrollLeft(containerRef);
        }
      } />
      <Hotel />
      <TableContainer
        containerRef={containerRef}
      />
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
