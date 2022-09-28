import React from "react";

import DataRow from "./DataRow";
import GridRow from "./GridRow";
import RowBody from "../../../Row/Body";

type BodyProps = {
  isFirst: boolean,
  isLast: boolean,
  roomNumber: string
}

export default function Body({ isFirst, isLast, roomNumber }: BodyProps): JSX.Element {
  return (
    <RowBody>
      <GridRow isFirst={isFirst} isLast={isLast} />
      <DataRow isFirst={isFirst} roomNumber={roomNumber} />
    </RowBody>
  );
}
