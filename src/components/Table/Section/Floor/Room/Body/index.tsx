import React from "react";

import * as Utils from "../../../../../../utils";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { move } from "../../../../../../redux/tilesSlice";

import DataRow from "./DataRow";
import GridRow from "./GridRow";
import RowBody from "../../../Row/Body";

type BodyProps = {
  isLast: boolean,
  roomNumber: number
}

export default function Body({ isLast, roomNumber }: BodyProps): JSX.Element {
  const dispatch = useAppDispatch();

  const decideDropZone = useAppSelector((state) => {
    const grabbedTile = state.tiles.grabbedTile;

    if (grabbedTile) {
      const data = state.tiles.data[grabbedTile];
      const map = state.tiles.assignedMap[roomNumber];
      if (map) {
        const dateCounter = new Date(data.from);
        for (let i = 0; i < data.nights; i++) {
          const x = Utils.dateToString(dateCounter);
          dateCounter.setDate(dateCounter.getDate() + 1);
          if (map[x]) {
            return () => void 0;
          }
        }
        return (event: React.DragEvent<HTMLDivElement>) => event.preventDefault();
      } else {
        return (event: React.DragEvent<HTMLDivElement>) => event.preventDefault();
      }
    }

    return () => void 0;
  });

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
