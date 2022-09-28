import React from "react";

import * as Utils from "../../../../../../../utils";
import { useAppSelector, useLeftmostDate, useRightmostDate } from "../../../../../../../redux/hooks";

import Tile from "../../../../../../Tile";
import FreeSpace from "./FreeSpace";
import DropZone from "./DropZone";

type DateCellSwitchProps = {
  roomNumber: string,
  date: string
};

export default function DateCellSwitch({ roomNumber, date }: DateCellSwitchProps): JSX.Element | null {
  const assignedValue = useAppSelector((state) => state.tiles.assignedMap[roomNumber][date]);
  const grabbedTile = useAppSelector((state) => state.tiles.grabbedTile ? state.tiles.data[state.tiles.grabbedTile] : undefined);
  const assignedTile = useAppSelector((state) => assignedValue ? state.tiles.data[assignedValue] : undefined);
  const leftmostDate = useLeftmostDate();
  const rightmostDate = useRightmostDate();
  const oneDayBefore = Utils.getDateShift(leftmostDate, -1);

  if (assignedValue === "dropzone") {
    if (grabbedTile) {
      if ((date === grabbedTile.from) || (date === oneDayBefore)) {
        return <DropZone roomNumber={roomNumber} data={grabbedTile} />;
      }
    }
  } else if (assignedValue !== undefined) {
    if (assignedTile) {
      if ((date === assignedTile.from) || (date === oneDayBefore)) {
        return <Tile data={assignedTile} />;
      }
    }
  } else {
    return (
      <FreeSpace
        from={date}
        to={Utils.getDateShift(date, 1)}
        cropLeft={date === oneDayBefore}
        cropRight={date === rightmostDate}
      />
    );
  }

  return null;
}
