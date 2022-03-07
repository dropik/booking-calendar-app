import React, { useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import * as TilesSlice from "../../../../redux/tilesSlice";
import * as HoveredIdSlice from "../../../../redux/hoveredIdSlice";

import "./UnassignedTilePart.css";

type Props = {
  hasTilePart: boolean,
  tileId: string
};

function UnassignedTilePart(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const tileData = useTileData(props.tileId);
  const ref = useRef<HTMLDivElement>(null);

  useBackgroundColorEffect(ref, tileData);

  if (!props.hasTilePart) {
    return <></>;
  }

  const enterHandler = getEnterHandler(dispatch, props.tileId);
  const leaveHandler = getLeaveHandler(dispatch);

  return (
    <div
      ref={ref}
      onMouseEnter={enterHandler}
      onMouseLeave={leaveHandler}
      className="unassigned-tile-part"
    >
      <b>{tileData.persons}</b>
    </div>
  );
}

function useTileData(tileId: string): TilesSlice.TileData {
  return useAppSelector((state) => state.tiles.data[tileId]);
}

function useBackgroundColorEffect(ref: React.RefObject<HTMLDivElement>, tileData: TilesSlice.TileData): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundColor = tileData.colour;
    }
  }, [ref, tileData]);
}

function getEnterHandler(dispatch: React.Dispatch<AnyAction>, tileId: string): () => void {
  return () => dispatch(HoveredIdSlice.set(tileId));
}

function getLeaveHandler(dispatch: React.Dispatch<AnyAction>): () => void {
  return () => dispatch(HoveredIdSlice.set(undefined));
}

export default hot(module)(UnassignedTilePart);
