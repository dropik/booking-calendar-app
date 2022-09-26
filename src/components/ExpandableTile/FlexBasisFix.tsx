import React, { useContext } from "react";
import Box from "@mui/material/Box";

import ExpandableTileContext from "./context";

type FlexBasisFixProps = {
  children: React.ReactNode
};

export default function FlexBasisFix({ children }: FlexBasisFixProps): JSX.Element {
  const { anchorElRect, headerRef } = useContext(ExpandableTileContext);

  return (
    <Box sx={{
      flexBasis: anchorElRect && headerRef.current ?
        `calc(100vh - 1rem - ${anchorElRect.y - (headerRef.current.getBoundingClientRect().height - anchorElRect.height) / 2}px)` :
        undefined,
      overflow: "visible"
    }}>
      {children}
    </Box>
  );
}
