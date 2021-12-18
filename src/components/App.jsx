import React, { useEffect, useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";
import { useDispatch, useSelector } from "react-redux";

import { remToPx } from "../utils";
import globals from "../globals";
import { scroll, changeDate, resize, fetchLeft, fetchRight, move } from "../redux/mainSlice";

import Header from "./Header";
import Hotel from "./Hotel";
import TableContainer from "./TableContainer";

import "./App.css";

function App() {
  const hotel = useSelector(state => state.main.hotel);
  const tiles = useSelector(state => state.main.tiles);
  const occupations = useSelector(state => state.main.occupations);
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

  function onTileMove(event) {
    dispatch(move({ x: event.x, y: event.y, pageY: event.pageY }));
  }

  function onScroll(event) {
    dispatch(scroll({ scrollLeft: event.target.scrollLeft }));

    let scrollLeftMax = event.target.scrollWidth - event.target.clientWidth;
    let cellWidth = remToPx(4) + 1;
    let scrollLimit = cellWidth * globals.TABLE_FETCH_BREAKPOINT;
    if (event.target.scrollLeft < scrollLimit) {
      dispatch(fetchLeft({ tiles: [] }));
      var preloadedWidth = cellWidth * globals.TABLE_PRELOAD_AMOUNT;
      event.target.scrollLeft = preloadedWidth + scrollLimit + 1;
    } else if (
      event.target.scrollLeft > scrollLeftMax - scrollLimit
    ) {
      dispatch(fetchRight({ tiles: [] }));
    }
  }

  return (
    <div className="app">
      <Header onDateChange={onDateChange} />
      <Hotel hotel={hotel} />
      <TableContainer
        containerRef={containerRef}
        hotel={hotel}
        tiles={tiles}
        occupations={occupations}
        onTileMove={onTileMove}
        onScroll={onScroll}
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
