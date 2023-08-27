import React, { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { useAppSelector } from "../../redux/hooks";
import { TileContext } from "./context";

import BoardIcon from "./BoardIcon";

export default function Board(): JSX.Element {
  const theme = useTheme();
  const { data } = useContext(TileContext);
  const baseBoard: string = useAppSelector(state => data === undefined ? "" : state.roomRates.data[data.rateId].baseBoard ?? "");

  return (
    <Typography variant="bodySmall">
      <BoardIcon baseBoard={baseBoard} fontSize={theme.typography.labelLarge.fontSize?.toString()} />
    </Typography>
  );
}
