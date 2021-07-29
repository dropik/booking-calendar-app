import React, { useEffect, useReducer } from 'react';
import { hot } from 'react-hot-loader';
import "./tile.css";

function Tile(props) {
  const [grabbedState, grabbedStateDispatch] = useReducer(grabbedStateReducer, { grabbed: false, initialY: 0, top: 0 });

  function grabbedStateReducer(state, action) {
    switch (action.type) {
      case "grab":
        return { grabbed: true, initialY: action.event.pageY, top: 0 };
      case "move":
        return {
          grabbed: state.grabbed,
          initialY: state.initialY,
          top: state.grabbed ? (action.event.pageY - state.initialY) : 0
        };
      case "drop":
        return { grabbed: false, initialY: 0, top: 0 };
      default:
        break;
    }
  }

  function handleGrab(event) {
    event.preventDefault();
    grabbedStateDispatch({ type: "grab", event: event });
  }

  useEffect(() => {
    function drop(event) {
      if (grabbedState.grabbed) {
        props.occupationsDispatch({ type: "move", x: props.x, y: props.y, pageY: event.pageY });
      }
      grabbedStateDispatch({ type: "drop" });
    }
    window.addEventListener('mouseup', drop);
    return () => window.removeEventListener('mouseup', drop);
  }, [grabbedState.grabbed]);

  useEffect(() => {
    function move(event) {
      grabbedStateDispatch({ type: "move", event: event });
    }
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [grabbedState.grabbed]);

  var className = "tile";
  if (grabbedState.grabbed) {
    className += " grabbed";
  }

  return (
    <div className={className} onMouseDown={handleGrab} style={{top: grabbedState.top + "px", backgroundColor: props.colour, width: "calc(" + props.nights + "00% + " + (props.nights - 1) + "px)"}}>
      <span className="tile-name">{props.name}</span>
      <span className="tile-room">{props.roomType}</span>
    </div>
  );
}

export default hot(module)(Tile);