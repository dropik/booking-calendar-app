import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { useAppDispatch } from "../../redux/hooks";
import { grab, drop, TileData } from "../../redux/tilesSlice";
import { TileContext } from "./context";

type DraggableProps = {
  children: React.ReactNode
};

export default function Draggable({ children }: DraggableProps): JSX.Element {
  const data = useContext(TileContext).data;

  if (!data) {
    return <>{children}</>;
  }

  return <DraggableWrappee data={data}>{children}</DraggableWrappee>;
}

type DraggableWrappeeProps = {
  children: React.ReactNode,
  data: TileData
};

function DraggableWrappee({ children, data }: DraggableWrappeeProps): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [startedGrabbing, setStartedGrabbing] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [width, setWidth] = useState(0);

  const move = useCallback((event: MouseEvent) => {
    event.preventDefault();
    if (startedGrabbing) {
      setIsGrabbing(true);
    }
    setPosition((prevPosition) => ({ x: prevPosition.x, y: prevPosition.y + event.movementY }));
  }, [startedGrabbing]);

  const endGrab = useCallback((event: MouseEvent) => {
    if (event.button === 0) {
      event.preventDefault();
      dispatch(drop({ tileId: data.id }));
      setIsGrabbing(false);
      setStartedGrabbing(false);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", endGrab);
    }
  }, [dispatch, data.id, move]);

  useEffect(() => {
    return () => {
      dispatch(drop({ tileId: data.id }));
    };
  }, [dispatch, data.id, endGrab]);

  function startGrab(event: React.MouseEvent<HTMLDivElement>): void {
    if (event.button === 0) {
      setStartedGrabbing(true);
    }
  }

  function checkFirstMove(event: React.MouseEvent<HTMLDivElement>): void {
    if (startedGrabbing) {
      dispatch(grab({ tileId: data.id, mouseY: 0 }));
      const el = event.currentTarget;
      const boundingBox = el.getBoundingClientRect();
      setPosition({ x: boundingBox.left, y: boundingBox.top });
      setWidth(boundingBox.width);
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", endGrab);
    }
  }

  function release(event: React.MouseEvent<HTMLDivElement>): void {
    if (event.button === 0) {
      setStartedGrabbing(false);
    }
  }

  return (
    <Box onMouseDown={startGrab} onMouseMove={checkFirstMove} onMouseUp={release} sx={{
      borderRadius: "0.75rem",
      ...(isGrabbing && {
        position: "fixed",
        zIndex: theme.zIndex.tooltip,
        left: 0,
        top: 0,
        width: width,
        pointerEvents: "none",
        transform: `translate(${position.x}px, ${position.y}px)`,
        boxShadow: theme.shadows[3]
      })
    }}>
      { children }
    </Box>
  );
}
