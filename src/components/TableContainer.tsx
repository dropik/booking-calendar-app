import React from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { remToPx } from "../utils";
import globals from "../globals";
import { fetchLeft, fetchRight, scroll } from "../redux/mainSlice";
import { useAppDispatch } from "../redux/hooks";

import Table from "./Table";

import "./TableContainer.css";

type Props = {
  tableContainerRef: React.RefObject<HTMLDivElement>
};

function TableContainer(props: Props) {
  const dispatch = useAppDispatch();

  const scrollHanlder = getScrollHandler(dispatch);

  return (
    <div ref={props.tableContainerRef} className="table-container" onScroll={scrollHanlder}>
      <Table />
    </div>
  );
}

function getScrollHandler(dispatch: React.Dispatch<AnyAction>) {
  return (event: React.UIEvent<HTMLDivElement>) => {
    dispatch(scroll({
      scrollLeft: event.currentTarget.scrollLeft,
      scrollTop: event.currentTarget.scrollTop
    }));

    const scrollLeftMax = event.currentTarget.scrollWidth - event.currentTarget.clientWidth;
    const cellWidth = remToPx(4) + 1;
    const scrollLimit = cellWidth * globals.TABLE_FETCH_BREAKPOINT;
    if (event.currentTarget.scrollLeft < scrollLimit) {
      dispatch(fetchLeft({ tiles: [] }));
      const preloadedWidth = cellWidth * globals.TABLE_PRELOAD_AMOUNT;
      event.currentTarget.scrollLeft = preloadedWidth + scrollLimit + 1;
    } else if (
      event.currentTarget.scrollLeft > scrollLeftMax - scrollLimit
    ) {
      dispatch(fetchRight({ tiles: [] }));
    }
  };
}

export default hot(module)(TableContainer);
