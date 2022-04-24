import React, { useEffect, useLayoutEffect, useRef } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";
import * as DialogSlice from "../../redux/dialogSlice";
import * as PoppersSlice from "../../redux/poppersSlice";

import "./TileContextMenu.css";

type Props = {
  tileId: string,
  x: number,
  y: number,
  onHide: () => void,
  onColorPickerShow: () => void
};

export default function TileContextMenu({ tileId, x, y, onHide, onColorPickerShow }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const assignColorIconRef = useRef<HTMLDivElement>(null);
  const isUnassigned = useIsUnassigned(tileId);
  const color = useAppSelector((state) => state.tiles.data[tileId].color);

  function hideMenu() {
    onHide();
    dispatch(PoppersSlice.hide());
  }

  useContextMenuPositionEffect(ref, x, y);
  useAssignColorIconBackgroundColorEffect(assignColorIconRef, color);
  useHideContextOnClickOutside(dispatch, hideMenu);

  const removeClassName = getRemoveClassName(isUnassigned);

  function showInfoDialog() {
    if (tileId) {
      dispatch(DialogSlice.showBookingDialog({ tileId }));
    }
    hideMenu();
  }

  function showColorPicker() {
    onColorPickerShow();
    onHide();
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
        <InfoIcon />
        Informazioni
      </div>
      <div className="button assign-color" onClick={showColorPicker}>
        <div ref={assignColorIconRef} className="icon"></div>
        Assegna colore
      </div>
      <div className={removeClassName} onClick={removeOccupation}>
        <DeleteIcon />
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

function useAssignColorIconBackgroundColorEffect(ref: React.RefObject<HTMLDivElement>, color: string) {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundColor = color;
    }
  }, [ref, color]);
}

function useHideContextOnClickOutside(dispatch: React.Dispatch<AnyAction>, hideMenu: () => void): void {
  useEffect(() => {
    function onClickSomewhere() {
      hideMenu();
      dispatch(PoppersSlice.hide());
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
