import React, { useEffect } from "react";
import { AnyAction } from "@reduxjs/toolkit";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as Utils from "../../utils";
import * as TilesSlice from "../../redux/tilesSlice";

import UnassignedTilesPopupBody from "./unassigned-tiles-popup/UnassignedTilesPopupBody";

type PopupData = {
  show: boolean,
  leftmostSelectedTileDate: string,
  tilesPerSelectedDay: { [key: string]: string }
}

export default function UnassignedTilesPopup(): JSX.Element {
  const dispatch = useAppDispatch();
  const popupData = usePopupData();
  const isDialogShown = useAppSelector((state) => state.dialog.dialogs.length > 0);
  const isContextMenuShown = useAppSelector((state) => state.poppers.isShown);

  useHideOnClickOutsidePopupEffect(dispatch, isDialogShown, isContextMenuShown);

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

function useHideOnClickOutsidePopupEffect(
  dispatch: React.Dispatch<AnyAction>,
  isDialogShown: boolean,
  isContextMenuShown: boolean
): void {
  useEffect(() => {
    function hidePopup() {
      dispatch(TilesSlice.toggleDate({ date: undefined }));
    }
    if (!isDialogShown && !isContextMenuShown) {
      window.addEventListener("mousedown", hidePopup);
    }
    return () => {
      if (!isDialogShown && !isContextMenuShown) {
        window.removeEventListener("mousedown", hidePopup);
      }
    };
  }, [dispatch, isDialogShown, isContextMenuShown]);
}
