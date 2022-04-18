import React, { useEffect, useRef } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";
import * as DialogSlice from "../../redux/dialogSlice";
import * as ContextMenuSlice from "../../redux/contextMenuSlice";

import "./TileContextMenu.css";

type Props = {
  tileId: string,
  x: number,
  y: number,
  onHide: () => void
};

export default function TileContextMenu({ tileId, x, y, onHide }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const isUnassigned = useIsUnassigned(tileId);

  function hideMenu() {
    onHide();
    dispatch(ContextMenuSlice.hide());
  }

  useContextMenuPositionEffect(ref, x, y);
  useHideContextOnClickOutside(dispatch, hideMenu);

  const removeClassName = getRemoveClassName(isUnassigned);

  function showInfoDialog() {
    if (tileId) {
      dispatch(DialogSlice.showBookingDialog({ tileId }));
    }
    hideMenu();
  }

  function removeOccupation() {
    if (!isUnassigned) {
      dispatch(TilesSlice.removeAssignment({ tileId }));
      hideMenu();
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

function useIsUnassigned(tileId: string): boolean {
  return useAppSelector((state) => {
    const tile = state.tiles.data[tileId];
    return tile.roomNumber === undefined;
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

function useHideContextOnClickOutside(dispatch: React.Dispatch<AnyAction>, hideMenu: () => void): void {
  useEffect(() => {
    function onClickSomewhere() {
      hideMenu();
      dispatch(ContextMenuSlice.hide());
    }
    window.addEventListener("mousedown", onClickSomewhere);
    return () => window.removeEventListener("mousedown", onClickSomewhere);
  }, [dispatch, hideMenu]);
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
