import React, { ReactNode, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { TileColor } from "../../../../../../../../redux/tilesSlice";
import { TileContext } from "./context";

type ContainerProps = {
  children: ReactNode
};

export default function Container({ children }: ContainerProps): JSX.Element {
  const { data, cropLeft, cropRight } = useContext(TileContext);
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
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
        backgroundColor: theme.palette[`${data.color}Container`].light,
        color: theme.palette[`on${data.color[0].toUpperCase()}${data.color.substring(1)}Container` as `on${Capitalize<TileColor>}Container`].light,
        border: `1px solid ${theme.palette.outline.light}`,
        ...(cropRight && {
          borderRight: 0
        }),
        ...(cropLeft && {
          borderLeft: 0
        }),
        cursor: "move"
      }}
    >
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",
        overflow: "hidden",
        "& > span": {
          width: "100%",
          whiteSpace: "nowrap"
        }
      }}>
        {children}
      </Box>
    </Box>
  );
}
