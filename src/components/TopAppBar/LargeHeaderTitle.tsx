import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type LargeHeaderTitleProps = {
  children: React.ReactNode
};

export default function LargeHeaderTitle({ children }: LargeHeaderTitleProps): JSX.Element {
  return (
    <Box sx={{
      pl: "2rem",
      pt: "5.75rem",
      flexBasis: "26rem",
      flexShrink: 0,
      boxSizing: "border-box"
    }}>
      <Typography variant="headlineMedium">
        {children}
      </Typography>
    </Box>
  );
}
