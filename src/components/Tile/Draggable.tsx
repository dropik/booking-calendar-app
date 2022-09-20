import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";

import { useAppDispatch } from "../../redux/hooks";
import { grab, drop } from "../../redux/tilesSlice";
import { TileContext } from "./context";

type DraggableProps = {
  children: React.ReactNode
};

export default function Draggable({ children }: DraggableProps): JSX.Element {
  const dispatch = useAppDispatch();
  const data = useContext(TileContext).data;

  useEffect(() => {
    return () => {
      dispatch(drop({ tileId: data.id }));
    };
  }, [dispatch, data.id]);

  return (
    <Box
      draggable
      onDragStart={() => {
        dispatch(grab({ tileId: data.id, mouseY: 0 }));
      }}
      onDragEnd={() => {
        dispatch(drop({ tileId: data.id }));
      }}
    >
      { children }
    </Box>
  );
}
