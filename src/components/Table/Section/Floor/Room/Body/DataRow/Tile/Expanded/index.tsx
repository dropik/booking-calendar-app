import React, { useRef, useState } from "react";
import Popover from "@mui/material/Popover";

import * as Utils from "../../../../../../../../../utils";

import Container from "./Container";
import Header from "./Header";
import Details from "./Details";
import Tint from "./Tint";
import FlexBasisFix from "./FlexBasisFix";

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
      <FlexBasisFix anchorElRect={anchorElRect} headerRef={headerRef}>
        <Container>
          <Header ref={headerRef} />
          <Details open={openDetails} onClose={onClose} />
          <Tint />
        </Container>
      </FlexBasisFix>
    </Popover>
  );
}
