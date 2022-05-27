import React, { memo } from "react";

import { useAppSelector } from "../../redux/hooks";

import DayAlert from "./DayAlert";

import "./Day.css";

type Props = {
  x: string
};

export default memo(function Day({ x }: Props): JSX.Element {
  const hasUnassignedTiles = useHasUnassignedTiles(x);

  const day = getDayFromX(x);

  return (
    <div className="day">
      <b>{day}</b>
      <DayAlert hasUnassignedTiles={hasUnassignedTiles} />
    </div>
  );
});

function useHasUnassignedTiles(x: string) {
  return useAppSelector(state => (state.tiles.unassignedMap[x] !== undefined) && (Object.keys(state.tiles.unassignedMap[x]).length > 0));
}

function getDayFromX(x: string): string {
  return x.substring(8);
}
