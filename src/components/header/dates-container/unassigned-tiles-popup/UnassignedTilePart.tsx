import React, { useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";

import { useAppSelector } from "../../../../redux/hooks";

import "./UnassignedTilePart.css";

type Props = {
  hasTilePart: boolean,
  tileId: string
};

function UnassignedTilePart(props: Props): JSX.Element {
  const tileData = useAppSelector((state) => state.tiles.data[props.tileId]);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundColor = tileData.colour;
    }
  }, [ref, tileData]);

  if (!props.hasTilePart) {
    return <></>;
  }

  return (
    <div ref={ref} className="unassigned-tile-part">
      <b>{tileData.persons}</b>
    </div>
  );
}

export default hot(module)(UnassignedTilePart);
