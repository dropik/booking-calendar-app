import React, { useState } from "react";
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
  const [colorPickerAnchorEl, setColorPickerAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? "tile-context-menu" : undefined;

  function showInfoDialog() {
    dispatch(DialogSlice.showBookingDialog({ tileId }));
  }

  function showColorPicker(event: React.MouseEvent<HTMLElement>) {
    setColorPickerAnchorEl(event.currentTarget);
  }

  function closeColorPicker() {
    setColorPickerAnchorEl(null);
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
            onClick: showColorPicker,
          },
          {
            text: "Rimuovi occupazione",
            icon: <DeleteIcon />,
            onClick: removeOccupation,
            disabled: unassigned
          }
        ]}
      />
      <ColorPicker tileId={tileId} onHide={closeColorPicker} anchorEl={colorPickerAnchorEl} />
    </>
  );
}
