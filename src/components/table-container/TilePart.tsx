import React, { useLayoutEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";

import TilePartAlert from "./TilePartAlert";
import OccupationInfo from "../OccupationInfo";
import TileContextMenu from "./TileContextMenu";

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
  const roomType = useRoomTypeByNumber(y);
  const personsInRoomType = useAppSelector(state => state.roomTypes.data[roomType]);
  const [isShowInfo, setIsShowInfo] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [contextMenuAnchorEl, setContextMenuAnchorEl] = useState<HTMLElement | null>(null);

  const className = getClassName(isGrabbed);

  function grabTile(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    if ((event.button == 0) && ref.current) {
      dispatch(TilesSlice.grab({ tileId, mouseY: event.pageY - ref.current.getBoundingClientRect().top }));
    }
  }

  function showContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    setContextMenuAnchorEl(event.currentTarget);
  }

  function closeContextMenu() {
    setContextMenuAnchorEl(null);
  }

  function showInfo(event: React.MouseEvent<HTMLDivElement>) {
    setIsShowInfo(true);
    setMousePos({ x: event.pageX, y: event.pageY });
  }

  function moveInfo(event: React.MouseEvent<HTMLDivElement>) {
    if (isShowInfo) {
      setMousePos({ x: event.pageX, y: event.pageY });
    }
  }

  function hideInfo() {
    setIsShowInfo(false);
  }

  useBackgroundColorEffect(ref, tileData.color);

  return (
    <>
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
      </div>
      <TileContextMenu
        tileId={tileId}
        anchorEl={contextMenuAnchorEl}
        onClose={closeContextMenu}
      />
    </>
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

function getClassName(grabbed: boolean | undefined): string {
  let className = "tile";
  if (grabbed) {
    className += " grabbed";
  }
  return className;
}

function useBackgroundColorEffect(
  ref: React.RefObject<HTMLDivElement>,
  color: string
): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundColor = color;
    }
  }, [ref, color]);
}
