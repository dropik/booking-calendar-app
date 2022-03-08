import React, { useEffect, useRef } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";
import * as ContextMenuSlice from "../../redux/contextMenuSlice";

import "./TileContextMenu.css";

function TileContextMenu(): JSX.Element {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const tileId = useAppSelector((state) => state.contextMenu.tileId);
  const mouseX = useAppSelector((state) => state.contextMenu.mouseX);
  const mouseY = useAppSelector((state) => state.contextMenu.mouseY);

  useContextMenuPositionEffect(ref, mouseX, mouseY);
  useHideContextOnClickOutside(dispatch);

  if (!tileId) {
    return <></>;
  }

  const clickHandler = getClickHandler(dispatch, tileId);

  return (
    <div ref={ref} onMouseDown={onMouseDown} className="tile-context-menu">
      <div onClick={clickHandler}>Rimuovere occupazione</div>
    </div>
  );
}

function useContextMenuPositionEffect(ref: React.RefObject<HTMLDivElement>, mouseX: number, mouseY: number): void {
  useEffect(() => {
    if (ref.current) {
      ref.current.style.top = `${mouseY}px`;
      ref.current.style.left = `${mouseX + 10}px`;
    }
  }, [ref, mouseX, mouseY]);
}

function useHideContextOnClickOutside(dispatch: React.Dispatch<AnyAction>): void {
  useEffect(() => {
    function onClickSomewhere() {
      dispatch(ContextMenuSlice.hideTileContextMenu());
    }
    window.addEventListener("mousedown", onClickSomewhere);
    return () => window.removeEventListener("mousedown", onClickSomewhere);
  }, [dispatch]);
}

function getClickHandler(dispatch: React.Dispatch<AnyAction>, tileId: string): () => void {
  return () => {
    if (tileId) {
      dispatch(TilesSlice.removeAssignment({ tileId }));
    }
    dispatch(ContextMenuSlice.hideTileContextMenu());
  };
}

function onMouseDown(event: React.MouseEvent<HTMLDivElement>): void {
  event.stopPropagation();
}

export default hot(module)(TileContextMenu);
