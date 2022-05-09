import React, { useLayoutEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";

import OccupationInfo from "../OccupationInfo";
import TileContextMenu from "../Menu/TileContextMenu";

import "./UnassignedTilePart.css";

type Props = {
  hasTilePart: boolean,
  tileId: string
};

export default function UnassignedTilePart({ hasTilePart, tileId }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const tileData = useAppSelector((state) => state.tiles.data[tileId]);
  const ref = useRef<HTMLDivElement>(null);
  const [isShowInfo, setIsShowInfo] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [contextMenuAnchorEl, setContextMenuAnchorEl] = useState<HTMLElement | null>(null);

  useBackgroundColorEffect(ref, tileData);

  if (!hasTilePart) {
    return <></>;
  }

  function showContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    setContextMenuAnchorEl(event.currentTarget);
  }

  function closeContextMenu() {
    setContextMenuAnchorEl(null);
  }

  function grabTile(event: React.MouseEvent<HTMLDivElement>) {
    if (ref.current && (event.button === 0)) {
      dispatch(TilesSlice.grab({
        tileId,
        mouseY: event.pageY - ref.current.getBoundingClientRect().top
      }));
    } else if (event.button === 2) {
      event.stopPropagation();
    }
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

  return (
    <>
      <div
        ref={ref}
        className="unassigned-tile-part"
        onMouseDown={grabTile}
        onMouseEnter={showInfo}
        onMouseLeave={hideInfo}
        onMouseMove={moveInfo}
        onContextMenu={showContextMenu}
      >
        <span className="tile-persons">{tileData.persons}</span>
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
        unassigned
      />
    </>
  );
}

function useBackgroundColorEffect(ref: React.RefObject<HTMLDivElement>, tileData: TilesSlice.TileData): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundColor = tileData.color;
    }
  }, [ref, tileData]);
}
