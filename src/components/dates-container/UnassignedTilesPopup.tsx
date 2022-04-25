import React from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Box from "@mui/material/Box";

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

  function hidePopup() {
    dispatch(TilesSlice.toggleDate({ date: undefined }));
  }

  return (popupData && popupData.show) ? (
    <ClickAwayListener onClickAway={hidePopup}>
      <Box>
        <UnassignedTilesPopupBody
          leftmostSelectedTileDate={popupData.leftmostSelectedTileDate}
          tilesPerSelectedDay={popupData.tilesPerSelectedDay}
        />
      </Box>
    </ClickAwayListener>
  ) : <></>;
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
