import React, { useContext } from "react";
import Popover from "@mui/material/Popover";

import * as Utils from "../../../../../../../../../utils";
import { TileContext } from "../context";

type ExpandedProps = {
  anchorEl: HTMLElement | null,
  onClose: () => void
};

export default function Expanded({ anchorEl, onClose }: ExpandedProps): JSX.Element {
  const { data } = useContext(TileContext);

  const open = Boolean(anchorEl);
  const id = open ? "expanded-tile" : undefined;
  const anchorElWidthPx = anchorEl ? anchorEl.getBoundingClientRect().width : 0;
  const anchorElWidthRem = Utils.pxToRem(anchorElWidthPx);
  const anchorElWidthRemCaped = Math.max(anchorElWidthRem, 22.5);

  return (
    <Popover
      id={id}
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "center"
      }}
      transformOrigin={{
        horizontal: "center",
        vertical: "center"
      }}
      elevation={1}
      PaperProps={{
        sx: {
          width: `${anchorElWidthRemCaped}rem`
        }
      }}
    >
      Tile
    </Popover>
  );
}
