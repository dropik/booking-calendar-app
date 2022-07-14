import React, { ReactNode } from "react";
import Box from "@mui/material/Box";

type BodyProps = {
  children: ReactNode
};

export default function Body({ children }: BodyProps): JSX.Element {
  return (
    <Box sx={{
      position: "relative",
      ml: "calc(7.5rem + 1px)",
    }}>
      {children}
    </Box>
  );
}
