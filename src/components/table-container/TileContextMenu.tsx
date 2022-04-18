import React, { useEffect, useRef } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";
import * as ContextMenuSlice from "../../redux/contextMenuSlice";
import * as DialogSlice from "../../redux/dialogSlice";

import "./TileContextMenu.css";

export default function TileContextMenu(): JSX.Element {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const tileId = useAppSelector((state) => state.contextMenu.tileId);
  const isUnassigned = useIsUnassigned(tileId);
  const mouseX = useAppSelector((state) => state.contextMenu.mouseX);
  const mouseY = useAppSelector((state) => state.contextMenu.mouseY);

  useContextMenuPositionEffect(ref, mouseX, mouseY);
  useHideContextOnClickOutside(dispatch);

  if (!tileId || (isUnassigned === undefined)) {
    return <></>;
  }

  const removeClassName = getRemoveClassName(isUnassigned);

  function showInfoDialog() {
    if (tileId) {
      dispatch(DialogSlice.showBookingDialog({ tileId }));
    }
    dispatch(ContextMenuSlice.hide());
  }

  function removeOccupation() {
    if (!isUnassigned) {
      if (tileId) {
        dispatch(TilesSlice.removeAssignment({ tileId }));
      }
      dispatch(ContextMenuSlice.hide());
    }
  }

  return (
    <div ref={ref} onMouseDown={stopMouseEventPropagation} className="tile-context-menu">
      <div className="button" onClick={showInfoDialog}>
        <FontAwesomeIcon icon={faCircleInfo} />
        Informazioni
      </div>
      <div className={removeClassName} onClick={removeOccupation}>
        <FontAwesomeIcon icon={faTrashCan} />
        Rimuovere occupazione
      </div>
    </div>
  );
}

function useIsUnassigned(tileId: string | undefined): boolean | undefined {
  return useAppSelector((state) => {
    if (tileId) {
      const tile = state.tiles.data[tileId];
      return tile.roomNumber === undefined;
    }
  });
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

function getRemoveClassName(isUnassigned: boolean): string {
  let removeClassName = "button remove";
  if (isUnassigned) {
    removeClassName += " disabled";
  }
  return removeClassName;
}

function stopMouseEventPropagation(event: React.MouseEvent<HTMLDivElement>): void {
  event.stopPropagation();
}
