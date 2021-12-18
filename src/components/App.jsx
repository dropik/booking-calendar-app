import React, { useEffect, useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";
import { useDispatch } from "react-redux";

import { remToPx } from "../utils";
import globals from "../globals";
import { changeDate, resize } from "../redux/mainSlice";

import Header from "./Header";
import Hotel from "./Hotel";
import TableContainer from "./TableContainer";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  useColumnsAdjustment(dispatch);

  function onDateChange(event) {
    dispatch(changeDate({ date: event.target.value, tiles: [] }));
    setInitialScrollLeft();
  }

  useEffect(setInitialScrollLeft, []);

  function setInitialScrollLeft() {
    var columnWidth = remToPx(4) + 1;
    var scrollLeft = columnWidth * globals.TABLE_PRELOAD_AMOUNT + 1;
    containerRef.current.scrollLeft = scrollLeft;
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

function useColumnsAdjustment(dispatch) {
  useLayoutEffect(() => {
    function handleResize() {
      dispatch(resize());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
}

export default hot(module)(App);
