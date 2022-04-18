import React, { useLayoutEffect, useRef } from "react";

import * as Utils from "../../utils";

import { useAppDispatch, useAppSelector, useColumns, useLeftmostDate } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";
import * as OccupationInfoSlice from "../../redux/occupationInfoSlice";
import * as ContextMenuSlice from "../../redux/contextMenuSlice";

import TilePartAlert from "./TilePartAlert";

import "./TilePart.css";

type Props = {
  y: number,
  tileData: TilesSlice.TileData
};

export default function TilePart({ y, tileData }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const tileId = tileData.id;
  const isGrabbed = useAppSelector(state => state.tiles.grabbedMap[tileId]);
  const ref = useRef<HTMLDivElement>(null);
  const leftmostDate = useLeftmostDate();
  const columns = useColumns();
  const roomType = useRoomTypeByNumber(y);
  const personsInRoomType = useAppSelector(state => state.roomTypes.data[roomType]);

  const outOfBound = isOutOfBound(tileData, leftmostDate, columns);
  const className = getClassName(isGrabbed, outOfBound);

  function grabTile(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    if ((event.button == 0) && !outOfBound && ref.current) {
      dispatch(TilesSlice.grab({ tileId, mouseY: event.pageY - ref.current.getBoundingClientRect().top }));
    }
  }

  function showContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    dispatch(ContextMenuSlice.show({ tileId, mouseX: event.pageX, mouseY: event.pageY }));
  }

  function showInfo(event: React.MouseEvent<HTMLDivElement>) {
    dispatch(OccupationInfoSlice.show({ hoveredId: tileId, x: event.pageX, y: event.pageY }));
  }

  function moveInfo(event: React.MouseEvent<HTMLDivElement>) {
    dispatch(OccupationInfoSlice.move({ x: event.pageX, y: event.pageY }));
  }

  function hideInfo() {
    dispatch(OccupationInfoSlice.hide());
  }

  useBackgroundColourEffect(ref, tileData.colour);

  return (
    <div
      ref={ref}
      className={className}
      onMouseDown={grabTile}
      onMouseEnter={showInfo}
      onMouseLeave={hideInfo}
      onMouseMove={moveInfo}
      onContextMenu={showContextMenu}
    >
      <span className="tile-persons">{tileData.persons}</span>
      <TilePartAlert personsInRoomType={personsInRoomType} roomType={roomType} tileData={tileData} />
    </div>
  );
}

function useRoomTypeByNumber(roomNumber: number): string {
  return useAppSelector((state) => {
    for (const floor of state.hotel.data.floors) {
      for (const room of floor.rooms) {
        if (room.number === roomNumber) {
          return room.type;
        }
      }
    }
    return "";
  });
}

function isOutOfBound(tileData: TilesSlice.TileData, leftmostDate: string, columns: number): boolean {
  const tileStartShift = Utils.daysBetweenDates(leftmostDate, tileData.from);
  return (tileStartShift < 0) || (tileStartShift + tileData.nights > columns);
}

function getClassName(grabbed: boolean | undefined, outOfBound: boolean): string {
  let className = "tile";
  if (grabbed) {
    className += " grabbed";
  }
  if (outOfBound) {
    className += " out-of-bound";
  }
  return className;
}

function useBackgroundColourEffect(
  ref: React.RefObject<HTMLDivElement>,
  colour: string
): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundColor = colour;
    }
  }, [ref, colour]);
}
