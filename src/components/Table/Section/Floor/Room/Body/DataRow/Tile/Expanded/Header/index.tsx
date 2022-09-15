import React, { forwardRef, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { TileColor } from "../../../../../../../../../../redux/tilesSlice";
import { TileContext } from "../../context";

import HeadlineRow from "./HeadlineRow";
import Persons from "./Persons";
import Period from "./Period";
import RoomType from "./RoomType";

const Header = forwardRef<HTMLDivElement, {}>(function Header(_, ref): JSX.Element {
  const { data } = useContext(TileContext);
  const theme = useTheme();


  return (
    <Stack spacing={0} sx={{
      p: "1rem",
      borderRadius: "inherit",
      backgroundColor: theme.palette[`${data.color}Container`].light,
      color: theme.palette[`on${data.color[0].toUpperCase()}${data.color.substring(1)}Container` as `on${Capitalize<TileColor>}Container`].light
    }} ref={ref}>
      <HeadlineRow />
      <Persons />
      <Stack sx={{ pt: "0.5rem" }}>
        <Period />
        <RoomType />
        {data.roomNumber ? (
          <Typography variant="bodySmall">{`Camera ${data.roomNumber}`}</Typography>
        ) : null}
      </Stack>
    </Stack>
  );
});

export default Header;
