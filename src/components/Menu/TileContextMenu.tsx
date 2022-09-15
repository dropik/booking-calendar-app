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
  onClose: () => void,
  unassigned?: boolean
};

export default function TileContextMenu({ tileId, anchorReference, anchorEl, anchorPosition, onClose, unassigned }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const open = Boolean(anchorEl) || Boolean(anchorPosition);
  const id = open ? "tile-context-menu" : undefined;

  function removeOccupation() {
    dispatch(TilesSlice.unassign({ tileId }));
  }

  return (
    <Menu
      id={id}
      anchorReference={anchorReference}
      anchorEl={anchorEl}
      anchorPosition={anchorPosition}
      open={open}
      onClose={onClose}
      onAnyItemClick={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
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
    />
  );
}
