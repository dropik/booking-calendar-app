import React, { forwardRef, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

import { TileColor } from "../../../redux/tilesSlice";
import { TileContext } from "../../Tile/context";
import ExpandableTileContext from "../context";

type ContainerProps = {
  children: React.ReactNode
};

const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container({ children }, ref): JSX.Element {
  const { data } = useContext(TileContext);
  const { variant } = useContext(ExpandableTileContext);
  const theme = useTheme();

  return (
    <Stack spacing={0} sx={{
      p: "1rem",
      borderRadius: "inherit",
      backgroundColor: variant === "popup" ? theme.palette[`${data.color}Container`].light : undefined,
      color: variant === "popup" ? theme.palette[`on${data.color[0].toUpperCase()}${data.color.substring(1)}Container` as `on${Capitalize<TileColor>}Container`].light : undefined
    }} ref={ref}>
      {children}
    </Stack>
  );
});

export default Container;
