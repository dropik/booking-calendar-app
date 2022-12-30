import React from "react";

import * as Utils from "../../../../../../../utils";
import { useAppSelector, useLeftmostDate, useRightmostDate } from "../../../../../../../redux/hooks";

import FreeSpace from "../FreeSpace";

type FreeSpaceSwitchProps = {
  roomId: number,
  date: string,
};

export default function FreeSpaceSwitch({ roomId, date }: FreeSpaceSwitchProps): JSX.Element | null {
  const assignedValue = useAppSelector((state) => state.tiles.assignedMap[roomId][date]);
  const leftmostDate = useLeftmostDate();
  const rightmostDate = useRightmostDate();
  const oneDayBefore = Utils.getDateShift(leftmostDate, -1);

  if (assignedValue === undefined) {
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
