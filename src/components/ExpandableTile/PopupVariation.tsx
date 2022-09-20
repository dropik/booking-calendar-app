import React, { useContext } from "react";

import ExpandableTileContext from "./context";
import FlexBasisFix from "./FlexBasisFix";
import TilePopover from "./TilePopover";

type PopupVariationProps = {
  children: React.ReactNode
};

export default function PopupVariation({ children }: PopupVariationProps): JSX.Element {
  const { variant } = useContext(ExpandableTileContext);

  if (variant === "popup") {
    return (
      <TilePopover>
        <FlexBasisFix>
          {children}
        </FlexBasisFix>
      </TilePopover>
    );
  }

  return <>{children}</>;
}
