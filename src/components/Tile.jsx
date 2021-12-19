import React, { useReducer } from "react";
import { hot } from "react-hot-loader";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { move } from "../redux/mainSlice";

import "./Tile.css";

function Tile({ x, y, tileData }) {
  const dispatch = useDispatch();
  const [grabbedState, grabbedStateDispatch] = useReducer(grabbedStateReducer, {
    grabbed: false,
    initialY: 0,
    top: 0,
  });

  function grabbedStateReducer(state, action) {
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
      break;
    }
  }

  function onGrab(event) {
    event.preventDefault();
    grabbedStateDispatch({ type: "grab", event: event });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onDrop);
  }

  function onMove(event) {
    grabbedStateDispatch({ type: "move", event: event });
  }

  function onDrop(event) {
    grabbedStateDispatch({ type: "drop" });
    dispatch(move({ x: x, y: y, pageY: event.pageY }));
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onDrop);
  }

  var className = "tile";
  if (grabbedState.grabbed) {
    className += " grabbed";
  }

  return (
    <div
      className={className}
      onMouseDown={onGrab}
      style={{
        top: grabbedState.top + "px",
        backgroundColor: tileData.colour,
        width: "calc(" + tileData.nights + "00% + " + (tileData.nights - 1) + "px)",
      }}
    >
      <span className="tile-name">{tileData.name}</span>
      <span className="tile-room">{tileData.roomType}</span>
    </div>
  );
}

Tile.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  tileData: PropTypes.exact({
    colour: PropTypes.string,
    nights: PropTypes.number,
    name: PropTypes.string,
    roomType: PropTypes.string,
    roomNumber: PropTypes.number,
    from: PropTypes.string
  }).isRequired
};

export default hot(module)(Tile);
