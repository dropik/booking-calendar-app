import React, { useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch, useAppSelector, useColumns, useLeftmostDate } from "../../../../redux/hooks";
import * as Utils from "../../../../utils";
import * as TilesSlice from "../../../../redux/tilesSlice";
import * as OccupationInfoSlice from "../../../../redux/occupationInfoSlice";
import * as ContextMenuSlice from "../../../../redux/contextMenuSlice";

import "./UnassignedTilePart.css";

type Props = {
  hasTilePart: boolean,
  tileId: string
};

function UnassignedTilePart({ hasTilePart, tileId }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const tileData = useAppSelector((state) => state.tiles.data[tileId]);
  const leftmostDate = useLeftmostDate();
  const columns = useColumns();
  const ref = useRef<HTMLDivElement>(null);

  useBackgroundColorEffect(ref, tileData);

  if (!hasTilePart) {
    return <></>;
  }

  const outOfBound = isOutOfBound(tileData, leftmostDate, columns);
  const className = getClassName(outOfBound);

  function showContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    dispatch(ContextMenuSlice.show({
      tileId,
      mouseX: event.pageX,
      mouseY: event.pageY
    }));
  }

  function grabTile(event: React.MouseEvent<HTMLDivElement>) {
    dispatch(OccupationInfoSlice.hide());
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
    dispatch(OccupationInfoSlice.show({ hoveredId: tileId, x: event.pageX, y: event.pageY }));
  }

  function updateInfoPos(event: React.MouseEvent<HTMLDivElement>) {
    dispatch(OccupationInfoSlice.move({ x: event.pageX, y: event.pageY }));
  }

  function hideInfo() {
    dispatch(OccupationInfoSlice.hide());
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseDown={grabTile}
      onMouseEnter={showInfo}
      onMouseLeave={hideInfo}
      onMouseMove={updateInfoPos}
      onContextMenu={showContextMenu}
    >
      {tileData.persons}
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

export default hot(module)(UnassignedTilePart);
