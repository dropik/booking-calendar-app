import React from "react";

import DropZoneSwitch from "./DropZoneSwitch";
import FreeSpaceSwitch from "./FreeSpaceSwitch";
import TileSwitch from "./TileSwitch";

type DateCellSwitchProps = {
  roomId: number,
  date: string
};

export default function DateCellSwitch({ roomId, date }: DateCellSwitchProps): JSX.Element | null {
  return (
    <>
      <DropZoneSwitch roomId={roomId} date={date} />
      <TileSwitch roomId={roomId} date={date} />
      <FreeSpaceSwitch roomId={roomId} date={date} />
    </>
  );
}
