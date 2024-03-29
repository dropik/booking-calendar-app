import React, { ReactNode, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { TileColor } from "../../redux/tilesSlice";
import { TileContext } from "./context";
import { M3SurfaceTint } from "../m3/M3Tints";

type ContainerProps = {
  children?: ReactNode,
  dropZone?: boolean
};

export default function Container({ children, dropZone }: ContainerProps): JSX.Element {
  const { data, cropLeft, cropRight } = useContext(TileContext);
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
        height: "3rem",
        p: "1rem",
        borderRadius: "0.75rem",
        ...(cropLeft && {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }),
        ...(cropRight && {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }),
        backgroundColor: (!data || dropZone === true) ? "" : theme.palette[`${data.color}Container`].light,
        color: (!data || dropZone === true) ? "" : theme.palette[`on${data.color[0].toUpperCase()}${data.color.substring(1)}Container` as `on${Capitalize<TileColor>}Container`].light,
        border: dropZone ? `1px dashed ${theme.palette.outline.light}` : null,
        ...(cropRight && {
          borderRight: 0
        }),
        ...(cropLeft && {
          borderLeft: 0
        }),
        cursor: "pointer"
      }}
    >
      <Stack direction="row">
        {children}
      </Stack>
      {dropZone === true ? (
        <M3SurfaceTint sx={{
          backgroundColor: theme.palette.primary.light,
          opacity: theme.opacities.surface1
        }} />
      ) : null}
    </Box>
  );
}
