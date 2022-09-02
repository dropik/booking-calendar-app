import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TileContextMenu from "../../../../../../../Menu/TileContextMenu";
import { TileContext } from "./context";

type ContextTriggerProps = {
  children: React.ReactNode
};

export default function ContextTrigger({ children }: ContextTriggerProps): JSX.Element {
  const { data } = useContext(TileContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  function openContext(event: React.UIEvent<HTMLDivElement>) {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  }

  function closeContext() {
    setAnchorEl(null);
  }

  return (
    <>
      <Box onContextMenu={openContext}>{children}</Box>
      <TileContextMenu
        tileId={data.id}
        anchorEl={anchorEl}
        onClose={closeContext}
        unassigned={data.roomNumber === undefined}
      />
    </>
  );
}
