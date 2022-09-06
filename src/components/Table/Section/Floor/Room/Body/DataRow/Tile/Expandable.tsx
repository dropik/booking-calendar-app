import React from "react";
import Box from "@mui/material/Box";

type ExpandableProps = {
  children: React.ReactNode
};

export default function Expandable({ children }: ExpandableProps): JSX.Element {
  return (
    <Box onClick={(event) => {
      console.log(event.currentTarget.getBoundingClientRect());
    }}>
      {children}
    </Box>
  );
}
