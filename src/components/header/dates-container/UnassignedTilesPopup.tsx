import React, { useEffect } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import * as Utils from "../../../utils";
import * as TilesSlice from "../../../redux/tilesSlice";

import UnassignedTilesPopupBody from "./unassigned-tiles-popup/UnassignedTilesPopupBody";

type PopupData = {
  show: boolean,
  leftmostSelectedTileDate: string,
  tilesPerSelectedDay: { [key: string]: string }
}

function UnassignedTilesPopup(): JSX.Element {
  const dispatch = useAppDispatch();
  const popupData = usePopupData();

  useHideOnClickOutsidePopupEffect(dispatch);

  if (popupData && popupData.show) {
    return (
      <UnassignedTilesPopupBody
        leftmostSelectedTileDate={popupData.leftmostSelectedTileDate}
        tilesPerSelectedDay={popupData.tilesPerSelectedDay}
      />
    );
  }

  return <></>;
}

function usePopupData(): PopupData | undefined {
  return useAppSelector((state) => {
    const selectedDate = state.tiles.selectedDate;
    if (selectedDate && state.tiles.unassignedMap[selectedDate]) {
      let leftmostSelectedTileDate = selectedDate;
      let show = false;
      for (const tileId in state.tiles.unassignedMap[selectedDate]) {
        show = true;
        const tile = state.tiles.data[tileId];
        if (Utils.daysBetweenDates(leftmostSelectedTileDate, tile.from) < 0) {
          leftmostSelectedTileDate = tile.from;
        }
      }
      return { show, leftmostSelectedTileDate, tilesPerSelectedDay: state.tiles.unassignedMap[selectedDate] };
    }
  });
}

function useHideOnClickOutsidePopupEffect(dispatch: React.Dispatch<AnyAction>): void {
  useEffect(() => {
    function hidePopup() {
      dispatch(TilesSlice.toggleDate({ date: undefined }));
    }
    window.addEventListener("mousedown", hidePopup);
    return () => window.removeEventListener("mousedown", hidePopup);
  }, [dispatch]);
}

export default hot(module)(UnassignedTilesPopup);
