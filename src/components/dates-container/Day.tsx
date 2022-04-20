import React, { memo } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";
import * as ContextMenuSlice from "../../redux/poppersSlice";

import DayAlert from "./DayAlert";

import "./Day.css";

type Props = {
  x: string
};

export default memo(function Day({ x }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const hasUnassignedTiles = useHasUnassignedTiles(x);
  const selected = useAppSelector((state) => state.tiles.selectedDate === x);

  const day = getDayFromX(x);
  const className = getClassName(selected, hasUnassignedTiles);

  function toggleDate() {
    if(document.getSelection() && document.getSelection()?.empty) {
      document.getSelection()?.empty();
    } else if(window.getSelection()) {
      window.getSelection()?.removeAllRanges();
    }
    dispatch(TilesSlice.toggleDate({ date: x }));
  }

  function hideContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    dispatch(ContextMenuSlice.hide());
  }

  return (
    <div className={className} onMouseDown={hideContextMenu} onClick={toggleDate}>
      <b>{day}</b>
      <DayAlert hasUnassignedTiles={hasUnassignedTiles} />
    </div>
  );
});

function useHasUnassignedTiles(x: string) {
  return useAppSelector(state => (state.tiles.unassignedMap[x] !== undefined) && (Object.keys(state.tiles.unassignedMap[x]).length > 0));
}

function getDayFromX(x: string): string {
  return x.substring(8);
}
function getClassName(selected: boolean, hasUnassignedTiles: boolean): string {
  let className = "day";
  if (selected && hasUnassignedTiles) {
    className += " selected";
  }
  return className;
}
