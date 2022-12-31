import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { grab, drop, TileData } from "../../redux/tilesSlice";
import { TileContext } from "./context";
import { SurfaceTint } from "../m3/Tints";

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
  const [width, setWidth] = useState(0);
  const [isGoingBack, setIsGoingBack] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const { cropLeft, cropRight } = useContext(TileContext);

  const move = useCallback((event: MouseEvent) => {
    event.preventDefault();
    if (ref.current) {
      const currentTranslate = ref.current.style.translate;
      const [xStr, yStr] = currentTranslate.split(" ");
      const x = xStr ? Number.parseInt(xStr.replace("px", "")) : 0;
      const y = yStr ? Number.parseInt(yStr.replace("px", "")) : 0;
      ref.current.style.translate = `${x + event.movementX}px ${y + event.movementY}px`;
    }
  }, []);

  const endGrab = useCallback((event: MouseEvent) => {
    if (event.button === 0) {
      event.preventDefault();
      if (ref.current) {
        ref.current.style.translate = `-${scrollLeft}px ${-window.scrollY}px`;
      }
      dispatch(drop({ tileId: data.id }));
      setIsGrabbing(false);
      setStartedGrabbing(false);
      setIsGoingBack(true);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", endGrab);
    }
  }, [dispatch, data.id, move, scrollLeft]);

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
      el.style.translate = `-${scrollLeft}px ${-window.scrollY}px`;
      setIsGrabbing(true);
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

  function onTransitionEnd(): void {
    if (!isGrabbing) {
      setIsGoingBack(false);
    }
  }

  return (
    <Box ref={ref} onMouseDown={startGrab} onMouseMove={checkFirstMove} onMouseUp={release} onTransitionEnd={onTransitionEnd} sx={{
      borderRadius: "0.75rem",
      position: "relative",
      translate: "0px 0px !important",
      transition: theme.transitions.create(["box-shadow"], {
        duration: theme.transitions.duration.short
      }),
      ...(cropLeft && {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      }),
      ...(cropRight && {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      }),
      ...((isGrabbing || isGoingBack) && {
        position: "fixed",
        translate: undefined,
        zIndex: theme.zIndex.modal,
        width: width,
        pointerEvents: "none",
        boxShadow: theme.shadows[3]
      }),
      ...(isGoingBack && {
        transition: theme.transitions.create(["box-shadow", "translate"], {
          duration: theme.transitions.duration.short
        })
      })
    }}>
      {startedGrabbing ? <ScrollLeftChangeListener onScrollLeftChange={setScrollLeft} /> : null}
      { children }
      <SurfaceTint sx={{
        backgroundColor: theme.palette.primary.light,
        opacity: 0,
        transition: theme.transitions.create(["opacity"], {
          duration: theme.transitions.duration.short
        }),
        ...((isGrabbing || isGoingBack) && {
          opacity: theme.opacities.surface3
        })
      }} />
    </Box>
  );
}

type ScrollLeftChangeListenerProps = {
  onScrollLeftChange: (value: number) => void,
}

function ScrollLeftChangeListener({ onScrollLeftChange }: ScrollLeftChangeListenerProps): null {
  const scrollLeft = useAppSelector(state => state.table.scrollLeft);

  useEffect(() => {
    onScrollLeftChange(scrollLeft);
  }, [scrollLeft, onScrollLeftChange]);

  return null;
}
