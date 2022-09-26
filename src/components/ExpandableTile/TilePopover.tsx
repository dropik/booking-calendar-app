import React, { useContext } from "react";
import Popover from "@mui/material/Popover";

import * as Utils from "../../utils";
import ExpandableTileContext from "./context";

type TilePopoverProps = {
  children: React.ReactNode
};

export default function TilePopover({ children }: TilePopoverProps): JSX.Element {
  const { anchorEl, anchorElRect, setOpenDetails } = useContext(ExpandableTileContext);
  const open = Boolean(anchorEl);
  const id = open ? "expanded-tile" : undefined;

  const popoverRootPosition = anchorElRect ?
    { top: 0, left: anchorElRect.x + anchorElRect.width / 2 } :
    { top: 0, left: 0 };

  const anchorElWidthPx = anchorEl ? anchorEl.getBoundingClientRect().width : 0;
  const anchorElWidthRem = Utils.pxToRem(anchorElWidthPx);
  const anchorElWidthRemCaped = Math.max(anchorElWidthRem, 22.5);

  return (
    <Popover
      id={id}
      open={open}
      onClose={() => {
        setOpenDetails(false);
      }}
      anchorReference="anchorPosition"
      anchorPosition={popoverRootPosition}
      transformOrigin={{
        horizontal: "center",
        vertical: "top"
      }}
      elevation={0}
      transitionDuration={0}
      keepMounted={true}
      PaperProps={{
        sx: {
          display: "flex",
          flexDirection: "column-reverse",
          width: `${anchorElWidthRemCaped}rem`,
          height: "calc(100vh - 2rem)",
          maxHeight: "calc(100vh - 2rem)",
          backgroundColor: "transparent",
          overflow: "visible",
          pointerEvents: "none"
        }
      }}
      TransitionProps={{
        onEntered: () => { setOpenDetails(true); }
      }}
    >
      {children}
    </Popover>
  );
}
