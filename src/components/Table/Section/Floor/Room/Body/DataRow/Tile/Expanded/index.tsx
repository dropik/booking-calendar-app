import React, { useRef, useState } from "react";

import TilePopover from "./TilePopover";
import FlexBasisFix from "./FlexBasisFix";
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

  const anchorElRect = anchorEl?.getBoundingClientRect();

  return (
    <TilePopover anchorEl={anchorEl} setOpenDetails={setOpenDetails} anchorElRect={anchorElRect}>
      <FlexBasisFix anchorElRect={anchorElRect} headerRef={headerRef}>
        <Container>
          <Header ref={headerRef} />
          <Details open={openDetails} onClose={onClose} />
          <Tint />
        </Container>
      </FlexBasisFix>
    </TilePopover>
  );
}
