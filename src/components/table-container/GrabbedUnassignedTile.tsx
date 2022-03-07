import React, { useEffect, useRef } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { useAppDispatch, useAppSelector, useLeftShift, useTileData } from "../../redux/hooks";
import * as Utils from "../../utils";
import * as UnassignedTilesSlice from "../../redux/unassignedTilesSlice";
import * as TilesSlice from "../../redux/tilesSlice";

import "./GrabbedUnassignedTile.css";

function GrabbedUnassignedTile(): JSX.Element {
  const dispatch = useAppDispatch();
  const grabbedTileId = useGrabbedTile();
  const grabbedMouseY = useGrabbedMouseY();
  const tileData = useTileData(grabbedTileId);
  const left = useLeftShift(tileData?.from);
  const ref = useRef<HTMLDivElement>(null);

  useBackgroundColorEffect(ref, tileData);
  useLeftShiftEffect(ref, left);
  useMouseHandlingEffect(ref, dispatch, grabbedTileId, grabbedMouseY);

  if (!grabbedTileId || !tileData || (tileData.roomNumber !== undefined)) {
    return <></>;
  }

  const cells = getCells(tileData);

  return (<div ref={ref} className="grabbed-unassigned-tile">{cells}</div>);
}

function useGrabbedTile(): string | undefined {
  return useAppSelector(state => state.tiles.grabbedTile);
}

function useGrabbedMouseY(): number {
  return useAppSelector(state => state.unassignedTiles.grabbedMouseY);
}

function useBackgroundColorEffect(ref: React.RefObject<HTMLDivElement>, tileData: TilesSlice.TileData | undefined): void {
  useEffect(() => {
    if (ref.current && tileData) {
      ref.current.style.backgroundColor = tileData.colour;
    }
  }, [ref, tileData]);
}

function useLeftShiftEffect(ref: React.RefObject<HTMLDivElement>, left: number): void {
  useEffect(() => {
    if (ref.current) {
      ref.current.style.left = `${left}px`;
    }
  }, [ref, left]);
}

function useMouseHandlingEffect(
  ref: React.RefObject<HTMLDivElement>,
  dispatch: React.Dispatch<AnyAction>,
  tileId: string | undefined,
  grabbedMouseY: number
): void {
  useEffect(() => {
    function onMove(event: MouseEvent) {
      if (ref.current) {
        ref.current.style.top = `${event.y - grabbedMouseY}px`;
      }
    }

    function onDrop() {
      if (tileId) {
        dispatch(TilesSlice.dropAssigned({ tileId }));
      }
      dispatch(UnassignedTilesSlice.drop());
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onDrop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onDrop);
    };
  }, [ref, dispatch, tileId, grabbedMouseY]);
}

function getCells(tileData: TilesSlice.TileData): JSX.Element[] {
  const cells: JSX.Element[] = [];
  const dateCounter = new Date(tileData.from);
  for (let i = 0; i < tileData.nights; i++) {
    const x = Utils.dateToString(dateCounter);
    cells.push(
      <div key={x} className="grabbed-unassigned-tile-cell">
        <b>{tileData.persons}</b>
      </div>
    );
    dateCounter.setDate(dateCounter.getDate() + 1);
  }
  return cells;
}

export default hot(module)(GrabbedUnassignedTile);
