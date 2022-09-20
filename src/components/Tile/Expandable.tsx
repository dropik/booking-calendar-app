import React, { useState } from "react";
import Box from "@mui/material/Box";
import ExpandedTile from "../ExpandedTile";

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
      <ExpandedTile anchorEl={anchorEl} onClose={close} />
    </>
  );
}
