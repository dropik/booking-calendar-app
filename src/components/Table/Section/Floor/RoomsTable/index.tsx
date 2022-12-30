import React, { useMemo } from "react";

import { Floor } from "../../../../../redux/floorsSlice";

import Room from "./Room";
import TableWrapper from "../../TableWrapper";

type RoomTableProps = {
  floor: Floor,
};

export default function RoomTable({ floor }: RoomTableProps): JSX.Element {
  const roomsMemo = useMemo(() => (
    floor.roomIds.map((roomId, index) => (
      <Room key={roomId} isFirst={index === 0} isLast={index === floor.roomIds.length - 1} roomId={roomId} />
    ))
  ), [floor]);

  return (
    <TableWrapper>
      {roomsMemo}
    </TableWrapper>
  );
}
