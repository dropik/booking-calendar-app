import React, { useContext } from "react";
import Stack from "@mui/material/Stack";

import { useAppSelector } from "../../../redux/hooks";
import { TileContext } from "../../Tile/context";

import BoardIcon from "../../Tile/BoardIcon";

export default function Board(): JSX.Element {
  const { data } = useContext(TileContext);
  const baseBoard: string = useAppSelector(state => data?.rateId === undefined ? "" : state.roomRates.data[data.rateId]?.baseBoard ?? "");

  return (
    <Stack sx={{ justifyContent: "center", px: "0.5rem" }}>
      <BoardIcon baseBoard={baseBoard} />
    </Stack>
  );
}
