import React from "react";

import DataRow from "./DataRow";
import GridRow from "./GridRow";
import RowBody from "../../../Row/Body";

type BodyProps = {
  isFirst: boolean,
  isLast: boolean,
  roomId: number
}

export default function Body({ isFirst, isLast, roomId }: BodyProps): JSX.Element {
  return (
    <RowBody sx={{
      ...((isFirst || isLast) && {
        height: "calc(5.75rem - 1px)",
      })
    }}>
      <GridRow isFirst={isFirst} isLast={isLast} />
      <DataRow isFirst={isFirst} roomId={roomId} />
    </RowBody>
  );
}
