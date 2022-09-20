import React, { useRef, useState } from "react";

import ExpandedTileContext from "./context";

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
    <ExpandedTileContext.Provider value={{
      anchorEl: anchorEl,
      anchorElRect: anchorElRect,
      onClose: onClose
    }}>
      <TilePopover setOpenDetails={setOpenDetails}>
        <FlexBasisFix headerRef={headerRef}>
          <Container>
            <Header ref={headerRef} />
            <Details open={openDetails} />
            <Tint />
          </Container>
        </FlexBasisFix>
      </TilePopover>
    </ExpandedTileContext.Provider>
  );
}
