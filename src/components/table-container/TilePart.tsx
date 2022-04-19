import React, { useCallback, useLayoutEffect, useRef, useState } from "react";

import * as Utils from "../../utils";

import { useAppDispatch, useAppSelector, useColumns, useLeftmostDate } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";
import * as PoppersSlice from "../../redux/poppersSlice";

import TilePartAlert from "./TilePartAlert";
import OccupationInfo from "../OccupationInfo";
import TileContextMenu from "./TileContextMenu";
import ColourPicker from "./ColourPicker";

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
  const [isShowInfo, setIsShowInfo] = useState(false);
  const [isShowContextMenu, setIsShowContextMenu] = useState(false);
  const [isShowColourPicker, setIsShowColourPicker] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const contextMenuHideCallback = useCallback(() => setIsShowContextMenu(false), []);
  const colourPickerHideCallback = useCallback(() => setIsShowColourPicker(false), []);

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
    setIsShowInfo(false);
    setIsShowColourPicker(false);
    setIsShowContextMenu(true);
    setMousePos({ x: event.pageX, y: event.pageY });
    dispatch(PoppersSlice.show());
  }

  function showInfo(event: React.MouseEvent<HTMLDivElement>) {
    if (!isShowContextMenu) {
      setIsShowInfo(true);
      setMousePos({ x: event.pageX, y: event.pageY });
    }
  }

  function moveInfo(event: React.MouseEvent<HTMLDivElement>) {
    if (isShowInfo) {
      setMousePos({ x: event.pageX, y: event.pageY });
    }
  }

  function hideInfo() {
    setIsShowInfo(false);
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
      {
        isShowInfo ?
          <OccupationInfo tileId={tileId} x={mousePos.x} y={mousePos.y} /> :
          <></>
      }
      {
        isShowContextMenu ?
          <TileContextMenu tileId={tileId} x={mousePos.x} y={mousePos.y} onHide={contextMenuHideCallback} isOutOfBound={outOfBound} onColourPickerShow={() => setIsShowColourPicker(true)} /> :
          <></>
      }
      {
        isShowColourPicker ?
          <ColourPicker tileId={tileId} onHide={colourPickerHideCallback} /> :
          <></>
      }
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
