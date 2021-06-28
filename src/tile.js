import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import "./Tile.css";

function Tile(props) {
  const [grabbed, setGrabbed] = useGrab();
  const mouseY = useMouseY();
  const [initialY, setInitialY] = useState(0);

  function handleGrab(event) {
    event.preventDefault();
    setGrabbed(true);
    setInitialY(event.pageY);
  }

  var className = "tile";
  if (grabbed) {
    className += " grabbed";
  }

  var top = grabbed ? (mouseY - initialY) : 0;

  return (
    <div className={className} onMouseDown={handleGrab} style={{top: top + "px", backgroundColor: props.colour, width: "calc(" + props.nights + "00% + " + (props.nights - 1) + "px)"}}>
      <span className="tile-name">{props.name}</span>
      <span className="tile-room">{props.roomType}</span>
    </div>
  );
}

function useGrab() {
  const [grabbed, setGrabbed] = useState(false);
  useEffect(() => {
    function unsetGrab() {
      setGrabbed(false);
    }
    window.addEventListener('mouseup', unsetGrab);
    return () => window.removeEventListener('mouseup', unsetGrab);
  }, []);
  return [grabbed, setGrabbed];
}

function useMouseY() {
  const [mouseY, setMouseY] = useState(0);
  useEffect(() => {
    function updateMouseY(event) {
      setMouseY(event.pageY);
    }
    window.addEventListener('mousemove', updateMouseY);
    return () => window.removeEventListener('mousemove', updateMouseY);
  }, []);
  return mouseY;
}

export default hot(module)(Tile);