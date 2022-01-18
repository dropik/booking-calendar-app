import React, { useEffect, useLayoutEffect, useReducer, useRef } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { useAppDispatch, useGrabbedTile, useTileIdByCoords } from "../../redux/hooks";
import * as GrabbedTileSlice from "../../redux/grabbedTileSlice";
import * as TilesSlice from "../../redux/tilesSlice";

import "./TilePart.css";

type Action = {
    type: "move",
    event: MouseEvent
} | {
  type: "drop"
};

type Props = {
  x: string,
  y: number,
  tileData: TilesSlice.TileData
};

function TilePart(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const grabbedTile = useGrabbedTile();
  const {top, topDispatch} = useTopState(grabbedTile.initialPageY);
  const tileId = useTileIdByCoords(props.x, props.y);
  const grabbed = tileId === grabbedTile.tileId;
  const ref = useRef<HTMLDivElement>(null);

  const grabHandler = getGrabHandler(dispatch, tileId, props.x, props.y);

  useMouseHandlingEffects(topDispatch, dispatch, grabbed);
  useInlineStyleEffects(ref, props.tileData.colour, top);

  let className = "tile";
  if (grabbed) {
    className += " grabbed";
  }

  return (
    <div ref={ref} className={className} onMouseDown={grabHandler}>
      <span className="tile-persons">{props.tileData.persons}</span>
    </div>
  );
}

function useTopState(initialPageY: number): { top: number, topDispatch: React.Dispatch<Action> } {
  function reducer(state: number, action: Action) {
    switch (action.type) {
    case "move":
      return  action.event.pageY - initialPageY;
    case "drop":
      return 0;
    default:
      throw new Error();
    }
  }

  const [top, topDispatch] = useReducer(reducer, 0);

  return { top, topDispatch };
}

function getGrabHandler(
  dispatch: React.Dispatch<AnyAction>,
  tileId: number,
  x: string,
  y: number
): (event: React.MouseEvent<HTMLDivElement>) => void {
  return (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    dispatch(GrabbedTileSlice.grab({ tileId, x, y, initialPageY: event.pageY }));
  };
}

function useMouseHandlingEffects(
  topDispatch: React.Dispatch<Action>,
  dispatch: React.Dispatch<AnyAction>,
  grabbed: boolean
): void {
  useDragHandlingEffect(topDispatch, dispatch, grabbed);
  useDropHandlingEffect(topDispatch, dispatch);
}

function useDragHandlingEffect(
  topDispatch: React.Dispatch<Action>,
  dispatch: React.Dispatch<AnyAction>,
  grabbed: boolean
): void {
  useEffect(() => {
    function onMove(event: MouseEvent) {
      topDispatch({ type: "move", event: event });
    }

    if (grabbed) {
      window.addEventListener("mousemove", onMove);
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, [grabbed, topDispatch, dispatch]);
}

function useDropHandlingEffect(
  topDispatch: React.Dispatch<Action>,
  dispatch: React.Dispatch<AnyAction>
): void {
  useEffect(() => {
    function onDrop() {
      topDispatch({ type: "drop" });
      dispatch(GrabbedTileSlice.drop());
    }
    window.addEventListener("mouseup", onDrop);
    return () => window.removeEventListener("mouseup", onDrop);
  }, [topDispatch, dispatch]);
}

function useInlineStyleEffects(
  ref: React.RefObject<HTMLDivElement>,
  colour: string,
  top: number
): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundColor = colour;
    }
  }, [ref, colour]);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.top = `${top}px`;
    }
  }, [ref, top]);
}

export default hot(module)(TilePart);
