import React from "react";
import PaletteIcon from "@mui/icons-material/PaletteOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import { useAppDispatch } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";

import Menu from ".";
import ColorPicker from "./ColorPicker";

type Props = {
  tileId: string,
  anchorReference: "anchorEl" | "anchorPosition" | "none",
  anchorEl?: HTMLElement,
  anchorPosition?: { top: number, left: number },
  anchorOrigin?: { horizontal: "center" | "left" | "right", vertical: "bottom" | "center" | "top" },
  transformOrigin?: { horizontal: "center" | "left" | "right", vertical: "bottom" | "center" | "top" },
  onClose: () => void,
  unassigned?: boolean
};

export default function TileContextMenu({
  tileId,
  anchorReference,
  anchorEl,
  anchorPosition,
  anchorOrigin,
  transformOrigin,
  onClose,
  unassigned
}: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const open = Boolean(anchorEl) || Boolean(anchorPosition);
  const id = open ? "tile-context-menu" : undefined;

  function removeOccupation(): void {
    dispatch(TilesSlice.unassign({ tileId }));
  }

  function close(event: {}): void {
    const clickEvent = event as React.UIEvent<HTMLDivElement>;
    if (clickEvent) {
      clickEvent.stopPropagation();
    }
    onClose();
  }

  return (
    <Menu
      id={id}
      anchorReference={anchorReference}
      anchorEl={anchorEl}
      anchorPosition={anchorPosition}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      open={open}
      onClose={close}
      onAnyItemClick={onClose}
      list={[
        {
          text: "Assegna colore",
          icon: <PaletteIcon />,
          children: <ColorPicker tileId={tileId} />
        },
        {
          text: "Rimuovi occupazione",
          icon: <DeleteIcon />,
          onClick: removeOccupation,
          disabled: unassigned
        }
      ]}
      PaperProps={{
        onClick: (event) => { event.stopPropagation(); }
      }}
    />
  );
}
