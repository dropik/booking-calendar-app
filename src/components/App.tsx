import React, { useEffect, useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";

import { remToPx } from "../utils";
import globals from "../globals";
import { changeDate, resize } from "../redux/mainSlice";
import { useAppDispatch } from "../redux/hooks";

import Header from "./Header";
import Hotel from "./Hotel";
import TableContainer from "./TableContainer";

import "./App.css";

function App() {
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(onResize);
  useEffect(setInitialScrollLeft);

  function onResize() {
    function handleResize() {
      dispatch(resize());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }

  function setInitialScrollLeft() {
    const columnWidth = remToPx(4) + 1;
    const scrollLeft = columnWidth * globals.TABLE_PRELOAD_AMOUNT + 1;
    const currentTarget = containerRef.current;
    if (currentTarget) {
      currentTarget.scrollLeft = scrollLeft;
    }
  }

  function onDateChange(event: React.FormEvent<HTMLInputElement>) {
    dispatch(changeDate({ date: event.currentTarget.value, tiles: [] }));
    setInitialScrollLeft();
  }

  return (
    <div className="app">
      <Header onDateChange={onDateChange} />
      <Hotel />
      <TableContainer
        containerRef={containerRef}
      />
    </div>
  );
}

export default hot(module)(App);
