import React from "react";

import * as Utils from "../../../../../../../utils";
import { useAppSelector, useLeftmostDate } from "../../../../../../../redux/hooks";

import Tile from "../../../../../../Tile";

type TileSwitchProps = {
  roomId: number,
  date: string,
};

export default function TileSwitch({ roomId, date }: TileSwitchProps): JSX.Element | null {
  const assignedValue = useAppSelector(state => state.tiles.assignedMap[roomId][date]);
  const assignedTile = useAppSelector(state => assignedValue ? state.tiles.data[assignedValue] : undefined);
  const leftmostDate = useLeftmostDate();
  const oneDayBefore = Utils.getDateShift(leftmostDate, -1);

  if (assignedValue !== undefined) {
    if (assignedTile) {
      if ((date === assignedTile.from) || (date === oneDayBefore)) {
        return <Tile data={assignedTile} />;
      }
    }
  }

  return null;
}
