import React, { useContext } from "react";

import { useAppSelector } from "../../../redux/hooks";
import { TileContext } from "../../Tile/context";

import BoardIcon from "../../Tile/BoardIcon";

export default function Board(): JSX.Element {
  const { data } = useContext(TileContext);
  const baseBoard: string = useAppSelector(state => data?.rateId === undefined ? "" : state.roomRates.data[data.rateId]?.baseBoard ?? "");

  return (
    <BoardIcon baseBoard={baseBoard} />
  );
}
