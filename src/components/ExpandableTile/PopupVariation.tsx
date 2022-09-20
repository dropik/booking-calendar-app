import React from "react";

import FlexBasisFix from "./FlexBasisFix";
import TilePopover from "./TilePopover";

type PopupVariationProps = {
  children: React.ReactNode,
  variant: "popup" | "in-content"
};

export default function PopupVariation({ children, variant }: PopupVariationProps): JSX.Element {
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
