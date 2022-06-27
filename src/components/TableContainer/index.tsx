import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import Box from "@mui/material/Box";

import * as Utils from "../../utils";
import * as Globals from "../../globals";
import { useAppDispatch, useAppSelector, useHotelData, useLeftmostDate } from "../../redux/hooks";
import * as HotelSlice from "../../redux/hotelSlice";
import * as ScrollSlice from "../../redux/scrollSlice";
import * as TableSlice from "../../redux/tableSlice";

import DrawerAdjacent from "../m3/DrawerAdjacent";
import Table from "./Table";
import FetchTiles from "../Table/FetchTiles";
import GrabbedTile from "./GrabbedTile";

import "./TableContainer.css";

export default function TableContainer(): JSX.Element {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const hotelData = useHotelData();
  const leftmostDate = useLeftmostDate();
  const fetchReason = useFetchReason();
  const tableContents = useTableContentsMemo();

  function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    const scrollTop = event.currentTarget.scrollTop;
    const scrollLeft = event.currentTarget.scrollLeft;

    dispatch(ScrollSlice.set({ top: scrollTop, left: scrollLeft }));
  }

  useTableDimentionsUpdateEffect(ref, dispatch, hotelData);
  useInitialScrollLeftEffect(ref, hotelData, leftmostDate, fetchReason);

  return (
    <Box className="table-container">
      <DrawerAdjacent>
        <Box ref={ref} onScroll={handleScroll} sx={{
          overflow: "scroll",
          overscrollBehavior: "none"
        }}>
          {tableContents}
        </Box>
      </DrawerAdjacent>
    </Box>
  );
}

function useFetchReason(): "changeDate" | "expand" {
  return useAppSelector((state) => state.table.fetchReason);
}

function useInitialScrollLeftEffect(
  ref: React.RefObject<HTMLDivElement>,
  hotelData: HotelSlice.HotelData,
  leftmostDate: string,
  fetchReason: "changeDate" | "expand"
): void {
  useLayoutEffect(() => {
    const columnWidth = Utils.remToPx(4) + 2;
    const scrollLeft = columnWidth * Globals.TABLE_PRELOAD_AMOUNT + 2;
    if (ref.current) {
      if (fetchReason === "expand") {
        ref.current.scrollLeft += scrollLeft;
      } else if (fetchReason === "changeDate") {
        ref.current.scrollLeft = scrollLeft;
      }
    }
  }, [ref, hotelData, leftmostDate, fetchReason]);
}

function useTableDimentionsUpdateEffect(
  ref: React.RefObject<HTMLDivElement>,
  dispatch: React.Dispatch<AnyAction>,
  hotelData: HotelSlice.HotelData
): void {
  useEffect(() => {
    let offsetHeight = 0;
    let clientHeight = 0;
    if (ref.current) {
      offsetHeight = ref.current.offsetHeight;
      clientHeight = ref.current.clientHeight;
    }
    dispatch(TableSlice.updateHeights({ offsetHeight, clientHeight }));
  }, [ref, dispatch, hotelData]);
}

function useTableContentsMemo(): JSX.Element {
  return useMemo(() => (
    <>
      <Table />
      <FetchTiles />
      <GrabbedTile />
    </>
  ), []);
}
