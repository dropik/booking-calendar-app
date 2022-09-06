import React, { useState } from "react";
import Box from "@mui/material/Box";
import Expanded from "./Expanded";

type ExpandableProps = {
  children: React.ReactNode
};

export default function Expandable({ children }: ExpandableProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  function close() {
    setAnchorEl(null);
  }

  return (
    <>
      <Box onClick={(event) => {
        setAnchorEl(event.currentTarget);
      }}>
        {children}
      </Box>
      <Expanded anchorEl={anchorEl} onClose={close} />
    </>
  );
}
