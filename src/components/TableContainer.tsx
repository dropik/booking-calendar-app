import React from "react";
import { hot } from "react-hot-loader";

import { remToPx } from "../utils";
import globals from "../globals";
import { fetchLeft, fetchRight, scroll } from "../redux/mainSlice";
import { useAppDispatch } from "../redux/hooks";

import Table from "./Table";

import "./TableContainer.css";

type Props = {
  containerRef: React.RefObject<HTMLDivElement>
};

function TableContainer(props: Props) {
  const dispatch = useAppDispatch();

  function onScroll(event: React.UIEvent<HTMLDivElement>) {
    dispatch(scroll({ scrollLeft: event.currentTarget.scrollLeft }));

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
  }

  return (
    <div
      ref={props.containerRef}
      className="table-container"
      onScroll={onScroll}
    >
      <Table />
    </div>
  );
}

export default hot(module)(TableContainer);
