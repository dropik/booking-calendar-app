import React, { useLayoutEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";

import TilePartAlert from "./TilePartAlert";
import TileContextMenu from "../Menu/TileContextMenu";

import "./TilePart.css";

type Props = {
  y: number,
  tileData: TilesSlice.TileData
};

export default function TilePart({ y, tileData }: Props): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const tileId = tileData.id;
  const isGrabbed = useAppSelector(state => state.tiles.grabbedMap[tileId]);
  const ref = useRef<HTMLDivElement>(null);
  const roomType = useRoomTypeByNumber(y);
  const personsInRoomType = useAppSelector(state => state.roomTypes.data[roomType]);
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

  useBackgroundColorEffect(ref, theme.palette[tileData.color].light);

  return (
    <>
      <div
        ref={ref}
        className={className}
        onMouseDown={grabTile}
        onContextMenu={showContextMenu}
      >
        <span className="tile-persons">{tileData.persons}</span>
        <TilePartAlert personsInRoomType={personsInRoomType} roomType={roomType} tileData={tileData} />
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
