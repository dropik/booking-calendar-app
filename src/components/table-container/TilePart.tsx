import React, { useEffect, useReducer } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { useAppDispatch } from "../../redux/hooks";
import * as GrabbedTileSlice from "../../redux/grabbedTileSlice";
import * as TilesSlice from "../../redux/tilesSlice";

import "./TilePart.css";

type State = {
  grabbed: boolean,
  initialY: number,
  top: number
};

type Action = {
    type: "grab" | "move",
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
  const {state, stateDispatch} = useGrabbedState();

  const grabHandler = getGrabHandler(stateDispatch, dispatch, props.x, props.y);

  useMouseMoveAndDropHandlingEffect(state, stateDispatch, dispatch);

  let className = "tile";
  if (state.grabbed) {
    className += " grabbed";
  }

  return (
    <div
      className={className}
      onMouseDown={grabHandler}
      style={{
        top: state.top + "px",
        backgroundColor: props.tileData.colour,
      }}
    >
      <span className="tile-persons">{props.tileData.persons}</span>
    </div>
  );
}

function useGrabbedState(): {state: State, stateDispatch: React.Dispatch<Action>} {
  const initialState: State = {
    grabbed: false,
    initialY: 0,
    top: 0
  };

  function reducer(state: State, action: Action) {
    switch (action.type) {
    case "grab":
      return { grabbed: true, initialY: action.event.pageY, top: 0 };
    case "move":
      return {
        grabbed: true,
        initialY: state.initialY,
        top: state.grabbed ? action.event.pageY - state.initialY : 0,
      };
    case "drop":
      return { grabbed: false, initialY: 0, top: 0 };
    default:
      throw new Error();
    }
  }

  const [state, stateDispatch] = useReducer(reducer, initialState);

  return {state, stateDispatch};
}

function getGrabHandler(
  stateDispatch: React.Dispatch<Action>,
  dispatch: React.Dispatch<AnyAction>,
  x: string,
  y: number
): (event: React.MouseEvent<HTMLDivElement>) => void {
  return (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    stateDispatch({ type: "grab", event: event.nativeEvent });
    dispatch(GrabbedTileSlice.grab({ x, y }));
  };
}

function useMouseMoveAndDropHandlingEffect(
  state: State,
  stateDispatch: React.Dispatch<Action>,
  dispatch: React.Dispatch<AnyAction>
): void {
  useEffect(() => {
    function onMove(event: MouseEvent) {
      stateDispatch({ type: "move", event: event });
    }

    function onDrop() {
      stateDispatch({ type: "drop" });
      dispatch(GrabbedTileSlice.drop());
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onDrop);
    }

    if (state.grabbed) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onDrop);
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onDrop);
    };
  }, [state.grabbed, stateDispatch, dispatch]);
}

export default hot(module)(TilePart);
