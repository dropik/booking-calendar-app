import React, { useEffect, useRef } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";
import * as ContextMenuSlice from "../../redux/contextMenuSlice";
import * as DialogSlice from "../../redux/dialogSlice";

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

  function getInfo() {
    if (tileId) {
      dispatch(DialogSlice.showBookingDialog({ tileId }));
    }
    dispatch(ContextMenuSlice.hide());
  }

  const remove = getRemoveHandler(dispatch, tileId);

  return (
    <div ref={ref} onMouseDown={onMouseDown} className="tile-context-menu">
      <div onClick={getInfo}>
        <FontAwesomeIcon icon={faCircleInfo} />
        Informazioni
      </div>
      <div className="remove" onClick={remove}>
        <FontAwesomeIcon icon={faTrashCan} />
        Rimuovere occupazione
      </div>
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
      dispatch(ContextMenuSlice.hide());
    }
    window.addEventListener("mousedown", onClickSomewhere);
    return () => window.removeEventListener("mousedown", onClickSomewhere);
  }, [dispatch]);
}

function getRemoveHandler(dispatch: React.Dispatch<AnyAction>, tileId: string): () => void {
  return () => {
    if (tileId) {
      dispatch(TilesSlice.removeAssignment({ tileId }));
    }
    dispatch(ContextMenuSlice.hide());
  };
}

function onMouseDown(event: React.MouseEvent<HTMLDivElement>): void {
  event.stopPropagation();
}

export default hot(module)(TileContextMenu);
