import React from "react";
import Box from "@mui/material/Box";

type DescriptionContainerProps = {
  children: React.ReactNode,
};

export default function DescriptionContainer({ children }: DescriptionContainerProps): JSX.Element {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      justifyContent: "center",
      overflow: "hidden",
      flexGrow: 1,
      "& > span": {
        width: "100%",
        whiteSpace: "nowrap"
      }
    }}>
      {children}
    </Box>
  );
}
