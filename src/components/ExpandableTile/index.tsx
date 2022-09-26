import React, { useRef, useState } from "react";

import ExpandableTileContext from "./context";

import Container from "./Container";
import Header from "./Header";
import Details from "./Details";
import Tint from "./Tint";
import PopupVariation from "./PopupVariation";

type ExpandableProps = {
  variant: "popup" | "in-content",
  anchorEl?: HTMLElement,
  onClose?: () => void,
  isFirst?: boolean
};

export default function ExpandableTile({ variant, anchorEl, onClose, isFirst }: ExpandableProps): JSX.Element {
  const [openDetails, setOpenDetails] = useState(variant === "in-content");
  const headerRef = useRef<HTMLDivElement>(null);

  const anchorElRect = anchorEl?.getBoundingClientRect();

  return (
    <ExpandableTileContext.Provider value={{
      variant: variant,
      anchorEl: anchorEl,
      anchorElRect: anchorElRect,
      onClose: onClose,
      setOpenDetails: setOpenDetails,
      headerRef: headerRef
    }}>
      <PopupVariation>
        <Container isFirst={isFirst}>
          <Header ref={headerRef} />
          <Details open={openDetails} />
          <Tint />
        </Container>
      </PopupVariation>
    </ExpandableTileContext.Provider>
  );
}
