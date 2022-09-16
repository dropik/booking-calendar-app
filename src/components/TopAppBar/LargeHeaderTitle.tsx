import React from "react";
import Typography from "@mui/material/Typography";

type LargeHeaderTitleProps = {
  children: React.ReactNode
};

export default function LargeHeaderTitle({ children }: LargeHeaderTitleProps): JSX.Element {
  return (
    <Typography variant="headlineMedium" sx={{
      pl: "1rem",
      pt: "5.5rem"
    }}>
      {children}
    </Typography>
  );
}
