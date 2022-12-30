import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { unassign } from "../../../../redux/tilesSlice";

import Section from "..";
import NotAssignedTable from "./NotAssignedTable";

export default function NotAssigned(): JSX.Element {
  const theme = useTheme();
  const grabbedTile = useAppSelector((state) => state.tiles.grabbedTile);
  const dispatch = useAppDispatch();

  function drop(event: React.MouseEvent<HTMLDivElement>): void {
    if (grabbedTile && (event.button === 0)) {
      dispatch(unassign({ tileId: grabbedTile }));
    }
  }

  return (
    <Section onMouseUp={drop} header="Non Assegnati">
      <Box sx={{
        width: "7.5rem",
        borderRight: `1px solid ${theme.palette.outline.light}`,
      }}></Box>
      <NotAssignedTable />
    </Section>
  );
}
