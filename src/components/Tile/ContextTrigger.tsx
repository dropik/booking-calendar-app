import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TileContextMenu from "../Menu/TileContextMenu";
import { TileContext } from "./context";

type ContextTriggerProps = {
  children: React.ReactNode
};

export default function ContextTrigger({ children }: ContextTriggerProps): JSX.Element {
  const { data } = useContext(TileContext);
  const [contextPos, setContextPos] = useState<{ top: number, left: number } | undefined>(undefined);

  function openContext(event: React.UIEvent<HTMLDivElement>) {
    event.preventDefault();
    let { x, y } = { x: 0, y: 0 };
    const mouseEvent = event as React.MouseEvent<HTMLDivElement>;
    if (mouseEvent !== undefined) {
      x = mouseEvent.clientX;
      y = mouseEvent.clientY;
    }
    setContextPos({ top: y, left: x });
  }

  function closeContext() {
    setContextPos(undefined);
  }

  return (
    <>
      <Box onContextMenu={openContext}>{children}</Box>
      {data ? (
        <TileContextMenu
          tileId={data.id}
          anchorReference="anchorPosition"
          anchorPosition={contextPos}
          onClose={closeContext}
          unassigned={data.roomNumber === undefined}
        />
      ) : null}
    </>
  );
}
