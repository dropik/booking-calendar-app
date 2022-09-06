import Popover from "@mui/material/Popover";
import React from "react";

type ExpandedProps = {
  anchorEl: HTMLElement | null,
  onClose: () => void
};

export default function Expanded({ anchorEl, onClose }: ExpandedProps): JSX.Element {
  const open = Boolean(anchorEl);
  const id = open ? "expanded-tile" : undefined;

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
    >
      Tile
    </Popover>
  );
}
