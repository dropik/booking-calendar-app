import React, { useEffect, useLayoutEffect, useRef } from "react";
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
  onHide: () => void,
  isOutOfBound: boolean
};

export default function TileContextMenu({ tileId, x, y, onHide, isOutOfBound }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const assignColourIconRef = useRef<HTMLDivElement>(null);
  const isUnassigned = useIsUnassigned(tileId);
  const colour = useAppSelector((state) => state.tiles.data[tileId].colour);

  function hideMenu() {
    onHide();
    dispatch(ContextMenuSlice.hide());
  }

  useContextMenuPositionEffect(ref, x, y);
  useAssignColourIconBackgroundColourEffect(assignColourIconRef, colour);
  useHideContextOnClickOutside(dispatch, hideMenu);

  const removeClassName = getRemoveClassName(isUnassigned);

  let assignColourClassName = "button assign-colour";
  if (isOutOfBound) {
    assignColourClassName += " disabled";
  }

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
      <div className={assignColourClassName}>
        <div ref={assignColourIconRef} className="icon"></div>
        Assegna colore
      </div>
      <div className={removeClassName} onClick={removeOccupation}>
        <FontAwesomeIcon icon={faTrashCan} />
        Rimuovi occupazione
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

function useAssignColourIconBackgroundColourEffect(ref: React.RefObject<HTMLDivElement>, colour: string) {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundColor = colour;
    }
  }, [ref, colour]);
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
