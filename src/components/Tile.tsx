import React, { useReducer } from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch } from "../redux/hooks";
import { move, TileData } from "../redux/mainSlice";

import "./Tile.css";

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
  x: number,
  y: number,
  tileData: TileData
};

function Tile(props: Props) {
  const dispatch = useAppDispatch();
  const [grabbedState, grabbedStateDispatch] = useReducer(grabbedStateReducer, {
    grabbed: false,
    initialY: 0,
    top: 0,
  });

  function grabbedStateReducer(state: State, action: Action) {
    switch (action.type) {
    case "grab":
      return { grabbed: true, initialY: action.event.pageY, top: 0 };
    case "move":
      return {
        grabbed: state.grabbed,
        initialY: state.initialY,
        top: state.grabbed ? action.event.pageY - state.initialY : 0,
      };
    case "drop":
      return { grabbed: false, initialY: 0, top: 0 };
    default:
      throw new Error();
    }
  }

  function onGrab(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    grabbedStateDispatch({ type: "grab", event: event.nativeEvent });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onDrop);
  }

  function onMove(event: MouseEvent) {
    grabbedStateDispatch({ type: "move", event: event });
  }

  function onDrop(event: MouseEvent) {
    grabbedStateDispatch({ type: "drop" });
    dispatch(move({ x: props.x, y: props.y, pageY: event.pageY }));
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onDrop);
  }

  let className = "tile";
  if (grabbedState.grabbed) {
    className += " grabbed";
  }

  return (
    <div
      className={className}
      onMouseDown={onGrab}
      style={{
        top: grabbedState.top + "px",
        backgroundColor: props.tileData.colour,
        width: "calc(" + props.tileData.nights + "00% + " + (props.tileData.nights - 1) + "px)",
      }}
    >
      <span className="tile-name">{props.tileData.name}</span>
      <span className="tile-room">{props.tileData.roomType}</span>
    </div>
  );
}

export default hot(module)(Tile);
