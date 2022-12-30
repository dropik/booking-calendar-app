import React from "react";

import RowBody from "../../RowBody";
import DataRow from "./DataRow";
import GridRow from "./GridRow";

type RoomProps = {
  isFirst: boolean,
  isLast: boolean,
  roomId: number
}

export default function Room({ isFirst, isLast, roomId }: RoomProps): JSX.Element {
  return (
    <RowBody isFirst={isFirst} isLast={isLast}>
      <GridRow isFirst={isFirst} isLast={isLast} />
      <DataRow isFirst={isFirst} roomId={roomId} />
    </RowBody>
  );
}
