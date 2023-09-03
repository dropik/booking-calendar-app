import React, { useMemo } from "react";

import { Floor } from "../../../../../redux/floorsSlice";
import { useFloorRoomIds } from "../../../../../redux/hooks";

import Room from "./Room";
import TableWrapper from "../../TableWrapper";

type RoomTableProps = {
  floor: Floor,
};

export default function RoomTable({ floor }: RoomTableProps): JSX.Element {
  const roomIds = useFloorRoomIds(floor.id);

  const roomsMemo = useMemo(() => (
    roomIds.map((roomId, index) => (
      <Room key={roomId} isFirst={index === 0} isLast={index === roomIds.length - 1} roomId={roomId} />
    ))
  ), [roomIds]);

  return (
    <TableWrapper>
      {roomsMemo}
    </TableWrapper>
  );
}
