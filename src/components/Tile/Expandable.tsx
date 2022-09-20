import React, { useState } from "react";
import Box from "@mui/material/Box";
import ExpandedTile from "../ExpandedTile";

type ExpandableProps = {
  children: React.ReactNode
};

export default function Expandable({ children }: ExpandableProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined);

  function close() {
    setAnchorEl(undefined);
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
