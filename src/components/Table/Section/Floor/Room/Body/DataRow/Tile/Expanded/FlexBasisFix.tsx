import Box from "@mui/material/Box";
import React from "react";

type FlexBasisFixProps = {
  children: React.ReactNode,
  anchorElRect?: DOMRect,
  headerRef: React.RefObject<HTMLDivElement>
};

export default function FlexBasisFix({ children, anchorElRect, headerRef }: FlexBasisFixProps): JSX.Element {
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
