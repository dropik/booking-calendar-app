import React from "react";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import PaletteIcon from "@mui/icons-material/PaletteOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import { useAppDispatch } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";
import * as DialogSlice from "../../redux/dialogSlice";

import Menu from "../Menu";
import ColorPicker from "./ColorPicker";

type Props = {
  tileId: string,
  anchorEl: HTMLElement | null,
  onClose: () => void,
  unassigned?: boolean
};

export default function TileContextMenu({ tileId, anchorEl, onClose, unassigned }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const open = Boolean(anchorEl);
  const id = open ? "tile-context-menu" : undefined;

  function showInfoDialog() {
    dispatch(DialogSlice.showBookingDialog({ tileId }));
  }

  function removeOccupation() {
    dispatch(TilesSlice.removeAssignment({ tileId }));
  }

  return (
    <>
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        onAnyItemClick={onClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        list={[
          {
            text: "Informazioni",
            icon: <InfoIcon />,
            onClick: showInfoDialog
          },
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
    </>
  );
}
