import React, { useEffect } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { getInitialScrollLeft, remToPx } from "../utils";
import globals from "../globals";
import { useAppDispatch, useHotelData } from "../redux/hooks";

import Table from "./Table";

import "./TableContainer.css";

type Props = {
  tableContainerRef: React.RefObject<HTMLDivElement>
};

function TableContainer(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const hotelData = useHotelData();

  const scrollHanlder = getScrollHandler(dispatch);

  useEffect(() => {
    if (props.tableContainerRef.current) {
      props.tableContainerRef.current.scrollLeft = getInitialScrollLeft();
    }
  });

  return (
    <div ref={props.tableContainerRef} className="table-container" onScroll={scrollHanlder}>
      <Table hotelData={hotelData} />
    </div>
  );
}

function getScrollHandler(
  dispatch: React.Dispatch<AnyAction>
): (event: React.UIEvent<HTMLDivElement>) => void {
  return (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    const scrollLeft = event.currentTarget.scrollLeft;

    dispatch({ type: "scroll", payload: { top: scrollTop, left: scrollLeft } });

    const scrollLeftMax = event.currentTarget.scrollWidth - event.currentTarget.clientWidth;
    const cellWidth = remToPx(4) + 1;
    const scrollLimit = cellWidth * globals.TABLE_FETCH_BREAKPOINT;
    if (scrollLeft < scrollLimit) {
      dispatch({ type: "fetchLeft", payload: { tiles: [] } });
      const preloadedWidth = cellWidth * globals.TABLE_PRELOAD_AMOUNT;
      event.currentTarget.scrollLeft = preloadedWidth + scrollLimit + 1;
    } else if (
      scrollLeft > scrollLeftMax - scrollLimit
    ) {
      dispatch({ type: "fetchRight", payload: { tiles: [] } });
    }
  };
}

export default hot(module)(TableContainer);
