import React, { useContext } from "react";
import Box from "@mui/material/Box";

import ExpandedTileContext from "./context";

type FlexBasisFixProps = {
  children: React.ReactNode,
  headerRef: React.RefObject<HTMLDivElement>
};

export default function FlexBasisFix({ children, headerRef }: FlexBasisFixProps): JSX.Element {
  const { anchorElRect } = useContext(ExpandedTileContext);

  return (
    <Box sx={{
      flexBasis: anchorElRect && headerRef.current ?
        `calc(100vh - 2rem - ${anchorElRect.y - (headerRef.current.getBoundingClientRect().height - anchorElRect.height) / 2}px)` :
        undefined,
      overflow: "visible"
    }}>
      {children}
    </Box>
  );
}
