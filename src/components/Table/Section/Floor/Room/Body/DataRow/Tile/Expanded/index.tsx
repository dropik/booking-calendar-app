import React, { useRef, useState } from "react";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";

import * as Utils from "../../../../../../../../../utils";

import Container from "./Container";
import Header from "./Header";
import Details from "./Details";
import Tint from "./Tint";

type ExpandedProps = {
  anchorEl: HTMLElement | null,
  onClose: () => void
};

export default function Expanded({ anchorEl, onClose }: ExpandedProps): JSX.Element {
  const [openDetails, setOpenDetails] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? "expanded-tile" : undefined;
  const anchorElWidthPx = anchorEl ? anchorEl.getBoundingClientRect().width : 0;
  const anchorElWidthRem = Utils.pxToRem(anchorElWidthPx);
  const anchorElWidthRemCaped = Math.max(anchorElWidthRem, 22.5);

  const anchorElRect = anchorEl?.getBoundingClientRect();
  const popoverRootPosition = anchorElRect ?
    { top: 0, left: anchorElRect.x + anchorElRect.width / 2 } :
    { top: 0, left: 0 };

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
      <Box sx={{
        flexBasis: anchorElRect && headerRef.current ?
          `calc(100vh - 2rem - ${anchorElRect.y - (headerRef.current.getBoundingClientRect().height - anchorElRect.height) / 2}px)` :
          undefined,
        overflow: "visible"
      }}>
        <Container>
          <Header ref={headerRef} />
          <Details open={openDetails} onClose={onClose} />
          <Tint />
        </Container>
      </Box>
    </Popover>
  );
}
