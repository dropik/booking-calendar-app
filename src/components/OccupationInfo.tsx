import React, { Dispatch, useEffect, useLayoutEffect, useRef } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { hot } from "react-hot-loader";

import { useAppDispatch, useMousePosition } from "../redux/hooks";
import * as MouseSlice from "../redux/mouseSlice";

import "./OccupationInfo.css";

function OccupationInfo(): JSX.Element {
  const mousePosition = useMousePosition();
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useUpdateMousePositionEffect(dispatch);
  useUpdatePopupCoordsEffect(ref, mousePosition);

  return (
    <div ref={ref} className="occupation-info">
      <p className="occupation-info-header">Ivan Petrov</p>
      <div className="occupation-info-data">
        <p>Camera: doppia</p>
        <p>Ospiti: 2</p>
        <p>Arrivo: 25/02/2022</p>
        <p>Partenza: 27/02/2022</p>
      </div>
    </div>
  );
}

function useUpdatePopupCoordsEffect(
  ref: React.RefObject<HTMLDivElement>,
  mousePosition: MouseSlice.MousePosition
): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.top = `${mousePosition.y + 10}px`;
      ref.current.style.left = `${mousePosition.x + 20}px`;
    }
  }, [ref, mousePosition]);
}

function useUpdateMousePositionEffect(dispatch: Dispatch<AnyAction>): void {
  useEffect(() => {
    function updateMousePosition(event: MouseEvent) {
      dispatch(MouseSlice.updatePosition({ x: event.x, y: event.y }));
    }
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [dispatch]);
}

export default hot(module)(OccupationInfo);
