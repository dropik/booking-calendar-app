import React, { ReactNode } from "react";
import Box from "@mui/material/Box";

type RowProps = {
  children: ReactNode
}

export default function Row({ children }: RowProps): JSX.Element {
  return (
    <Box sx={{
      position: "relative"
    }}>
      {children}
    </Box>
  );
}
