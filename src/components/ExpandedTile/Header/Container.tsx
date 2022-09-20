import React, { forwardRef, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

import { TileColor } from "../../../redux/tilesSlice";
import { TileContext } from "../../Tile/context";

type ContainerProps = {
  children: React.ReactNode
};

const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container({ children }, ref): JSX.Element {
  const { data } = useContext(TileContext);
  const theme = useTheme();

  return (
    <Stack spacing={0} sx={{
      p: "1rem",
      borderRadius: "inherit",
      backgroundColor: theme.palette[`${data.color}Container`].light,
      color: theme.palette[`on${data.color[0].toUpperCase()}${data.color.substring(1)}Container` as `on${Capitalize<TileColor>}Container`].light
    }} ref={ref}>
      {children}
    </Stack>
  );
});

export default Container;
