import React, { useEffect, useRef } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { remToPx } from "../utils";
import globals from "../globals";
import { useAppDispatch, useHotelData, useInitialDate } from "../redux/hooks";
import { HotelData } from "../redux/hotelSlice";
import * as tableDimentions from "../redux/tableDimentionsSlice";

import Table from "./Table";

import "./TableContainer.css";

function TableContainer(): JSX.Element {
  const dispatch = useAppDispatch();
  const hotelData = useHotelData();
  const initialDate = useInitialDate();
  const ref = useRef<HTMLDivElement>(null);

  const scrollHanlder = getScrollHandler(dispatch);

  useTableDimentionsUpdateEffect(ref, dispatch, hotelData);
  useInitialScrollLeftEffect(ref, hotelData, initialDate);

  return (
    <div ref={ref} className="table-container" onScroll={scrollHanlder}>
      <Table />
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

function useInitialScrollLeftEffect(ref: React.RefObject<HTMLDivElement>, hotelData: HotelData, initialDate: string): void {
  useEffect(() => {
    const columnWidth = remToPx(4) + 1;
    const scrollLeft = columnWidth * globals.TABLE_PRELOAD_AMOUNT + 1;
    if (ref.current) {
      ref.current.scrollLeft = scrollLeft;
    }
  }, [ref, hotelData, initialDate]);
}

function useTableDimentionsUpdateEffect(
  ref: React.RefObject<HTMLDivElement>,
  dispatch: React.Dispatch<AnyAction>,
  hotelData: HotelData
): void {
  useEffect(() => {
    let offsetHeight = 0;
    let clientHeight = 0;
    if (ref.current) {
      offsetHeight = ref.current.offsetHeight;
      clientHeight = ref.current.clientHeight;
    }
    dispatch(tableDimentions.set({ offsetHeight: offsetHeight, clientHeight: clientHeight }));
  }, [ref, dispatch, hotelData]);
}

export default hot(module)(TableContainer);
