import React, { useEffect, useReducer } from "react";
import { hot } from "react-hot-loader";
import { drop, grab } from "../redux/grabbedTileSlice";

import { useAppDispatch } from "../redux/hooks";
import { TileData } from "../redux/mainSlice";

import "./Tile.css";

type State = {
  grabbed: boolean,
  initialY: number,
  top: number
};

const initialState: State = {
  grabbed: false,
  initialY: 0,
  top: 0
};

type Action = {
    type: "grab" | "move",
    event: MouseEvent
} | {
  type: "drop"
};

type Props = {
  x: number,
  y: number,
  tileData: TileData
};

function Tile(props: Props) {
  const {state, onGrab} = useGrabbedState(props.x, props.y);

  let className = "tile";
  if (state.grabbed) {
    className += " grabbed";
  }

  return (
    <div
      className={className}
      onMouseDown={onGrab}
      style={{
        top: state.top + "px",
        backgroundColor: props.tileData.colour,
        width: "calc(" + props.tileData.nights + "00% + " + (props.tileData.nights - 1) + "px)",
      }}
    >
      <span className="tile-name">{props.tileData.name}</span>
      <span className="tile-room">{props.tileData.roomType}</span>
    </div>
  );
}

function useGrabbedState(x: number, y: number) {
  const dispatch = useAppDispatch();
  const [state, stateDispatch] = useReducer(reducer, initialState);

  function onGrab(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    stateDispatch({ type: "grab", event: event.nativeEvent });
    dispatch(grab({ x: x, y: y }));
  }

  useEffect(() => {
    function onMove(event: MouseEvent) {
      stateDispatch({ type: "move", event: event });
    }

    function onDrop() {
      stateDispatch({ type: "drop" });
      dispatch(drop());
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onDrop);
    }

    if (state.grabbed) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onDrop);
    }

    return () => {
      console.log("cleanup");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onDrop);
    };
  }, [state.grabbed, dispatch]);

  return {state, onGrab};
}

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

export default hot(module)(Tile);
