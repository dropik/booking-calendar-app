import React, { useEffect, useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { useAppDispatch, useAppSelector, useLeftShift } from "../../../redux/hooks";
import * as Utils from "../../../utils";
import * as UnassignedTilesSlice from "../../../redux/unassignedTilesSlice";

import UnassignedRow from "./unassigned-tiles-popup/UnassignedRow";

import "./UnassignedTilesPopup.css";

function UnassignedTilesPopup(): JSX.Element {
  const dispatch = useAppDispatch();
  const show = useShowPopup();
  const leftmostSelectedTileDate = useLeftmostSelectedTileDate();
  const tilesPerSelectedDay = useTilesPerSelectedDay();
  const left = useLeftShift(leftmostSelectedTileDate);
  const ref = useRef<HTMLDivElement>(null);

  const className = getClassName(show);
  const rows = getRows(tilesPerSelectedDay, leftmostSelectedTileDate);

  useScrollEffect(ref, left);
  useHideOnClickOutsidePopupEffect(dispatch);

  return (<div ref={ref} className={className}>{rows}</div>);
}

function useShowPopup(): boolean | undefined {
  return useAppSelector((state) => {
    const selectedDate = state.unassignedTiles.selectedDate;
    if (selectedDate && state.unassignedTiles.map[selectedDate]) {
      return (Object.keys(state.unassignedTiles.map[selectedDate]).length > 0);
    }
  });
}

function useLeftmostSelectedTileDate(): string | undefined {
  return useAppSelector((state) => {
    const selectedDate = state.unassignedTiles.selectedDate;
    if (selectedDate && state.unassignedTiles.map[selectedDate]) {
      let leftmostSelectedTileDate = selectedDate;
      for (const tileId in state.unassignedTiles.map[selectedDate]) {
        const tile = state.tiles.data[tileId];
        if (Utils.daysBetweenDates(leftmostSelectedTileDate, tile.from) < 0) {
          leftmostSelectedTileDate = tile.from;
        }
      }
      return leftmostSelectedTileDate;
    }
  });
}

function useTilesPerSelectedDay(): { [key: string]: string } {
  return useAppSelector((state) => state.unassignedTiles.map[state.unassignedTiles.selectedDate as string]);
}

function getClassName(show: boolean | undefined): string {
  let className = "unassigned-tiles-popup";
  if (!show) {
    className += " hidden";
  }
  return className;
}

function getRows(tilesPerSelectedDay: { [key: string]: string }, leftmostSelectedTileDate: string | undefined): JSX.Element[] {
  const rows: JSX.Element[] = [];
  if (tilesPerSelectedDay) {
    for (const tileId in tilesPerSelectedDay) {
      if (leftmostSelectedTileDate) {
        rows.push(<UnassignedRow key={tileId} tileId={tileId} leftmostSelectedTileDate={leftmostSelectedTileDate} />);
      }
    }
  }
  return rows;
}

function useScrollEffect(ref: React.RefObject<HTMLDivElement>, left: number): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.left = `${left}px`;
    }
  }, [ref, left]);
}

function useHideOnClickOutsidePopupEffect(dispatch: React.Dispatch<AnyAction>): void {
  useEffect(() => {
    function hidePopup() {
      dispatch(UnassignedTilesSlice.toggleDate({ date: undefined }));
    }
    window.addEventListener("mousedown", hidePopup);
    return () => window.removeEventListener("mousedown", hidePopup);
  }, [dispatch]);
}

export default hot(module)(UnassignedTilesPopup);
