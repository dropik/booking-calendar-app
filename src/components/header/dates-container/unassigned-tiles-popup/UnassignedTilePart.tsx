import React, { useCallback, useLayoutEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector, useColumns, useLeftmostDate } from "../../../../redux/hooks";
import * as Utils from "../../../../utils";
import * as TilesSlice from "../../../../redux/tilesSlice";
import * as ContextMenuSlice from "../../../../redux/contextMenuSlice";

import OccupationInfo from "../../../OccupationInfo";
import TileContextMenu from "../../../table-container/TileContextMenu";

import "./UnassignedTilePart.css";

type Props = {
  hasTilePart: boolean,
  tileId: string
};

export default function UnassignedTilePart({ hasTilePart, tileId }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const tileData = useAppSelector((state) => state.tiles.data[tileId]);
  const leftmostDate = useLeftmostDate();
  const columns = useColumns();
  const ref = useRef<HTMLDivElement>(null);
  const [isShowInfo, setIsShowInfo] = useState(false);
  const [isShowContextMenu, setIsShowContextMenu] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const contextMenuHideCallback = useCallback(() => setIsShowContextMenu(false), []);

  useBackgroundColorEffect(ref, tileData);

  if (!hasTilePart) {
    return <></>;
  }

  const outOfBound = isOutOfBound(tileData, leftmostDate, columns);
  const className = getClassName(outOfBound);

  function showContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsShowInfo(false);
    setIsShowContextMenu(true);
    setMousePos({ x: event.pageX, y: event.pageY });
    dispatch(ContextMenuSlice.show());
  }

  function grabTile(event: React.MouseEvent<HTMLDivElement>) {
    if (!outOfBound && ref.current && (event.button === 0)) {
      dispatch(TilesSlice.grab({
        tileId,
        mouseY: event.pageY - ref.current.getBoundingClientRect().top
      }));
    } else if (event.button === 2) {
      event.stopPropagation();
    }
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
      {
        isShowInfo ?
          <OccupationInfo tileId={tileId} x={mousePos.x} y={mousePos.y} /> :
          <></>
      }
      {
        isShowContextMenu ?
          <TileContextMenu tileId={tileId} x={mousePos.x} y={mousePos.y} onHide={contextMenuHideCallback} /> :
          <></>
      }
    </div>
  );
}

function useBackgroundColorEffect(ref: React.RefObject<HTMLDivElement>, tileData: TilesSlice.TileData): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundColor = tileData.colour;
    }
  }, [ref, tileData]);
}

function isOutOfBound(tileData: TilesSlice.TileData, leftmostDate: string, columns: number): boolean {
  const tileStartShift = Utils.daysBetweenDates(leftmostDate, tileData.from);
  return (tileStartShift < 0) || (tileStartShift + tileData.nights > columns);
}

function getClassName(outOfBound: boolean): string {
  let className = "unassigned-tile-part";
  if (outOfBound) {
    className += " out-of-bound";
  }
  return className;
}
