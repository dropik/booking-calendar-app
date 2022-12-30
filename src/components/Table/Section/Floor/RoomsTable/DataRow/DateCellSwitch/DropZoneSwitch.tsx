import React from "react";

import { Utils } from "../../../../../../../utils";
import { useAppSelector, useLeftmostDate } from "../../../../../../../redux/hooks";

import DropZone from "../DropZone";

type DropZoneSwitchProps = {
  roomId: number,
  date: string,
};

export default function DropZoneSwitch({ roomId, date }: DropZoneSwitchProps): JSX.Element | null {
  const assignedValue = useAppSelector((state) => state.tiles.assignedMap[roomId][date]);
  const grabbedTile = useAppSelector((state) => state.tiles.grabbedTile ? state.tiles.data[state.tiles.grabbedTile] : undefined);
  const leftmostDate = useLeftmostDate();
  const oneDayBefore = Utils.getDateShift(leftmostDate, -1);

  if (assignedValue === "dropzone") {
    if (grabbedTile) {
      if ((date === grabbedTile.from) || (date === oneDayBefore)) {
        return <DropZone roomId={roomId} data={grabbedTile} />;
      }
    }
  }

  return null;
}
