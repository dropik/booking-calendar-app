import React from "react";

import DataRow from "./DataRow";
import GridRow from "./GridRow";
import RowBody from "../../../Row/Body";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { move } from "../../../../../../redux/tilesSlice";

type BodyProps = {
  isLast: boolean,
  roomNumber: number
}

export default function Body({ isLast, roomNumber }: BodyProps): JSX.Element {
  const dispatch = useAppDispatch();
  const grabbedTile = useAppSelector((state) => state.tiles.grabbedTile);

  function decideDropZone(event: React.DragEvent<HTMLDivElement>): void {
    if (grabbedTile) {
      event.preventDefault();
    }
  }

  return (
    <RowBody
      onDragEnter={decideDropZone}
      onDragOver={decideDropZone}
      onDrop={() => {
        dispatch(move({ newY: roomNumber }));
      }}
    >
      <GridRow isLast={isLast} />
      <DataRow roomNumber={roomNumber} />
    </RowBody>
  );
}
